import 'babel-polyfill';
import 'whatwg-fetch';

export class Requester  {
	contructor () {
		this.init = { method: 'GET', mode: 'cors' };
	}
	
	getResponseFromUrl(sourceUrl) {
		const request = new Request(sourceUrl);
		return fetch(request, this.init)
				.then(response => response.json());
	}
}