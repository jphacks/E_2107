import React from "react";
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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    // margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(3)
  },
  submit: {
    // margin: theme.spacing(3, 0, 2)
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
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    // transition: theme.transitions.create(['width', 'margin'], {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen
    // })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    // transition: theme.transitions.create(['width', 'margin'], {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.enteringScreen
    // })
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    // transition: theme.transitions.create('width', {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.enteringScreen
    // })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    // transition: theme.transitions.create('width', {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen
    // }),
    // width: theme.spacing(7),
    // [theme.breakpoints.up('sm')]: {
    //     width: theme.spacing(9)
    // }
  },
  // appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    // paddingTop: theme.spacing(4),
    // paddingBottom: theme.spacing(4)
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

export default function EditProfile() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xl" className={classes.container}>
      <Box display="inline" fontStyle="Roboto" fontSize="24px" m="15px">
        編集
      </Box>
      <CssBaseline />
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7}>
            <TableContainer component={Paper}>
              <TableBody>
                <TableRow>
                  <TableCell width="270px">
                    <Box
                      display="inline"
                      lineHeight="50px"
                      fontStyle="Roboto"
                      fontSize="18px"
                      m="15px"
                    >
                      氏名
                    </Box>
                  </TableCell>
                  <TableCell width="800px">
                    <Box display="inline" lineHeight="50px">
                      <Grid item xs={12} sm={11}>
                        <TextField
                          autoComplete="name"
                          name="Name"
                          variant="outlined"
                          required
                          fullWidth
                          id="Name"
                          label="氏名"
                        />
                      </Grid>
                    </Box>
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                                        <TableCell width="270px">
                                            <Box
                                                display="inline"
                                                lineHeight="50px"
                                                fontStyle="Roboto"
                                                fontSize="18px"
                                                m="15px">
                                                自己紹介
                                            </Box>
                                        </TableCell>
                                        <TableCell width="650px">
                                            <Box display="inline" lineHeight="50px">
                                                <Grid item xs={12} sm={10}>
                                                    <TextField
                                                        autoComplete="selfIntroduction"
                                                        name="Self"
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="Self"
                                                        label="自己紹介"
                                                        multiline
                                                        rows={5}
                                                    />
                                                </Grid>
                                            </Box>
                                        </TableCell>
                                    </TableRow> */}
                <TableRow>
                  <TableCell width="270px">
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
                          autoComplete="companyId"
                          name="CompanyId"
                          variant="outlined"
                          required
                          fullWidth
                          id="CompanyId"
                          label="出身"
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
                      大学
                    </Box>
                  </TableCell>
                  <TableCell width="650px">
                    <Box display="inline" lineHeight="50px">
                      <Grid item xs={12} sm={11}>
                        <TextField
                          autoComplete="companyId"
                          name="CompanyId"
                          variant="outlined"
                          required
                          fullWidth
                          id="CompanyId"
                          label="大学"
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
                      趣味
                    </Box>
                  </TableCell>
                  <TableCell width="650px">
                    <Box display="inline" lineHeight="50px">
                      <Grid item xs={12} sm={11}>
                        <TextField
                          autoComplete="companyId"
                          name="CompanyId"
                          variant="outlined"
                          required
                          fullWidth
                          id="CompanyId"
                          label="趣味"
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
                      好きな曲
                    </Box>
                  </TableCell>
                  <TableCell width="650px">
                    <Box display="inline" lineHeight="50px">
                      <Grid item xs={12} sm={11}>
                        <TextField
                          autoComplete="companyId"
                          name="CompanyId"
                          variant="outlined"
                          required
                          fullWidth
                          id="CompanyId"
                          label="好きな曲"
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
                      マイブーム
                    </Box>
                  </TableCell>
                  <TableCell width="650px">
                    <Box display="inline" lineHeight="50px">
                      <Grid item xs={12} sm={11}>
                        <TextField
                          autoComplete="companyId"
                          name="CompanyId"
                          variant="outlined"
                          required
                          fullWidth
                          id="CompanyId"
                          label="会社ID"
                        />
                      </Grid>
                    </Box>
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell width="270px">
                    <Box
                      display="inline"
                      lineHeight="50px"
                      fontStyle="Roboto"
                      fontSize="18px"
                      m="15px"
                    >
                      メールアドレス（ログイン用）
                    </Box>
                  </TableCell>
                  <TableCell width="650px">
                    <Box display="inline" lineHeight="50px">
                      <Grid item xs={12} sm={11}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="emailLogin"
                          label="Email Address"
                          name="emailLogin"
                          autoComplete="email"
                          //error
                        />
                      </Grid>
                    </Box>
                  </TableCell>
                </TableRow> */}
                {/* <TableRow>
                                        <TableCell width="270px">
                                            <Box
                                                display="inline"
                                                lineHeight="50px"
                                                fontStyle="Roboto"
                                                fontSize="18px"
                                                m="15px">
                                                メールアドレス(連絡用）
                                            </Box>
                                        </TableCell>
                                        <TableCell width="650px">
                                            <Box display="inline" lineHeight="50px">
                                                <Grid item xs={12} sm={7}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="emailContact"
                                                        label="Email Address"
                                                        name="emailContact"
                                                        autoComplete="email"
                                                    />
                                                </Grid>
                                            </Box>
                                        </TableCell>
                                    </TableRow> */}
                {/* <TableRow>
                  <TableCell width="270px">
                    <Box
                      display="inline"
                      fontStyle="Roboto"
                      fontSize="18px"
                      m="15px"
                    >
                      画像
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
                          src={InstaIcon}
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
                        >
                          画像を選択
                          <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            className={classes.inputFileBtnHide}
                          />
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sm={5}>
            <TableContainer component={Paper}>
            <Box
              sx={{
                // marginTop: 8,
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  fullWidth
                >
                  保存する
                </Button>
              </Box>
            </TableContainer>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
