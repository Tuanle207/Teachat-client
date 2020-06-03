import ACTION_TYPE from '../actions/actionType'; 

const INITIAL = {
    loginLoading: true,
    messagesLoading: true,
    chatsLoading: true,
    friendRequestsShowing: false,
    userOperationShowing: false,
    emojiShowing: false,
    searchPeopleShowing: false
}

const UIStateReducer = (state = INITIAL, action) => {
    switch (action.type) {
        case ACTION_TYPE.LOAD_CHATS_FINISH:
        case ACTION_TYPE.LOAD_MESSAGES_FINISH: 
        case ACTION_TYPE.LOAD_LOGIN_FINISH:
        case ACTION_TYPE.LOAD_MESSAGES_INITIAL:
        case ACTION_TYPE.SHOW_FRIEND_REQUESTS:
        case ACTION_TYPE.SHOW_EMOJI:
        case ACTION_TYPE.SHOW_USER_OPERATION:
        case ACTION_TYPE.SHOW_SEARCH_PEOPLE:
            return {...state, ...action.payload};
        case ACTION_TYPE.LOG_OUT:
            return INITIAL;
        default:
            return state;
    }
}

export default UIStateReducer;