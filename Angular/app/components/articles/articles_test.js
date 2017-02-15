'use strict';

let stubResponse = {
	"_id":"5856a3ae734d1d400d101ba4","title":"Updated 3: Queen's 90th birthday portrait released","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies accumsan leo. Donec ultrices, odio eu pharetra accumsan, enim sapien auctor turpis, id tristique est turpis ac velit. Cras suscipit urna ac varius sollicitudin. Donec pellentesque nisi vel aliquam condimentum. Vestibulum congue felis lorem, eget tincidunt nibh pellentesque a. Ut nec nisl leo. Donec sodales, ligula id porta cursus, metus velit iaculis elit, et tincidunt leo metus non neque.","url":"http://www.bbc.co.uk/news/uk-38354407","urlToImage":"uploads/no_image.png","sourceId":"bbc-news","tags":["Queen","Britain","birthday"],"publishedAt":"2016-12-18T13:02:04.000Z","author":"BBC News 2"
};

describe('angularWorkshop.articleList module', function() {

  let $componentController;
	let suite = {};

	module.sharedInjector();

	beforeAll(module('angularWorkshop'));
	beforeAll(module('ngFileUpload'));
  beforeAll(module('angularWorkshop.articleList'));
	beforeAll(inject(function(_$componentController_) {
    suite.$componentController = _$componentController_;
  }));

	afterAll(function(){
		suite = null;
	});

	it('should retrieve correct length of article range', function() {
		let listToShow, 
			controller = suite.$componentController('articleList', 
			{'$http': {}, 
			 '$window': {}, 
			 'ArticleService': {
				 getArticleList: () => Promise.resolve(stubResponse)
			}, 'PaginationService': {
				getArticleRange: () => {
					return [stubResponse]
				}
			}});
			controller.getItemsPerPage = () => {
				return 3;
			}

			listToShow = controller.setArticleRange();
			expect(listToShow.length).toBe(1);
	});
});