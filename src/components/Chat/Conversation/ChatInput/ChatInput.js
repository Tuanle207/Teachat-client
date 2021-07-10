import React from 'react';
import { connect } from "react-redux";
import {reduxForm, Field, reset} from 'redux-form'

import svgIcon from '../../../../img/sprite.svg';
import {sendMessage, showEmoji} from '../../../../actions';

import './ChatInput.css';

class ChatInput extends React.Component {

    renderInput = ({input, meta}) => {
        return (
            <input
                {...input}
                type="text"
                className="form-input__input"
                placeholder="Write your message..."
                id="input-message"
                autoFocus="on"
                autoComplete="off"
                onClick={this.props.showEmoji.bind(null, false)}
            />
        )
    }

    onSubmit = (formValues) => {
        const {message} = formValues;
        if (!message || message.trim() === '') {
            return;
        }
        this.props.sendMessage({
            sentAt: new Date(),
            chat: this.props.currentChat._id,
            sender: this.props.user._id,
            text: message
        });
    }


    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form-input">
                <Field name="message" component={this.renderInput}/>
                <div className="form-input__options">
                    <svg className="form-input__icon" onClick={this.props.showEmoji.bind(null, !this.props.UIState.emojiShowing)}>
                        <use xlinkHref={`${svgIcon}#icon-smile`}></use>
                    </svg>
                    <svg className="form-input__icon">
                        <use xlinkHref={`${svgIcon}#icon-attachment`}></use>
                    </svg>
                    <svg className="form-input__icon" onClick={this.props.handleSubmit(this.onSubmit)}>
                        <use xlinkHref={`${svgIcon}#icon-paper-plane`}></use>
                    </svg>
                </div>
            </form>
        );
    }
}

const ChatInputForm = reduxForm({
    form: 'chatInput',
    onSubmitSuccess: (result, dispatch) => {
        dispatch(reset('chatInput'))
    }
})(ChatInput);

const mapStateToProps = (state) => {
    return {
        currentChat: state.currentChat,
        user: state.authReducer.user,
        UIState: state.UIState
    };
}

export default connect(mapStateToProps, {sendMessage, showEmoji})(ChatInputForm);