import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function TopPage() {
  return (
    <>
      <p>トップページ</p>
      <Button variant="contained" component={Link} to="/signup">
        sign upして初める
      </Button>
      <p>トップページ</p>
      <p>トップページ</p>
      <p>トップページ</p>
      <p>トップページ</p>
      <p>トップページ</p>
      <p>トップページ</p>
      <p>トップページ</p>
      <p>トップページ</p>
      
    </>
  );
}
