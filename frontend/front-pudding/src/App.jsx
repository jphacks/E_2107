import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Link, useHistory, withRouter, Redirect } from "react-router-dom";

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
import ListIcon from "@mui/icons-material/List";
import FaceIcon from "@mui/icons-material/Face";
import EditIcon from "@mui/icons-material/Edit";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import SettingsIcon from "@mui/icons-material/Settings";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";

// 認証系
import { useAuthContext } from "./authContext";

// ページインポート
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import Profile from "./page/Profile";
import FriendProfile from "./page/FriendProfile";
// import Setting from "./page/Setting";
import EditProfile from "./page/EditProfile";
import Logout from "./page/Logout"

// ルーティング
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import { auth, db } from "./config/firebase";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";

// import Demo from './components/demo';
import HiguIcon from "./image/higuSample.jpg";
import FriendsIcon from "./image/icons8-conference-64.png";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: "center",
    color: "#555555",
  },
  Dialog: {
    width: "300px",
  },
  list: {
    height: "50px",
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

const UserList = ({ dateId, selfUid, followedUid }) => {
  const classes = useStyles();
  const [clicked, setCliclked] = useState(true);

  const onRemoveFollow = (dateId) => {
    setCliclked(false);
    const followsRef = db.collection("follows");
    followsRef.doc(dateId).delete();
  };

  const onFollow = (selfUid, followedUid) => {
    setCliclked(true);
    const followsRef = db.collection("follows").doc();
    const userInitialData = {
      following_uid: selfUid,
      followed_uid: followedUid,
      id: followsRef.id,
    };
    followsRef.set(userInitialData);
  };
  return (
    <ListItemSecondaryAction>
      {!clicked ? (
        <Button
          variant="outlined"
          size="medium"
          color="secondary"
          onClick={() => onFollow(selfUid, followedUid)}
        >
          フォロー解除
        </Button>
      ) : (
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          onClick={() => onRemoveFollow(dateId)}
        >
          フォロー中
        </Button>
      )}
    </ListItemSecondaryAction>
  );
};

const UserFollowingList = ({ selfUid }) => {
  const classes = useStyles();
  const [followingUserDates, setFollowingUserDates] = useState([]);
  const [followedUid, SetfollowedUid] = useState("");

  useEffect(() => {
    db.collection("follows")
      .where("following_uid", "==", selfUid)
      .get()
      .then(async (snapshot) => {
        console.log(snapshot);
        snapshot.forEach((doc) => {
          SetfollowedUid(doc.data().followed_uid);
          const dateId = doc.data().id;
          db.collection("users")
            .doc(doc.data().followed_uid)
            .get()
            .then((snapshot) => {
              console.log("match!");
              const followingUser = snapshot.data();
              const Userdate = {
                name: followingUser.name,
                // 入れれたら
                // image: followingUser.image.path,
                uid: followingUser.uid,
                id: dateId,
              };
              setFollowingUserDates((date) => [...date, Userdate]);
            });
        });
      });
  }, [selfUid]);

  return (
    <Box m={2}>
      <Typography variant="h5">友達一覧</Typography>
      <List dense className={classes.root}>
        {followingUserDates.length > 0 &&
          followingUserDates.map((date, index) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            const dateId = date.id;
            return (
              <ListItem key={index} button className={classes.list}>
                {/* 写真追加できたら */}
                {/* <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${index + 1}`}
                        src={date.image}
                        className={classes.avatar}
                      />
                    </ListItemAvatar> */}
                <ListItemText id={labelId} primary={date.name} />
                <UserList
                  dateId={dateId}
                  selfUid={selfUid}
                  followedUid={followedUid}
                />
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};

function App() {
  const { user } = useAuthContext();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const classes = useStyles();

  const path = window.location.pathname;
  const uid = path.split("/")[1];

  const [selfUid, setSelfUid] = useState("");

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const path = window.location.pathname;
  // const tmp = path.split("/")[1];

  auth.onAuthStateChanged((user) => {
    if (user) {
      setSelfUid(user.uid);
    }
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
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
              <Logout />
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
            {user ? (
              uid === selfUid ? (
                <div>
                  <List>
                    <ListItemButton
                      selected={selectedIndex === 0}
                      onClick={(event) => {
                        handleListItemClick(event, 0);
                      }}
                      component={Link}
                      // to={{ pathname: "/" + selfUid }}
                      to={"/" + selfUid + "/home"}
                    >
                      <FaceIcon sx={{ mr: 2 }} />
                      マイページ
                    </ListItemButton>
                  </List>
                  <List>
                    <ListItemButton
                      selected={selectedIndex === 1}
                      onClick={(event) => {
                        handleListItemClick(event, 1);
                      }}
                      component={Link}
                      to={"/" + selfUid + "/edit"}
                    >
                      <EditIcon sx={{ mr: 2 }} />
                      追加・編集
                    </ListItemButton>
                  </List>
                  <List>
                    <ListItemButton
                      selected={selectedIndex === 2}
                      onClick={(event) => {
                        handleListItemClick(event, 2);
                        handleClickOpen();
                      }}
                      // component={Link}
                      // to={"/" + selfUid + "/friends"}
                    >
                      <EmojiPeopleIcon sx={{ mr: 2 }} /> 友達
                    </ListItemButton>
                  </List>
                </div>
              ) : (
                <List>
                  {selfUid && (
                    <ListItemButton
                      selected={selectedIndex === 2}
                      onClick={(event) => handleListItemClick(event, 2)}
                      component={Link}
                      to="/friends"
                    >
                      <EmojiPeopleIcon sx={{ mr: 2}} /> 友達
                    </ListItemButton>
                  )}
                </List>
              )
            ) : (
              <List>
                <ListItemButton component={Link} to="/signin">
                  ログインしてから利用できます
                </ListItemButton>
              </List>
            )}
          </Drawer>
          <Dialog
            open={dialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box className={classes.Dialog}>
              <UserFollowingList selfUid={selfUid} />
            </Box>
          </Dialog>
          <Main open={open}>
            <DrawerHeader />

            {user ? (
              uid !== selfUid ? (
                <PrivateRoute
                  exact
                  path={"/" + uid + "/home"}
                  component={FriendProfile}
                />
              ) : (
                <PrivateRoute
                  exact
                  path={"/" + selfUid + "/home"}
                  component={Profile}
                />
              )
            ) : (
              // <Redirect
              //   exact
              //   path="/"
              //   to={{ pathname: "/" + selfUid + "/home"}}
              //   component={Profile}
              // />
              <></>
            )}
            {/* "/"の時のリダイレクト不可 */}
            {/* {uid === selfUid && (
              <Redirect
                exact
                path="/"
                to={"/" + selfUid + "/home"}
                component={Profile}
              />
            )} */}
            {/* <PrivateRoute
              exact
              path={"/" + selfUid + "/home"}
              component={Profile}
            /> */}
            <PrivateRoute
              exact
              path={"/" + selfUid + "/edit"}
              component={EditProfile}
            />

            <PublicRoute exact path="/" component={SignIn} />
            <PublicRoute path="/signin" exact component={SignIn} />
            <PublicRoute path="/signup" component={SignUp} />
          </Main>
        </Box>
      </Switch>
    </BrowserRouter>
  );
}

export default withRouter(App);
