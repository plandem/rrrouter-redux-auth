import { navigate, ROUTER_ACTION } from 'rrrouter-provider-redux';
import url from 'url';

const defaultSettings = {
	stateKey: 'auth',
	redirect401: '/login',
	redirect403: '/login',
	checkAuth: (auth) => (!!auth.identity),
	checkAccess: (auth, action, store) => true,
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
		if(action.location.pathname !== redirect401 && action.location.pathname !== redirect403) {
			if(!auth || !checkAuth(auth)) {
				const destination = action.href !== '/' ? url.format({ pathname: redirect401, search: `?return=${action.href}`}) : redirect401;
				return store.dispatch(navigate(destination));
			}

			if(!checkAccess(auth, action, store)) {
				return store.dispatch(navigate(redirect403));
			}
		}

		return next(action);
	};
};

export default createAuthMiddleware;