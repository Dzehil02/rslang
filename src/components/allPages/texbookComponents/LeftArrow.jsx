import React from "react";

function LeftArrow(props) {
    return (
        <div className="page__left-arrow" onClick={() => props.handleClickPagePrev()}>
            <img src={props.image} alt="left-arrow"/>
        </div>
    )
}

export default LeftArrow;