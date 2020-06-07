import ACTION_TYPE from '../actions/actionType';

const INITIAL = [];

const friendRequestReducer = (state = INITIAL, action) => {
    switch (action.type) {
        case ACTION_TYPE.GET_FRIEND_REQUESTS:
            return action.payload;
        case ACTION_TYPE.RECEIVE_FRIEND_REQUEST:
            return [...state, action.payload];
        case ACTION_TYPE.ACCEPT_FRIEND_REQUEST:
        case ACTION_TYPE.REMOVE_FRIEND_REQIEST:
            return state.filter(el => el._id !== action.payload);
        case ACTION_TYPE.FAIL_REQUEST:
        case ACTION_TYPE.LOG_OUT:
        default:
            return state;
    }
};

export default friendRequestReducer;