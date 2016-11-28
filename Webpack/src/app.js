import 'babel-polyfill';
import 'classlist-polyfill';
import templatePolyfill from 'template-polyfill';

// Import styles
import './styl/styles.styl';

import './text.json';

	const SOURCE_URL = 'https://newsapi.org/v1/sources';
	const SOURCE_BY_DEFAULT = 'bbc-news';
	const API_KEY = '2fabd738608345058dedf508d3c9b9ab';
	
	templatePolyfill();
	
	const worldImg = document.createElement('img');
	worldImg.src = require('./assets/world.png');
	
	document.body.insertBefore(worldImg,document.body.childNodes[0]);
	
	document.querySelector('button').addEventListener('click', () => {
		require(['./js/Article', './js/Source', './js/Requester'], function(articleModule, sourceModule, requesterModule) {
			
			const updateArticleUrl = () => {
				return `https:\/\/newsapi.org\/v1\/articles?source=${newsSource}&apiKey=${API_KEY}`;
			}
		
			const Article = articleModule.Article;
			const Requester = requesterModule.Requester;
			const Source  = sourceModule.Source;
			
			
			const wrapper = document.querySelector('.wrapper'),
				newsListElement = document.querySelector('.news-list'),
				sourceListElement = document.querySelector('.source-list'),
				articleTmplContent = document.querySelector('#SingleArticle').content,
				navButtonElement = document.querySelector('.nav-button'),
				requester = new Requester();
				
			let newsSource = SOURCE_BY_DEFAULT,
				articlesUrl = updateArticleUrl();
			
			navButtonElement.addEventListener('click', event => {
				event.preventDefault();
				sourceListElement.classList.toggle('visible');
			})	

			function onSourcesLoaded(response) {
				let documentFragment = document.createDocumentFragment(),
					sources = response.sources;

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
						newsSource = target.dataset.sourceId;
						articlesUrl = updateArticleUrl();
						requester.getResponseFromUrl(articlesUrl).then(onNewsListLoaded, onError);

						this.classList.remove('visible');
					}
				})
			}

			function onNewsListLoaded(response) {
				let	documentFragment = document.createDocumentFragment(),
					articles = response.articles;

				newsListElement.innerHTML = '';

				articles.forEach(article => {
					let newsArticle = new Article(article);
					let articleWithData = newsArticle.insertDataIntoTemplate(articleTmplContent);
					documentFragment.appendChild(articleWithData);
				})

				newsListElement.appendChild(documentFragment);
			}

			function onError(message) {
				console.log(message);
			}
			
			const sourcePromise = requester.getResponseFromUrl(SOURCE_URL);
			const articlePromise = requester.getResponseFromUrl(articlesUrl);
			
			sourcePromise.then(onSourcesLoaded, onError);
			articlePromise.then(onNewsListLoaded, onError);
			Promise.all([sourcePromise, articlePromise]).then(() => {	
				wrapper.classList.remove('invisible');
				document.querySelector('.get-news-btn').classList.add('invisible');
			});
		});
	})