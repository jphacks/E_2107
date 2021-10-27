import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Router from "./Router";
import { useAuth } from "./store/useAuth";

import { Link } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar from "@mui/material/AppBar";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "./image/icons8-four-squares-64.png";
import UserIcon from "./image/icons8-female-profile-64.png";
import EditIcon from "./image/icons8-edit-64.png";
import FriendsIcon from "./image/icons8-conference-64.png";
import SettingIcon from "./image/icons8-settings-64.png";
import { makeStyles } from "@mui/styles";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: "center",
    color: "#555555",
  },
}));

const drawerWidth = 170;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  height: 64,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    height: 64,
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const classes = useStyles();
  const isAuthenticated = useAuth();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/self_introductions/`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data.filter((user) => user.name === "higu"));
        // console.log(response.data);
        setData(response.data.filter((user) => user.name === "higu"));
      });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open} color="transparent">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <img src={MenuIcon} alt="アイコン" width="40" height="40" />
              </IconButton>
              {data.map((item) => (
                <Typography
                  variant="h3"
                  noWrap
                  component="div"
                  className={classes.title}
                  key={item.id}
                >
                  PUDDING
                </Typography>
              ))}
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            {isAuthenticated ? (
              <div>
                <List>
                  <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                    component={Link}
                    to="/profile/1"
                  >
                    <img src={UserIcon} alt="アイコン" width="40" height="40" />
                    マイページ
                  </ListItemButton>
                </List>
                <List>
                  <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                    component={Link}
                    to="/edit"
                  >
                    <img src={EditIcon} alt="アイコン" width="40" height="40" />
                    追加・編集
                  </ListItemButton>
                </List>
                <List>
                  <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                    component={Link}
                    to="/friends"
                  >
                    <img
                      src={FriendsIcon}
                      alt="アイコン"
                      width="40"
                      height="40"
                    />
                    友達
                  </ListItemButton>
                </List>
                <List>
                  <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                    component={Link}
                    to="/setting"
                  >
                    <img
                      src={SettingIcon}
                      alt="アイコン"
                      width="40"
                      height="40"
                    />
                    設定
                  </ListItemButton>
                </List>
              </div>
            ) : (
              <List>
                  <ListItemButton
                    component={Link}
                    to="/signin"
                  >
                    {/* <img
                      src={SettingIcon}
                      alt="アイコン"
                      width="40"
                      height="40"
                    /> */}
                    ログインしてから利用できます
                  </ListItemButton>
                </List>
            )}
          </Drawer>
          <Main open={open}>
            <DrawerHeader />
            {/* <Route component={Page404} /> */}
            <Router />
          </Main>
        </Box>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
