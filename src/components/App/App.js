import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/index';
import './App.css';
import Chat from '../Chat/Chat';
import createBrowserHistory from 'history/createBrowserHistory'

export const history = createBrowserHistory();

class App extends React.Component {

    render() {
        return (
            <>
                <Router history={history}>
                    <Route path="/login" exact component={LoginForm} />
                    <Route path="/signup" exact component={SignupForm} />
                    <Route path="/" exact component={Chat} />
                    <Redirect to="/login" />
                </Router>
                <ToastContainer />
            </>
        );
    }
}

export default App;
