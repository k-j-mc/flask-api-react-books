import React from "react";

import "./imagePlaceHolder.css"

const ImagePlaceHolder = ({ imgData, imageType }) => {

    return (
        <div className={imageType + "ImageContainer"}>
            <img src={imgData} 
                className={imageType + "imagePlaceHolder"}
                alt={imageType + "imagePlaceHolder"}
            />

        </div>
    );
};

export default ImagePlaceHolder;