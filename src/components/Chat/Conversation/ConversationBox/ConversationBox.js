import React from 'react';
import { connect } from "react-redux";

import socket from '../../../../apis/socketio';
import {receiveMessage} from '../../../../actions';
import {groupArrayItems, isEmptyObject} from '../../../../utils';
import CONFIGS from '../../../../configs';
import Spinner from './../../../Spinner/Spinner';
import './ConversationBox.css';

class ConversationBox extends React.Component {
    ref = React.createRef();

    componentDidMount() {
        socket.on('message', this.props.receiveMessage);
        console.log(this.props.currentChat);
    }

    componentDidUpdate(preProps) {
        if (this.ref.current) {
            this.ref.current.scrollTop = this.ref.current.scrollHeight;
        }
        // Make sure only emit one time
        // if (this.props.currentChat) {
        //     if (!preProps.currentChat || this.props.currentChat._id !== preProps.currentChat._id) {
        //         socket.emit('join', {idChat: this.props.currentChat._id});
        //     }
        // }
    }

    getPhoto = (senderId) => {
        const participants = this.props.currentChat.participants;
        var person = participants.find(x => x._id === senderId);
        return `${CONFIGS.apiUrl}${person.photo}`;
    };

    renderMessages() {

        if (this.props.UIState.messagesLoading) {
            return (
                <Spinner />
            )
        }
        if (isEmptyObject(this.props.messages)) {
            return (
                <ul className="conversation__list--no-item">
                    Make new friends to start chatting!
                </ul>
            );
        }
        
        if (this.props.currentChat && this.props.messages[this.props.currentChat._id].length === 0) {
            return (
                <ul className="conversation__list--no-item">
                    No messages available. Start talking with your friend!
                </ul>
            );
        }

        return (
            <ul className="conversation__list">
                {
                    groupArrayItems(this.props.messages[this.props.currentChat._id]).map(messages => {
                        return messages.map((message, i, arr) => {
                            let additionalClass = '';
                            additionalClass = message.sender === this.props.user._id ? 
                            'conversation__message--right' : 'conversation__message--left';
                            let margin = i === arr.length - 1 ?
                            'medium-margin-bottom' : '' ;
    
                            return (
                                <li key={message._id}
                                    className={`conversation__message ${additionalClass} ${margin}`}
                                    >
                                    <img
                                        src={this.getPhoto(message.sender)}
                                        alt="Anathan Pham"
                                        className="conversation__message__img"
                                    />
                                    <p className="conversation__message__text">
                                        {message.text}
                                    </p>
                                </li>
                            )
                        })
                        
                    })
                }
            </ul>
        ) 
        
	}

    render() {
        return (
            <div className="conversation" ref={this.ref}>
                {this.renderMessages()}                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
		currentChat: state.currentChat,
        user: state.authReducer.user,
        UIState: state.UIState
    }
}

export default connect(mapStateToProps, {receiveMessage})(ConversationBox);