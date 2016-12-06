module.exports = function(source) {

	function deleteNumericValues(obj) {
		for (let property in obj) {
			if (obj.hasOwnProperty(property)) {
				if (typeof obj[property] == "object") {
					deleteNumericValues(obj[property]);
				}
				else {
					if (isFinite(obj[property]) && !isNaN(obj[property])) {
						delete obj[property];
					};
				}
			}
		}
	}

	this.cacheable && this.cacheable();
	let jsonObj = typeof source === "string" ? JSON.parse(source) : source;
	deleteNumericValues(jsonObj);
	return "module.exports = " + JSON.stringify(jsonObj) + ";"
}