import 'classlist-polyfill';

export class DecoratedSource {
	constructor (source) {
		this.element  = source.element;
	}
	
	setActive () {
		this.element.classList.add('star');
	}
}