import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import {checkLoggedIn} from '../../actions'

import './Chat.css'
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo';
import SideBar from './SideBar/SideBar';
import Conversation from './Conversation/Conversation';

class Chat extends React.Component {

    componentDidMount() {
        this.props.checkLoggedIn();
        document.title = 'Teachat — Instant and secure chatting with your friends';
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to="/login" />
        }

        return (
            <div className="content">
                <BackgroundVideo />
                <SideBar/>
                <Conversation/>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    const isLoggedIn = state.authReducer.loggedIn;
    return {isLoggedIn};
}

export default connect(mapStateToProps, {checkLoggedIn})(Chat);