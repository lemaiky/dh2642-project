onlineMusicQuizApp.controller('SearchCtrl', ['$scope','Quiz', function($scope,Quiz) {

  $scope.addAlbum = function(album) {
    Quiz.addAlbumToQuiz(album);
  }

  // including the case while the search is still running.
  $scope.search = function(query,type) {
    Quiz.MusicSearch.get({q:query, type:'artist'},function(data){
      $scope.music = data.artists.items;
      $scope.searchButtonText = "";
    },function(data){
      $scope.status = "There was an error";
    });
  }

  $scope.addToDrag = function(event) {
    $scope.list1 = $scope.music[event.target.id];
  }

}]);
