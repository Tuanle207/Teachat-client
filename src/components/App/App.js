import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import './App.css';
import Chat from '../Chat/Chat';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route path="/login" exact component={LoginForm} />
                <Route path="/" exact component={Chat} />
            </BrowserRouter>
        );
    }
}

export default App;
