import {
  Box,
 
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { ViewModal } from "./ViewModal";
import SearchIcon from "@mui/icons-material/Search";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { SearchIconWrapper, StyledInputBase, Search } from "../styled";
import { contextVal } from "./context";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { BASE_URL } from "./constant";
import { useDispatch } from "react-redux";
import { increment } from "./Redux/slice";

function UserDataTable(props) {
  const [view, setView] = useState("");
  const [data, setdata] = useState([]);
  const [allDataFromApi, setAllDataFromApi] = useState([]);
  const [open, setOpen] = useState(false);

  let context = useContext(contextVal)
  const dispatch = useDispatch()


  const handleOpen = (id) => {
    const user = data.find((ele) => ele._id === id);
    setView(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const allData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}alldata`
      );
      if (response.data) {
        setdata(response.data);
        setAllDataFromApi(response.data)
      } else {
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    allData();
  }, []);
  const columns = [
    {
      name: "_id",
      label: "id",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Full Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "_id",
      label: "Action",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (data) => (
          <Box width="60%" display="flex" justifyContent="center">
            <Box>

            {/* <Button variant="contained">Edit</Button>
            <Button variant="contained">Delete</Button> */}
            <RemoveRedEyeIcon sx={{marginLeft:"5px", cursor:"pointer",color:"#1976d2", fontSize:"25px"}} onClick={() => handleOpen(data)} >

            </RemoveRedEyeIcon>
            <Typography variant="body1" onClick={() => handleOpen(data)}>
              View
            </Typography>
            </Box>
          </Box>
        ),
      },
    },
  ];
  const options = {
    filter: false,
    download: false,
    search: false,
    print: false,
    viewColumns: false,
  };

  const finddata = (e) => {
    let searched = e.target.value.toLowerCase();
    if (searched) {
      let searchedData = allDataFromApi.filter(
        (ele) =>
          ele.name.toLowerCase().includes(searched) ||
          ele.email.toLowerCase().includes(searched) ||
          ele.email.toUpperCase().includes(searched) 

      );
      setdata(searchedData);
    } else {
      allData();
    }
  };

  const handleDownload = async (e, data) => {
    e.stopPropagation();
    const file = e.target.files[0];

    if (!file) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    let token = localStorage.getItem("token")

    try {
      const response = await axios.post(
        `${BASE_URL}uploaddocument`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        // context.setSnackbar({
        //   state: true,
        //   message: response.data.message,
        //   color: response.data.msgcolor,
        //   severity: response.data.status,
        // });
        dispatch(
          increment({
            state: true,
            message: response.data.message,
            severity: response.data.status,
          })
        );
        allData();
      } else {
        // context.setSnackbar({
        //   state: true,
        //   message: response.data.message,
        //   color: response.data.msgcolor,
        //   severity: response.data.status,

        // });
        dispatch(
          increment({
            state: true,
            message: response.data.message,
            severity: response.data.status,
          })
        );
      }
    } catch (err) {
    
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        
        
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            
            <Paper
              sx={{
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius:"4px"
              }}
            >
              <label for="file-upload">
                <Stack direction={"row"} sx={{ cursor: "pointer" }}>
                  <FileUploadIcon sx={{ color: "#0D1933" }} />
                  Upload Document
                </Stack>
              </label>
              {
                <input
                  id="file-upload"
                  type="file"
                  accept="text/csv"
                 
                  // style={{display:"none"}}
                  // onChange={(e) => e.stopPropagation()}
                  // onClick={handlepublicevent}
                  onChange={handleDownload}
                />
              }
            </Paper> 
          </Box>
          <Box>

        <Paper
              sx={{
                // padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight:"20px",

              }}
            >
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={finddata}
            />
          </Search>
          </Paper>
        </Box>
        
      </Stack>
      {/* <TableBox> */}
      <MUIDataTable data={data} columns={columns} options={options} />
      <ViewModal open={open} data={view} handleClose={handleClose} />

      {/* </TableBox> */}
    </Box>
  );
}
export default UserDataTable;
