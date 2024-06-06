import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "./Redux/slice";
export const SuccessSnackbar = ({ snackbar, setSnackbar }) => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  console.log(count,"jhsaja");
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    // setSnackbar({
    //   state: false,
    //   message: null,
    //   severity: null,
    // });
    dispatch(
      increment({
        state: false,
        message: null,
        severity: null,
      })
    );
  };
  return (
    <Snackbar open={count?.state} autoHideDuration={4000} onClose={handleSnackbarClose}>
      <Alert
        onClose={handleSnackbarClose}
        severity={count?.severity === "success" ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {count?.message}
      </Alert>
    </Snackbar>
  );
};
