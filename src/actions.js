export const AUTH_ACTION = '@@auth';
export const AUTH_RESET = `${AUTH_ACTION}/reset`;
export const AUTH_REQUEST = `${AUTH_ACTION}/request`;
export const AUTH_RECEIVE = `${AUTH_ACTION}/receive`;

/**
 * reset current identity
 */
export function reset() {
	return { type: AUTH_RESET };
}

/**
 * receive current identity
 */
export function receive(identity) {
	return { type: AUTH_RECEIVE, identity };
}

/**
 * request current identity
 */
export function request() {
	return { type: AUTH_REQUEST };
}