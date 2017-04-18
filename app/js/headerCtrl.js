onlineMusicQuizApp.controller('HeaderCtrl', function($scope,$location,$firebaseAuth,$firebaseArray,Quiz) {

  var auth = $firebaseAuth();
  $scope.signIn = function() {
    if(!Quiz.getUid() || Quiz.getUid() === "") {
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
    } else {
      $scope.uid = Quiz.getUid();
      $scope.username = Quiz.getUsername();
    }
  }

  $scope.logOut = function() {
    $scope.uid = "";
    $scope.username = "";
    Quiz.setUid($scope.uid);
    Quiz.setUsername($scope.username);
    $location.path('search');
  }
});
