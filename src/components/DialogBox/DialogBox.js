import React from 'react';

const DialogBox = () => {
    return (
        <div className="dialog-box">
            <svg className="dialog-box__icon">
               <use xlinkHref="/img/icon/sprite.svg#icon-info"></use>
            </svg>
            <p className="dialog-box__text">This feature is currently unavailable!</p>
      </div>
    )
}

export default DialogBox;