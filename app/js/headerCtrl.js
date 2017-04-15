onlineMusicQuizApp.controller('HeaderCtrl', function($scope,Quiz) {
  $scope.signIn = function() {
      Quiz.signIn();
  }
});
