onlineMusicQuizApp.controller('DetailsCtrl', function($scope,$routeParams,Quiz) {
  $scope.addAlbum = function() {
    Quiz.addAlbumToQuiz($routeParams, 'artist');
    for(var i in $scope.albums) {
      Quiz.saveAlbumForQuiz($scope.albums[i].id);
    }
  }

  $scope.albumTracks = [];
  $scope.albums = Quiz.artistsAlbums.get({id:$routeParams.id}, function(albums) {
    $scope.albums = albums.items;
    for (var i=0; i < $scope.albums.length; i++){
      $scope.albumID = albums.items[i].id;
      $scope.albumTracks[$scope.albumID] = Quiz.severalTracks.get({id:$scope.albumID }, function(tracks) {
        return tracks.items;
      });
    }
  });
});
