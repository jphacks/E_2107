import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const PageA = () => {
  return (
    <>
      <p>ページAにいます。</p>
      <Button variant="contained"　component={Link} to="/pageb">ページBに移動します。</Button>
	 </>
  );
};

export default PageA;
