import React from 'react';

import './Spinner.css';
import svgIcon from '../../img/sprite.svg';

const Spinner = ({color}) => {
    let style = {};
    if (color) {
        style.fill = color;
    }  
    return (
    <div className="spinner">
        <svg className="spinner__icon" style={style}>
            <use xlinkHref={`${svgIcon}#icon-spinner`}></use>
        </svg>
    </div>)
    }
export default Spinner;