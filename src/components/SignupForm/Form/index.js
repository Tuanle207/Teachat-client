import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import Button from '../../Button/Button';
import { signup } from '../../../actions/index';
import svgIcon from '../../../img/sprite.svg';
import './Login.css';

const Form = ({
    login,
    handleSubmit
}) => {

    const renderInput = ({input, meta}) => {
        const {name} = input;
        return (
            <div className="login-form__input-wrap">
            <label
                htmlFor={`${name}-login`}
                className="login-form__label"
            >
                {name}
            </label>
            <input
                {...input}
                name={`${name}`}
                type={`${name}`}
                className="login-form__info"
                placeholder={name==='email' ? "Type your email address" : "Type your password"}
                id={`${name}-login`}
                autoComplete="off"
                autoFocus={name==='email' ? "on" : "off"}
            />
            <svg className="login-form__icon">
                <use xlinkHref={`${svgIcon}#icon-${name==='email' ? 'mail' : 'key' }`}></use>
            </svg>
        </div>
        );
    };

    const onSubmit = (formValues) =>  {
        const {email, password} = formValues;
        login(email, password);
    };

    return (
        <form className="authen-content" onSubmit={handleSubmit(onSubmit)}>
            <div className="authen-form">
                <div className="authen-form__heading">
                    <h1 className="authen-form__heading--title">
                        Welcome to Teachat!
                    </h1>
                    <p className="authen-form__heading--text">
                        Let's login to start!
                    </p>
                    <svg className="authen-form__heading--icon">
                        <use xlinkHref={`${svgIcon}#icon-bubbles`}></use>
                    </svg>
                </div>

                <div className="login-form">
                    <Field name="email" component={renderInput}/>
                    <Field name="password" component={renderInput}/>
                    
                    <div className="login-form__options">
                        <input
                            type="checkbox"
                            name=""
                            className="login-form__options__remember-check"
                            id="remember-me"
                        />
                        <label
                            htmlFor="remember-me"
                            className="login-form__options__remember-label"
                        >
                            <span>
                                <svg className="login-form__options__check-icon">
                                    <use
                                        xlinkHref={`${svgIcon}#icon-check`}
                                    ></use>
                                </svg>
                            </span>
                            <span>Remember me</span>
                        </label>

                        <a
                            href="/"
                            className="login-form__options__forgot-password"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <Button
                        className={'medium-margin-bottom'}
                        type={'button'}
                        text={'Login'}
                    />
                </div>

                <Button
                    className={'medium-margin-bottom'}
                    type={'anchor'}
                    text={"Don't have any account?"}
                    link={'/signup'}
                />

                <p className="copyright-text">
                    &copy; 2020 Tuanle207 All Rights Reserved
                </p>
            </div>
        </form>
    );
}

// const validate = (formValues) => {
//     const errors = {};
//     if (!formValues.email) {
//         errors.email = 'You must enter the email';
//     }
    
//     if (!formValues.password) {
//         errors.password = 'You must enter the password';
//     }
//     return errors;
// }

const reduxLoginForm = reduxForm({
    form: 'signup'
    // validate
})(Form);

export default connect(null, { signup })(reduxLoginForm);
