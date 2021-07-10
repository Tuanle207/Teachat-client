import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {PointSpreadLoading} from 'react-loadingg';

import './LoginForm.css';
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo';
import Login from './Login/Login';
import {checkLoggedIn} from '../../actions'

class LoginForm extends React.Component {

    componentDidMount() {
        this.props.checkLoggedIn();
        document.title = 'Teachat | Login'
    }
    
    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to="/" />
        }
        if (this.props.UIState.loginLoading) {
            return <PointSpreadLoading />;
        }

        return (
            <div className="login-wrapper">
                <BackgroundVideo />
                <Login />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const isLoggedIn = state.authReducer.loggedIn;
    return {isLoggedIn, UIState: state.UIState};
}

export default connect(mapStateToProps, {checkLoggedIn})(LoginForm);
