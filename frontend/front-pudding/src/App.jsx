import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import TopPage from "./page/TopPage";
import SignUp from "./page/SignUp";
import Profile from "./page/Profile";
import SignIn from "./page/SignIn";
import Setting from "./page/Setting";
import EditProfile from "./page/EditProfile";
import FriendsList from "./page/FriendsList";
import Auth from "./page/apitest"
import LoggedIn from './page/apitestin';
import LoggedOut from './page/apitestout';
import Home from "./page/apitesthome";

import Router from "./Router";

import { Link } from "react-router-dom";

// 認証系
import { CookiesProvider, withCookies } from 'react-cookie';

// mui
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
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiAppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from './image/icons8-four-squares-64.png';
import UserIcon from './image/icons8-female-profile-64.png';
import EditIcon from './image/icons8-edit-64.png';
import FriendsIcon from './image/icons8-conference-64.png';
import SettingIcon from './image/icons8-settings-64.png';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));

const drawerWidth = 180;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
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
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
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
                <img src={MenuIcon}  alt="アイコン" width="40" height="40"/>
              </IconButton>
              <Typography variant="h4" noWrap component="div" className={classes.title}>
                プリン
              </Typography>
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
            <List>
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
                component={Link} to="/profile"
              >
                <img src={UserIcon}  alt="アイコン" width="40" height="40"/>
                  マイページ
              </ListItemButton>
            </List>
            <List>
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
                component={Link} to="/profile"
              >
                <img src={EditIcon}  alt="アイコン" width="40" height="40"/>
                  追加・編集
              </ListItemButton>
            </List>
            <List>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
                component={Link} to="/friends"
              >
                <img src={FriendsIcon}  alt="アイコン" width="40" height="40"/>
                  友達
              </ListItemButton>
            </List>
            <List>
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
                component={Link} to="/setting"
              >
                <img src={SettingIcon}  alt="アイコン" width="40" height="40"/>
                  設定
              </ListItemButton>
            </List>
            {/* <List>
              {["新規追加", "友達", "マイページ"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {["設定", "その他"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List> */}
          </Drawer>
          <Main open={open}>
            <DrawerHeader />

            {/* <SideBar /> */}
            {/* <main className="c-main"> */}
            <Route exact path="/" component={TopPage} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/setting" component={Setting} />
            <Route exact path="/edit" component={EditProfile} />
            <Route exact path="/friends" component={FriendsList} />
            {/* <Route component={Page404} /> */}
            {/* <Router/> */}
            {/* </main> */}
            <CookiesProvider>

                <LoggedIn>
                  <Route path="/" exact component={Home} />
                  {/* <Route path="/post/:postId/" component={Post} />
                  <Route path="/new" component={registerForm} /> */}
                </LoggedIn>

                <LoggedOut>
                  <Route path="/auth" component={Auth} />
                </LoggedOut>
            </CookiesProvider>
          </Main>
        </Box>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
