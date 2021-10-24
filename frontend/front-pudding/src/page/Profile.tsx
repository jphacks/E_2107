import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';


export default function Profile() {

  return (
    <>

    <p>Profileにいます。</p>
    <Button variant="contained"　component={Link} to="/edit">edit</Button>
    <Button variant="contained"　component={Link} to="/friends">friends</Button>
    <Button variant="contained"　component={Link} to="/setting">setting</Button>
    </>
  )
};