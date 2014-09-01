'use strict';

/**
 * @ngdoc overview
 * @name memolar2App
 * @description
 * # memolar2App
 *
 * Main module of the application.
 */
angular
.module('memolar2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngAudio'
])
.constant('_', window._)
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
});