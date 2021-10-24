import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function SignUp() {
  return (
    <>
      <p>signin upページ</p>
      <Button variant="contained" component={Link} to="/profile">
        sign up
      </Button>
    </>
  );
}
