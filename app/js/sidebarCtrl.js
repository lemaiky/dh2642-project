onlineMusicQuizApp.controller('SidebarCtrl', function($scope,Quiz) {
  $scope.score = Quiz.getNumberOfCorrectAnswers()
  $scope.numberOfQuestions = Quiz.getNumberOfQuestions();
  $scope.setNumberOfQuestions = function(number) {
    Quiz.setNumberOfQuestions(number);
  }
  //$scope.list1 = {title: 'AngularJS - Drag Me'};
  $scope.list2 = [];

  //$scope.music = {};
  $scope.setAlbums = function() {
    
  };
});
