class Requester  {
	contructor () {
		this.init = { method: 'GET', mode: 'cors' };
	}
	
	getResponseFromUrl(sourceUrl) {
		let request = new Request(sourceUrl);
		return fetch(request, this.init)
					.then(response => response.json());
	}
}