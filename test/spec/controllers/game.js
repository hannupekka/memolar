'use strict';

describe('Controller: GameCtrl', function () {

  // load the controller's module
  beforeEach(module('memolar2App'));

  var GameCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('GameCtrl', {
      $scope: scope
    });
  }));

});
