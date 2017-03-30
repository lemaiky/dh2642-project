onlineMusicQuizApp.controller('DetailsCtrl', function($scope,Quiz) {
  $scope.addAlbum = function(album) {
    Quiz.addAlbumToQuiz(album);
  }
});
