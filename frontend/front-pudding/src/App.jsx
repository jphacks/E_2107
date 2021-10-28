import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Link, useHistory, withRouter } from "react-router-dom";

// @mui
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import Button from "@mui/material/Button";
// import Stack from '@mui/material/Stack';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar from "@mui/material/AppBar";
import ListItemButton from "@mui/material/ListItemButton";
import ListIcon from '@mui/icons-material/List';
import FaceIcon from '@mui/icons-material/Face';
import EditIcon from '@mui/icons-material/Edit';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SettingsIcon from '@mui/icons-material/Settings';
import { makeStyles } from "@mui/styles";

// 認証系
import { useAuthContext } from "./authContext";

// ページインポート
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import Profile from "./page/Profile";
import Setting from "./page/Setting";
import EditProfile from "./page/EditProfile";
import FriendsList from "./page/FriendsList";

// ルーティング
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from './components/PublicRoute';

// import Demo from './components/demo';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: "center",
    color: "#555555",
  },
}));

const drawerWidth = 250;

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
  const {user} = useAuthContext();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const classes = useStyles();
  const history = useHistory();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
                <ListIcon></ListIcon>
              </IconButton>
              <Typography
                variant="h3"
                noWrap
                component="div"
                className={classes.title}
                class="st-Header_start" // 左よせ
              >
                Pudding Profile
              </Typography>

              {/* この辺にログアウトボタン欲しい */}

            </Toolbar>
          </AppBar>

          {/* <Demo></Demo> */}

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
            {user ? (
              <div>
                <List>
                  <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => {
                      handleListItemClick(event, 0);
                    }}
                    component={Link}
                    to="/"
                  >
                    <FaceIcon sx={{ mr: 2}} /> マイページ
                  </ListItemButton>
                </List>
                <List>
                  <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => {
                      handleListItemClick(event, 1);
                    }}
                    component={Link}
                    to="/edit"
                  >
                    <EditIcon sx={{ mr: 2}} /> 追加・編集
                  </ListItemButton>
                </List>
                <List>
                  <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                    component={Link}
                    to="/friends"
                  >
                    <EmojiPeopleIcon sx={{ mr: 2}} /> 友達
                  </ListItemButton>
                </List>
                <List>
                  <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                    component={Link}
                    to="/setting"
                  >
                    <SettingsIcon sx={{ mr: 2}} /> 設定
                  </ListItemButton>
                </List>
              </div>
            ) : (
              <List>
                <ListItemButton component={Link} to="/signin">
                  ログインしてから利用できます
                </ListItemButton>
              </List>
            )}
          </Drawer>
          <Main open={open}>
            <DrawerHeader />
            <PrivateRoute exact path="/" component={Profile} />
          <PrivateRoute exact path="/setting" component={Setting} />
          <PrivateRoute exact path="/edit" component={EditProfile} />
          <PrivateRoute exact path="/friends" component={FriendsList} />
          <PublicRoute exact path="/" component={SignUp} />
          <PublicRoute path="/signin" exact component={SignIn} />
          <PublicRoute path="/signup" component={SignUp} />
          </Main>
        </Box>
      </Switch>
    </BrowserRouter>
  );
}

export default withRouter(App);
