import React from 'react';



const PopupConfirm = (props) => {
    const {handleClick, text} = props;
    return (
        <div className="popup">
            <div className="popup__content">
                <p className="popup__text">{text}</p>
                <div className="popup__btns">
                    <button className="popup__btn popup__btn--yes" onClick={handleClick}>Yes</button>
                    <button className="popup__btn popup__btn--no" onClick={handleClick}>No</button>
                </div>
            </div>
        </div>
    );
};

export default PopupConfirm;