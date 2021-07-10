import React from 'react';
import { connect } from 'react-redux';
import svgIcon from '../../../../../img/sprite.svg'
import './FriendSearchList.css';
import {searchFriends, sendFriendRequest} from '../../../../../actions';
import CONFIGS from '../../../../../configs';


class FriendSearchList extends React.Component {

    componentDidMount() {
        this.props.searchFriends();
    }

    isFriend = (id) => {
        return this.props.user.friends.includes(id);
    }

    renderRelationOption = (id, friendRequested) => {
        if (this.isFriend(id)) {
            return (
                <svg>
                    <use xlinkHref={`${svgIcon}#icon-user-check`}></use>
                </svg>
            );
        }
        if (friendRequested) {
            return (
                <svg>
                    <use xlinkHref={`${svgIcon}#icon-checkmark`}></use>
                </svg>
            );
        }
        return (
            <svg onClick={this.props.sendFriendRequest.bind(null, id)}>
                <use xlinkHref={`${svgIcon}#icon-plus`}></use>
            </svg>
        );
    }

    renderPeople() {
        if (!this.props.people || this.props.people.length === 0) {
            return (
                <li className="friend-list-no-item">
                    No friends found.
                </li>
            );
        }
        if (this.props.people) {
            return this.props.people.map(el => {
                return (
                    <li className="friend-list-item" key={el._id}>
                        <img src={`${CONFIGS.apiUrl}${el.photo}`} alt={el.nickName}/>
                        <div>
                            <p>{el.nickName}</p>
                            <p>{el.name}</p>
                        </div>
                        {this.renderRelationOption(el._id, el.friendRequested)}
                    </li>
                );
            })
        }
    }

    render() {
        return (
            <div className="friend-list-box">
                <ul className="friend-list">
                    {this.renderPeople()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.peopleReducer,
        user: state.authReducer.user
    };
};

export default connect(mapStateToProps, {searchFriends, sendFriendRequest})(FriendSearchList);