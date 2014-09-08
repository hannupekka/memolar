'use strict';

describe('Controller: GameCtrl', function () {

  // load the controller's module
  beforeEach(module('memolar2App'));

  var GameCtrl,
    rootScope,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    rootScope = $injector.get('$rootScope');
    spyOn(rootScope, '$broadcast');
    GameCtrl = $controller('GameCtrl', {
      $scope: scope
    });
  }));

  describe('Initial values', function() {
      it('should not be running', function () {
        expect(scope.running).toBe(false);
      });

      it('should be on round 1', function() {
        expect(scope.round).toBe(1);
      });

      it('should not have winner', function() {
        expect(scope.winner.length).toBe(0);
      });
  });

  describe('Try running game', function() {
    it('should start', function() {
        scope.startGame();
        expect(rootScope.$broadcast).toHaveBeenCalledWith('startGame', undefined);
    });
  });
});
