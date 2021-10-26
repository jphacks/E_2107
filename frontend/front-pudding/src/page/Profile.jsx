import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import HiguIcon from "../image/higuSample.jpg";
import TwitterIcon from "../image/Twitter social icons - circle - blue.png";
import InstaIcon from "../image/instagram.png";
import FaceBookIcon from "../image/f_logo_RGB-Blue_100.png";

import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    textAlign: "center",
    minHeight: "85vh",
    display: "flex",
    height: "85vh",
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
    width: "120px",
    height: "80px",
    position: "relative",
    border: "solid #99FFFF 5px",
    "border-radius": "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      background: "#11FFFF",
    },
  },
}));

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, data, category } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        {category === "born" && (
          <DialogContentText>出身</DialogContentText>
        )}
        {category === "job" && (
          <DialogContentText>大学・職場</DialogContentText>
        )}
        {category === "hobby" && (
          <DialogContentText>趣味</DialogContentText>
        )}
        {category === "talent" && (
          <DialogContentText>特技</DialogContentText>
        )}
        {!category && <DialogContentText>ありません</DialogContentText>}
      </DialogTitle>
      <DialogContent>
        {category === "born" && (
          <DialogContentText>{data.born}</DialogContentText>
        )}
        {category === "job" && (
          <DialogContentText>{data.job}</DialogContentText>
        )}
        {category === "hobby" && (
          <DialogContentText>{data.hobby}</DialogContentText>
        )}
        {category === "talent" && (
          <DialogContentText>{data.talent}</DialogContentText>
        )}
        {!category && <DialogContentText>ありません</DialogContentText>}
        {/* <DialogContentText>{data.born}</DialogContentText>
        <DialogContentText>{data.hobby}</DialogContentText> */}
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

  const handleClickOpen = (props) => {
    setCategory(props);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const [data, setData] = useState([]);
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
        console.log(response.data);
        //一つしか入れてない
        setData(...response.data);
      });
  }, []);

  return (
    <div>
      <Grid container spacing={0} className={classes.container}>
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
                variant="h３"
                sx={{
                  marginBottom: 1,
                }}
              >
                higuのページ
              </Typography>
              <Avatar
                alt="UserIcon"
                src={HiguIcon}
                sx={{ width: 130, height: 130, marginBottom: 2 }}
              />
              <Button variant="contained">お気に入りに追加</Button>
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
    </div>
  );
}
