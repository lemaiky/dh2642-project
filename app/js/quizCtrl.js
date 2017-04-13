onlineMusicQuizApp.controller('QuizCtrl', function($scope,Quiz) {

  $scope.numberOfQuestions = Quiz.getNumberOfQuestions();
  $scope.questionNumber = 1;
  $scope.progressValue = $scope.questionNumber / $scope.numberOfQuestions * 100;

  $scope.setNextQuestion = function() {
    if(!$scope.answer || $scope.answer == "")
      return;

    $scope.processAnswer();
    if($scope.questionNumber < $scope.numberOfQuestions) {
      $scope.questionNumber++;
      $scope.progressValue = $scope.questionNumber / $scope.numberOfQuestions * 100;
      $scope.options = $scope.getOptions();
    }
  }

  $scope.endQuiz = function() {
    $scope.processAnswer();
  }

  $scope.setOptions = function(options) {
    var length = $scope.fullList.length - 1;
    $scope.track = $scope.allTracks[$scope.questionNumber - 1];

    options[0] = $scope.fullList[Math.floor(Math.random()*length)].name;
    if(options[0] == $scope.track.name) {
      while(options[0] == $scope.track.name)
        options[0] = $scope.fullList[Math.floor(Math.random()*length)].name;
    }

    options[1] = $scope.fullList[Math.floor(Math.random()*length)].name;
    if(options[1] == $scope.track.name || options[1] == options[0]) {
      while(options[1] == $scope.track.name || options[1] == options[0])
        options[1] = $scope.fullList[Math.floor(Math.random()*length)].name;
    }

    options[2] = $scope.fullList[Math.floor(Math.random()*length)].name;
    if(options[2] == $scope.track.name || options[2] == options[0] || options[2] == options[1]) {
      while(options[2] == $scope.track.name || options[2] == options[0] || options[2] == options[1])
        options[2] = $scope.fullList[Math.floor(Math.random()*length)].name;
    }
    options[Math.floor(Math.random()*2)] = $scope.track.name;
  }

  $scope.getOptions = function() {
    var options = new Array(3);
    if($scope.allTracks && $scope.allTracks.length > 0) {
      $scope.setOptions(options);

    } else {
      Quiz.getQuizQuestion(function(allTracks, fullList) {
        $scope.allTracks = allTracks;
        $scope.fullList = fullList;
        $scope.setOptions(options);
      });
    }
    return options;
  }

  $scope.options = $scope.getOptions();

  $scope.selectAnswer = function(answer) {
    $scope.answer = answer;
  }

  $scope.processAnswer = function(select) {
    //if correct answer
    if($scope.answer == $scope.track.name) {
      Quiz.setNumberOfCorrectAnswers(Quiz.getNumberOfCorrectAnswers() + 1);
      Quiz.addAnswerToListOfAnswers($scope.answer, "Correct");
    }
    else {
      Quiz.addAnswerToListOfAnswers($scope.answer, "False");
    }
    $scope.answer = "";
  }
});
