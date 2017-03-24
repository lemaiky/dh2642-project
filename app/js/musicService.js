musicQuizApp.factory('Quiz',
  ['$cookies', '$resource', function ($cookies, $resource) {

  var numberOfQuestions = 0;
  var numberOfCorrectAnswers = 0;
  var quizSongs = [];

  // Set the number of questions in the quiz
  this.setNumberOfQuestions = function(number) {
    $cookies.put('numberOfQuestions', number);
  }

  // Get the number of questions in the quiz
  this.getNumberOfQuestions = function() {
    return parseInt($cookies.get('numberOfQuestions'));
  }

  // Set the number of correctly answered questions in the quiz
  this.setNumberOfCorrectAnswers = function(number) {
    $cookies.put('numberOfCorrectAnswers', number);
  }

  // Get the number of correctly answered questions in the quiz
  this.getNumberOfCorrectAnswers = function() {
    return parseInt($cookies.get('numberOfCorrectAnswers'));
  }

  // Get the list of chosen music (UNFINISHED)
  this.getChosenQuizMusic = function() {
    }

  // Add new music e.g. album or artist (UNFINISHED)
  this.addMusicToQuiz = function(music) {
    $cookies.put(music.id, music.id);
  }

  // Remove music from quizMusicList e.g. album or artist (UNFINISHED)
  this.removeMusicFromQuiz = function(musicID) {
    $cookies.remove(musicID);
  }

  // API request (UNFINISHED)
  this.MusicSearch = $resource('https://api.spotify.com',{},{

  });

  $ curl "https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10"

// https://developer.spotify.com/web-api/console/get-artist-albums/
// Get several albums     ://api.spotify.com/v1/albums
// Get several artists    : https://api.spotify.com/v1/artists
// Get an artists albums  : https://api.spotify.com/v1/artists/{id}/albums


  return this;
}]);
