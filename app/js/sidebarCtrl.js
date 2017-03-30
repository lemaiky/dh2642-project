onlineMusicQuizApp.controller('SidebarCtrl', function($scope,Quiz) {
  $scope.score = Quiz.getNumberOfCorrectAnswers()
  $scope.numberOfQuestions = Quiz.getNumberOfQuestions();
  $scope.numberOfQuestions = Quiz.setNumberOfQuestions();
});
