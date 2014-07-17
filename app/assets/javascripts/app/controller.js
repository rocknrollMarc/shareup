angular.module('myApp.controllers', [])
.controller('HomeController', 
           function($scope, session, SessionService,  ArticleService, Share) {
             $scope.user = session.user;
            ArticleService.getLatestFeed()
            .then(function(data) {
              $scope.articles = data;
            })
           });
