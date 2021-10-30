// react
import React, { useState, useEffect } from "react";

// mui
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

// firebase
import { db } from "../config/firebase";
import { auth } from "../config/firebase";

// page
import SimpleDialog from './SimpleDialog'

// img
import FaceBookIcon from "../image/github.png";
import HiguIcon from "../image/higuSample.jpg";
import InstaIcon from "../image/instagram.png";
import SkyImage from "../image/sky.jpeg";
import TwitterIcon from "../image/Twitter social icons - circle - blue.png";

// import PropTypes from "prop-types";

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

export default function FriendProfile() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [selectedCategory, setSlectedCategory] = useState("");
  const path = window.location.pathname;
  const otherUid = path.split("/")[1];
  const [clicked, setCliclked] = useState(false);
  const [selfUid, setSelfUid] = useState("");
  const [dateId, setDateId] = useState("");

  const handleClickOpen = (props) => {
    setSlectedCategory(props);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      setSelfUid(user.uid);
    }
  });

  const Rendering = () => {
    db.collection("follows")
        .where("following_uid", "==", selfUid)
        .where("followed_uid", "==", otherUid)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const tmp = doc.data().id;
            setCliclked(true);
            setDateId(tmp);
            console.log(dateId);
            console.log(tmp);
          });
        });
  }

  const [data, setData] = useState();
  useEffect(() =>  {
    if (otherUid) {
      db.collection("users")
        .doc(otherUid)
        .get()
        .then((snapshots) => {
          const data = snapshots.data();
          setData(data);
        });
    }
    Rendering();
  }, [selfUid]);

  const onFollow = () => {
    setCliclked(true);
    const followsRef = db.collection("follows").doc();
    const friendInitialData = {
      following_uid: selfUid,
      followed_uid: otherUid,
      id: followsRef.id,
    };
    console.log("following!");
    followsRef.set(friendInitialData);
  };

  const onRemoveFollow = () => {
    setCliclked(false);
    const followsRef = db.collection("follows");
    console.log("delete!");
    followsRef.doc(dateId).delete();
  };

  return (
    <Grid
      container
      spacing={0}
      className={classes.container}
      sx={{
        backgroundImage: `url(${SkyImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundSize: "cover",
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
          <Box
            className={classes.outerCircle}
            onClick={() => handleClickOpen("born")}
          >
            <Typography variant="h5">出身</Typography>
          </Box>
        </Container>
      </Grid>
      <Grid item md={4} xs={6} className={classes.center}>
        <Container fixed>
          <Box
            className={classes.outerCircle}
            onClick={() => handleClickOpen("job")}
          >
            <Typography variant="h5">学校・仕事</Typography>
          </Box>
        </Container>
      </Grid>
      <Grid item md={4} xs={6} className={classes.bottom}>
        <Container fixed>
          <Box
            className={classes.outerCircle}
            onClick={() => handleClickOpen("hobby")}
          >
            <Typography variant="h5">趣味</Typography>
          </Box>
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
                {data.name}のページ
              </Typography>
              <Avatar
                alt="UserIcon"
                src={HiguIcon}
                sx={{ width: 130, height: 130, marginBottom: 2 }}
              />
              {!clicked ? (
                <Button
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  className={classes.margin}
                  onClick={onFollow}
                >
                  お気に入りに追加
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="medium"
                  color="secondary"
                  className={classes.margin}
                  onClick={onRemoveFollow}
                >
                  お気に入り解除
                </Button>
              )}
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {data.twitter && (
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
                )}
                {data.insta && (
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
                )}
                {data.github && (
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
                )}
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
          <Box
            className={classes.outerCircle}
            onClick={() => handleClickOpen("favorite_food")}
          >
            <Typography variant="h5">好きな食べ物</Typography>
          </Box>
        </Container>
      </Grid>
      <Grid item md={4} xs={6} className={classes.center}>
        <Container fixed>
          <Box
            className={classes.outerCircle}
            onClick={() => handleClickOpen("dream")}
          >
            <Typography variant="h5">夢</Typography>
          </Box>
        </Container>
      </Grid>
      <Grid item md={4} xs={12} className={classes.top}>
        <Container fixed>
          <Box
            className={classes.outerCircle}
            onClick={() => handleClickOpen("talent")}
          >
            <Typography variant="h5">特技</Typography>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
