import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form'
import authenticationReducer from './authenticationReducer';
import chatListReducer from './chatListReducer';
import currentChatReducer from './currentChatReducer';
import messagesReducer from './messagesReducer';
import UIStateReducer from './UIStateReducer';
import peopleReducer from './peopleReducer';
import friendRequestReducer from './friendRequestReducer';

const reducers = combineReducers({
    authReducer: authenticationReducer,
    chatsReducer: chatListReducer,
    form: formReducer,
    currentChat: currentChatReducer,
    messages: messagesReducer,
    UIState: UIStateReducer,
    peopleReducer: peopleReducer,
    friendRequests: friendRequestReducer
});

export default reducers;
