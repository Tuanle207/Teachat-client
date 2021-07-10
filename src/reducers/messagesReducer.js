import ACTION_TYPE from '../actions/actionType'

const messagesReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case ACTION_TYPE.GET_MESSAGES:
            return {...state, ...action.payload};
        case ACTION_TYPE.SEND_MESSAGE:
            newState = {...state};
            newState[action.payload.chat].push(action.payload);
            return newState;
        case ACTION_TYPE.RECEIVE_MESSAGE:
            newState = {...state};
            newState[action.payload.chat].push(action.payload);
            return newState;
        case ACTION_TYPE.LOG_OUT:
            return {};
        default:
            return state;
    }
    
}

export default messagesReducer;