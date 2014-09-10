'use strict';

// Mock audio element since PhantomJS does not support it.
var Audio = function() {
    this.addEventListener = function() {};
    return this;
};

describe('Controller: TileCtrl', function () {

  // load the controller's module
  beforeEach(module('memolar2App'));

  var TileCtrl,
    rootScope,
    timeout,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $timeout, $injector) {
    scope = $rootScope.$new();
    rootScope = $injector.get('$rootScope');
    spyOn(rootScope, '$broadcast');
    timeout = $timeout;
    TileCtrl = $controller('TileCtrl', {
      $scope: scope
    });
  }));

  it('should have properly initialized tiles', function() {
    scope.getTiles();
    expect(scope.tiles.length).toBe(scope.tileCount * 2);
  });

  it('should have matching tileCount and tilesLeft', function() {
    expect(scope.tileCount).toBe(scope.tilesLeft);
  });

  it('should select tile when clicked', function() {
    scope.getTiles();
    scope.select(0);
    expect(scope.tiles[0].state).toBe('selected');
  });

  it('should set matching tiles as found', function() {
    scope.getTiles(false);

    scope.select(0);
    expect(scope.picks.length).toBe(1);

    scope.select(1);
    expect(scope.picks.length).toBe(2);

    timeout.flush();

    expect(scope.tiles[0].state).toBe('found');
    expect(scope.tiles[1].state).toBe('found');
    expect(scope.picks.length).toBe(0);
  });

  it('should not set different tiles as found', function() {
    scope.getTiles(false);

    scope.select(0);
    expect(scope.picks.length).toBe(1);

    scope.select(2);
    expect(scope.picks.length).toBe(2);

    timeout.flush();

    expect(scope.tiles[0].state).not.toBe('found');
    expect(scope.tiles[2].state).not.toBe('found');
    expect(scope.picks.length).toBe(0);
  });

  it('should not change turn when matching tiles found', function() {
    scope.getTiles(false);

    scope.select(0);
    scope.select(1);

    timeout.flush();
    expect(rootScope.$broadcast).toHaveBeenCalledWith('endTurn', true);
  });

  it('should change turn when no matches are found', function() {
    scope.getTiles(false);

    scope.select(0);
    scope.select(2);

    timeout.flush();
    expect(rootScope.$broadcast).toHaveBeenCalledWith('endTurn', false);
  });

  it('should end game when no tiles are left', function() {
    scope.getTiles(false);
    for(var i = 0; i < scope.tileCount * 2; i++) {
        scope.select(i);
        i++;
        scope.select(i);
        timeout.flush();
    }
    expect(rootScope.$broadcast).toHaveBeenCalledWith('getWinner');
  });
});
