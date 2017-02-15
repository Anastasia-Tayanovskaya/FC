angular.
  module('angularWorkshop.articleList', ['angularWorkshop.article-form-creation', 'angularWorkshop.pagination'])
  .component('articleList', {
    templateUrl: 'components/articles/articles.template.html',
    controller: ['$http', '$window', 'ArticleService', 'PaginationService', function ArticleListController($http, $window, ArticleService, PaginationService) {
			let self = this,
				itemsPerPage, currentPageNumber;
				
		  self.getItemsPerPage = function() {
				if (itemsPerPage === undefined) {
					itemsPerPage = parseInt(angular.element(document.querySelector('pagination'))[0].attributes['items-per-page'].value);
				}

				return itemsPerPage;
			}

			self.showForm = () => {
				$window.location.href = '#!/article/add';
			}

			self.setArticleRange = () => {
				 return PaginationService.getArticleRange(self.articles, currentPageNumber, self.getItemsPerPage());
			}

			self.setRange = (pageNumber) => {
				currentPageNumber = pageNumber;
				self.articlesToShow = self.setArticleRange();
			}

			self.onArticlesRefresh = () => {
				ArticleService.getArticleList()
					.then(response => {
						self.articles = response;
						self.articlesToShow = self.setArticleRange();
					})
			}

			self.onArticlesRefresh();
    }]
  });