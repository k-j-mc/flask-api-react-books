import React, { useEffect, useState } from "react";

import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";

import "semantic-ui-flag/flag.min.css";  

import defaultData from "../../utils/defaultData";

import Notifications from "../Notifications";
import ImagePlaceHolder from "../ImagePlaceHolder";
import ModalInfo from "../ModalInfo";


const BookList =  (props) => {

  const [dataSet, setDataSet] = useState(props.data);
  const [dataItem, setDataItem] = useState([]);
  const [notiData, setNotiData] = useState({ "message": undefined, "variant": "" });

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {

      setDataSet(props.data);

  }, [props.data]);


  const handleClick = (e) => {

    setDataItem(e.index);
    props.setCreateNew(false);
    props.setModalOpen(true)

  };


  window.addEventListener("resize", function(event){

    setWindowWidth(window.innerWidth);

  });

  return(
    <div>
      <List>
        {dataSet.map((d, i) => (

          <div 
            key={i}
            value={d}
          >          
            <ListItem 
              alignItems="flex-start" 
              style={{ height: "350px", overflow: "hidden" }}
              onClick={() => { handleClick({...d, "index": i}) }}
            >

              <ListItemAvatar>
                <ImagePlaceHolder imgData={d.image} rating={d.rating} imageType="small" />
              </ListItemAvatar>

              <ListItemText
                key={d}
                primary={
                  <Typography
                      sx={{ display: 'inline', fontSize: "20px" }}
                      component="span"
                      color="text.primary"
                    >
                    {d.title + " (" + d.published + ")"}
                  </Typography>
                }
                style={{ padding: "0 30px 50px 50px" }}
                disableTypography
                secondary={
                  <>
                  
                    <div style={{ padding: "10px 0 0 0" }} />

                    <Typography
                      sx={{ display: "inline", fontSize: "15px" }}
                      component="span"
                      color="text.primary"
                    >
                      {d.author}
                    </Typography>
                    <div style={{ padding: "10px 0 0 0" }} />

                    <i className={d.language + " flag"} style={{ margin: "0 0 0 2px" }}></i>

                    <div style={{ padding: "10px 0 0 0" }} />

                    <Rating name="half-rating-read" value={d.rating / 2} precision={0.5} readOnly style={{ margin: "0 0 0 -3px" }} />
                    
                    <div style={{ padding: "10px 0 0 0" }} />
                    

                  {windowWidth > 450 ? (

                    <Typography
                      sx={{ display: "inline", fontSize: "13px" }}
                      component="span"
                      color="text.primary"
                    >
                      {d.description.length > 300 ? (
                        <>                
                          {d.description.substring(0, 300) + "..."}
                        </>
                      ) : (
                        <>                
                          {d.description}
                        </>
                      )}
                    </Typography>
                  ) : (
                    <>
                    </>
                  )}

                  </>
                }
              />
            </ListItem>
           
            <Divider />
          </div>
        ))} 
      </List> 


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

export default BookList;