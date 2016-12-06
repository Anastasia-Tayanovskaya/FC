import 'classlist-polyfill';

export class Source {
	constructor (sourceOptions) {
		Object.assign(this, sourceOptions);
	}

	createDOMElement () {
		let {id: sourceId, name: sourceName, urlsToLogos: {small: sourceImageSmall}} = this;
		
		this.element = document.createElement('li');
		this.element.textContent = sourceName;		
		this.element.dataset.sourceId =  sourceId;
		this.element.dataset.sourceName =  sourceName;
		this.element.dataset.sourceImageSmall = sourceImageSmall;
		
	}
	
	setActive () {
		this.element.classList.add('active');
	}
}