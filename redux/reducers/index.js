const INITIAL_STATE = {
    currentUser : null
}

export const userReducer = (state=INITIAL_STATE, action) =>{
    return({
        ...state,
        currentUser : action.currentUser
    })
}