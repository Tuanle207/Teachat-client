import React from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field } from "redux-form";

import {onChangeSubmit} from '../../../../../utils';
import {searchFriends} from '../../../../../actions';
import svgIcon from '../../../../../img/sprite.svg'
import '../../ChatSearchBar/ChatSearchBar.css';



class FriendSearchForm extends React.Component {

    renderInput = ({input, meta}) => {
        return (
            <input
                {...input}
                type="text"
                className="search__input"
                placeholder="Type people name"
                id="input-peopleSeacrhKeyword"
                autoFocus="on"
                autoComplete="off"
                onChange={onChangeSubmit(input.onChange, this.props.handleSubmit(this.onSubmit))}
            />
        )
    }
    
    onSubmit = (formValues) => {
        this.props.searchFriends(formValues.peopleSearchKeyword);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} 
            style={{display: "flex"}} className="search">
                <svg className="search__icon">
                    <use xlinkHref={`${svgIcon}#icon-search`}></use>
                </svg>
                <Field name="peopleSearchKeyword" component={this.renderInput}/>
            </form>
        )
    }
}


const FriendSearch = reduxForm({
    form: 'peopleSearch'
})(FriendSearchForm);


export default connect(null, {searchFriends})(FriendSearch);