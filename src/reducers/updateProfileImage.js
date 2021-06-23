const updateReducer = (state=false, action) => {
  switch(action.type) {
    case "UPDATE_PROFILE_IMAGE":
      return !state;
    default:
      return state
  }
}

export default updateReducer