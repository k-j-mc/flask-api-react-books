import React, { useState, useEffect } from "react";
import axios from "axios";
import { SnackbarProvider } from 'notistack';

import Notifications from "./components/Notifications";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader";
import ViewPreference from "./components/ViewPreference";


import './App.css';


function App() {

  const [bookData, setBookData] = useState([]);
  const [serverResponse, setServerResponse] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [reload, setReload] = useState(false);


  useEffect(() => {
      axios("/book/books")
        .then(response => {
          if(response.status === 200) {

            setServerResponse({
              "status": response.status,
              "message": "Data successfully loaded",
              "variant": "success"
            });


            return response;
  
          } else {

            setServerResponse({
              "status": response.status,
              "message": `Error code ${response.status} when loading data`,
              "variant": "error"
            });

          }
        })
        .then(response => {
          setBookData(response.data);
          setLoaded(true);
          setReload(false);
        });

    }, [reload]);


  return (
    <div>
      <SnackbarProvider 
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={2000}
      >
        <NavBar />
        {loaded === false ? (
          <>
            <Notifications data={serverResponse} />
            <Loader />
          </>
        ) : (
          <>
            <Notifications data={serverResponse} />
            <ViewPreference data={bookData} reload={reload} setReload={setReload} />
          </>
        )}
      </SnackbarProvider>
    </div>
  );
}

export default App;
