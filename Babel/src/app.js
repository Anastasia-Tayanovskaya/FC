(function(){
'use strict';

	const SOURCE_URL = 'https://newsapi.org/v1/sources';
	const SOURCE_BY_DEFAULT = 'bbc-news';
	const API_KEY = '2fabd738608345058dedf508d3c9b9ab';

	const updateArticleUrl = () => {
		return `https:\/\/newsapi.org\/v1\/articles?source=${source}&apiKey=${API_KEY}`;
	}

	let newsListElement = document.querySelector('.news-list'),
		sourceListElement = document.querySelector('.source-list'),
		source = SOURCE_BY_DEFAULT,
		articlesUrl = updateArticleUrl(),
		articleTmplContent = document.querySelector('#SingleArticle').content,
		navButtonElement = document.querySelector('.nav-button'),
		requester = new Requester();

	navButtonElement.addEventListener('click', event => {
		event.preventDefault();
		sourceListElement.classList.toggle('visible');
	})	

	function onSourcesLoaded(response) {
		const documentFragment = document.createDocumentFragment(),
			sources = response.sources;

		sources.forEach(source => {
			const sourceObj = new Source(source);
			sourceObj.createDOMElement();
			documentFragment.appendChild(sourceObj.element);

			if (source.id === SOURCE_BY_DEFAULT) {
				sourceObj.element.classList.add('active');
			}
		})

		sourceListElement.appendChild(documentFragment);
		sourceListElement.addEventListener('click', function(event) {
			const target = event.target;
			if (target.tagName.toLowerCase() === 'li') {
				const activeListElement = sourceListElement.querySelector('li.active');
				activeListElement.classList.remove('active');

				target.classList.add('active');
				source = target.getAttribute('data-source-id');
				articlesUrl = updateArticleUrl();
				requester.getResponseFromUrl(articlesUrl).then(onNewsListLoaded, onError);

				this.classList.remove('visible');
			}
		})
	}

	function onNewsListLoaded(response) {
		const	documentFragment = document.createDocumentFragment(),
			articles = response.articles;

		newsListElement.innerHTML = '';

		articles.forEach(article => {
			let newsArticle = new Article(article);
			let articleWithData = newsArticle.insertData();
			documentFragment.appendChild(articleWithData);
		})

		newsListElement.appendChild(documentFragment);
	}

	function onError(message) {
		console.log(message);
	}
	
	requester.getResponseFromUrl(SOURCE_URL).then(onSourcesLoaded, onError);
	requester.getResponseFromUrl(articlesUrl).then(onNewsListLoaded, onError);
})()


