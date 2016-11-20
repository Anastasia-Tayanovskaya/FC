class Article {
	constructor (articleOptions) {
		Object.assign(this, articleOptions);
	}

	insertData() {
		const article = document.createElement('article'),
			articleLink = document.createElement('a'),
			titleElement = document.createElement('h2'),
			headerElement = document.createElement('header'),
			image = document.createElement('img'),
			articleAuthorWrapper = document.createElement('p'),
			descriptionElement = document.createElement('p'),
			publishedDateElement = document.createElement('span'),
			authorElement = document.createElement('span');
		
		
		articleLink.setAttribute('href', this.url);
		articleLink.setAttribute('target', '_blank');
		articleLink.classList.add('class', 'article-link');
		
		article.classList.add('news');
		article.appendChild(articleLink);
		
		headerElement.appendChild(titleElement);
		titleElement.classList.add('article-title');
		titleElement.textContent = this.title;
		
		authorElement.classList.add('article-author');
		authorElement.textContent = this.author || 'Unknown';
		
		articleAuthorWrapper.innerHTML = 'Written by ';
		articleAuthorWrapper.appendChild(authorElement);
		
		image.setAttribute('src', this.urlToImage);
		
		publishedDateElement.classList.add('article-published-date');
		publishedDateElement.textContent = new Date(this.publishedAt);
		
		descriptionElement.classList.add('article-description');
		descriptionElement.textContent = this.description;
		
		articleLink.appendChild(headerElement);
		articleLink.appendChild(articleAuthorWrapper);
		articleLink.appendChild(image);
		articleLink.appendChild(publishedDateElement);
		articleLink.appendChild(descriptionElement);
		
	return article;

	}
}