onlineMusicQuizApp.controller('ResultsCtrl', function($scope,$firebaseArray,Quiz) {
  $scope.score = Quiz.getNumberOfCorrectAnswers()
  $scope.numberOfQuestions = Quiz.getNumberOfQuestions();
  $scope.listOfAnswers = Quiz.getListOfAnswers();

  $scope.resetAnswers = function() {
    Quiz.resetAnswers();
  }

  $scope.saveQuiz = function() {
    var uid = Quiz.getUid();
    var username = Quiz.getUsername();
    var artists = Quiz.getListArtistsId();
    var quiz = Quiz.getQuestionList();
    var score = Quiz.getNumberOfCorrectAnswers();

    var userRef = $firebaseArray(firebase.database().ref().child('users/' + uid));
    userRef.$add({
      author: username,
      uid: uid,
      artists: artists,
      quiz: quiz,
      score: score
    })

    var quizRef = $firebaseArray(firebase.database().ref().child('quiz/'));
    quizRef.$add({
      author: username,
      uid: uid,
      artists: artists,
      quiz: quiz,
      score: score
    })
  }
});
