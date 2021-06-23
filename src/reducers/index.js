
import {combineReducers} from "redux"

//Reducer Imports
import update from "../reducers/hasUpdate.js"
import updateProfileImage from "../reducers/updateProfileImage.js"
import userProfile from "../reducers/userProfile.js"
import selectedProfile from "../reducers/selectedProfile.js"
import searchWord from "../reducers/updateSearchWord.js"

export const allReducers = combineReducers({
      updateProfileImage,
      update,
      userProfile,
      selectedProfile, 
      searchWord
})