const updateReducer = (state=false, action) => {
    switch(action.type) {
      case "UPDATE":
        return !state;
      default:
        return state
    }
}

export default updateReducer