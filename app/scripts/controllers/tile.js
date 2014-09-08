'use strict';

/**
 * Model for game tiles.
 * @param {number} glyph Index of tileGlyphs, containing glyph class.
 */
var Tile = function(glyph) {
    this.glyph = glyph;
    this.state = 'default'; // default | selected | found

    return this;
};

/**
 * @ngdoc function
 * @name memolar2App.controller:TileCtrl
 * @description
 * # TileCtrl
 * Controller of the memolar2App
 */
angular.module('memolar2App')
.controller('TileCtrl', ['$scope', '$rootScope', '$timeout', '_', function ($scope, $rootScope, $timeout, _) {
    var tileGlyphs = [
            'euro', 'cloud', 'envelope', 'glass', 'music',
            'heart', 'star', 'home', 'time', 'camera',
            'tint', 'fire', 'wrench', 'cutlery', 'bell',
            'globe', 'flag', 'search', 'asterisk', 'user',
            'lock', 'headphones', 'picture', 'plane', 'thumbs-up',
            'eye-open', 'paperclip', 'usd', 'earphone', 'tower'
        ];

    $scope.tileCount = 30;
    $scope.tilesLeft = $scope.tileCount;
    $scope.picks = [];

    /**
     * Changes tiles state after given delay
     * @param  {string} state Tiles new state.
     * @param  {number} delay Delay for state change.
     * @return {promise} Promise from $timeout
     */
    $scope.getPromise = function(state, delay) {
        return $timeout(function() {
                // Iterate over tiles chosen by player and change their
                // states after given delay.
                _.map($scope.picks, function(pick) {
                    $scope.tiles[pick.index].state = state;
                });
            }, delay);
    };

    $scope.tiles = [];

    /**
     * Generates tiles and shuffles them.
     */
    $scope.getTiles = function(shuffle) {

        // Clear tiles.
        $scope.tiles = [];

        for(var i = 1; i <= $scope.tileCount; i++) {
            var glyph = tileGlyphs[i-1];
            $scope.tiles.push(new Tile(glyph));
            $scope.tiles.push(new Tile(glyph));
        }

        // Shuffle tiles.
        if (shuffle) { $scope.tiles = _.shuffle($scope.tiles); }
    };

    /**
     * Changes tile state to 'selected' and if two tiles are selected in this
     * turn, performs checks to see if tiles match.
     * @param {number} index Selected tile, 0-based.
     */
    $scope.select = function(index) {
        // Prevent picks while waiting for promises getting executed.
        // Also prevent picking already found tiles during CSS transitions.
        if ($scope.picks.length === 2 || $scope.tiles[index].state === 'found') {
            return false;
        }

        // Get glyph from selected tile, for comparison.
        var glyph = $scope.tiles[index].glyph;

        // Make sure that same tile can't be picked twice on double clicks.
        var pick = {'index': index, 'glyph': glyph};
        if (_.where($scope.picks, {index: index}).length > 0) {
            return false;
        }

        // Push selected index and glyph for turn picks.
        $scope.picks.push(pick);

        // This tile is now 'selected'.
        $scope.tiles[index].state = 'selected';

        // Current turn is over if there's two tiles selected.
        if ($scope.picks.length === 2) {
            // Get promise from $timeout.
            //
            // If picks -array contains two
            // objects that has same glyph as the tile currently picked,
            // that means tiles match and they should be marked as 'found'.
            //
            // If not, change tiles back to default.
            var match = _.where($scope.picks, {glyph: glyph}).length === 2;
            var promise = match ?
                $scope.getPromise('found', 0) :
                $scope.getPromise('default', 2000);
            // Since we can't reset picks before $timeout has been resolved,
            // do cleanup with promise.
            promise.then(function() {
                // Reset picks.
                $scope.picks = [];

                // Broadcast 'endTurn'-event for PlayerCtrl.
                $rootScope.$broadcast('endTurn', match);

                // Reduce tile count if picks match.
                if (match) { $scope.tilesLeft--; }

                // Check if game should end.
                if ($scope.tilesLeft > 0) {
                    // Notify GameCtrl about new round.
                    $scope.$emit('nextRound');
                } else {
                    // Emit 'getWinner'-event for PlayerCtrl
                    $rootScope.$broadcast('getWinner');
                }
            });
        }
    };

    // Listen for 'startGame'-events from GameCtrl.
    $scope.$on('startGame', function(event, tiles) {
        // If  user has defined pair count, use it.
        if (tiles !== undefined) {
            $scope.tileCount = tiles;
        }

        // Reset tiles left.
        $scope.tilesLeft = $scope.tileCount;

        // Get tiles.
        $scope.getTiles(true);
    });
}]);
