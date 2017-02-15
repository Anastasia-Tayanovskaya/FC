describe('min-length directive', function() {
	
	let suite = {};

	
	module.sharedInjector();

  	beforeAll(module('angularWorkshop'));

  	beforeAll(inject(function(_$compile_, _$rootScope_) {
		let textarea;
		suite.scope = _$rootScope_.$new();
    	textarea = _$compile_('<textarea name="description" ng-model="description" min-length></textarea>')(suite.scope);
    	suite.ngModel = textarea.controller('ngModel');
	}));

  	afterAll(function(){
		suite = null;
	});


  	it('should validate the minimum length of field', function () {
    	suite.scope.description = 'Lorem ipsum';
    	suite.scope.$apply();
    	expect(suite.ngModel.$error.invalidMinLength).toEqual(undefined);

    	suite.scope.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    	suite.scope.$apply();
    	expect(suite.ngModel.$error.invalidMinLength).toBeFalsy();

		suite.scope.description = '';
    	suite.scope.$apply();
    	expect(suite.ngModel.$error.invalidMinLength).toEqual(undefined);
  	});
});