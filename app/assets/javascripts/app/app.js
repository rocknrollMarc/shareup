angular.module('myApp', ['ngRoute']).config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/templates/dashboard.html',
    controller: 'HomeController'
  })
  .otherwise({redirectTo: '/'});
});
