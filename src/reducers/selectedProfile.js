const initialState = {}

const selectedProfileReducer = (state=initialState, action) => {
  switch(action.type){
    case "SELECTED_PROFILE":
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default selectedProfileReducer