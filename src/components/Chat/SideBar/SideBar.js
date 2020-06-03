import React from 'react';

import './SideBar.css';
import ProfileBox from './ProfileBox/ProfileBox';
import ChatList from './ChatList/ChatList';
import BottomBar from './BottomBar/BottomBar';
import FriendSearch from './FriendSearch/FriendSearch';
import ChatSearchBar from './ChatSearchBar/ChatSearchBar';
import { connect } from 'react-redux';

class SideBar extends React.Component {

   
    render() {
        return (
            <div className="side-nav">
                <ProfileBox/>
                <ChatSearchBar/>
                <ChatList/>
                <BottomBar/>
                {this.props.UIState.searchPeopleShowing ? <FriendSearch/> : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({ UIState: state.UIState });

export default connect(mapStateToProps, null)(SideBar);