angular.
  module('angularWorkshop.articleList', ['angularWorkshop.article-form-creation', 'angularWorkshop.pagination'])
  .component('articleList', {
    templateUrl: 'components/articles/articles.template.html',
    controller: ['$http', '$window', 'ArticleService', 'PaginationService', function ArticleListController($http, $window, ArticleService, PaginationService) {
			let self = this,
				currentPageNumber,
				formWrapper = angular.element(document.querySelector('.form-wrapper')),
				itemsPerPage = parseInt(angular.element(document.querySelector('pagination'))[0].attributes['items-per-page'].value);

			self.showForm = () => {
				$window.location.href = '#!/article/add';
			}

			self.setArticleRange = () => {
				self.articlesToShow = PaginationService.getArticleRange(self.articles, currentPageNumber, itemsPerPage);
			}

			self.setRange = (pageNumber) => {
				currentPageNumber = pageNumber;
				self.setArticleRange();
			}

			self.onArticlesRefresh = () => {
				ArticleService.getArticleList()
					.then(response => {
						self.articles = response;
						self.setArticleRange();
					})
			}

			self.onArticlesRefresh();
    }]
  });