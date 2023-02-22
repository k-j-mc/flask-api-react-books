import React, { useEffect, useState } from "react";

import {
    Badge,
    Grid,
    Rating
  } from "@mui/material";

  import Notifications from "../Notifications";

import defaultData from "../../utils/defaultData";

import ImagePlaceHolder from "../ImagePlaceHolder";

import ModalInfo from "../ModalInfo";


const BookGrid = (props) => {
  
  const [dataSet, setDataSet] = useState(props.data);
  const [dataItem, setDataItem] = useState([]);
  const [notiData, setNotiData] = useState({ "message": undefined, "variant": "" });  


  useEffect(() => {

      setDataSet(props.data);

  }, [props.data])

  const handleClick = (e) => {

    setDataItem(e.index);
    props.setCreateNew(false);
    props.setModalOpen(true)

  };


  return(
      <div style={{ padding: "40px 72px 0 0" }}>
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
              <Grid item xs={12}>
                  <Grid container justifyContent="center" spacing={2}>
              
                      {dataSet.map((d, i) => (

                          <Grid  
                              key={i}
                              value={d}
                              // ref={ref}
                              item 
                              style={{ padding: "0px 0 185px 0" }}
                              onClick={() => { handleClick({...d, "index": i}) }}
                          >
                            <div className="zoomImg">
                              <ImagePlaceHolder imgData={d.image} rating={d.rating} imageType="grid" />

                              <div  className="zoomRate" style={{ position: "absolute", margin: "90px 0 0 50px" }}>
                                <Badge badgeContent={d.rating / 2} color="primary">
                                  <Rating value={1} max={1} readOnly size="large" />
                                </Badge>
                              </div>

                            </div>

                          </Grid>

                      ))}

                  </Grid>
              </Grid>
          </Grid>

      {props.modalState === true && props.createNew === false ? (
        <>
          <ModalInfo 
            modalData={dataSet[dataItem]}
            newId={props.data.length + 1} 
            setModalOpen={props.setModalOpen} 
            modalState={props.modalState}
            createNew={props.createNew} 
            setCreateNew={props.setCreateNew}
            notiData={notiData} 
            setNotiData={setNotiData}
            reload={props.reload}
            setReload={props.setReload}
          />
        </>
      ) : props.modalState === true && props.createNew === true ? (
        <>
        <ModalInfo 
          modalData={defaultData[0]} 
          newId={props.data.length + 1} 
          setModalOpen={props.setModalOpen} 
          modalState={props.modalState}
          createNew={props.createNew} 
          setCreateNew={props.setCreateNew}
          notiData={notiData} 
          setNotiData={setNotiData}
          reload={props.reload}
          setReload={props.setReload}
        />
      </>
      ) : (
        <>
        </>
      )}

      {notiData.message !== undefined && (
        <Notifications data={notiData} />
      )}
        </div>
    );  
};

export default BookGrid;