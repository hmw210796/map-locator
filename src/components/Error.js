import React from "react";
import { Snackbar, Alert } from "@mui/material";

const Error = (props) => {
  return (
    <>
      <Snackbar
        autoHideDuration={2000}
        open={props.error ? true : false}
        onClose={props.onClose}
      >
        <Alert
          severity="error"
          onClose={props.onClose}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {props.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Error;
