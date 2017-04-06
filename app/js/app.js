var onlineMusicQuizApp = angular.module('online-music-quiz', ['ngRoute','ngResource', 'ngCookies', 'ngDragDrop']);


/*
TODO LIST April 5 2017

- Quiz based on selected music
- Drag and drop artists and albums from the details view
- Fix a bug where deleted artists cannot be added again into the sidebar
- add a headline and description of the search view so that the user better can understand it

Comments from classmates:
- When you are adding songs to the quiz, it is unclear whether you add specific songs or just artists, and the website will generate songs by that artist for you.
  Maybe you can have both options. For example if you choose Coldplay and you want 5 songs, it will randomly pick 5 Coldplay songs for you.
- Consider the possibility of adding songs by genre as well.
- Can you add multiple songs/artists/genres so it becomes a mixed quiz? I think that would be good.
  Then you need to enable the user to pick the number of songs for each artist/genre.
- Consider the possibility for users to create their own quiz, save it, and share with friends, would be very cool!
  Then you can also do the persist data part.
  You can also display all the quizzes created by users on an "existing quizzes" page so when a user comes to your site they can play directly on other people's quizzes if they want.
  Then you can maybe even have "popular" quizzes and "most recently created" quizzes, etc.
- You can also implement a highscore so that people will feel more motivated to spend many hours on your site :)
  The highscore can be connected to the individual quizzes you saved (in the previous point).
  So each quiz created would have its own highscore.
- Are all questions in the form of "What is the name of the song"? In that case maybe you don't need to write "Question 1. What is the name of the song?",
  and "Question 2. What is the name of the song?" instead you can maybe write at the top of the page "What is the name of the song?" in large text indicating that it applies to all questions.

It would be nicer if you could add different type of questions instead of only have one. I mean right now you only ask for choosing the name of the song.
  But there can be more questions like: "complete some part of the lyric", "which album it belongs to", "which year", and so on!
  Maybe it's too much for this course project but I think it's more fun that way ;)

I don't get the idea of having the "detail page". What is that for? I don't think it's necessary to show the details of songs of an album for the game.
  Unless you want to add more features to make it a bigger website. In that case, I think you could add some features that @Beichen Chen mentioned in her comment.

First, I think it would be nice to have a user system.
  This could let you have a space like a profile for each user where they can store quizes they have solved to see the answers and also share with other users.

Also I am not sure to have understood what you add to create a quiz, if it is albums form artists or it can also be just songs.
  In this case maybe could be interesting to search by song also.

Finally, I am also not sure what is the detail view for. What I get is that it is what appears after searching an artist and clicking in one of the results,
  then you are redirected to the detail and there you can add the artist or albums. If that is the case and I have understood well, in terms of usability,
  you could add the option to add directly the artist from the search results, without the need to enter the detail.
  This could be useful if you are sure you want to add the artist and don't need to see the detail.

Again, I think it is good idea and can be used to create a music competition with friends!

*/



onlineMusicQuizApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html'
      }).
      when('/search', {
        templateUrl: 'partials/searchView.html',
        controller: 'SearchCtrl'
      }).
      when('/details/:id', {
        templateUrl: 'partials/detailsView.html',
        controller: 'DetailsCtrl'
      }).
      when('/quiz', {
        templateUrl: 'partials/quizView.html',
        controller: 'QuizCtrl'
      }).
      when('/results', {
        templateUrl: 'partials/resultsView.html',
        controller: 'ResultsCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
