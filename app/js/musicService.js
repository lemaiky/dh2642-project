onlineMusicQuizApp.factory('Quiz',
  ['$cookies', '$resource', function ($cookies, $resource) {

  var numberOfQuestions = $cookies.put('numberOfQuestions', 5);
  var numberOfCorrectAnswers = $cookies.put('numberOfCorrectAnswers', 0);;
  var albums = [];

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
  this.addAlbumToQuiz = function(music) {
    albums.push(music.id);
    $cookies.put("albums", albums);
  }

  // Remove music from quizMusicList e.g. album or artist (UNFINISHED)
  this.removeMusicFromQuiz = function(musicID) {
    $cookies.remove(musicID);
  }

  // // API request
  this.MusicSearch = $resource('https://api.spotify.com/v1/search',{},{
    get: {}
  });

  this.trackReturn = $resource('https://api.spotify.com/v1/tracks/:id', {}, {
    get: {}
  });

  // test function --> will not keep
  //TODO: take off when sidebarCtrl finished
  this.severalTracks = $resource('https://api.spotify.com/v1/albums/:id/tracks', {}, {
    get: {}
  });

// https://developer.spotify.com/web-api/console/get-artist-albums/
// Get several albums     ://api.spotify.com/v1/albums
// Get several artists    : https://api.spotify.com/v1/artists
// Get an artists albums  : https://api.spotify.com/v1/artists/{id}/albums

  return this;
}]);
