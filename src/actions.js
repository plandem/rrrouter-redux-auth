export const ACTION_PREFIX = '@@auth';
export const AUTH_RESET = `${ACTION_PREFIX}/reset`;
export const AUTH_REQUEST = `${ACTION_PREFIX}/request`;
export const AUTH_RECEIVE = `${ACTION_PREFIX}/receive`;

/**
 * reset current identity
 */
export const reset = () => (dispatch) => {
	dispatch({
		type: AUTH_RESET
	});
};

/**
 * receive current identity
 */
export const receive = (identity) => (dispatch) => {
	dispatch({
		type: AUTH_RECEIVE,
		identity
	});
};

/**
 * request current identity
 */
export const request = () => (dispatch) => {
	dispatch({
		type: AUTH_REQUEST,
	});
};