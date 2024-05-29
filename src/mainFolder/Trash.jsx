import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { Box, Typography } from "@mui/material";
import "./index.css";
import { contextVal } from "./context";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteIcon from "@mui/icons-material/Delete";

import DeleteModal from "./DeleteModal";
import { BASE_URL } from "./constant";
function TrashUsers() {
  const [data, setData] = useState([]);
  const [view, setView] = useState("");
  const [modal, setModal] = useState(false);
  const openModal = (id) => {
    setModal(true);
    setView(id);
  };
  const closeModal = () => {
    setModal(false);
  };

  const context = useContext(contextVal);

  const allData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}alldata`
      );

      const activeUser = response.data.filter((ele) => {
        return ele.isActive === false;
      });
      setData(activeUser);
    } catch (error) {}
  };
  const restore = async (data) => {
    const response = await axios.put(
      `${BASE_URL}deleterestore`,
      data
    );
    if (response) {
      context.setSnackbar({
        state: true,
        message: "Restore Successfully",
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
            <Box display="flex" gap="20px">
              {/* <Button
                variant="contained"
                onClick={() => {
                  restore({
                    id: value.rowData[0],
                    isActive: true,
                  });
                }}
              >
                RESTORE
              </Button> */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <RestoreIcon
                  sx={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    paddingBottom: "4px",
                    color: "#5575a2",
                    fontSize: "25px",
                  }}
                  onClick={() => {
                    restore({
                      id: value.rowData[0],
                      isActive: true,
                    });
                  }}
                ></RestoreIcon>
                <Typography
                  variant="p"
                  onClick={() => {
                    restore({
                      id: value.rowData[0],
                      isActive: true,
                    });
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  Restore
                </Typography>
              </Box>

              {/* <Button
                variant="contained"
                onClick={() => openModal(value.rowData[0])}
              >
                Delete
              </Button> */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <DeleteIcon
                  sx={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    paddingBottom: "4px",
                    color: "#D11A2A",
                    fontSize: "25px",
                  }}
                  onClick={() => openModal(value.rowData[0])}
                ></DeleteIcon>
                <Typography
                  variant="p"
                  sx={{ cursor: "pointer" }}
                  onClick={() => openModal(value.rowData[0])}
                >
                  Delete
                </Typography>
              </Box>
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
      <DeleteModal
        modal={modal}
        closeModal={closeModal}
        allData={allData}
        userid={view}
      />
    </>
  );
}

export default TrashUsers;
