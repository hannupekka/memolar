'use strict';

/**
 * @ngdoc function
 * @name memolar2App.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the memolar2App
 */
angular.module('memolar2App')
.controller('GameCtrl', ['$scope', '_', 'ngAudio', function ($scope, _, ngAudio) {
    $scope.running = false;
    $scope.round = 1;
    $scope.winner = [];
    $scope.tiles = 30;

    // Broadcasts 'startGame'-event for child scopes.
    $scope.startGame = function(tiles) {
        $scope.$broadcast('startGame', tiles);
    };

    $scope.resetGame = function() {
        $scope.running = false;
        $scope.winner = [];
    };

    // Listen for 'initGame'-events from PlayerCtrl.
    $scope.$on('initGame', function() {
        $scope.running = true;
        $scope.round = 1;
        $scope.winner = [];

        // Stop applauses.
        ngAudio.stop('applause');
    });

    // Listen for 'nextRound'-events from TileCtrl.
    $scope.$on('nextRound', function() {
        $scope.round++;
    });

    // Listen for 'endGame'-events from PlayerCtrl.
    $scope.$on('endGame', function(event, winner) {
        $scope.running = false;

        // If there is a tie, get all winners.
        if (winner.length > 1) {
            winner.name = _.pluck(winner, 'name');
        }

        // Play applauses.
        ngAudio.play('applause');

        $scope.winner = winner;
    });
}]);
