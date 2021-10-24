import React from 'react'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';


export default function EditProfile() {

  return (
<>
    <p>sigin upページ</p>
    <Button variant="contained"　component={Link} to="/profile">back</Button>
</>
  )
};