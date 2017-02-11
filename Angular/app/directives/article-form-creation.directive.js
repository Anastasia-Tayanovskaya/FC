angular
.module('angularWorkshop.article-form-creation', [])
.directive('minLength', function(){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl){
			ctrl.$parsers.unshift(function(value) {
				if(value){
					var valid = value.length >= 20;
					ctrl.$setValidity('invalidMinLength', valid);
				}
				return valid ? value : undefined;
			});
		}
	}
})
.directive('articleForm', function() {
  return {
	scope: {
		onChange: '&'
	},
    templateUrl: '../templates/article-form.template.html',
	controller: [
		'$scope', '$window', '$routeParams', 'ArticleService',
		function articleFormController($scope, $window, $routeParams, ArticleService) {
			let isUpdateForm = !!$routeParams.articleId;
			
			$scope.titleName  = isUpdateForm ? 'Update article' : 'Add new article';
			$scope.selectedFile = [];

			if ($routeParams.articleId) {
				ArticleService.getArticleById($routeParams.articleId).then((article) => {
					$scope.id = $routeParams.articleId;
					$scope.title = article.title;
					$scope.author = article.author;
					$scope.description = article.description;
					$scope.url = article.url;
				});
				
			}

		$scope.updateArticle = function(file) {
			let upload = ArticleService.updateArticle(file, {
				id: $scope.id,
				title: $scope.title,
				author: $scope.author,
				description: $scope.description,
				url: $scope.url
			});

			upload.then(function (response) {
				$window.location.href = '#!/articles';
			}, function (response) {
			if (response.status > 0)
				$scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
			});
		}


		$scope.saveArticle = function(file) {
			let upload = ArticleService.saveArticle(file, {
				title: $scope.title,
				author: $scope.author,
				description: $scope.description,
				url: $scope.url
			});

			upload.then(function (response) {
				$window.location.href = '#!/articles';
			}, function (response) {
			if (response.status > 0)
				$scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
			});
		}
    }]

	
  };
});