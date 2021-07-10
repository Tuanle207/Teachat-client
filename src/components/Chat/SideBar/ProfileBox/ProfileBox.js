import React from 'react';
import { connect } from 'react-redux';
import {
    showFriendRequests,
    getFriendRequest,
    showUserOperation,
    logout,
    acceptFriendRequest,
    receiveFriendRequest,
    removeFriendRequest,
    getChats
} from '../../../../actions';
import socket from '../../../../apis/socketio';
import CONFIGS from '../../../../configs';
import svgIcon from '../../../../img/sprite.svg'
import teachatAPI, { getAbsUrl } from '../../../../apis/teachatAPI';
import './ProfileBox.css';

class ProfileBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            avartar: ''
        };
        
        this.fileInputRef = React.createRef();
    }

    componentDidMount() {
        socket.on('friendRequest',this.props.receiveFriendRequest)
    }

    componentDidMount() {
        if (this.props.currentUser) {
            this.setState({
                avartar: this.props.currentUser.photo
            });
            this.props.getFriendRequest();
        }
    }
    // componentDidUpdate(preProps) {
    //      // Make sure only emit one time
    //     if (this.props.currentUser && !preProps.currentUser) {
    //         console.log('before');
    //         socket.emit('joinFriendRequest', {userId: this.props.currentUser._id});
    //         console.log('after');
    //     }
    // }

    showFriendRequests = () => {
        this.props.showFriendRequests(!this.props.UIState.friendRequestsShowing);
    }
    showUserOperation = () => {
        this.props.showUserOperation(!this.props.UIState.userOperationShowing);
    }
    acceptFriend = requestId => {
        this.props.acceptFriendRequest(requestId);
    }

    handleOpenFileDiaglog = () => {
        this.fileInputRef.current.click();
    };

    handleFileChanges = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0]
            const formData = new FormData();
            formData.append('avatar', file);
            teachatAPI.post('/api/v1/users/updateAvatar', formData, {
                'Content-Type': 'multipart/form-data'
            }).then(res => {
                this.setState({
                    avartar: res.data.data.url
                });
            })
        }
    }
    
    renderFriendRequest = () => {
        if (this.props.friendRequests.length === 0) {
            return (
                <li className="friend-list-no-item" style={{marginTop: '8rem'}}>
                    No friend request.
                </li>
            );
        }
        return this.props.friendRequests.map(({from, _id}) => {
            return (
                <li className="notification__content--item" key={from.name}>
                    <img
                    src={getAbsUrl('/img/user.jpg')}
                    alt={from.name}/>
                    <div>
                        <p>{from.nickName}</p>
                        <p>{from.name}</p>
                    </div>
                    <button onClick={this.acceptFriend.bind(null, _id)}>Accept</button>
                    <button onClick={this.props.removeFriendRequest.bind(null, _id)}>Remove</button>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="profile">
                <figure className="profile__card">
                    <img
                    src={`${CONFIGS.apiUrl}${this.state.avartar}`}
                    alt={this.props.currentUser.name}
                    className="profile__card__user-icon"
                    onClick={this.showUserOperation}
                    />
                    <input ref={this.fileInputRef} onChange={this.handleFileChanges} hidden id="file" type="file" />
                    <figcaption className="profile__card__name">{this.props.currentUser.name}</figcaption>
                </figure>
                <a className="notification" onClick={this.showFriendRequests}>
                    <svg className={`notification__button ${this.props.UIState.friendRequestsShowing
                        ? 'notification__button--active' : ''}`}>
                        <use xlinkHref={`${svgIcon}#icon-bullhorn`}></use>
                    </svg>
                    {
                        this.props.friendRequests.length > 0
                        ?
                        (
                            <span className="notification__text">{this.props.friendRequests.length}</span>
                        )
                        :
                        null
                    }
                </a>
                <div className={this.props.UIState.friendRequestsShowing ?
                     'notification__content notification__content--active' : 'notification__content'}>
                    <div className="notification__wrapper">
                        <p>
                            Friend Requests
                        </p>
                        <ul className="notification__content--list">
                            {this.renderFriendRequest()}
                        </ul>
                    </div>
                </div>
                <div className={`options ${this.props.UIState.userOperationShowing ?
                'options--active' : ''}`}>
                    <ul className="options__list">
                        <li className="options__item">
                            <svg>
                                <use xlinkHref={`${svgIcon}#icon-radio-checked`}></use>
                            </svg>
                            <span>Change online status</span>
                        </li>
                        <li className="options__item" onClick={this.handleOpenFileDiaglog}>
                            <svg>
                                <use xlinkHref={`${svgIcon}#icon-user-tie`}></use>
                            </svg>
                            <span>Change profile picture</span>
                        </li>
                        <li className="options__item">
                            <svg>
                                <use xlinkHref={`${svgIcon}#icon-key`}></use>
                            </svg>
                            <span>Change Password</span>
                        </li>
                        <li className="options__item" onClick={this.props.logout}>
                            <svg>
                                <use xlinkHref={`${svgIcon}#icon-exit`}></use>
                            </svg>
                            <span>Logout</span>
                        </li>

                    </ul>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        currentUser: state.authReducer.user,
        UIState: state.UIState,
        friendRequests: state.friendRequests
    };
}
const mapDispatchToProps = {
    showFriendRequests,
    showUserOperation,
    getFriendRequest,
    logout,
    acceptFriendRequest,
    receiveFriendRequest,
    removeFriendRequest,
    getChats
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileBox);


/**
 * 1,) USING SOCKETIO FOR REALTIME
 */