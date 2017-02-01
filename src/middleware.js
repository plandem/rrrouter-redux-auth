import { navigate, ROUTER_ACTION } from 'rrrouter-provider-redux';

const defaultSettings = {
	stateKey: 'auth',
	redirect401: '/login',
	redirect403: '/login',
	checkAuth: (auth) => { console.log('checkAuth'); return !!auth.identity },
	checkAccess: (auth, href, store) => { console.log('checkAccess'); return true; },

	// checkAuth: (auth) => (!!auth.identity),
	// checkAccess: (auth, href, store) => true,
};

const routerAction = new RegExp(`^${ROUTER_ACTION}`);

const createAuthMiddleware = (settings = defaultSettings) => {
	const { stateKey, redirect401, redirect403, checkAuth, checkAccess } = { ...defaultSettings, ...settings };

	return store => next => action => {
		//ignore any non router action
		if (!routerAction.test(action.type)) {
			return next(action)
		}

		const auth = store.getState()[stateKey];

		//if user trying to navigate to non 401/403 pages, then checkAuth(authentication) and checkAccess(authorization)
		if(action.href !== redirect401 && action.href !== redirect403) {
			if(!auth || !checkAuth(auth)) {
				return store.dispatch(navigate(redirect401));
			}

			if(!checkAccess(auth, action.href, store)) {
				return store.dispatch(navigate(redirect403));
			}
		}

		return next(action);
	};
};

export default createAuthMiddleware;