import { AUTH_RECEIVE, AUTH_REQUEST, AUTH_RESET, AUTH_ACTION } from './actions';

const authAction = new RegExp(`^${AUTH_ACTION}`);

const initialState = {
	identity: null,
	requesting: false,
};

export default function auth(state = initialState, action) {
	if(!authAction.test(action.type)) {
		return state;
	}

	switch (action.type) {
		case AUTH_RECEIVE:
			return { ...state, identity: action.identity, requesting: false };

		case AUTH_REQUEST:
			return { ...state, requesting: true };

		case AUTH_RESET:
			return { ...initialState };

		default:
			return state;
	}
};