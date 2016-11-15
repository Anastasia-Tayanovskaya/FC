(function(){
	'use strict';

	const SOURCE_URL = 'https://newsapi.org/v1/sources';
	const SOURCE_BY_DEFAULT = 'bbc-news';
	const API_KEY = '2fabd738608345058dedf508d3c9b9ab';


	var newsListElement = document.querySelector('.news-list'), // NOTE: please use let or const 
		sourceListElement = document.querySelector('.source-list'),
		source = SOURCE_BY_DEFAULT,
		articlesUrl = updateArticleUrl(),
		articleTmplContent = document.querySelector('#SingleArticle').content;
			

	function updateArticleUrl(){ // NOTE: could be defined as arrow function ( const updateArticleUrl = () => { ... })
		return `https:\/\/newsapi.org\/v1\/articles?source=${source}&apiKey=${API_KEY}`; // WD: Template literals
	}

	function onSourcesLoaded(sources) {
		var documentFragment = document.createDocumentFragment();

		for (let source of sources) { // ADD: why don't you use array methods (map, forEach)   
			let sourceObj = new Source(source);
			sourceObj.createDOMElement();
			documentFragment.appendChild(sourceObj.element);

			if (source.id === SOURCE_BY_DEFAULT) {
				sourceObj.element.classList.add('active');
			}
		}

		sourceListElement.appendChild(documentFragment);
		sourceListElement.addEventListener('click', event => { // WD: Arrow func
			var target = event.target; // NOTE: let or const
			if (target.tagName.toLowerCase() === 'li') {
				let activeListElement = sourceListElement.querySelector('li.active');
				activeListElement.classList.remove('active');

				target.classList.add('active');
				source = target.dataset.sourceId;
				articlesUrl = updateArticleUrl();
				Requester.getNewsList(articlesUrl, onNewsListLoaded, onNewsListError);
			}
		})
	}

	function onNewsListLoaded(articles) {
		var	documentFragment = document.createDocumentFragment();

		newsListElement.innerHTML = '';

		for (let article of articles) {
			let newsArticle = new Article(article);
			let articleWithData = newsArticle.insertDataIntoTemplate(articleTmplContent);
			documentFragment.appendChild(articleWithData);
		}

		newsListElement.appendChild(documentFragment);
	}

	function onNewsListError(message) {
		console.log(message);
	}

	Requester.getSourceList(SOURCE_URL, onSourcesLoaded);
	Requester.getNewsList(articlesUrl, onNewsListLoaded, onNewsListError);
})()


