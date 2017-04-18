onlineMusicQuizApp.controller('UserSavedQuizCtrl', function($scope,$firebaseArray,Quiz) {
  var quizRef = firebase.database().ref().child("users/" + Quiz.getUid());
  $scope.userSavedQuiz = $firebaseArray(quizRef);

  console.log($scope.userSavedQuiz)

  //TODO: retrieve artists
  $scope.getArtists = function(artistsId) {
    Quiz.GetArtist.get({id: artistsId}, function(artist) {
      $scope.artistName = artist.name;
    });
  }

  $scope.playQuiz = function(event) {
    Quiz.resetAnswers();
    for(var i in event.quiz.artists) {
      Quiz.GetArtistAlbums.get({id:event.quiz.artists[i]}, function(albums) {
        for(var i in albums.items) {
          Quiz.saveAlbumForQuiz(albums.items[i].id);
        }
      });
    }
  }
});
