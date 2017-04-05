onlineMusicQuizApp.controller('ResultsCtrl', function($scope,Quiz) {
  $scope.score = Quiz.getNumberOfCorrectAnswers()
  $scope.numberOfQuestions = Quiz.getNumberOfQuestions();
  $scope.listOfAnswers = Quiz.getListOfAnswers();
});
