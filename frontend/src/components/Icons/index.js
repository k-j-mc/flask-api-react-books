import React, { forwardRef } from "react";

import Add from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Close from "@mui/icons-material/Close";
import DeleteOutline from "@mui/icons-material//DeleteOutline";
import Edit from "@mui/icons-material/Edit";
import SaveAs from "@mui/icons-material/SaveAs";
import Search from "@mui/icons-material/Search";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";


const Icons = {
  
  AddOutline: forwardRef((props, ref) => <Add {...props} ref={ref} />),
  ArrowDropDownIcon: forwardRef((props, ref) => <ArrowDropDownIcon {...props} ref={ref} />),
  CloseIcon: forwardRef((props, ref) => <Close {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  SaveAs: forwardRef((props, ref) => <SaveAs {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref}  style={{ color: "#34d3ff" }} />),
  ViewListIcon: forwardRef((props, ref) => <ViewListIcon {...props} ref={ref} />),
  ViewModuleIcon: forwardRef((props, ref) => <ViewModuleIcon {...props} ref={ref} />)

};


export default Icons;