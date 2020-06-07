import Cookies from 'js-cookie';
import socket from '../apis/socketio';
import serverApi from '../apis/serverApi';
import ACTION_TYPE from './actionType';

const getHeaders = () => {
    return {'Authorization': 'Bearer ' + Cookies.get('jwt')};
}

const handleRequest = async (request, dispatch, actions, storeToken) => {
    try {
        const response = await request;
        console.log(response.data);

        if (response.data.status === 'success') {
            if (storeToken) Cookies.set('jwt', response.data.token);

            dispatch(actions['success']);
        }
    } catch (err) {
        dispatch(actions['fail']);
    }
};

export const login = (email, password) => async dispatch  => {
    const response = await serverApi.post('/api/v1/users/login',
    {
        email, password
    }
    );

    if (response.data.status === 'success') {
        Cookies.set('jwt', response.data.token);
        
        dispatch({
            type: ACTION_TYPE.SUCCEED_LOGIN,
            payload: response.data.data.user,
        });
    }
    else {
        dispatch({
            type: ACTION_TYPE.FAIL_LOGIN,
            payload: response.data.message
        })
    }
};

export const logout = () => dispatch => {
    resetUIState(dispatch);
    const request = serverApi.get('/api/v1/users/logout');
    const actions = {
        success: {type: ACTION_TYPE.LOG_OUT},
        fail: {type: ACTION_TYPE.FAIL_REQUEST, payload: {error: 'Internal Server Error!'}}
    }
    handleRequest(request, dispatch, actions, true);

}

export const checkLoggedIn = () => async (dispatch) => {
    try {
        const response = await serverApi.post('/api/v1/users/checkLoggedIn', {}, {
            headers: getHeaders()
        });
        if (response.data.status === 'success') {
            dispatch({
                type: ACTION_TYPE.SUCCEED_LOGIN,
                payload: response.data.data.user,
            });
        }
    } catch(err) {
        dispatch({
            type: ACTION_TYPE.FAIL_LOGIN,
            payload: 'You have not logged in yet!',
        });
    }
    setTimeout(() => {
        dispatch({
            type: ACTION_TYPE.LOAD_LOGIN_FINISH,
            payload: {loginLoading: false}
        })
    }, 1000);
};


export const getChats = (name) => async dispatch => {
    if (name) {
        name = name.split(' ').join('-');
    }
    const url = `/api/v1/chats${ name ? '/?name=' + name : ''}`;
    const response = await serverApi.get(url, {
        headers: getHeaders()
    });
    
    const chats = {};
    response.data.data.forEach(chat => {
        chats[`${chat._id}`] = chat; 
    });
    if (name) chats.searching = true;
    dispatch({
        type: ACTION_TYPE.GET_CHATS,
        payload: chats
    });
    setTimeout(() => {
        dispatch({
            type: ACTION_TYPE.LOAD_CHATS_FINISH,
            payload: {chatsLoading: false}
        });
    }, 100);
}

const getMessages = async (chatId, dispatch, getState) => {
    if (!getState().messages[chatId]) {
        const response = await serverApi.get(`/api/v1/messages/${chatId}`, {
            headers: getHeaders()
        })
        const payload = {};
        payload[`${chatId}`] = response.data.messages;
        dispatch({
            type: ACTION_TYPE.GET_MESSAGES,
            payload: payload
        })
    }
}

export const startChat = chat => (dispatch, getState) => {
    resetUIState(dispatch);
    dispatch({
        type: ACTION_TYPE.LOAD_MESSAGES_INITIAL,
        payload: {messagesLoading: true}
    })

    dispatch({
        type: ACTION_TYPE.START_CHAT,
        payload: chat
    });
    getMessages(chat._id, dispatch, getState);
    setTimeout(() =>  {
        dispatch({
            type: ACTION_TYPE.LOAD_MESSAGES_FINISH,
            payload: {messagesLoading: false}
        });
    }, 200);
}

export const sendMessage = message => async (dispatch) => {
    const response = await serverApi.get('/api/v1/messages/get-unique-id', {
        headers: getHeaders()
    })
    message._id = response.data.messageIdCreated;
    dispatch({
        type: ACTION_TYPE.SEND_MESSAGE,
        payload: message
    })
    socket.emit('sendMessage', message);
}

export const receiveMessage = message => dispatch => {
    dispatch({
        type: ACTION_TYPE.RECEIVE_MESSAGE,
        payload: message
    });
}

