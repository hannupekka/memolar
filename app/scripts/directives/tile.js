'use strict';

/**
 * @ngdoc directive
 * @name memolar2App.directive:tile
 * @description
 * # tile
 */
angular.module('memolar2App')
.directive('tile', function () {
    return {
        templateUrl: 'views/tile.html',
        restrict: 'E',
        replace: true
    };
});
