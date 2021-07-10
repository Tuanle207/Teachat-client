import ACTION_TYPE from '../actions/actionType';

const INITIAL_STATE = {
    loggedIn: false,
    user: null,
    error: null
}

const authenticationReducer = (
    state = INITIAL_STATE, action
) => {
    switch (action.type) {
        case ACTION_TYPE.SUCCEED_LOGIN:
            return { ...state, loggedIn: true, user: action.payload };
        case ACTION_TYPE.FAIL_LOGIN:
            return { ...state, error: action.payload }
        case ACTION_TYPE.ADD_FRIEND_ID:
            const {user} = state;
            user.friends.push(action.payload);
            return { ...state, user};
        case ACTION_TYPE.LOG_OUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default authenticationReducer;
