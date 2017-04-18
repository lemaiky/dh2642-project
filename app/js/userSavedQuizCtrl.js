onlineMusicQuizApp.controller('UserSavedQuizCtrl', function($scope,$location,$firebaseArray,Quiz) {
  var quizRef = firebase.database().ref().child("users/" + Quiz.getUid());
  $scope.userSavedQuiz = $firebaseArray(quizRef);

  $scope.getQuizArtists = function() {
    var artists = new Array();
    var index = 0;
    $scope.userSavedQuiz.$loaded().then(function(quiz) {
      for(var i = 0; i < quiz.length; i++) {
        for(var j = 0; j < quiz[i].artists.length; j++) {
          artists[i] = new Array();
          Quiz.GetArtist.get({id: quiz[i].artists[j]}, function(artist) {
            artists[index].push(artist.name);

            if(j == quiz[index].artists.length)
              index++;

            if(index == quiz.length)
              $scope.artists = artists;
          });
        }
      }
    });
  }

  $scope.artists = $scope.getQuizArtists();

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
