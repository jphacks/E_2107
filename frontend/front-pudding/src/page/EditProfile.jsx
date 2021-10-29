import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Avatar from "@mui/material/Avatar";
import HiguIcon from "../image/higuSample.jpg";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";

import SkyImage from "../image/sky.jpeg";
import GreenImage from "../image/green.jpeg";
import ColorImage from "../image/color.jpeg";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";

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
        <DialogTitle>背景画像を選択</DialogTitle>
        <Stack direction="row" spacing={2}>
          <ListItem button onClick={() => handleListItemClick(backs[0])}>
            <img src={SkyImage} height={100} width={100} alt="サンプル画像" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick(backs[1])}>
            <img src={GreenImage} height={100} width={100} alt="サンプル画像" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick(backs[2])}>
            <img src={ColorImage} height={100} width={100} alt="サンプル画像" />
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
      icon,
      twitter,
      insta,
      github,
      selectedValue,
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
      });
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
        <Typography variant="h4">追加・編集</Typography>
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
                        名前
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
                            label="氏名"
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
                        出身
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
                            label="出身"
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
                        学校・仕事
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
                            label="大学"
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
                        趣味
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
                            label="趣味"
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
                        好きな食べ物
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
                            label="好きな食べ物"
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
                        特技
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
                            label="特技"
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
                        夢
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
                            label="特技"
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
                        背景画像
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
                            alt="サンプル画像"
                          />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                          <Button
                            variant="contained"
                            color="inherit"
                            component="label"
                            onClick={handleClickOpen}
                          >
                            画像を選択
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
                    アイコン画像を選択
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
                        alt="サンプル画像"
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <Button
                        variant="contained"
                        color="inherit"
                        component="label"
                        onClick={handleClickOpen}
                      >
                        背景を選択
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
                        TwitterのID
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
                            label="氏名"
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
                        InstagramのID
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
                            label="出身"
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
                        githubのID
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
                            label="大学"
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
                      <Typography variant="h6">保存する</Typography>
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
