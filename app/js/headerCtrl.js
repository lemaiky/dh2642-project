onlineMusicQuizApp.controller('HeaderCtrl', function($scope,$firebaseAuth,Quiz) {

  var auth = $firebaseAuth();
  $scope.signIn = function() {
    if(Quiz.getUid() === "") {
      // login with Google
      auth.$signInWithPopup("google").then(function(firebaseUser) {
        $scope.uid = firebaseUser.user.uid;
        $scope.username = firebaseUser.user.displayName;
        Quiz.setUid($scope.uid);
        Quiz.setUsername($scope.username);
        console.log("Signed in as:", firebaseUser.user);
      }).catch(function(error) {
        console.log("Authentication failed:", error);
      });
    }
  }
});
