onlineMusicQuizApp.controller('DetailsCtrl', function($scope,$routeParams,Quiz) {
  $scope.addAlbum = function(album) {
    Quiz.addAlbumToQuiz(album);
  }
  
  //$routeParams.id;
  $scope.albumTracks = [];
  $scope.albums = Quiz.artistsAlbums.get({id:$routeParams.id}, function(albums) {
    //console.log(albums);
    $scope.albums = albums.items;
    for (var i=0; i < $scope.albums.length; i++){
      $scope.albumID = albums.items[i].id;
      $scope.albumTracks[$scope.albumID] = Quiz.severalTracks.get({id:$scope.albumID }, function(tracks) {
      	//console.log(tracks.items);
        //$scope.albumTracks.push(tracks.items);
        console.log($scope.albumTracks);
    //console.log($scope.albumID);
    //console.log(tracks);
      //$scope.albumTracks[$scope.albumID] = tracks.items;
      return tracks.items;
    //console.log(t);
  });
}






//FUNKAR SEPARAT...
 
// $scope.tracks = function(albumA) {
//   //for (var i in albumA) {
//   	console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
//   Quiz.severalTracks.get({id:albumA.id}, function(tracks) {
//   //console.log($scope.albumID);
//   //   console.log(tracks);
//      $scope.allTracks = tracks.items;
//   });
   
//    return $scope.allTracks;
// }

 // });

//Album id som funkar: 1mc8M9eR9ZIBxqWA2CA4Wo


  //$scope.tracks = Quiz.severalTracks.get({id:$routeParams.id}, function(tracks) {
    //console.log("Tracks: " + tracks);
    //$scope.trackName = tracks.items;
    //console.log($scope.albumName);
    //$scope.albumCover = albums.items[0].images[0].url;
      //  console.log($scope.albumCover);
  //})
  //$scope.albumTracks = function(album) {
  	//Search songs(album)
  	//}




});
});