class Source {
	constructor (sourceOptions) {
		Object.assign(this, sourceOptions); // WD: Object.assign
	}

	createDOMElement () {
		// ADD: not bad place for demonsatrationg destructuring. Yes, it's not the ideal place for it, but it could be used. 
		this.element = document.createElement('li');
		this.element.textContent = this.name;

		this.element.dataset.sourceId =  this.id;
		this.element.dataset.sourceName =  this.name;
		this.element.dataset.sourceImageSmall = this.urlsToLogos.small;
	}
}