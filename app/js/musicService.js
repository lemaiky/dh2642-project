musicQuizApp.factory('Quiz',
  ['$cookies', '$resource', function ($cookies, $resource) {

  var numberOfQuestions = 0;

  var quizSongs = [];

  // Set the number of questions in the quiz
  this.setNumberOfQuestions = function(number) {
    $cookies.put('numberOfQuestions', number);
  }

  this.getNumberOfQuestions = function() {
    return parseInt($cookies.get('numberOfQuestions'));
    }

  this.getQuizList = function() {
    }


this.addMusicToQuiz = function(music) {
   $cookies.put(music.id, music.id);
}

this.removeMusicFromQuiz = function(musicID) {
  $cookies.remove(musicID);
}


  this.MusicSearch = $resource('https://api.spotify.com',{},{

  });


  return this;

}]);
