onlineMusicQuizApp.controller('UserSavedQuizCtrl', function($scope,$firebaseArray,Quiz) {
  var quizRef = firebase.database().ref().child("users/" + Quiz.getUid());
  $scope.userSavedQuiz = $firebaseArray(quizRef);

  //TODO: retrieve artists
});
