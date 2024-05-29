import * as React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

import { useContext } from "react";
import axios from "axios";
import { contextVal } from "./context";
import { BASE_URL } from "./constant";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({ modal, closeModal, allData, userid }) {
  const context = useContext(contextVal);
  const permanentDelete = async () => {

    try {
      const response = await axios.delete(
        `${BASE_URL}permanentdelete?id=${userid}`
      );

      if (response) {
        context.setSnackbar({
          state: true,
          message: response.data.message,
          severity: response.data.status,
        });
        allData();
        closeModal();
      } else {
        context.setSnackbar({
          state: true,
          message: response.data.message,
          severity: response.data.status,
        });
      }
    } catch (error) {
    }
  };

  return (
    <div>
      <Modal
        open={modal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography variant="h6">
              Are you sure you want to delete?
            </Typography>
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              marginTop={"10px"}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={permanentDelete}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}