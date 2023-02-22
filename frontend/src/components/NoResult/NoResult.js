import React from "react";

import { Grid } from "@mui/material";

import NoResultIMG from "../../images/no result.png";


const NoResult = ({ searchQuery }) => {
    return(
        <div style={{ padding: "32px 0 0 0" }}>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12} style={{ padding: "0px 0 185px 0" }}>

                    <img src={NoResultIMG} alt="noResultImage" style={{ height: "15%", display: "block", marginLeft: "auto", marginRight: "auto" }} />

                    <div style={{ textAlign: "center", padding: "0 0 20px 0" }}>{searchQuery}</div>
                    <div style={{ textAlign: "center", fontSize: "20px", padding: "20px 0 20px 0" }}>Returned no results...</div>
    
                </Grid>
            </Grid>
        </div>
    );
};

export default NoResult;