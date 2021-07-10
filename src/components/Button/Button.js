import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ type, text, link, className }) => {
    return type === 'button' ? (
        <button type="submit" className={`btn ${className}`}>{text}</button>
    ) : (
        <Link to={link} className={`a-btn ${className}`}>
            {text}
        </Link>
    );
};
export default Button;
