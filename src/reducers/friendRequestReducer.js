import ACTION_TYPE from '../actions/actionType';

const friendRequestReducer = (state = [], action) => {
    switch (action.type) {
        case ACTION_TYPE.GET_FRIEND_REQUESTS:
            console.log('get friend requests!');
            console.log(action.payload);
            return action.payload;
        case ACTION_TYPE.RECEIVE_FRIEND_REQUEST:
            return [...state, action.payload];
        case ACTION_TYPE.FAIL_REQUEST:
        case ACTION_TYPE.LOG_OUT:
        default:
            return [];
    }
};

export default friendRequestReducer;