let Requester = (function(){  // NOTE: why let? should be const. 
	'use strict'; 

	let init = { method: 'GET', mode: 'cors' },
		requester = {
		getNewsList(sourceUrl, callback, callbackError) { // WD: shorter method definitions
			var request = new Request(sourceUrl);
			//ADD:  this method could return return promise instead of getting callback as parametr
			// so in app js you will have :
			// Requester.getNewsList(articlesUrl).then(onNewsListLoaded, onNewsListError);
			// what gives you a bit more flexebility
			fetch(request, init)
				.then(response => response.json())
				.then(response => {
					if (response.status === 'error') {
						callbackError(response.message);
						return;
					}
					callback(response.articles);

				})
				.catch(err => {
					console.log(err);
				});
		},

		getSourceList(sourceUrl, callback) {
			var request = new Request(sourceUrl);
		
			fetch(request, init)
				.then(response => response.json())
				.then(response => {
					callback(response.sources);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}

	return requester;
})();
