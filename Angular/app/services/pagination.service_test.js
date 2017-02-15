'use strict';

describe('angularWorkshop pagination service', function() {

	let stubArticleList = [{
		"_id":"5856a3ae734d1d400d101ba4","title":"Updated 3: Queen's 90th birthday portrait released","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies accumsan leo. Donec ultrices, odio eu pharetra accumsan, enim sapien auctor turpis, id tristique est turpis ac velit. Cras suscipit urna ac varius sollicitudin. Donec pellentesque nisi vel aliquam condimentum. Vestibulum congue felis lorem, eget tincidunt nibh pellentesque a. Ut nec nisl leo. Donec sodales, ligula id porta cursus, metus velit iaculis elit, et tincidunt leo metus non neque.","url":"http://www.bbc.co.uk/news/uk-38354407","urlToImage":"uploads/no_image.png","sourceId":"bbc-news","tags":["Queen","Britain","birthday"],"publishedAt":"2016-12-18T13:02:04.000Z","author":"BBC News 2"
	}, 
	{
		"_id":"5856a3ae734d1d400d101ba5","title":"Updated 3: Queen's 90th birthday portrait released","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies accumsan leo. Donec ultrices, odio eu pharetra accumsan, enim sapien auctor turpis, id tristique est turpis ac velit. Cras suscipit urna ac varius sollicitudin. Donec pellentesque nisi vel aliquam condimentum. Vestibulum congue felis lorem, eget tincidunt nibh pellentesque a. Ut nec nisl leo. Donec sodales, ligula id porta cursus, metus velit iaculis elit, et tincidunt leo metus non neque.","url":"http://www.bbc.co.uk/news/uk-38354407","urlToImage":"uploads/no_image.png","sourceId":"bbc-news","tags":["Queen","Britain","birthday"],"publishedAt":"2016-12-18T13:02:04.000Z","author":"BBC News 2"
	},
	{
		"_id":"5856a3ae734d1d400d101ba6","title":"Updated 3: Queen's 90th birthday portrait released","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies accumsan leo. Donec ultrices, odio eu pharetra accumsan, enim sapien auctor turpis, id tristique est turpis ac velit. Cras suscipit urna ac varius sollicitudin. Donec pellentesque nisi vel aliquam condimentum. Vestibulum congue felis lorem, eget tincidunt nibh pellentesque a. Ut nec nisl leo. Donec sodales, ligula id porta cursus, metus velit iaculis elit, et tincidunt leo metus non neque.","url":"http://www.bbc.co.uk/news/uk-38354407","urlToImage":"uploads/no_image.png","sourceId":"bbc-news","tags":["Queen","Britain","birthday"],"publishedAt":"2016-12-18T13:02:04.000Z","author":"BBC News 2"
	}];

	module.sharedInjector();

	beforeAll(module('angularWorkshop'));

	let paginationService;

	beforeEach(inject(function (PaginationService) {
	  	paginationService = PaginationService;
	}));

	it('should create an array of object', function () {
		var result = paginationService.getArticleRange(stubArticleList, 0, 3);
		expect(result.length).toBe(3);
		expect(result[0]._id).toEqual('5856a3ae734d1d400d101ba4');
	});
});