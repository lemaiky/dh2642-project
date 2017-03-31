onlineMusicQuizApp.controller('SearchCtrl', ['$scope','Quiz', function($scope,Quiz) {

  $scope.addAlbum = function(album) {
    Quiz.addAlbumToQuiz(album);
  }

  $scope.list1 = {title: 'AngularJS - Drag Me'};
  $scope.list2 = {};
  
  // //including the case while the search is still running.
  $scope.search = function(query,type) {
  //  $scope.searchButtonText = "Searching...";
    $scope.status = "Searching...";
     Quiz.MusicSearch.get({q:query, type:'artist'},function(data){
       $scope.music=data.artists.items;
       //$scope.status = "Showing " + data.results.length + " results";
       $scope.searchButtonText = "";
     },function(data){
       $scope.status = "There was an error";
     });
   }
  //$scope.fT = Quiz.fetchTracks(albumId, callback);

}]);
