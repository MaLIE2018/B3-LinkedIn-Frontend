const initialState = {}

const userProfileReducer = (state=initialState, action) => {
  switch(action.type){
    case "USER_PROFILE":
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default userProfileReducer