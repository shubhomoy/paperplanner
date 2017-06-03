import { applyMiddleware } from 'redux';

const logger = (store) => (next) => (action) => {
	// console.warn('action', action);
	next(action);
};

var middlewares = applyMiddleware(logger);

export default middlewares;