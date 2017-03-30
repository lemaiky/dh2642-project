onlineMusicQuizApp.controller('QuizCtrl', function($scope,Quiz) {
  //TODO

  //$scope.numberOfQuestions = Quiz.getNumberOfQuestions();
  $scope.numberOfQuestions = 10;
  $scope.questionNumber = 1;
  $scope.progressValue = $scope.questionNumber / $scope.numberOfQuestions * 100;

  $scope.setNextQuestion = function() {
    $scope.track = Quiz.trackReturn.get({id:'3n3Ppam7vgaVa1iaRUc9Lp'}, function(track) {
      return track;
    });
    if($scope.questionNumber < $scope.numberOfQuestions) {
      $scope.questionNumber++;
      $scope.progressValue = $scope.questionNumber / $scope.numberOfQuestions * 100;
    }
  }

  $scope.track = Quiz.trackReturn.get({id:'4PjcfyZZVE10TFd9EKA72r'}, function(track) {
    return track;
  });
});
