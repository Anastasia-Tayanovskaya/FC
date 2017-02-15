'use strict';

describe('angularWorkshop.pagination module', function() {

	let suite = {}, $compile;

	module.sharedInjector();

	beforeAll(module('angularWorkshop'));
  	beforeAll(module('angularWorkshop.pagination'));


	beforeAll(inject(function(_$componentController_, _$rootScope_, _$compile_) {
		suite.$componentController = _$componentController_;
		suite.bindings = {onSetRange: function(){}, itemLength: 20, itemsPerPage: 3};
		$compile = _$compile_;
		suite.scope = _$rootScope_.$new();
		suite.link = _$compile_('<a href="#" data-number="1">2</a>')(suite.scope);
		suite.li = _$compile_('<li><a href="#" data-number="1">2</a></li>')(suite.scope);

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

	it('should update current page number clicking by link', function() {
		
		let controller = suite.$componentController('pagination', null, suite.bindings),
			event = {
				preventDefault: function() {},
				target: suite.link[0]
			};
		controller.updateCurrentPageNumber(event);
		expect(suite.bindings.onSetRange).toHaveBeenCalled();
		expect(suite.bindings.onSetRange).toHaveBeenCalledWith({page: '1'});
	})

	it('should update current page number clicking by link', function() {
		
		let controller = suite.$componentController('pagination', null, suite.bindings),
			event = {
				preventDefault: function() {},
				target: suite.li[0]
			};
		controller.updateCurrentPageNumber(event);
		expect(suite.bindings.onSetRange).toHaveBeenCalled();
	})
});
