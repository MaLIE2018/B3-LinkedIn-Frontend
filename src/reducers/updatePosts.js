const updatePostsReducer = (state =false, action) => {
  switch(action.type){
      case "UPDATE_POSTS":
        return !state
      default:
        return state
  }
}

export default updatePostsReducer