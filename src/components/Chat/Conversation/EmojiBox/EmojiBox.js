import React from 'react';
import {connect} from 'react-redux';
import { Picker } from 'emoji-mart';
import {change} from 'redux-form'
import {showEmoji} from '../../../../actions'
import 'emoji-mart/css/emoji-mart.css'
import './EmojiBox.css';
import { bindActionCreators } from 'redux';

class EmojtBox extends React.Component {

    onEmojiClick = (emoji) => {
        let message = '';
        if (this.props.form && this.props.form.chatInput && this.props.form.chatInput.values) {
            message = this.props.form.chatInput.values.message;
        }
        this.props.showEmoji(false);
        this.props.change('chatInput', 'message', message + emoji.native);
    }
    render() {
        const additionalClass = this.props.UIState.emojiShowing ? 'emoji-box--active' : '';
        return (
            <div className={`emoji-box ${additionalClass}`}>
                <Picker onClick={this.onEmojiClick} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        UIState: state.UIState,
        form: state.form
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({change, showEmoji}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(EmojtBox);