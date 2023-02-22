import React, { useEffect } from "react";
import { useSnackbar } from "notistack";


const Notifications = ({ data }) => {

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if(data.message !== undefined){

            enqueueSnackbar(data.message, { variant: data.variant, preventDuplicate: true });

        };
    }, [data]);
  
};

export default Notifications;