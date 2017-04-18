onlineMusicQuizApp.controller('UserSavedQuizCtrl', function($scope,$location,$firebaseArray,Quiz) {
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
    for(var i in event.quiz.artists) {
      Quiz.GetArtistAlbums.get({id:event.quiz.artists[i]}, function(albums) {
        Quiz.resetAnswers();
        for(var j in albums.items) {
          Quiz.saveAlbumForQuiz(albums.items[j].id);
        }
        if(i == event.quiz.artists.length - 1) {
          $location.path('quiz');
        }
      });
    }
  }
});
