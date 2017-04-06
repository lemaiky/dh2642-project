onlineMusicQuizApp.factory('Quiz',
  ['$cookies', '$resource', function ($cookies, $resource) {

  var numberOfQuestions = $cookies.put('numberOfQuestions', 5);
  var numberOfCorrectAnswers = $cookies.put('numberOfCorrectAnswers', 0);;
  var albums = new Array();
  var artists = new Array();
  var listOfAnswers = [];

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
    albums = $cookies.get("albums");
    artists = $cookies.get("artists");
    var list = new Array();
    if(albums && albums.length > 0) {
      albums = albums.split(',');
      for(var i in albums) {
        this.GetFullAlbum.get({id: albums[i]}, function(fullAlbum) {
          list.push(fullAlbum);
        });
      }
    }
    if(artists && artists.length > 0) {
      artists = artists.split(',');
      for(var j in artists) {
        this.GetArtist.get({id: artists[j]}, function(artist) {
          list.push(artist);
        });
      }
    }
    return list;
  }

  this.getListOfAnswers = function() {
    return listOfAnswers;
  }

  this.addAnswerToListOfAnswers = function(question, correction) {
    listOfAnswers.push({
    key:   question,
    value: correction
    });
  }

  // Add new music e.g. album or artist (UNFINISHED)
  this.addAlbumToQuiz = function(music, type) {
    switch(type) {
      case 'artist':
        if(!artists)
          artists = new Array();
        artists.push(music.id);
        $cookies.put("artists", artists);
        break;
      case 'album':
        if(!albums)
          albums = new Array();
        albums.push(music.id);
        $cookies.put("albums", albums);
        break;
    }
  }

  // Remove music from quizMusicList e.g. album or artist (UNFINISHED)
  this.removeMusicFromQuiz = function(musicID) {
    if(albums && albums.indexOf(musicID) != -1) {
      albums.splice(albums.indexOf(musicID), 1);
      $cookies.put("albums", albums);
    } else if(artists && artists.indexOf(musicID) != -1) {
      artists.splice(artists.indexOf(musicID), 1);
      $cookies.put("artists", artists);
    }
  }

  // // API request
  this.MusicSearch = $resource('https://api.spotify.com/v1/search',{},{
    get: {}
  });

  this.trackReturn = $resource('https://api.spotify.com/v1/tracks/:id', {}, {
    get: {}
  });

  this.GetArtist = $resource('https://api.spotify.com/v1/artists/:id', {}, {
    get: {}
  });

  this.GetArtistAlbums = $resource('https://api.spotify.com/v1/artists/:id/albums', {}, {
    get: {}
  });

  this.GetFullAlbum = $resource('https://api.spotify.com/v1/albums/:id', {}, {
    get: {}
  });

  // test function --> will not keep
  //TODO: take off when sidebarCtrl finished
  this.severalTracks = $resource('https://api.spotify.com/v1/albums/:id/tracks', {}, {
    get: {}
  });


  this.artistsAlbums = $resource('https://api.spotify.com/v1/artists/:id/albums', {}, {
    get: {}
  });

// https://developer.spotify.com/web-api/console/get-artist-albums/
// Get several albums     ://api.spotify.com/v1/albums
// Get several artists    : https://api.spotify.com/v1/artists
// Get an artists albums  : https://api.spotify.com/v1/artists/{id}/albums

  return this;
}]);
