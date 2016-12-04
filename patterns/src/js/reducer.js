import { LOAD_DATA, TOGGLE_LIST } from './actions';

export function dataLoadReducer(state, action) {
	switch (action.type) {
		case LOAD_DATA:
			return Object.assign(state, {
				isDataLoaded: true,
				activeSource: action.currentSource
			});
		case TOGGLE_LIST:
			return state;
		default:
			return state;
	}
}