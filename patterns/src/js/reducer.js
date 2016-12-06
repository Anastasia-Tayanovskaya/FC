import { ACTIVATE_BUTTON, TOGGLE_LIST } from './actions';

export function activateLoadButtonReducer(state, action) {
	switch (action.type) {
		case ACTIVATE_BUTTON:
			return Object.assign(state, {
				isActivated: true,
				activeSource: action.currentSource
			});
		default:
			return state;
	}
}