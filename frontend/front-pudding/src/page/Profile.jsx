import React from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import HiguIcon from "../image/higuSample.jpg";
import TwitterIcon from "../image/Twitter social icons - circle - blue.png";
import InstaIcon from "../image/instagram.png";
import FaceBookIcon from "../image/f_logo_RGB-Blue_100.png";

import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

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
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>higuの趣味</DialogTitle>
      <DialogContent>
        <DialogContentText>料理・カフェ巡り</DialogContentText>
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <div>
      <Grid container spacing={0} className={classes.container}>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
        <Grid item md={4} xs={6} className={classes.bottom}>
          <Container fixed>
            <Box className={classes.outerCircle} onClick={handleClickOpen}>
              <Typography variant="h5">出身</Typography>
            </Box>
          </Container>
        </Grid>
        <Grid item md={4} xs={6} className={classes.center}>
          <Container fixed>
            <Box className={classes.outerCircle} onClick={handleClickOpen}>
              <Typography variant="h5">大学</Typography>
            </Box>
          </Container>
        </Grid>
        <Grid item md={4} xs={6} className={classes.bottom}>
          <Container fixed>
            <Box className={classes.outerCircle} onClick={handleClickOpen}>
              <Typography variant="h5">趣味</Typography>
            </Box>
          </Container>
        </Grid>
        <Grid item md={4} xs={6} className={classes.center}>
          <Container fixed>
            {/* <Box className={classes.outerCircle} onClick={handleClickOpen}>
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
                sx={{ width: 130, height: 130 }}
              />
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <a
                  href={`https://github.com/${"higuchimmy"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Avatar
                    alt="UserIcon"
                    src={TwitterIcon}
                    sx={{margin: 1,  width: 50, height: 50 }}
                  />
                </a>
                <Avatar
                  alt="UserIcon"
                  src={InstaIcon}
                  sx={{ margin: 1, width: 50, height: 50 }}
                />
                <Avatar
                  alt="UserIcon"
                  src={FaceBookIcon}
                  sx={{ margin: 1, width: 50, height: 50 }}
                />
              </Box>
            </Box>
          </Container>
        </Grid>
        <Grid item md={4} xs={6} className={classes.center}>
          <Container fixed>
            {/* <Box className={classes.outerCircle} onClick={handleClickOpen}>
              <Typography variant="h5">趣味</Typography>
            </Box> */}
          </Container>
        </Grid>
        <Grid item md={4} xs={6} className={classes.top}>
          <Container fixed>
            <Box className={classes.outerCircle} onClick={handleClickOpen}>
              <Typography variant="h5">好きな食べ物</Typography>
            </Box>
          </Container>
        </Grid>
        <Grid item md={4} xs={6} className={classes.center}>
          <Container fixed>
            <Box className={classes.outerCircle} onClick={handleClickOpen}>
              <Typography variant="h5">好きな曲</Typography>
            </Box>
          </Container>
        </Grid>
        <Grid item md={4} xs={12} className={classes.top}>
          <Container fixed>
            <Box className={classes.outerCircle} onClick={handleClickOpen}>
              <Typography variant="h5">マイブーム</Typography>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
