angular.module('angularWorkshop').factory('PaginationService', [ function() {
	let currentPageNumber = 0;

	let getArticleRange = (list, pageNumber, itemsPerPage) => {
		if (pageNumber !== undefined) {
			currentPageNumber = pageNumber;
		}

		let startIndex = currentPageNumber * itemsPerPage,
			lastIndex = currentPageNumber * itemsPerPage + itemsPerPage;
		
		return list.filter((el, index) => (index >= startIndex && index < lastIndex));
	};

	return {
		currentPageNumber,
		getArticleRange
	}
}]);