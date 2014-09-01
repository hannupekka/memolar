'use strict';

/**
 * @ngdoc directive
 * @name memolar2App.directive:playerScore
 * @description
 * # playerScore
 */
angular.module('memolar2App')
.directive('playerScore', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/player-score.html',
        replace: true,
    };
});
