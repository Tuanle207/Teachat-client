import React from 'react';
import {connect} from 'react-redux';
import CONFIGS from '../../../../configs';
import Spinner from '../../../Spinner/Spinner';
import {getChats, startChat, resetMessagesLoading} from '../../../../actions';
import {limitWordsInText, ObjectToArray, sortArrayOfObjectByDate} from '../../../../utils';

import './ChatList.css';

class ChatList extends React.Component {

    componentDidMount() {
        this.props.getChats();
    }

    componentDidUpdate() {
        if (Object.keys(this.props.chats).length !== 0 && !this.props.currentChat) {
            this.props.startChat(this.props.chats[Object.keys(this.props.chats)[0]]);
        }
        // if (this.props.UIState.messagesLoading) {
        //     this.props.resetMessagesLoading();
        // }   
    }

    renderMessageSender(chat) {
        let lastMessageSender = null;
        if (chat.latestMessage) {
            lastMessageSender = chat.latestMessage.sender === this.props.currentUser._id
            ?
            (
                <span className="friends__card__text--message__current-user"
                        >You:&nbsp; 
                </span>
            )
            :
            null;
        }
        return lastMessageSender;
    }

    getFriend(chat) {
        return chat.participants.find(x => x._id !== this.props.currentUser._id);
    }


    renderChats() {
        if (ObjectToArray(this.props.chats).length === 0) {
            return (
                <li className="chat-list-no-item">
                    No Chat found.
                </li>
            );
        }

        return sortArrayOfObjectByDate(ObjectToArray(this.props.chats)).map(chat => {
            const participant = this.getFriend(chat);
                let additionalClass = '';
                if (this.props.currentChat) {
                    additionalClass = participant._id === this.getFriend(this.props.currentChat)._id ? 'friends__item--active' : ''
                }
                
                return (
                    <li 
                    onClick={this.props.startChat.bind(null, chat)} 
                    key={chat._id} 
                    className={`friends__item ${additionalClass}`}
                    >
                        <figure className="friends__card">
                            <img
                            src={`${CONFIGS.apiUrl}${participant.photo}`}
                            alt={participant.name}
                            className="friends__card__photo"
                            />
                            <figcaption className="friends__card__text">
                                <p className="friends__card__text--name">
                                    {participant.name}
                                </p>
                                <p className="friends__card__text--message">
                                    {this.renderMessageSender(chat)}
                                    {chat.latestMessage ? limitWordsInText(chat.latestMessage.text) : null}
                                </p>
                            </figcaption>
                        </figure>
                    </li>
                )
        })
    }

    render() {
        return (
            <div className="friends">
                    {this.props.UIState.chatsLoading
                    ? (
                        <Spinner/>
                    )
                    : (<ul className="friends__list">
                        { this.renderChats() }
                    </ul>
                    )}
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chats: state.chatsReducer,
        currentUser: state.authReducer.user,
        currentChat: state.currentChat,
        UIState: state.UIState
    };
}
export default connect(mapStateToProps, {getChats, startChat, resetMessagesLoading})(ChatList);