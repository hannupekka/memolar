'use strict';

describe('Controller: TileCtrl', function () {

  // load the controller's module
  beforeEach(module('memolar2App'));

  var TileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TileCtrl = $controller('TileCtrl', {
      $scope: scope
    });
  }));
});
