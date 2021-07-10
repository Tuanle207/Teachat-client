import React from 'react';
import {connect} from 'react-redux';
import {showSearchPeople} from '../../../../actions';

import svgIcon from '../../../../img/sprite.svg'
import './BottomBar.css';

class BottomBar extends React.Component {

    
    render() {
        return (
            <div className="bottom-bar">
                <button className="bottom-bar__button" onClick={this.props.showSearchPeople.bind(null, true)}>
                    <svg className="bottom-bar__icon">
                        <use xlinkHref={`${svgIcon}#icon-user-plus`}></use>
                    </svg>
                    <span className="bottom-bar__text">
                    Add friend
                    </span>
                </button>
                <button className="bottom-bar__button">
                    <svg className="bottom-bar__icon">
                        <use xlinkHref={`${svgIcon}#icon-cog`}></use>
                    </svg>
                    <span className="bottom-bar__text">
                    Settings
                    </span>
                </button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.authReducer.user,
        UIState: state.UIState
    };
}
export default connect(mapStateToProps, {showSearchPeople})(BottomBar);