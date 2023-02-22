import React from "react";

import { Grid } from "@mui/material";


const EmptyList = () => {
    return(
        <div style={{ padding: "32px 0 0 0" }}>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12} style={{ padding: "0px 0 185px 0" }}>

                    <div style={{ textAlign: "center", fontSize: "20px", padding: "20px 0 20px 0" }}>No Results to return</div>
                    <div style={{ textAlign: "center", fontSize: "20px", padding: "20px 0 20px 0" }}>Please proceed by adding a new entry</div>
    
                </Grid>
            </Grid>
        </div>
    );
};

export default EmptyList;