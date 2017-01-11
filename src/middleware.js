import { navigate, ACTION_PREFIX } from 'rrrouter-redux';

const defaultSettings = {
	stateKey: 'auth',
	loginHref: '/login',
	checkAuth: (auth) => (!!auth.identity),
	checkAccess: (auth, href, store) => true,
};

const routerAction = new RegExp(`^${ACTION_PREFIX}`);

const createAuthMiddleware = ({ stateKey, loginHref, checkAuth, checkAccess } = defaultSettings) => store => next => action => {
	//ignore any non router action
	if (!routerAction.test(action.type)) {
		return next(action)
	}

	const auth = store.getState()[stateKey];

	//if user trying to navigate to non 'login' href, then checkAuth(authentication) and checkAccess(authorization)
	if(action.href !== loginHref && (!auth || !checkAuth(auth) || !checkAccess(auth, action.href, store))) {
		return store.dispatch(navigate(loginHref));
	}

	return next(action);
};

export default createAuthMiddleware;