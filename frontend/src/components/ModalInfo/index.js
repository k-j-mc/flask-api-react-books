import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Box,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Modal,
    Rating,
    TextField,
} from "@mui/material";

import 'semantic-ui-flag/flag.min.css'  


import countryList from "../../utils/countryList";

import Icons from "../Icons/";

import ImagePlaceHolder from "../ImagePlaceHolder";
  

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    minHeight: '50vh',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: "15px",
    overflow: 'scroll',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


const ModalInfo = (props) => {

    const [data, setData] = useState(props.modalData);
    const [anchorEl, setAnchorEl] = useState(null);

    const openMenu = Boolean(anchorEl);

    const min = 0;
    const max = new Date().getFullYear();

    const newId = props.newId;
    

    useEffect(() => {

        setData(props.modalData);

    }, [props.modalState]);
  

    const sendNotification = (e) => {

        if(e.message === "new") {
            props.setNotiData({ 
                "message": `Successful entry creation: ${data.title}!`,
                "variant": "success" 
            });
        }
        if(e.message === "save") {
            props.setNotiData({ 
                "message": `Successfully saved: ${data.title}!`,
                "variant": "success" 
            });

        }
        if(e.message === "delete") {
            props.setNotiData({ 
                "message": `Successfully deleted: ${data.title}!`,
                "variant": "success" 
            });

        }
        if(e.message === "error") {
            props.setNotiData({ 
                "message": `Error code ${e.status}! Unable to process ${data.title}.`,
                "variant": "error" 
            });

        }
    }


    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
      setAnchorEl(null);
    };


  const handleTitle = (e) => {
    if(e.target.value !== undefined) {
        setData({...data, "title": e.target.value });
    };
  };

  const handleDescription = (e) => {
    if(e.target.value !== undefined) {
        setData({...data, "description": e.target.value });
    };
  };

  const handleGenre = (e) => {
    if(e.target.value !== undefined) {
        setData({...data, "genre": e.target.value });
    };
  };

  const handleRating = (e) => {
    if(e.target.value !== undefined) {
        setData({...data, "rating": e.target.value * 2 });
    };
  };

  const handleLanguage = (e) => {
    if(e !== undefined) {
        setData({...data, "language": e });
    };
  };

  const handleAuthor = (e) => {
    if(e.target.value !== undefined) {
        setData({...data, "author": e.target.value });
    };
  };

  const handlePublished = (e) => {
    if(e !== undefined) {
        setData({...data, "published": e });
    };
  };

  const handlePublisher = (e) => {
    if(e.target.value !== undefined) {
        setData({...data, "publisher": e.target.value });
    };
  };

  const onChangePicture = async (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setData({...data, "image": reader.result});
      });
      reader.readAsDataURL(e.target.files[0]);
    };
  };
  


const saveNew = () => {

    setData({ ...data, "id": newId });

    axios.post("/book/books", ({ ...data, "id": newId }))
        .then(response => {
            if(response.status === 201) {
                
                props.setReload(true);

                sendNotification({ "message": "new", "status": response.status })

                props.setModalOpen(false);


                return response;

            };
        })
        .catch(error => {
            sendNotification({ "message": "error", "status": error.response.status })  
        })

};



const saveChanges = () => {

    axios.put(`/book/book/${data.id}`, data)
        .then(response => {

            if(response.status === 200) {

                props.setReload(true);

                sendNotification({ "message": "save", "status": response.status })

                props.setModalOpen(false);


                return response;

            } ;
        })
        .catch(error => {
            sendNotification({ "message": "error", "status": error.response.status })  
        })


};

