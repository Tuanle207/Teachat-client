import ACTION_TYPE from '../actions/actionType';

const currentChatReducer = (state = null, action) => {
    switch (action.type) {
        case ACTION_TYPE.START_CHAT:
            return action.payload;
        case ACTION_TYPE.LOG_OUT:
            return null;
        default:
            return state;
    }
}

export default currentChatReducer;