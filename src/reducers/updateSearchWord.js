const searchWordReducer = (state="", action) => {
  switch(action.type){
    case "UPDATE_SEARCH_WORD":
      return state = action.payload
    default:
      return state
  }
}

export default searchWordReducer