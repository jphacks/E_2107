// react
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// page
import Attribute from './Attribute'
import Logout from "./Logout";

// mui
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";

// firebase
import { db } from "../config/firebase";
import { auth } from "../config/firebase";

// page
import SimpleDialog from './SimpleDialog'

// img
import HiguIcon from "../image/higuSample.jpg";
import TwitterIcon from "../image/Twitter social icons - circle - blue.png";
import InstaIcon from "../image/instagram.png";
import FaceBookIcon from "../image/github.png";
import SkyImage from "../image/sky.jpeg";
// import GreenImage from "../image/green.jpeg";
// import ColorImage from "../image/color.jpeg";

// config　
import categoryDictionaly from '../config/dictionaly'

import PropTypes from "prop-types";


// ---------------------------Profileのパーツの設定---------------------------------------

// categoryDictionalyから辞書を引っ張り、Attribute.jsxにて対応する文字列を引っ張っています。

// -------------------------------Profileのパーツの設定 ここまで---------------------------------

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    textAlign: "center",
    minHeight: "92vh",
    display: "flex",
    height: "92vh",
  },
  top: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  bottom: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  outerCircle: {
    margin: "auto",
    width: "160px",
    height: "80px",
    position: "relative",
    border: "solid #99FFFF 5px",
    "border-radius": "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#CCFFFF",
    "&:hover": {
      background: "#11FFFF",
    },
  },
  dialog: {
    flexGrow: 1,
    textAlign: "center",
    minWidth: "300px",
    minHeight: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dialogtitle: {
    color: "#666666",
  },
}));

const emails = ["username@gmail.com", "user02@gmail.com"];

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function Profile() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClickOpen = (props) => {
    setSelectedCategory(props);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const [uid, setUid] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    if (uid) {
      db.collection("users")
        .doc(uid)
        .get()
        .then((snapshots) => {
          const data = snapshots.data();
          setData(data);
        });
    }
  }, [uid]);

  return (
    <Grid
      container
      spacing={0}
      className={classes.container}
      sx={{
        // backgroundImage: `url(${SkyImage})`,
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center bottom",
        // backgroundSize: "cover",
      }}
    >
      <SimpleDialog
        open={open}
        onClose={handleClose(selectedValue)}
        selectedCategory={selectedCategory}
        data={data}
      />
      <Grid item md={4} xs={6} className={classes.bottom}>
        <Container fixed>
        <Attribute
          dict={categoryDictionaly[0]}
          handleClickOpen={handleClickOpen}
        />
        </Container>
      </Grid>
      <Grid item md={4} xs={6} className={classes.center}>
        <Container fixed>
          <Attribute
            dict={categoryDictionaly[1]}
            handleClickOpen={handleClickOpen}
          />
        </Container>
      </Grid>
      <Grid item md={4} xs={6} className={classes.bottom}>
        <Container fixed>
          <Attribute
            dict={categoryDictionaly[2]}
            handleClickOpen={handleClickOpen}
          />
        </Container>
      </Grid>
      <Grid item md={4} xs={6} className={classes.center}>
        <Container fixed>
          {/* <Box className={classes.outerCircle} onClick={() => handleClickOpen}>
              <Typography variant="h5">趣味</Typography>
            </Box> */}
        </Container>
      </Grid>
      <Grid item md={4} xs={6} className={classes.center}>
        <Container fixed>
          {data && (
            <Box
              sx={{
                // marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                sx={{
                  marginBottom: 1,
                }}
              >
                {data.name}<br/>のページ
              </Typography>
              <Avatar
                alt="UserIcon"
                src={HiguIcon}
                sx={{ width: 130, height: 130, marginBottom: 2 }}
              />
              <Logout />
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <a
                  href={`https://twitter.com/${data.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Avatar
                    alt="UserIcon"
                    src={TwitterIcon}
                    sx={{ margin: 1, width: 50, height: 50 }}
                  />
                </a>
                <a
                  href={`https://www.instagram.com/${data.insta}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Avatar
                    alt="UserIcon"
                    src={InstaIcon}
                    sx={{ margin: 1, width: 50, height: 50 }}
                  />
                </a>
                <a
                  href={`https://github.com/${data.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Avatar
                    alt="UserIcon"
                    src={FaceBookIcon}
                    sx={{ margin: 1, width: 50, height: 50 }}
                  />
                </a>
              </Box>
            </Box>
          )}
        </Container>
      </Grid>
      <Grid item md={4} xs={6} className={classes.center}>
        <Container fixed>
          {/* <Box className={classes.outerCircle} onClick={() => handleClickOpen}>
              <Typography variant="h5">趣味</Typography>
            </Box> */}
        </Container>
      </Grid>
      <Grid item md={4} xs={6} className={classes.top}>
        <Container fixed>
        <Attribute
          dict={categoryDictionaly[3]}
          handleClickOpen={handleClickOpen}
        />
        </Container>
      </Grid>
      <Grid item md={4} xs={6} className={classes.center}>
        <Container fixed>
          <Attribute
            dict={categoryDictionaly[4]}
            handleClickOpen={handleClickOpen}
          />
        </Container>
      </Grid>
      <Grid item md={4} xs={12} className={classes.top}>
        <Container fixed>
          <Attribute
            dict={categoryDictionaly[5]}
            handleClickOpen={handleClickOpen}
          />
        </Container>
      </Grid>
    </Grid>
  );
}
