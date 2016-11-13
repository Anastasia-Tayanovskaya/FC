let Requester = (function(){
	'use strict'; 

	let init = { method: 'GET', mode: 'cors' },
		requester = {
		getNewsList(sourceUrl, callback, callbackError) {
			var request = new Request(sourceUrl);

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
