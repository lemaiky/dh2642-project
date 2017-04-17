onlineMusicQuizApp.factory('Quiz',
  ['$cookies', '$resource', function ($cookies, $resource) {

  var numberOfQuestions = $cookies.put('numberOfQuestions', 5);
  var numberOfCorrectAnswers = $cookies.put('numberOfCorrectAnswers', 0);;
  var albums = new Array();       // list of albums for sidebar view
  var artists = new Array();      // list of artists for sidebar view
  var quiz = new Array();         // full list of albums for quiz questions
  var listOfAnswers = [];

  var questions = new Array();
  this.uid = "";
  this.username = "";

  this.setUid = function(uid) {
    $cookies.put('uid', uid);
    //this.uid = uid;
  }
  this.getUid = function() {
    return $cookies.get('uid');
  }
  this.setUsername = function(username) {
    $cookies.put('username', username);
    //this.username = username;
  }
  this.getUsername = function() {
    return $cookies.get('username');
  }

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

  this.getListArtistsId = function() {
    artists = $cookies.get("artists");
    if(artists && artists.length > 0) {
      artists = artists.split(',');
    }
    return artists;
  }

  this.getQuizQuestion = function(callback) {
    var nbOfQuestions = this.getNumberOfQuestions();
    questions = new Array();

    var list = this.getAlbumForQuiz();
    var fullList = new Array();

    if(list && list.length > 0) {
      for(var i = 0; i < nbOfQuestions; i++) {
        var index = Math.floor(Math.random() * (list.length - 1));
        this.GetFullAlbum.get({id: list[index]}, function(fullAlbum) {
          var tracks = fullAlbum.tracks.items;
          var rand = Math.floor(Math.random() * (tracks.length - 1));
          questions.push(tracks[rand]);
          fullList.push(tracks[rand]);
          fullList.push(tracks[(rand+1)%(tracks.length-1)]);

          if(questions.length === nbOfQuestions) {
            callback(questions, fullList);
          }
        });
      }
    }
  }

  this.getQuestionList = function() {
    var questionsId = new Array();
    for(var i in questions) {
        questionsId.push(questions[i].id);
    }
    return questionsId;
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

  this.resetAnswers = function() {
    listOfAnswers = new Array();
    this.setNumberOfCorrectAnswers(0);
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
      this.removeAlbumForQuiz(musicID);
    } else if(artists && artists.indexOf(musicID) != -1) {
      artists.splice(artists.indexOf(musicID), 1);
      $cookies.put("artists", artists);
      this.removeArtistForQuiz(musicID);
    }
  }

  this.saveAlbumForQuiz = function(albumID) {
    quiz.push(albumID);
    $cookies.put("quiz", quiz);
  }

  this.removeAlbumForQuiz = function(albumID) {
    quiz.splice(quiz.indexOf(albumID), 1);
    $cookies.put("quiz", quiz);
  }

  this.removeArtistForQuiz = function(artistID) {
    this.GetArtistAlbums.get({id: artistID}, function(albums) {
      for(var i in albums.items) {
        if(quiz.indexOf(albums.items[i].id) !== -1) {
          quiz.splice(quiz.indexOf(albums.items[i].id), 1);
        }
      }
      $cookies.put("quiz", quiz);
    });
  }

  this.getAlbumForQuiz = function() {
    quiz = $cookies.get("quiz");
    quiz = quiz.split(',');
    return quiz;
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
