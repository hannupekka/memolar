'use strict';

describe('Controller: PlayerCtrl', function () {

  // load the controller's module
  beforeEach(module('memolar2App'));

  var PlayerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlayerCtrl = $controller('PlayerCtrl', {
      $scope: scope
    });
  }));

  it('should have one player with no name', function() {
    expect(scope.players.length).toBe(1);
    expect(scope.players[0].name).toBe('');
  });

  it('should have two players after addPlayer', function() {
    scope.addPlayer();
    expect(scope.players.length).toBe(2);
  });

  it('should have no players after removePlayer', function() {
    scope.removePlayer(0);
    expect(scope.players.length).toBe(0);
  });
});
