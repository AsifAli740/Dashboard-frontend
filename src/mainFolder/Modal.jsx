import { Box, Button, Modal, Typography } from "@mui/material";
import SignUp from "./SignUp";
export const BasicModal = ({ signUpOpen, handleClose }) => {
  return (
    <Modal
      open={signUpOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      
        <SignUp handleClose={handleClose} />
        
      
    </Modal>
  );
};