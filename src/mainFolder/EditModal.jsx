import { Modal } from "@mui/material";
import SignUp from "./SignUp";

const EditUserModal = ({openEdit, handleCloseEdit, edit, allData}) => {
  return (
    <Modal
    open={openEdit}
    onClose={handleCloseEdit}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <SignUp handleCloseEdit={handleCloseEdit} edit={edit} allData={allData} />
    </Modal>
  );
};

export default EditUserModal