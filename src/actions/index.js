import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import socket from '../apis/socketio';
import teachatAPI from '../apis/teachatAPI';
import ACTION_TYPE from './actionType';

const getHeaders = () => {
    return {'Authorization': 'Bearer ' + Cookies.get('jwt')};
};

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
    
    const response = await teachatAPI.post('/api/v1/users/login',
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
        // configure for wating for sending request
        socket.emit('joinFriendRequest', {userId: response.data.data.user._id});
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
    const request = teachatAPI.get('/api/v1/users/logout');
    const actions = {
        success: {type: ACTION_TYPE.LOG_OUT},
        fail: {type: ACTION_TYPE.FAIL_REQUEST, payload: {error: 'Internal Server Error!'}}
    }
    handleRequest(request, dispatch, actions, true);
};

export const signup = (info) => async dispatch => {
    try {
        dispatch({
            type: ACTION_TYPE.LOADING,
            payload: {
                signupRequesting: true
            }
        });
        await teachatAPI.post('/api/v1/users/signup', info);
        toast.success('Đăng kí thành công!');
    } catch (err) {
        toast.error('Đã có lỗi xảy ra!');
    } finally {
        dispatch({
            type: ACTION_TYPE.LOADING,
            payload: {
                signupRequesting: false
            }
        });
    }
};

export const checkLoggedIn = () => async (dispatch) => {
    try {
        const response = await teachatAPI.post('/api/v1/users/checkLoggedIn', {}, {
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
    try {
        if (name) {
            name = name.split(' ').join('-');
        }
        const url = `/api/v1/chats${ name ? '/?name=' + name : ''}`;
        const response = await teachatAPI.get(url, {
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
            if (response.data.data.length === 0) {
                dispatch({
                    type: ACTION_TYPE.LOAD_MESSAGES_FINISH,
                    payload: {messagesLoading: false}
                });
            }
        }, 100);
    } catch (err) {
        dispatch({
            type: ACTION_TYPE.FAIL_REQUEST,
            payload: {error: 'Internal Server Error!'}
        });
    }
};

const getMessages = async (chatId, dispatch, getState) => {
    try {
        if (!getState().messages[chatId]) {
            const response = await teachatAPI.get(`/api/v1/messages/${chatId}`, {
                headers: getHeaders()
            })
            const payload = {};
            payload[`${chatId}`] = response.data.messages;
            dispatch({
                type: ACTION_TYPE.GET_MESSAGES,
                payload: payload
            });
        }
    } catch (err) {
        dispatch({
            type: ACTION_TYPE.FAIL_REQUEST,
            payload: {error: 'Internal Server Error!'}
        });
    }
};

export const startChat = chat => async (dispatch, getState) => {
    resetUIState(dispatch);
    dispatch({
        type: ACTION_TYPE.LOAD_MESSAGES_FINISH,
        payload: {messagesLoading: true}
    })

    dispatch({
        type: ACTION_TYPE.START_CHAT,
        payload: chat
    });
    // configure for waiting new message incomming
    socket.emit('join', {idChat: chat._id});
    // get corresponding messages
    await getMessages(chat._id, dispatch, getState);
    setTimeout(() =>  {
        dispatch({
            type: ACTION_TYPE.LOAD_MESSAGES_FINISH,
            payload: {messagesLoading: false}
        });
    }, 200);
};

export const sendMessage = message => async (dispatch) => {
    try {
        // const response = await teachatAPI.get('/api/v1/users/create-unique-id', {
        //     headers: getHeaders()
        // });
        // message._id = response.data.messageIdCreated;
        dispatch({
            type: ACTION_TYPE.SEND_MESSAGE,
            payload: message
        });
        socket.emit('sendMessage', message);
    } catch (err) {
        dispatch({
            type: ACTION_TYPE.FAIL_REQUEST,
            payload: {error: 'Internal Server Error!'}
        });
    }
    
};

export const receiveMessage = message => dispatch => {
    dispatch({
        type: ACTION_TYPE.RECEIVE_MESSAGE,
        payload: message
    });
};

export const showFriendRequests = status => dispatch => {
    dispatch({
        type: ACTION_TYPE.SHOW_FRIEND_REQUESTS,
        payload: {friendRequestsShowing: status}
    })
    dispatch({
        type: ACTION_TYPE.SHOW_USER_OPERATION,
        payload: {userOperationShowing: false}
    })
};

export const showUserOperation = status => dispatch => {
    dispatch({
        type: ACTION_TYPE.SHOW_USER_OPERATION,
        payload: {userOperationShowing: status}
    })
    dispatch({
        type: ACTION_TYPE.SHOW_FRIEND_REQUESTS,
        payload: {friendRequestsShowing: false}
    })
};

export const showEmoji = status => dispatch => {
    resetUIState(dispatch);
    dispatch({
        type: ACTION_TYPE.SHOW_EMOJI,
        payload: {emojiShowing: status}
    })
};

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
    });
    dispatch({
        type: ACTION_TYPE.SHOW_FRIEND_REQUESTS,
        payload: {friendRequestsShowing: false}
    });
};

export const resetMessagesLoading = () => dispatch => {
    dispatch({
        type: ACTION_TYPE.LOAD_MESSAGES_FINISH,
        payload: {messagesLoading: false}
    });
}

export const searchFriends = username => dispatch => {
    doSearchFriends(username, dispatch);
};

const doSearchFriends = async (username, dispatch) => {
    let request;
    if (username) {
        request = teachatAPI.get(`/api/v1/users/searchFriends?username=${username}`, {
            headers: getHeaders()
        });
    }
    else {
        request = teachatAPI.get('/api/v1/users/friends', {
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
};

export const sendFriendRequest = friendId => async (dispatch, getState) => {
    try {
       
        const friendRequest = {
            from: getState().authReducer.user._id, 
            to: friendId
        };
        // await teachatAPI.post('/api/v1/users/friendRequest', {friendId}, {
        //     headers: getHeaders()
        // });
        socket.emit('sendFriendRequest', friendRequest);
        await doSearchFriends(getState().form.peopleSearch.values.peopleSearchKeyword, dispatch);
    } catch(err) {
        dispatch({
            type: ACTION_TYPE.FAIL_REQUEST,
            payload: {error: 'Internal Server Error!'}
        });
    }
};

export const receiveFriendRequest = (request) => dispatch => {
    dispatch({
        type: ACTION_TYPE.RECEIVE_FRIEND_REQUEST,
        payload: request
    });
}

export const getFriendRequest = () => async dispatch => {
    try {
        const response = await teachatAPI.get('/api/v1/users/friendRequest', {headers: getHeaders()});
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
        const response = await teachatAPI.patch('/api/v1/users/friendRequest', {requestId}, {headers: getHeaders()});
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
            const createChatResponse = await teachatAPI.post('/api/v1/chats', {friendId}, {headers: getHeaders()});
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
        await teachatAPI.delete(`/api/v1/users/friendRequest/${requestId}`, {headers: getHeaders()});
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