import React from "react";
import {
    CircularProgress,
  } from "@mui/material";

const Loader = () => {
    return(
        <>
            <CircularProgress className="loaderCircle" />
            <div className="loaderBG" />
        </>
    );
};

export default Loader;