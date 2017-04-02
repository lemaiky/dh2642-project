onlineMusicQuizApp.controller('DetailsCtrl', function($scope,$routeParams,Quiz) {
  $scope.addAlbum = function(album) {
    Quiz.addAlbumToQuiz(album);
  }
  
  //$routeParams.id;
});
