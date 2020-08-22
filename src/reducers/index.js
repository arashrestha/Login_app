import { combineReducers } from 'redux'
const initialState = {
    isSignedIn: false
}

const auth = (state = initialState, action) => {

    switch (action.type) {
        case 'SIGN_IN':
            return {
                isSignedIn: true, ...action.payload
            }
        case 'SIGN_OUT':
            return {
                isSignedIn: false
            }
        default: return state
    }
}

export default combineReducers({
    auth
});