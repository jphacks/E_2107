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

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";

import SkyImage from "../image/sky.jpeg";
import GreenImage from "../image/green.jpeg";
import ColorImage from "../image/color.jpeg";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

const backs = [SkyImage, GreenImage, ColorImage];

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
    height: "60px"
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
      onClose(value);
    };

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>背景画像を選択</DialogTitle>
        <Stack direction="row" spacing={2}>
          {backs.map((email) => (
            <ListItem
              button
              onClick={() => handleListItemClick(email)}
              key={email}
            >
              <img src={email} height={100} width={100} alt="サンプル画像" />
            </ListItem>
          ))}
        </Stack>
      </Dialog>
    );
  };

  return (
    <Container component="main" maxWidth="xl" className={classes.container}>
      <Box m={1}>
        <Typography variant="h4">追加・編集</Typography>
      </Box>
      <CssBaseline />
      <form className={classes.form} noValidate>
        <Grid container spacing={1}>
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
                <TableRow>
                  <SelectDialog
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                  />
                  <TableCell width="270px">
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
                </TableRow>
              </TableBody>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sm={5}>
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
                <Box m={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                    <Typography variant="h5">
                  保存する
                  </Typography>
                </Button>
                </Box>
              </Box>
            </TableContainer>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
