import { AUTH_IDENTITY, AUTH_RESET, ACTION_PREFIX } from './actions';

const authAction = new RegExp(`^${ACTION_PREFIX}`);

const initialState = {
	identity: null,
};

export default function auth(state = initialState, action) {
	if(!authAction.test(action.type)) {
		return state;
	}

	switch (action.type) {
		case AUTH_IDENTITY:
			return { ...state, identity: action.identity };

		case AUTH_RESET:
			return { ...initialState };

		// case CHECK_ACCESS:
		// 	return {}, state, {
		// 		allowed: action.allowed
		// 	});

		default:
			return state;
	}
};