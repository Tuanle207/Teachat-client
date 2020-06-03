import React from 'react';
import {connect} from 'react-redux';
import svgIcon from '../../../../img/sprite.svg';
import './TopBar.css';

class TopBar extends React.Component {

    render() {
        if (!this.props.currentChat) {
            return (
                <div className="top-bar">
                </div>
            )
        }
        const currentFriend = this.props.currentChat.participants.find(el => el._id !== this.props.user._id); 
        return (
            <div className="top-bar">
                <figure className="top-bar__card">
                    <img
                    src="http://localhost:5000/img/user.jpg"
                    alt={currentFriend.name}
                    className="top-bar__card__user-icon"
                    />
                    <figcation className="top-bar__card__name">{currentFriend.name}</figcation>
                </figure>
                <div className="top-bar__live-contact">
                    <svg className="top-bar__icon">
                        <use xlinkHref={`${svgIcon}#icon-phone`}></use>
                    </svg>
                    <svg className="top-bar__icon">
                        <use xlinkHref={`${svgIcon}#icon-video-camera`}></use>
                    </svg>
                    <svg className="top-bar__icon">
                        <use
                        xlinkHref={`${svgIcon}#icon-dots-three-vertical`}></use>
                    </svg>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentChat: state.currentChat,
        user: state.authReducer.user
    };
}

export default connect(mapStateToProps)(TopBar);