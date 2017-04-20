const userId = (state = {
	authId: false,
	idToken: false,
	realId: false
}, action) => {
  if (action.type === "AUTH_ID") {
    return {
			...state,
			authId: action.id
		}
	}
	if (action.type === "ID_TOKEN") {
		return {
			...state,
			idToken: action.id
		}
	}
	if (action.type === "REAL_ID") {
		return {
			...state,
			realId: action.id
		}
	}
  return state;
};

export default userId;
