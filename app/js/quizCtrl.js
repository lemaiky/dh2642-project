onlineMusicQuizApp.controller('QuizCtrl', function($scope,Quiz) {

  $scope.options = new Array(3);
  //$scope.numberOfQuestions = Quiz.getNumberOfQuestions();
  $scope.numberOfQuestions = 5;
  $scope.questionNumber = 1;
  $scope.progressValue = $scope.questionNumber / $scope.numberOfQuestions * 100;

  $scope.setNextQuestion = function() {
    if(!$scope.answer || $scope.answer == "")
      return;

    $scope.processAnswer();
    if($scope.questionNumber < $scope.numberOfQuestions) {
      $scope.questionNumber++;
      $scope.progressValue = $scope.questionNumber / $scope.numberOfQuestions * 100;
      $scope.track = $scope.allTracks.items[$scope.questionNumber - 1];
      $scope.setOptions($scope.allTracks.items);
    }
  }

  $scope.endQuiz = function() {
    $scope.processAnswer();
  }

  //TODO: $scope.allTracks = Quiz.getChosenQuizMusic();
  $scope.allTracks = Quiz.severalTracks.get({id:'4OHNH3sDzIxnmUADXzv2kT'}, function(tracks) {
    $scope.track = tracks.items[$scope.questionNumber - 1];
    $scope.setOptions(tracks.items);
    return tracks;
  })

  $scope.setOptions = function(tracks) {
    var length = tracks.length;
    var trackName = $scope.track.name;

    $scope.options[0] = tracks[Math.floor(Math.random()*length)].name;
    if($scope.options[0] == trackName) {
      while($scope.options[0] == trackName)
        $scope.options[0] = tracks[Math.floor(Math.random()*length)].name;
    }

    $scope.options[1] = tracks[Math.floor(Math.random()*length)].name;
    if($scope.options[1] == trackName || $scope.options[1] == $scope.options[0]) {
      while($scope.options[1] == trackName || $scope.options[1] == $scope.options[0])
        $scope.options[1] = tracks[Math.floor(Math.random()*length)].name;
    }

    $scope.options[2] = tracks[Math.floor(Math.random()*length)].name;
    if($scope.options[2] == trackName || $scope.options[2] == $scope.options[0] || $scope.options[2] == $scope.options[1]) {
      while($scope.options[2] == trackName || $scope.options[2] == $scope.options[0] || $scope.options[2] == $scope.options[1])
        $scope.options[2] = tracks[Math.floor(Math.random()*length)].name;
    }

    $scope.options[Math.floor(Math.random()*3)] = trackName;
  }

  $scope.selectAnswer = function(answer) {
    $scope.answer = answer;
  }

  $scope.processAnswer = function(select) {
    //if correct answer
    if($scope.answer == $scope.track.name) {
      Quiz.setNumberOfCorrectAnswers(Quiz.getNumberOfCorrectAnswers() + 1);
      console.log(Quiz.getNumberOfCorrectAnswers());
      Quiz.addAnswerToListOfAnswers($scope.answer, "Correct");
    }
    else {
      Quiz.addAnswerToListOfAnswers($scope.answer, "False");
    }
    $scope.answer = "";
  }
});
