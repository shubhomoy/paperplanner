import { applyMiddleware } from 'redux';

const logger = (store) => (next) => (action) => {
	if(action.type == 'SEARCH') {
		store.dispatch({
			type: 'CHANGE_SEARCH_TEXT',
			data: action.data
		})
	}
	next(action);
};

var middlewares = applyMiddleware(logger);

export default middlewares;