const deleteInfo = () => {

    axios.delete(`/book/book/${data.id}`)
    .then(response => {

        if(response.status === 200) {
 
            props.setReload(true);

            sendNotification({ "message": "delete", "status": response.status })

            props.setModalOpen(false);

            return response;

        };
    })
    .catch(error => {
        sendNotification({ "message": "error", "status": error.response.status })  
    })


};

    return(
        <Modal
            open={props.modalState}
            onClose={() => props.setModalOpen(false)}
        >
            <Box sx={{ ...style }}>

                <Grid container spacing={2} style={{ alignItems: "left", justifyContent: "left" }}>
                    
                    <Grid item xs={12} md={0}> 
                        <IconButton 
                            variant="contained" 
                            style={{ 
                                position: "absolute", 
                                right: "20px", 
                                marginTop: "0px", 
                                borderRadius: "50px" 
                            }} 
                            onClick={() => props.setModalOpen(false)}
                        >
                            <Icons.CloseIcon  />
                        </IconButton>

                    </Grid> 
                    

                    <Grid 
                        item 
                        xs={12} md={6} lg={4} 
                        style={{
                            height: "600px", 
                            left: "10px",
                            
                        }}
                    >

                        <ImagePlaceHolder imgData={data.image} rating={data.rating} imageType="static" />
                       
                        <Button
                            color="primary"
                            variant="contained"
                            style={{ 
                                position: "absolute",
                                top: "580px",
                                left: "180px",
                                borderRadius: "50px",
                                display: "flex",
                                justifyContent: "center",
                                padding: "10px 20px 10px 20px",
                                backgroundColor: "#afecfd"  
                             }}
                            component="label"
                        >                            
                        <input
                            type="file"
                            className="playerProfilePic_home_title"
                            onChange={onChangePicture}
                            hidden
                        />
                            <Icons.Edit style={{ fontSize: "20px", padding: "0 10px 0 10px", color: "#505050" }} />

                        </Button>
                        
                    </Grid>
        

                    <Grid item xs={12} md={5} lg={7}>

                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="Title" 
                            variant="outlined" 
                            autoComplete="off"
                            defaultValue={data.title} 
                            onChange={(e) => handleTitle(e)}
                        />


                        <div style={{ padding: "30px 0 0 0" }} />

                        <TextField 
                            fullWidth 
                            multiline
                            id="outlined-basic" 
                            label="Storyline" 
                            variant="outlined"
                            autoComplete="off" 
                            defaultValue={data.description} 
                            onChange={(e) => handleDescription(e)}
                        />

        
                        <Grid container spacing={2} style={{ paddingBottom: "50px" }}>

                            <Grid item xs={6}>
                            
                            <div style={{ padding: "50px 0 0 0" }} />

                            <TextField 
                                fullWidth 
                                id="outlined-basic" 
                                label="Genre" 
                                variant="outlined" 
                                autoComplete="off"
                                defaultValue={data.genre} 
                                onChange={(e) => handleGenre(e)}
                            />

                            <div style={{ padding: "30px 0 0 0" }} />

                            <TextField 
                                fullWidth 
                                id="outlined-basic" 
                                label="Rating" 
                                variant="outlined" 
                                autoComplete="off"
                                disabled={true}
                                InputProps={{
                                    startAdornment: 
                                        <InputAdornment position="start">
                                            <Rating
                                                name="hover-feedback"
                                                value={data.rating / 2}
                                                precision={0.5}
                                                max={5}
                                                onClick={(e) => handleRating(e)} 
                                            />
                                        </InputAdornment> 
                                }} 
                            />

                            <div style={{ padding: "30px 0 0 0" }} />

                            <TextField 
                                fullWidth 
                                id="outlined-basic" 
                                label="Language" 
                                variant="outlined" 
                                autoComplete="off"
                                disabled={true}
                                InputProps={{ 
                                    startAdornment: 
                                        <InputAdornment position="start">
                                            <i className={data.language + " flag"}></i>
                                            {countryList.map((d, i) => (
                                                <div
                                                    key={i}
                                                    value={d}
                                                >
                                                    {d.value === data.language && (
                                                        <>
                                                            {d.name}
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                               
                                        </InputAdornment>, 

                                    endAdornment: 
                                        <InputAdornment position="end">
                                            <IconButton 
                                                onClick={handleMenuClick}
                                                size="small"
                                                sx={{ ml: 2 }}
                                                style={{ position: "absolute", marginLeft: "-30px" }}
                                            >
                                                <Icons.ArrowDropDownIcon />
                                            </IconButton>

                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={openMenu}
                                                onClose={handleCloseMenu}
                                                onClick={handleCloseMenu}
                                                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                                            >
                                                {countryList.map((d, i) => (
                                                    <MenuItem 
                                                        onClick={() => handleLanguage(d.value)} 
                                                        key={i}
                                                        value={d.value}
                                                    >
                                                        <i className={d.value + " flag"} /> 
                                                        {d.name}
                                                    </MenuItem> 
                                                ))}
                                            </Menu>
                                        </InputAdornment>
    
                                }}
                            />

                        </Grid>


                        <Grid item xs={6}>
                            <div style={{ padding: "50px 0 0 0" }} />

                            <TextField 
                                fullWidth 
                                id="outlined-basic" 
                                label="Author" 
                                variant="outlined" 
                                autoComplete="off"
                                defaultValue={data.author} 
                                onChange={(e) => handleAuthor(e)}
                            />

                            <div style={{ padding: "30px 0 0 0" }} />

                            <TextField 
                                fullWidth
                                type="number"
                                inputProps={{ min, max }}
                                label="Published" 
                                variant="outlined" 
                                autoComplete="off"
                                value={data.published} 
                                onChange={(e) => {
                                    var value = parseInt(e.target.value, 10);
                            
                                    if (value > max) value = max;
                                    if (value < min) value = min;

                                    handlePublished(value);
                                }}
                            />

                            <div style={{ padding: "30px 0 0 0" }} />

                            <TextField 
                                fullWidth 
                                id="outlined-basic" 
                                label="Publisher" 
                                variant="outlined" 
                                autoComplete="off"
                                defaultValue={data.publisher} 
                                onChange={(e) => handlePublisher(e)}
                            />

                        </Grid> 

                        </Grid> 
                    </Grid>
                    <div style={{ margin: "auto", padding: "30px 0 0 0" }}>

                        {props.createNew === true ? (
                            <Button 
                                variant="contained" 
                                style={{ 
                                    borderRadius: "50px", 
                                    marginRight: "10px", 
                                    padding: "10px 20px 10px 10px",
                                    backgroundColor: "rgba(99,255,107,0.5)",
                                }} 
                                sx={{ textTransform: "none" }} 
                                color="success"
                                onClick={() => saveNew()}
                            >
                                <Icons.SaveAs style={{ padding: "0 10px 0 5px", color: "#505050" }}  />
                                <div style={{ color: "#505050" }}>
                                    Save entry
                                </div>
                            </Button>
                        ) : (
                            <>
                                <Button 
                                    variant="contained" 
                                    style={{ 
                                        borderRadius: "50px", 
                                        marginRight: "10px", 
                                        padding: "10px 20px 10px 10px",
                                        backgroundColor: "rgba(99,255,107,0.5)",
                                    }} 
                                    sx={{ textTransform: "none" }} 
                                    color="success"
                                    onClick={() => saveNew()}
                                >
                                    <Icons.AddOutline style={{ padding: "0 10px 0 5px", color: "#505050" }}  />
                                    <div style={{ color: "#505050" }}>
                                        Save as new entry
                                    </div>
                                </Button>
                                <Button 
                                    variant="contained" 
                                    style={{ 
                                        borderRadius: "50px", 
                                        marginRight: "10px", 
                                        padding: "10px 20px 10px 10px",
                                        backgroundColor: "rgba(97,218,251,0.5)" 
                                    }} 
                                    sx={{ textTransform: "none" }} 
                                    // color="primary"
                                    onClick={() => saveChanges()}
                                >
                                    <Icons.SaveAs style={{ padding: "0 10px 0 5px", color: "#505050" }}  />
                                    <div style={{ color: "#505050" }}>
                                        Save entry
                                    </div>
                                </Button>
                                <Button 
                                    variant="contained" 
                                    style={{ 
                                        borderRadius: "50px", 
                                        marginRight: "10px", 
                                        padding: "10px 20px 10px 10px",
                                        backgroundColor: "rgba(254,102,102,0.5)" 
                                    }} 
                                    color="error"
                                    sx={{ textTransform: "none" }}
                                    onClick={() => deleteInfo()}
                                >
                                    <Icons.Delete style={{ padding: "0 10px 0 5px", color: "#505050" }}  />
                                    <div style={{ color: "#505050" }}>
                                        Delete entry
                                    </div>
                                </Button>
                            </>
                        )}
                            
                    </div>
                </Grid> 
            </Box>
        </Modal>
    );
};

export default ModalInfo;