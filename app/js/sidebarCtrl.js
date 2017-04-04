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
      Quiz.addAlbumToQuiz($scope.list2[i], 'artist');
      $scope.listView = Quiz.getChosenQuizMusic();
    }
  };

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
