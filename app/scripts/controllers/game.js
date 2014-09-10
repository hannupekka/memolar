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

    // Sounds
    $scope.soundApplause = ngAudio.load('sounds/Auditorium-Applause-SoundBible.com-280911206.mp3');

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
        $scope.soundApplause.stop();
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
        $scope.soundApplause.play();

        $scope.winner = winner;
    });
}]);
