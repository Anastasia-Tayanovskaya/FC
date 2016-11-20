class Source {
	constructor (sourceOptions) {
		Object.assign(this, sourceOptions);
	}

	createDOMElement () {
		let {id: sourceId, name: sourceName, urlsToLogos: {small: sourceImageSmall}} = this;
		
		this.element = document.createElement('li');
		this.element.textContent = sourceName;
		
		this.element.setAttribute('data-source-id', sourceId);
		this.element.setAttribute('data-source-name', sourceName);
		this.element.setAttribute('data-source-image', sourceImageSmall);
		
	}
}