//angular.module('myApp', [])
module.factory('ArticleService', [ '$http', 'Upload', function($http, Upload) {
		let articles;

		const ARTICLE_URL = 'http://localhost:3005/api/articles';
	
		return {
			getArticleList: () => {
				return $http.get(ARTICLE_URL).then((response) => {
					articles = response.data;
					return response.data;
				});
			},

			saveArticle: (file, article) => {
				return Upload.upload({
					url: ARTICLE_URL,
					arrayKey: '',
					data: {
						file: file,
						title: article.title,
						author: article.author,
						description: article.description,
						url: article.url
					}
				})
			},

			updateArticle: (file, article) => {
				return Upload.upload({
					url: ARTICLE_URL + '/' + article.id,
					arrayKey: '',
					method: 'PUT',
					data: {
						file: file,
						title: article.title,
						author: article.author,
						description: article.description,
						url: article.url
					}
				})
			},

			getArticleById: (id) => {
				if (articles && articles.length) {
					
					let promise = new Promise((resolve) => {
						for (let i = 0, len = articles.length; i < len; i++) {
							if (articles[i]._id === id) {
								 resolve(articles[i]);
								 break;
							}
						}
					})
					return promise;
				}
				else {
					return $http.get(ARTICLE_URL + '/' + id).then((response) => {
						return response.data;
					})
				}
			}
		};
	}]);