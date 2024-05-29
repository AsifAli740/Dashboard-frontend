import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { Box, Typography } from "@mui/material";
import "./index.css";
import EditUserModal from "../mainFolder/EditModal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { contextVal } from "./context";
import { ViewModal } from "./ViewModal";
import { BASE_URL } from "./constant";
function ActiveUsers() {
  const [data, setData] = useState([]);
  const [view, setView] = useState("");
  const [edit, setEdit] = useState("");
  const [open, setOpen] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);

  const handleOpenEdit = (id) => {
    const user = data.find((ele) => ele._id === id);
    setEdit(user);
    setActiveEdit(true);
  };
  const handleCloseEdit = () => setActiveEdit(false);
  const context = useContext(contextVal);
  const handleOpen = (id) => {
    const user = data.find((ele) => ele._id === id);
    setView(user);

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const allData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}alldata`
      );

      const activeUser = response.data.filter((ele) => {
        return ele.isActive === true;
      });
      setData(activeUser);
    } catch (error) {}
  };
  const softDelete = async (data) => {
    const response = await axios.put(
      `${BASE_URL}deleterestore`,
      data
    );
    if (response) {
      context.setSnackbar({
        state: true,
        message: response.data.message,
        severity: response.data.status,
      });
      allData();
    } else {
      context.setSnackbar({
        state: true,
        message: response.data.message,
        severity: response.data.status,
      });
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
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#1976d2", color: "white" },
        }),
      },
    },
    {
      name: "name",
      label: "Full Name",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#1976d2", color: "white" },
        }),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#1976d2", color: "white" },
        }),
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#1976d2", color: "white" },
        }),
      },
    },
    {
      name: "_id",
      label: "Actions",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#1976d2",
            color: "white",
            display: "flex",
            justifyContent: "center",
          },
        }),
        customBodyRender: (data, value) => (
          <>
            <Box display="flex" gap="20px" justifyContent="space-around">
              <Box>

              <ModeEditIcon onClick={() => handleOpenEdit(data)}>

              </ModeEditIcon>
              <Typography variant="body2" >
                Edit
              </Typography>
              </Box>
              <Box>
                {/* <Button variant="contained">Edit</Button>
            <Button variant="contained">Delete</Button> */}
                <RemoveRedEyeIcon
                  sx={{
                    marginLeft: "5px",
                    cursor: "pointer",
                    color: "#1976d2",
                    fontSize: "25px",
                  }}
                  onClick={() => handleOpen(data)}
                ></RemoveRedEyeIcon>
                <Typography variant="body2" onClick={() => handleOpen(data)}>
                  View
                </Typography>
              </Box>
              {/* <Button variant="contained" onClick={() => handleOpen(data)}>
                View
              </Button> */}
              <Box>

              <DeleteIcon
                sx={{
                  cursor: "pointer",
                  marginLeft: "10px",
                  paddingBottom: "4px",
                    color: "#D11A2A",
                    fontSize:"25px"
                }}
                onClick={() => {
                  softDelete({
                    id: value.rowData[0],
                    isActive: false,
                  });
                }}
              ></DeleteIcon>
              <Typography variant="body2">Delete</Typography>
              </Box>
              {/* <Button
                variant="contained"
                onClick={() => {
                  softDelete({
                    id: value.rowData[0],
                    isActive: false,
                  });
                }}
              >
                Delete
              </Button> */}
            </Box>
          </>
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
    selectableRows: false,
  };

  return (
    <>
      <MUIDataTable data={data} columns={columns} options={options} />
      <EditUserModal
        openEdit={activeEdit}
        edit={edit}
        handleCloseEdit={handleCloseEdit}
        allData={allData}
      />
      <ViewModal open={open} data={view} handleClose={handleClose} />
    </>
  );
}

export default ActiveUsers;
