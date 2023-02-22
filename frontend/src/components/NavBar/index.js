import React from "react";
import { 
    AppBar,
    Box
 } from "@mui/material";

import PNGLogo from "../../images/booksdb smaller 2.png";
import "./navBar.css";

const NavBar = () => {

    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className="app-bar" color="inherit">
                <img src={PNGLogo} alt="header-logo" className="header-logo" />
            </AppBar>
            <div className="appBarShadow" />
        </Box>

    )
};

export default NavBar;