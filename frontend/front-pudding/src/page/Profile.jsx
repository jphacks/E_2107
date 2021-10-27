import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import HiguIcon from "../image/higuSample.jpg";
import TwitterIcon from "../image/Twitter social icons - circle - blue.png";
import InstaIcon from "../image/instagram.png";
import FaceBookIcon from "../image/f_logo_RGB-Blue_100.png";

import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import SkyImage from "../image/sky.jpeg";
import GreenImage from "../image/green.jpeg";
import ColorImage from "../image/color.jpeg";

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
    color: "#666666"
  }
}));

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, data, category } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className={classes.dialogtitle}>
        {category === "born" && <Typography variant="h4">出身</Typography>}
        {category === "job" && (
          <Typography variant="h4">大学・職場</Typography>
        )}
        {category === "hobby" && <Typography variant="h4">趣味</Typography>}
        {category === "talent" && <Typography variant="h4">特技</Typography>}
        {!category && <Typography variant="h4">ありません</Typography>}
        </DialogTitle>
      <DialogContent>
        <Box className={classes.dialog}>
        {category === "born" && (
          <Typography variant="h5">{data.born}</Typography>
        )}
        {category === "job" && (
          <Typography variant="h5">{data.job}</Typography>
        )}
        {category === "hobby" && (
          <Typography variant="h5">{data.hobby}</Typography>
        )}
        {category === "talent" && (
          <Typography variant="h5">{data.talent}</Typography>
        )}
        {!category && <Typography variant="h5">ありません</Typography>}
        {/* <Typography variant="h4">{data.born}</Typography>
        <Typography variant="h4">{data.hobby}</Typography> */}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function Profile() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [category, setCategory] = useState("");

  const path = window.location.pathname;
  const uid = path.split("/profile/")[1];
  console.log(uid);

  const handleClickOpen = (props) => {
    setCategory(props);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const [data, setData] = useState([]);
  const [userData, setUserData] = useState();
  // const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/self_introductions/`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data.filter((user) => user.name === "higu"));
        console.log(response.data.filter((user) => user.id == uid));
        // console.log(response.data);
        //一つしか入れてない
        setData(...response.data.filter((user) => user.id == uid));
      });
  }, []);

  console.log(data.id);
  // setUserData(...data);

  // const userData = data

  // console.log(userData[0]);

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
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        data={data}
        category={category}
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
            <Typography variant="h5">大学</Typography>
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
            <Button variant="contained" color="secondary">お気に入りに追加</Button>
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
                href={`https://www.instagram.com/${data.twitter}`}
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
                href={`https://github.com/${data.twitter}`}
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
            onClick={() => handleClickOpen("")}
          >
            <Typography variant="h5">好きな食べ物</Typography>
          </Box>
        </Container>
      </Grid>
      <Grid item md={4} xs={6} className={classes.center}>
        <Container fixed>
          <Box
            className={classes.outerCircle}
            onClick={() => handleClickOpen("")}
          >
            <Typography variant="h5">好きな曲</Typography>
          </Box>
        </Container>
      </Grid>
      <Grid item md={4} xs={12} className={classes.top}>
        <Container fixed>
          <Box
            className={classes.outerCircle}
            onClick={() => handleClickOpen("talent")}
          >
            <Typography variant="h5">マイブーム</Typography>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
