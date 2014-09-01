'use strict';

/**
 * @ngdoc directive
 * @name memolar2App.directive:focus
 * @description
 * # focus
 */
angular.module('memolar2App')
.directive('focus', ['$timeout', function ($timeout) {
    return {
        scope: {
            trigger: '@focus'
        },
        link: function(scope, element) {
            scope.$watch('trigger', function(value) {
                if (value === 'true') {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
        }
    };
}]);
