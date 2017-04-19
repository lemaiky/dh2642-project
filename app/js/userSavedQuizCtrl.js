onlineMusicQuizApp.controller('UserSavedQuizCtrl', function($scope,$location,$firebaseArray,Quiz) {
  var quizRef = firebase.database().ref().child("users/" + Quiz.getUid());
  $scope.userSavedQuiz = $firebaseArray(quizRef);

  $scope.getQuizArtists = function() {
    var artists = new Array();
    var indexQuiz = 0;
    var indexArtists = 0;
    $scope.userSavedQuiz.$loaded().then(function(quiz) {
      for(var i = 0; i < quiz.length; i++) {
        for(var j = 0; j < quiz[i].artists.length; j++) {
          artists[i] = new Array();
          Quiz.GetArtist.get({id: quiz[i].artists[j]}, function(artist) {
            artists[indexQuiz].push(artist.name);
            indexArtists++;

            if(indexArtists == quiz[indexQuiz].artists.length) {
              indexQuiz++;
              indexArtists = 0;
            }

            if(indexQuiz == quiz.length)
              $scope.artists = artists;
          });
        }
      }
    });
  }

  $scope.artists = $scope.getQuizArtists();

  $scope.playQuiz = function(event) {
    var index = 0;
    Quiz.resetAnswers();
    for(var i in event.quiz.artists) {
      Quiz.GetArtistAlbums.get({id:event.quiz.artists[i]}, function(albums) {
        for(var j in albums.items) {
          Quiz.saveAlbumForQuiz(albums.items[j].id);
        }
        if(index == event.quiz.artists.length - 1) {
          $location.path('quiz');
        } else {
          index++;
        }
      });
    }
  }
});
