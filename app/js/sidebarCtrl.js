onlineMusicQuizApp.controller('SidebarCtrl', function($scope,Quiz) {
  $scope.score = Quiz.getNumberOfCorrectAnswers()
  $scope.numberOfQuestions = Quiz.getNumberOfQuestions();
  $scope.setNumberOfQuestions = function(number) {
    Quiz.setNumberOfQuestions(number);
  }
  $scope.allAlbums = [];
  $scope.list2 = [];
  $scope.listView = [];

  $scope.saveList = function() {
    for(var i in $scope.list2) {
      var contains = false;
      for(var j in $scope.listView) {
          if($scope.listView[j].id === $scope.list2[i].id)
            contains = true;
      }

      if(!contains) {
        Quiz.addAlbumToQuiz($scope.list2[i], $scope.list2[i].type);
        Quiz.GetArtistAlbums.get({id:$scope.list2[i].id}, function(albums) {
          for(var i in albums.items) {
            Quiz.saveAlbumForQuiz(albums.items[i].id);
          }
        });
      }
    }
    $scope.listView = Quiz.getChosenQuizMusic();
  };

  $scope.play = function() {
    Quiz.resetAnswers();
    for(var i in $scope.listView) {
      Quiz.GetArtistAlbums.get({id:$scope.listView[i].id}, function(albums) {
        for(var i in albums.items) {
          Quiz.saveAlbumForQuiz(albums.items[i].id);
        }
      });
    }
    
  }

  $scope.listView = Quiz.getChosenQuizMusic();

  $scope.removeMusic = function(item) {
    if($scope.listView.indexOf(item) != -1)
      Quiz.removeMusicFromQuiz(item.id);

    for(var i in $scope.list2) {
      if($scope.list2[i].id === item.id)
        $scope.list2.splice(i, 1);
    }
    $scope.listView = Quiz.getChosenQuizMusic();
  }
});
