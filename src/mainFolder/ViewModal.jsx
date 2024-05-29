import { Box, Button, Modal, Typography } from "@mui/material";
import ProfileCard from "./UserProfile";
import ViewProfileCard from "./ViewProfileCard";
export const ViewModal = ({ open, handleClose , data}) => {
  return (


    
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        

        <ViewProfileCard onClose={handleClose}  data={ data}/>
      
        
      
    </Modal>
  );
};