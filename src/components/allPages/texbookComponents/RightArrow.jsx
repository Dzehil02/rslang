import React from "react";

function RightArrow(props) {
    return (
        <div className="page__right-arrow" onClick={() => props.handleClickPageNext()}>
            <img src={props.image} alt="right-arrow"/>
        </div>
    )
}

export default RightArrow;