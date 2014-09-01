'use strict';

/**
 * @ngdoc directive
 * @name memolar2App.directive:playerInput
 * @description
 * # playerInput
 */
angular.module('memolar2App')
.directive('playerInput', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/player-input.html',
        replace: true,
    };
});
