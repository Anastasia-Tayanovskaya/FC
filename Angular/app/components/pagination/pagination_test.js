'use strict';

describe('angularWorkshop.pagination module', function() {

  let $componentController;
	let suite = {}, element, scope, $compile, $rootScope;

	module.sharedInjector();

	beforeAll(module('angularWorkshop'));
  	beforeAll(module('angularWorkshop.pagination'));


	beforeAll(inject(function(_$componentController_, _$rootScope_, _$compile_, $templateCache) {
		suite.$componentController = _$componentController_;
		suite.bindings = {onSetRange: function(){}, itemLength: 20, itemsPerPage: 3};
		$compile = _$compile_;
		$rootScope = _$rootScope_;

		scope = $rootScope.$new();

		spyOn(suite.bindings, 'onSetRange');
	}));

	afterAll(function(){
		suite = null;
	});

	it('should calculate page amount in pagination', function() {
		let controller = suite.$componentController('pagination', null, suite.bindings);
		controller.$onChanges({});
		expect(controller.pagesAmount).toBe(7);
	});

	it('should create the array', function() {
		let controller = suite.$componentController('pagination', null, suite.bindings);
		controller.$onChanges({});
		expect(controller.arrayOfPageNumbers.length).toEqual(7);
	});
});
