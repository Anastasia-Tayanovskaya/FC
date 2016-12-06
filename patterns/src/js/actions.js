export const ACTIVATE_BUTTON = 'ACTIVATE_BUTTON';
export function activateButton(activeSource) {
	return {
		type: ACTIVATE_BUTTON,
		currentSource: activeSource
	};
}