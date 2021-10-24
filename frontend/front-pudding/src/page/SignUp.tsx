import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    textAlign: 'center',
    minHeight: "85vh",
    padding: "0 0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "85vh"
  },
}));

export default function SignUp() {
  return (
    <>
      <p>signin upページ</p>
    </>
  );
}
