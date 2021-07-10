import ACTION_TYPE from '../actions/actionType';

const chatListReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case ACTION_TYPE.GET_CHATS:
            if (action.payload.searching) {
                delete action.payload.searching;
                return action.payload;
            } else {
                return {...state, ...action.payload};
            }
        case ACTION_TYPE.SEND_MESSAGE:
        case ACTION_TYPE.RECEIVE_MESSAGE:
            const id = action.payload.chat;
            newState = {...state};
            newState[id].latestMessage = action.payload;
            return newState;
        case ACTION_TYPE.CREATE_CHAT:
            newState = {...state};
            const newChat = `${action.payload._id}`;
            newState[newChat] = action.payload;
            return newState;
        case ACTION_TYPE.LOG_OUT:
            return {};
        default:
            return state;
    }
}

export default chatListReducer;