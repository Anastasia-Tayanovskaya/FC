export default class TopNewsCategory{
	constructor(category){
		this.category = category;
	}
	setTopNews(sourceList) {

		let c = sourceList.filter(element => {
			return element.category === this.category;
		});
		
		let d = sourceList.filter(element => {
			return element.category !== this.category;
		});
		
		return c.concat(d);
	}
}