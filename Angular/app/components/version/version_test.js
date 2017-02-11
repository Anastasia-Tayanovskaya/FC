'use strict';

describe('angularWorkshop.version module', function() {
  beforeEach(module('angularWorkshop.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