export const showFriendRequests = status => dispatch => {
    dispatch({
        type: ACTION_TYPE.SHOW_FRIEND_REQUESTS,
        payload: {friendRequestsShowing: status}
    })
    dispatch({
        type: ACTION_TYPE.SHOW_USER_OPERATION,
        payload: {userOperationShowing: false}
    })
}

export const showUserOperation = status => dispatch => {
    dispatch({
        type: ACTION_TYPE.SHOW_USER_OPERATION,
        payload: {userOperationShowing: status}
    })
    dispatch({
        type: ACTION_TYPE.SHOW_FRIEND_REQUESTS,
        payload: {friendRequestsShowing: false}
    })
}

export const showEmoji = status => dispatch => {
    resetUIState(dispatch);
    dispatch({
        type: ACTION_TYPE.SHOW_EMOJI,
        payload: {emojiShowing: status}
    })
}

export const showSearchPeople = status => dispatch => {
    resetUIState(dispatch);
    dispatch({
        type: ACTION_TYPE.SHOW_SEARCH_PEOPLE,
        payload: {searchPeopleShowing: status}
    })
};

const resetUIState = (dispatch) => {
    dispatch({
        type: ACTION_TYPE.SHOW_USER_OPERATION,
        payload: {userOperationShowing: false}
    })
    dispatch({
        type: ACTION_TYPE.SHOW_FRIEND_REQUESTS,
        payload: {friendRequestsShowing: false}
    })
};

export const searchFriends = username => async dispatch => {
    await doSearchFriends(username, dispatch);
};

const doSearchFriends = async (username, dispatch) => {
    let request;
    if (username) {
        request = serverApi.get(`/api/v1/users/searchFriends?username=${username}`, {
            headers: getHeaders()
        });
    }
    else {
        request = serverApi.get('/api/v1/users/friends', {
            headers: getHeaders()
        })
    }
    try {
        const response = await request;
        if (response.data.status === 'success') {
            dispatch({
                type: ACTION_TYPE.SEARCH_FRIENDS,
                payload: response.data.data
            });
        }
    } catch(err) {
        dispatch({
            type: ACTION_TYPE.FAIL_REQUEST,
            payload: {error: 'Internal Server Error!'}
        });
    }
}

export const sendFriendRequest = friendId => async (dispatch, getState) => {
    try {
        await serverApi.post('/api/v1/users/friendRequest', {friendId}, {
            headers: getHeaders()
        });
        await doSearchFriends(getState().form.peopleSearch.values.peopleSearchKeyword, dispatch);
    } catch(err) {
        dispatch({
            type: ACTION_TYPE.FAIL_REQUEST,
            payload: {error: 'Internal Server Error!'}
        });
    }
};

export const getFriendRequest = () => async dispatch => {
    try {
        const response = await serverApi.get('/api/v1/users/friendRequest', {headers: getHeaders()});
        if (response.data.status === 'success') {
            const friendRequests = response.data.data;
            dispatch({
                type: ACTION_TYPE.GET_FRIEND_REQUESTS,
                payload: friendRequests
            });
        }
    } catch (err) {
        dispatch({
            type: ACTION_TYPE.FAIL_REQUEST,
            payload: {error: 'Internal Server Error!'}
        });
    }
};

export const acceptFriendRequest = (requestId) => async dispatch => {
    try {
        const response = await serverApi.patch('/api/v1/users/friendRequest', {requestId}, {headers: getHeaders()});
        if (response.data.status === 'success') {
            dispatch({
                type: ACTION_TYPE.ACCEPT_FRIEND_REQUEST,
                payload: requestId
            });
            const friendId = response.data.data;
            dispatch({
                type: ACTION_TYPE.ADD_FRIEND_ID,
                payload: friendId
            });
            const createChatResponse = await serverApi.post('/api/v1/chats', {friendId}, {headers: getHeaders()});
            dispatch({
                type: ACTION_TYPE.CREATE_CHAT,
                payload: createChatResponse.data.data
            });
        }
    }
    catch (err) {
        dispatch({
            type: ACTION_TYPE.FAIL_REQUEST,
            payload: {error: 'Internal Server Error!'}
        });
    }
};

export const removeFriendRequest = requestId => async dispatch => {
    try {
        await serverApi.delete('/api/v1/users/friendRequest', {requestId}, {headers: getHeaders()});
        dispatch({
            type: ACTION_TYPE.REMOVE_FRIEND_REQIEST,
            payload: requestId
        });
    } catch (err) {
        dispatch({
            type: ACTION_TYPE.FAIL_REQUEST,
            payload: {error: 'Internal Server Error!'}
        });
    }
};