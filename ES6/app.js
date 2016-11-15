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
		navButtonElement = document.querySelector('.nav-button');
	

	navButtonElement.addEventListener('click', (event) => {
		event.preventDefault();
		sourceListElement.classList.toggle('visible');
	})	

	function onSourcesLoaded(sources) {
		let documentFragment = document.createDocumentFragment();

		sources.forEach(source => {
			let sourceObj = new Source(source);
			sourceObj.createDOMElement();
			documentFragment.appendChild(sourceObj.element);

			if (source.id === SOURCE_BY_DEFAULT) {
				sourceObj.element.classList.add('active');
			}
		})

		sourceListElement.appendChild(documentFragment);
		sourceListElement.addEventListener('click', function(event) {
			let target = event.target;
			if (target.tagName.toLowerCase() === 'li') {
				let activeListElement = sourceListElement.querySelector('li.active');
				activeListElement.classList.remove('active');

				target.classList.add('active');
				source = target.dataset.sourceId;
				articlesUrl = updateArticleUrl();
				Requester.getNewsList(articlesUrl, onNewsListLoaded, onNewsListError);

				this.classList.remove('visible');
			}
		})
	}

	function onNewsListLoaded(articles) {
		let	documentFragment = document.createDocumentFragment();

		newsListElement.innerHTML = '';

		articles.forEach(article => {
			let newsArticle = new Article(article);
			let articleWithData = newsArticle.insertDataIntoTemplate(articleTmplContent);
			documentFragment.appendChild(articleWithData);
		})

		newsListElement.appendChild(documentFragment);
	}

	function onNewsListError(message) {
		console.log(message);
	}

	Requester.getSourceList(SOURCE_URL, onSourcesLoaded);
	Requester.getNewsList(articlesUrl, onNewsListLoaded, onNewsListError);
})()


