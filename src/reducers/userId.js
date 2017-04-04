const userId = (state = false, action) => {
  if (action.type === "SPECIFY_USER") {
    return state = action.userId;
  }
  return state;
};

export default userId;
