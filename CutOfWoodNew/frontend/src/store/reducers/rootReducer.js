import { combineReducers } from 'redux';
import authReducer from './auth';
import messagesReducer from './messages'
import errorsReducer from './errors'

export default combineReducers({
    authReducer,
    messagesReducer,
    errorsReducer
})