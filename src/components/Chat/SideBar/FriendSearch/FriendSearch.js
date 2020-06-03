import React from 'react';
import './FriendSearch.css';
import svgIcon from '../../../../img/sprite.svg';
import FriendSearchForm from './FriendSearchForm/FriendSearchForm';
import {showSearchPeople} from '../../../../actions';
import { connect } from 'react-redux';
import FriendSearchList from './FriendSearchList/FriendSearchList';

class FriendSearch extends React.Component {
    
    render() {
        return (
            <div className={`friend-search ${!this.props.UIState.searchPeopleShowing ? 'friend-search--inactive' : ''}`}>
                <div className="friend-search__title">
                    <p>Search people</p>
                    <svg onClick={() => this.props.showSearchPeople(false)}>
                        <use xlinkHref={`${svgIcon}#icon-cross`}></use>
                    </svg>
                </div>
                <FriendSearchForm/>
                <FriendSearchList/>
            </div>
        )
    }
}

const mapStateToProps = state => ({ UIState: state.UIState })

export default connect(mapStateToProps, {showSearchPeople})(FriendSearch);