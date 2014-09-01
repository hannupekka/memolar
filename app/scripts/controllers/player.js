'use strict';

/**
 * Model for players
 * @param {string} name Player name.
 * @param {number} score Player score.
 * @param {boolean} active Is player active.
 */
var Player = function(name, score) {
    this.name = name || '';
    this.score = score || 0;
    this.active = false;

    return this;
};

/**
 * @ngdoc function
 * @name memolar2App.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the memolar2App
 */
angular.module('memolar2App')
.controller('PlayerCtrl', ['$scope', '$rootScope', '$timeout', '_', function ($scope, $rootScope, $timeout, _) {
    /**
     * Returns the index of currently active player.
     * @return {number} Index of active player.
     */
    var getPlayer = function() {
        return _.findIndex($scope.players, function(player) {
            return player.active;
        });
    };

    // Add one player by default.
    $scope.players = [new Player('')];

    // Sort players by score, descending.
    $scope.sort = '-score';

    /**
     * Adds new player.
     */
    $scope.addPlayer = function() {
        $scope.players.push(new Player(''));
    };

    /**
     * Removes player based on index.
     * @param {number} index Index from where to remove player.
     */
    $scope.removePlayer = function(index) {
        $scope.players.splice(index, 1);
    };

    // Listen for 'startGame'-events from GameCtrl.
    $scope.$on('startGame', function() {
        // Remove players with empty names.
        _.remove($scope.players, function(player) {
            return player.name === '';
        });

        // Reset player data.
        _.map($scope.players, function(player) {
            player.score = 0;
            player.active = false;
        });

        // Set 1st player active.
        $scope.players[0].active = true;
    });

    // Listen for 'endTurn'-events from TileCtrl.
    $scope.$on('endTurn', function(event, match) {
        // Player found matching tiles.
        if (match) {
            $scope.players[getPlayer()].score++;
        }
        // No match, next player up.
        else {
            // Get current player and set it inactive.
            var currentPlayer = getPlayer();
            $scope.players[currentPlayer].active = false;

            // Last players index.
            var lastPlayer = $scope.players.length - 1;

            // Check if there is players left or shoud we start from beginning.
            var nextPlayer = currentPlayer === lastPlayer ? 0 : currentPlayer + 1;

            // Set next player active.
            $scope.players[nextPlayer].active = true;
        }
    });

    // Listen for 'getWinner'-events from TileCtrl.
    $scope.$on('getWinner', function() {
        // Get winning score.
        var maxScore = _.max($scope.players, 'score').score;

        // Get all players with winning score, in case there is a tie.
        var winners = _.where($scope.players, {'score': maxScore});

        // Emit 'endGame'-event for GameCtrl.
        $timeout(function() {
            $scope.$emit('endGame', winners);
        }, 1000);
    });
}]);
