import { combineReducers } from 'redux'
import { userReducer } from './reducers/index'

const reducers ={
    userState : userReducer
}

const rootReducer = combineReducers(reducers)

export default rootReducer