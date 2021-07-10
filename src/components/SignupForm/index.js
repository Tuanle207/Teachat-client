import React from 'react';
import Form from './Form';
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo';

class SignupForm extends React.Component {

    componentDidMount() {
        document.title = 'Teachat | Sign up new account'
    }
    
    render() {
        return (
            <div className="login-wrapper">
                <BackgroundVideo />
                <Form />
            </div>
        );
    }
}

export default SignupForm;
