angular
	.module('angularWorkshop.pagination', [])
	.component('pagination', {
		bindings: {
			itemLength: '<',
			itemsPerPage: '<',
			 onSetRange: '&'
		},
		templateUrl: 'components/pagination/pagination.template.html',
		controller: [function paginationController() {
			let self = this;
			let currentPage; 

			self.updateCurrentPageNumber = (event) => {
				event.preventDefault();
				let targetLink;
				if (event.target.tagName.toLowerCase() !== 'a') {
					targetLink = angular.element(event.target.querySelector('a'))[0];
				}
				else {
					targetLink = event.target;
				}
				currentPage = targetLink.attributes['data-number'].value;
				self.onSetRange({page: currentPage});
			}
    
			self.$onChanges = (changesObj) => {
				if (!this.itemLength) { return; }
				self.pagesAmount = Math.ceil(this.itemLength / this.itemsPerPage);
				self.arrayOfPageNumbers = new Array(self.pagesAmount);
			}
		}]
	})