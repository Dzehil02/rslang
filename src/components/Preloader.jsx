import React from "react";

function Preloader(){

    return (
        <div className='preloader' >
            <img src={require("../assets/load.gif")} alt="" />
        </div>
    )
}

export default Preloader;