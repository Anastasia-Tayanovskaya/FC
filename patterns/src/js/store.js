import { dataLoadReducer } from './reducer';

export let store = {
	isDataLoaded: false,
	activeSource: ''
};

let reducers = function(state, action) {
	return dataLoadReducer(state, action);
}

document.addEventListener('action', function(e) {
	store = reducers(store, e.detail);
	document.dispatchEvent(new CustomEvent('state.' + e.detail.callback));
}, false);