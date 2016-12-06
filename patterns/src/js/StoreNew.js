export default class Store {
	constructor(reducers){
		this.subscribers = [];
		this.reducers = reducers;
		
		this.state = {};
	}
	
	dispatch(action){
		this.state = this.applyReducers(this.state, action);
		this.notifySubscribers();
		
		return action;
	}
	
	subscribe(fn){
		this.subscribers.push(fn);
	}
	
	applyReducers(state, action) {
		let reducerResult = this.reducers.activateLoadButtonReducer(state, action);
		return {
			isActivated: reducerResult.isActivated,
			currentSource: reducerResult.activeSource
		}
	}
	
	notifySubscribers() {
		this.subscribers.forEach((subscriber) => {
		subscriber(this.state);
	});
};
}