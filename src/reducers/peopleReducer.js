import ACTION_TYPE from '../actions/actionType';


const INITIAL = [];

const peopleReducer = (state = INITIAL, action) => {
    switch (action.type) {
        case ACTION_TYPE.SEARCH_FRIENDS:
            return action.payload;
        case ACTION_TYPE.FAIL_REQUEST:
            return INITIAL;
        case ACTION_TYPE.LOG_OUT:
            return INITIAL;
        default:
            return state;
    }
}

export default peopleReducer;