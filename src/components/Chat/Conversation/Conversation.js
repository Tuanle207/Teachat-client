import React from 'react';

import './Conversation.css';
import TopBar from './TopBar/TopBar';
import ChatInput from './ChatInput/ChatInput';
import ConversationBox from './ConversationBox/ConversationBox';
import EmojtBox from './EmojiBox/EmojiBox';



class Conversation extends React.Component {

    render() {
        return (
            <div className="chat">
                <TopBar />
                <ConversationBox/>
                <EmojtBox />
                <ChatInput />
            </div>
        )
    }
}

export default Conversation;