import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';


export default function SignIn() {

  return (
    <>

    <p>ページDにいます。</p>
    <Button variant="contained" component={Link} to="/profile">
        sign in
      </Button>

      </>

  )
};