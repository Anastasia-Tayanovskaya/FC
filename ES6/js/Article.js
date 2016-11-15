class Article { // WD: class
	constructor (articleOptions) {
		Object.assign(this, articleOptions);
	}

	insertDataIntoTemplate (tmplContent) {
		var articleLink = tmplContent.querySelector('.article-link'),
			titleElement = tmplContent.querySelector('h2'),
			image = tmplContent.querySelector('img'),
			descriptionElement = tmplContent.querySelector('.article-description'),
			publishedDateElement = tmplContent.querySelector('.article-published-date'),
			authorElement = tmplContent.querySelector('.article-author');


		articleLink.setAttribute('href', this.url);
		titleElement.textContent = this.title;

		image.setAttribute('src', this.urlToImage);
		descriptionElement.textContent = this.description;
		publishedDateElement.textContent = new Date(this.publishedAt);

		authorElement.textContent = this.author || 'Unknown';

		return document.importNode(tmplContent, true);
	}
}