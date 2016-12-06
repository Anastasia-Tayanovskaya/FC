export const LOAD_DATA = 'LOAD_DATA';
export function loadData(obj) {
	return {
		type: LOAD_DATA,
		currentSource: obj.current,
		callback: obj.callback
	};
}

export const TOGGLE_LIST = 'TOGGLE_LIST';
export function toggleListVisibility(obj) {
	return {
		type: TOGGLE_LIST,
		callback: obj.callback
	}
}