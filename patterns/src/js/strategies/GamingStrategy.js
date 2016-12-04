export default class GamingStrategy {
	constructor () {
		this.category = 'gaming';
	}
	
	setTopNews(sourceList) {
		let that = this;

		let c = sourceList.filter(function(element){
			return element.category === that.category;
		});
		
		let d = sourceList.filter(function(element){
			return element.category !== that.category;
		});
		
		return c.concat(d);
	}
	
}