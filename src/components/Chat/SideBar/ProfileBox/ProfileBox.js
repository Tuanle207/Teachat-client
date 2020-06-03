import React from 'react';
import {connect} from 'react-redux';
import {showFriendRequests, getFriendRequest, showUserOperation, logout} from '../../../../actions';

import svgIcon from '../../../../img/sprite.svg'
import './ProfileBox.css';

class ProfileBox extends React.Component {

    componentDidMount() {
        if (this.props.currentUser) {
            this.props.getFriendRequest();
        }
    }

    showFriendRequests = () => {
        this.props.showFriendRequests(!this.props.UIState.friendRequestsShowing);
    }
    showUserOperation = () => {
        this.props.showUserOperation(!this.props.UIState.userOperationShowing);
    }
    
    renderFriendRequest = () => {
        if (this.props.friendRequests || this.props.friendRequests.length === 0) {
            return (
                <li className="friend-list-no-item" style={{marginTop: '8rem'}}>
                    No friend request.
                </li>
            );
        }
        return this.props.frendRequests.map(fr => {
            return (
                <li className="notification__content--item" key={fr.name}>
                    <img
                    src="http://localhost:5000/img/user.jpg"
                    alt={fr.name}/>
                    <div>
                        <p>{fr.nickName}</p>
                        <p>{fr.name}</p>
                    </div>
                    <button>Accept</button>
                    <button>Remove</button>
                </li>
            );
        });
    }

    render() {
        console.log(this.props.friendRequests);
        return (
            <div className="profile">
                <figure className="profile__card">
                    <img
                    src="http://localhost:5000/img/user.jpg"
                    alt={this.props.currentUser.name}
                    className="profile__card__user-icon"
                    onClick={this.showUserOperation}
                    />
                    <figcaption className="profile__card__name">{this.props.currentUser.name}</figcaption>
                </figure>
                <a className="notification" onClick={this.showFriendRequests}>
                    <svg className={`notification__button ${this.props.UIState.friendRequestsShowing
                        ? 'notification__button--active' : ''}`}>
                        <use xlinkHref={`${svgIcon}#icon-bullhorn`}></use>
                    </svg>
                    {
                        this.props.friendRequests && this.props.friendRequests.length > 0
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
                        <li className="options__item">
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
    logout
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileBox);


/**
 * 1,) IMPLEMENT FRIEND REQUESTS NOTIFICATION ON UI: ACCEPT, REMOVE FRIEND REQUEST, USING SOCKETIO FOR REALTIME
 * 2,) CANCEL FRIEND REQUEST!
 * 3,) CREATE NEW CHAT IN DB WHEN START CHAT WITH A NEW FRIEND
 */