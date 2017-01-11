export const ACTION_PREFIX = '@@auth';
export const AUTH_IDENTITY = `${ACTION_PREFIX}/identity`;
export const AUTH_RESET = `${ACTION_PREFIX}/reset`;

/**
 * reset current identity
 */
export const reset = () => (dispatch) => {
	dispatch({
		type: AUTH_RESET
	});
};

/**
 * set current identity
 */
export const identity = (identity) => (dispatch) => {
	dispatch({
		type: AUTH_IDENTITY,
		identity
	});
};
