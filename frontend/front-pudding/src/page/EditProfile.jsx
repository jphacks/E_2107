// react
import React, { useState, useEffect } from "react";

// mui
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// firebase
import { db } from "../config/firebase";
import { auth } from "../config/firebase";

// img
import ColorImage from "../image/color.jpeg";
import GreenImage from "../image/green.jpeg";
import HiguIcon from "../image/higuSample.jpg";
import SkyImage from "../image/sky.jpeg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    width: "250px",
    height: "60px",
  },
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    // ...theme.mixins.toolbar
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    display: "inline",
    fontStyle: "Roboto",
    fontSize: "30px",
    m: "15px",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
  },
  drawerPaperClose: {
    overflowX: "hidden",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  fixedHeight: {
    height: 240,
  },
  inputFileBtnHide: {
    opacity: 0,
    appearance: "none",
    position: "absolute",
  },
}));

const backs = [SkyImage, GreenImage, ColorImage];

export default function EditProfile() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(backs[0]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const SelectDialog = (props) => {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
      setSelectedValue(value);
      onClose(value);
    };

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>?????????????????????</DialogTitle>
        <Stack direction="row" spacing={2}>
          <ListItem button onClick={() => handleListItemClick(backs[0])}>
            <img src={SkyImage} height={100} width={100} alt="??????????????????" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick(backs[1])}>
            <img src={GreenImage} height={100} width={100} alt="??????????????????" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick(backs[2])}>
            <img src={ColorImage} height={100} width={100} alt="??????????????????" />
          </ListItem>
        </Stack>
      </Dialog>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      born,
      job,
      hobby,
      dream,
      name,
      talent,
      favorite_food,
      // icon
      twitter,
      insta,
      github,
      // selectedValue
    } = event.target.elements;
    auth.onAuthStateChanged((user) => {
      db.collection("users").doc(user.uid).update({
        born: born.value,
        job: job.value,
        hobby: hobby.value,
        dream: dream.value,
        name: name.value,
        talent: talent.value,
        favorite_food: favorite_food.value,
        icon: "",
        twitter: twitter.value,
        insta: insta.value,
        github: github.value,
        selectedValue: ""
      }).then(
        alert("?????????????????????")
      )
    });
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
    <Container component="main" maxWidth="xl" className={classes.container}>
      <Box m={1}>
        <Typography variant="h4">???????????????</Typography>
      </Box>
      <CssBaseline />
      <Box
        className={classes.form}
        component="form"
        noValidate
        onSubmit={handleSubmit}
      >
        {data && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
              <TableContainer component={Paper}>
                <TableBody>
                  <TableRow>
                    <TableCell width="300px">
                      <Box
                        display="inline"
                        lineHeight="50px"
                        fontStyle="Roboto"
                        fontSize="18px"
                        m="15px"
                      >
                        ??????
                      </Box>
                    </TableCell>
                    <TableCell width="800px">
                      <Box display="inline" lineHeight="50px">
                        <Grid item xs={12} sm={11}>
                          <TextField
                            autoComplete="name"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            defaultValue={data.name}
                            id="name"
                            label="??????"
                          />
                        </Grid>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="300px">
                      <Box
                        display="inline"
                        lineHeight="50px"
                        fontStyle="Roboto"
                        fontSize="18px"
                        m="15px"
                      >
                        ??????
                      </Box>
                    </TableCell>
                    <TableCell width="650px">
                      <Box display="inline" lineHeight="50px">
                        <Grid item xs={12} sm={11}>
                          <TextField
                            autoComplete="born"
                            name="born"
                            variant="outlined"
                            required
                            fullWidth
                            id="born"
                            label="??????"
                            defaultValue={data.born}
                          />
                        </Grid>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="300px">
                      <Box
                        display="inline"
                        lineHeight="50px"
                        fontStyle="Roboto"
                        fontSize="18px"
                        m="15px"
                      >
                        ???????????????
                      </Box>
                    </TableCell>
                    <TableCell width="650px">
                      <Box display="inline" lineHeight="50px">
                        <Grid item xs={12} sm={11}>
                          <TextField
                            autoComplete="job"
                            name="job"
                            variant="outlined"
                            required
                            fullWidth
                            id="job"
                            label="??????"
                            defaultValue={data.job}
                          />
                        </Grid>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="300px">
                      <Box
                        display="inline"
                        lineHeight="50px"
                        fontStyle="Roboto"
                        fontSize="18px"
                        m="15px"
                      >
                        ??????
                      </Box>
                    </TableCell>
                    <TableCell width="650px">
                      <Box display="inline" lineHeight="50px">
                        <Grid item xs={12} sm={11}>
                          <TextField
                            autoComplete="hobby"
                            name="hobby"
                            variant="outlined"
                            required
                            fullWidth
                            id="CompanyId"
                            label="??????"
                            defaultValue={data.hobby}
                          />
                        </Grid>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="300px">
                      <Box
                        display="inline"
                        lineHeight="50px"
                        fontStyle="Roboto"
                        fontSize="18px"
                        m="15px"
                      >
                        ??????????????????
                      </Box>
                    </TableCell>
                    <TableCell width="650px">
                      <Box display="inline" lineHeight="50px">
                        <Grid item xs={12} sm={11}>
                          <TextField
                            autoComplete="favorite_food"
                            name="favorite_food"
                            variant="outlined"
                            required
                            fullWidth
                            id="favorite_food"
                            label="??????????????????"
                            defaultValue={data.favorite_food}
                          />
                        </Grid>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="300px">
                      <Box
                        display="inline"
                        lineHeight="50px"
                        fontStyle="Roboto"
                        fontSize="18px"
                        m="15px"
                      >
                        ??????
                      </Box>
                    </TableCell>
                    <TableCell width="650px">
                      <Box display="inline" lineHeight="50px">
                        <Grid item xs={12} sm={11}>
                          <TextField
                            autoComplete="talent"
                            name="talent"
                            variant="outlined"
                            required
                            fullWidth
                            id="talent"
                            label="??????"
                            defaultValue={data.talent}
                          />
                        </Grid>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="300px">
                      <Box
                        display="inline"
                        lineHeight="50px"
                        fontStyle="Roboto"
                        fontSize="18px"
                        m="15px"
                      >
                        ???
                      </Box>
                    </TableCell>
                    <TableCell width="650px">
                      <Box display="inline" lineHeight="50px">
                        <Grid item xs={12} sm={11}>
                          <TextField
                            autoComplete="dream"
                            name="dream"
                            variant="outlined"
                            required
                            fullWidth
                            id="dream"
                            label="??????"
                            defaultValue={data.dream}
                          />
                        </Grid>
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <SelectDialog
                      selectedValue={selectedValue}
                      open={open}
                      onClose={handleClose}
                    />
                    <TableCell width="300px">
                      <Box
                        display="inline"
                        fontStyle="Roboto"
                        fontSize="18px"
                        m="15px"
                      >
                        ????????????
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item xs={12} sm={5}>
                          <img
                            src={selectedValue}
                            height={100}
                            width={100}
                            alt="??????????????????"
                          />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                          <Button
                            variant="contained"
                            color="inherit"
                            component="label"
                            onClick={handleClickOpen}
                          >
                            ???????????????
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow> */}
                </TableBody>
              </TableContainer>
            </Grid>

            <Grid item xs={12} sm={5} m={0}>
              <TableContainer component={Paper}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  m="15px"
                >
                  <Avatar
                    alt="UserIcon"
                    src={HiguIcon}
                    sx={{ width: 130, height: 130, marginBottom: 3 }}
                  />
                  <Button variant="contained" color="inherit" component="label">
                    ???????????????????????????
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      className={classes.inputFileBtnHide}
                    />
                  </Button>
                  <SelectDialog
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                  />
                  <Box m={4}>
                    <Grid item sm={12}>
                      <img
                        src={selectedValue}
                        height={100}
                        width={100}
                        alt="??????????????????"
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <Button
                        variant="contained"
                        color="inherit"
                        component="label"
                        onClick={handleClickOpen}
                      >
                        ???????????????
                      </Button>
                    </Grid>
                  </Box>

                  <TableRow>
                    <TableCell width="300px">
                      <Box
                        display="inline"
                        lineHeight="50px"
                        fontStyle="Roboto"
                        fontSize="18px"
                        m="15px"
                      >
                        Twitter???ID
                      </Box>
                    </TableCell>
                    <TableCell width="400px">
                      <Box display="inline" lineHeight="50px">
                        <Grid item xs={12} sm={11}>
                          <TextField
                            autoComplete="twitter"
                            name="twitter"
                            variant="outlined"
                            required
                            fullWidth
                            defaultValue={data.twitter}
                            id="twitter"
                            label="??????"
                          />
                        </Grid>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="270px">
                      <Box
                        display="inline"
                        lineHeight="50px"
                        fontStyle="Roboto"
                        fontSize="18px"
                        m="15px"
                      >
                        Instagram???ID
                      </Box>
                    </TableCell>
                    <TableCell width="400px">
                      <Box display="inline" lineHeight="50px">
                        <Grid item xs={12} sm={11}>
                          <TextField
                            autoComplete="insta"
                            name="insta"
                            variant="outlined"
                            required
                            fullWidth
                            id="insta"
                            label="??????"
                            defaultValue={data.insta}
                          />
                        </Grid>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="300px">
                      <Box
                        display="inline"
                        lineHeight="50px"
                        fontStyle="Roboto"
                        fontSize="18px"
                        m="15px"
                      >
                        github???ID
                      </Box>
                    </TableCell>
                    <TableCell width="400px">
                      <Box display="inline" lineHeight="50px">
                        <Grid item xs={12} sm={11}>
                          <TextField
                            autoComplete="github"
                            name="github"
                            variant="outlined"
                            required
                            fullWidth
                            id="github"
                            label="??????"
                            defaultValue={data.github}
                          />
                        </Grid>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <Box m={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      <Typography variant="h6">????????????</Typography>
                    </Button>
                  </Box>
                </Box>
              </TableContainer>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
}
