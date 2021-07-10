import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form'
import {getChats} from '../../../../actions';
import {onChangeSubmit} from '../../../../utils';

import svgIcon from '../../../../img/sprite.svg'
import './ChatSearchBar.css';

class ChatSearchBar extends React.Component {

    renderInput = ({input, meta}) => {
        return (
            <input
                {...input}
                type="text"
                className="search__input"
                placeholder="Type friend name"
                id="input-chatSeacrhKeyword"
                autoFocus="on"
                autoComplete="off"
                onChange={onChangeSubmit(input.onChange, this.props.handleSubmit(this.onSubmit))}
            />
        )
    }
    
    onSubmit = (formValues) => {
        this.props.getChats(formValues.chatSearchKeyword);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="search">
                <svg className="search__icon">
                    <use xlinkHref={`${svgIcon}#icon-search`}></use>
                </svg>
                <Field name="chatSearchKeyword" component={this.renderInput}/>
            </form>
        )
    }
}


const ChatSearchBarForm = reduxForm({
    form: 'chatSearch'
})(ChatSearchBar);


export default connect(null, {getChats})(ChatSearchBarForm);