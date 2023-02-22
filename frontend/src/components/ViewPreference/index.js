import React, { useEffect, useState } from "react";

import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";

import filterParams from "../../utils/filterParams";

import Icons from "../Icons/";

import BookList from "./BookList";
import BookGrid from "./BookGrid";
import NoResult from "../NoResult/NoResult";
import EmptyList from "../NoResult/EmptyList";


const ViewPreference = (props) => {

  const [filterName, setFilterName] = useState("No filter");
  const [filterType, setFilterType] = useState(0);
  const [viewOption, setViewOption] = useState(0);
  const [data, setData] = useState(props.data);
  const [reformattedData, setReformattedData] = useState(props.data);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [newEntry, setNewEntry] = useState(false);

  useEffect(() => {

    setData(props.data);
    setReformattedData(props.data);
    setSearchQuery("");
    setFilterType(0);

  }, [props.data]);


  const handleView = (e) => {
      if(e === 1) {
          setViewOption(1);
      } else {
          setViewOption(0);
      }
  };

  const handleChange = (event) => {

      setFilterType(event.target.value);
      setFilterName(filterParams[event.target.value].type);

    };


  useEffect(() => {

    if(filterType === 0){
        setReformattedData(data);
    };

    if(searchQuery == "") {
      if(filterType === 1){
        const AZ = [...data].sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
        setReformattedData(AZ);
      };
      if(filterType === 2){
          const ZA = [...data].sort((a, b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0));
          setReformattedData(ZA);
      };
      if(filterType === 3){
          const HiLoRating = [...data].sort((a, b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0));
          setReformattedData(HiLoRating);
      };
      if(filterType === 4){
          const LoHiRating = [...data].sort((a, b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0));
          setReformattedData(LoHiRating);
      };
      if(filterType === 5){
          const HiLoYear = [...data].sort((a, b) => (a.published > b.published) ? 1 : ((b.published > a.published) ? -1 : 0));
          setReformattedData(HiLoYear);
      };
      if(filterType === 6){
          const LoHiYear = [...data].sort((a, b) => (a.published < b.published) ? 1 : ((b.published < a.published) ? -1 : 0));
          setReformattedData(LoHiYear);
      };
    } else {
        if(filterType === 1){
          const AZ = [...data].sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
          setFilteredData(AZ);
        };
        if(filterType === 2){
            const ZA = [...data].sort((a, b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0));
            setFilteredData(ZA);
        };
        if(filterType === 3){
            const HiLoRating = [...data].sort((a, b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0));
            setFilteredData(HiLoRating);
        };
        if(filterType === 4){
            const LoHiRating = [...data].sort((a, b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0));
            setFilteredData(LoHiRating);
        };
        if(filterType === 5){
            const HiLoYear = [...data].sort((a, b) => (a.published > b.published) ? 1 : ((b.published > a.published) ? -1 : 0));
            setFilteredData(HiLoYear);
        };
        if(filterType === 6){
            const LoHiYear = [...data].sort((a, b) => (a.published < b.published) ? 1 : ((b.published < a.published) ? -1 : 0));
            setFilteredData(LoHiYear);
        };
      
    };

  }, [filterType, searchQuery]);


  useEffect(() => {

    if(searchQuery !== "" && filteredData.length == 0) {
      setReformattedData(reformattedData.filter((d) => (d.author + " " + d.title + " " + d.description + " " + d.published + " " + d.publisher + " " + d.genre).toLowerCase().includes(searchQuery)));
    };
    if(searchQuery !== "" && filteredData.length > 0) {
      setReformattedData(filteredData.filter((d) => (d.author + " " + d.title + " " + d.description + " " + d.published + " " + d.publisher + " " + d.genre).toLowerCase().includes(searchQuery)));
    };

  }, [searchQuery, filteredData, filterType]);
     

  const handleNewEntry = () => {
    setOpen(true);
    setNewEntry(true);
  };


  return(
 
    <div>
      <Grid container spacing={2}  style={{ paddingBottom: "30px", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <Grid item xs={12}>

          <Button 
            variant="contained" 
            style={{ 
              borderRadius: "50px", 
              marginRight: "10px", 
              padding: "10px 20px 10px 10px",
              backgroundColor: "rgba(99,255,107,0.5)",
            }} 
            sx={{ textTransform: "none" }} 
            onClick={() => handleNewEntry("new")}
          >
            <Icons.AddOutline style={{ padding: "0 10px 0 5px", color: "#505050" }}  />
            <div style={{ color: "#505050" }}>
                Add new entry
            </div>
          </Button>

        </Grid>
      </Grid>

      <Grid container spacing={2}  style={{ paddingBottom: "30px", alignItems: "center", justifyContent: "center" }}>
        <Grid item xs={10}>
          <TextField  
            placeholder="Search..."
            sx={{
              '& label.Mui-focused': {
                color: "#1976d2",
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: "#1976d2",
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: "#c4c4c4",
                  borderRadius: "200px"
                },
                '&:hover fieldset': {
                  borderColor: "#c4c4c4",
                },
                '&.Mui-focused fieldset': {
                  borderColor: "#1976d2",
                },
              },
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            fullWidth
            autoComplete="off"
            InputProps={{
              endAdornment:( 
                <Icons.Search /> 
              )
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ paddingBottom: "30px", alignItems: "center", justifyContent: "center" }}>
        <Grid item>
          <FormControl 
            sx={{
              '& label.Mui-focused': {
                color: "#1976d2",
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: "#1976d2",
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: "#c4c4c4",
                  borderRadius: "200px"
                },
                '&:hover fieldset': {
                  borderColor: "#c4c4c4",
                },
                '&.Mui-focused fieldset': {
                  borderColor: "#1976d2",
                },
              },
              width: "188px",
              minWidth: "10vw"
            }}
          >
            <InputLabel id="demo-multiple-name-label">Filter</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => handleChange(e)}
                input={<OutlinedInput label="Filter" />}
              >
                {filterParams.map((d, i) => (
                  
                  <MenuItem
                    key={d.type}
                    value={d.id}
                  >
                    {d.type}
                  </MenuItem>
                  
                ))}
              </Select>
            </FormControl>

            <ToggleButtonGroup
              orientation="horizontal"
              value={viewOption}
              exclusive
              style={{ padding: "3px 0 0 20px" }}
            >
              <ToggleButton value="list" aria-label="list" onClick={() => { handleView(0) }} >
                  <Icons.ViewListIcon sx={{ color: viewOption === 0 ? "#34d3ff" : "" }}  />
              </ToggleButton>
              <ToggleButton value="module" aria-label="module" onClick={() => { handleView(1) }} color={viewOption === 0 ? "secondary" : "primary"}>
                  <Icons.ViewModuleIcon sx={{ color: viewOption === 1 ? "#34d3ff" : "" }} />
              </ToggleButton>
            </ToggleButtonGroup>
        </Grid>
      </Grid>


        {data.length > 0 ? (
          <>
            {reformattedData.length > 0 && viewOption === 0 ? (
              <BookList 
                data={reformattedData} 
                setModalOpen={setOpen} 
                modalState={open} 
                createNew={newEntry} 
                setCreateNew={setNewEntry}
                reload={props.reload}
                setReload={props.setReload}
              />

            ) : reformattedData.length > 0 && viewOption === 1 ? (
              <BookGrid 
                data={reformattedData} 
                setModalOpen={setOpen} 
                modalState={open} 
                createNew={newEntry} 
                setCreateNew={setNewEntry}
                reload={props.reload}
                setReload={props.setReload}
              />
            ) : (
              <NoResult searchQuery={searchQuery} />
            )}
          </>
        ) : (
          <EmptyList />
        )}
    </div>

  );
  
};

export default ViewPreference;