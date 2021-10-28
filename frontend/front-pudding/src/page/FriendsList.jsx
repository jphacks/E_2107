import React, { useCallback, useEffect, useState } from "react";
// import { push } from "connected-react-router";
import { db, auth } from "../config/firebase";
// import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex", // #1
    alignItems: "center", // #2
  },
  avatar: {
    // margin: theme.spacing.unit,
    // width: theme.spacing(7),
    // height: theme.spacing(7),
  },
  root: {
    width: "100%",
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  margin: {
    // margin: theme.spacing(1),
  },
  Dialog: {
    width: 360,
  },
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
          className={classes.margin}
          onClick={() => onFollow(selfUid, followedUid)}
        >
          Follow
        </Button>
      ) : (
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          className={classes.margin}
          onClick={() => onRemoveFollow(dateId)}
        >
          Following
        </Button>
      )}
    </ListItemSecondaryAction>
  );
};

const UserFollowingList = ({selfUid}) => {
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
              console.log("match!")
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
    <>
      <h2 className="u-text__headline u-text-center">友達一覧</h2>
      <div className="module-spacer--small" />
      <div className="center">
        <List dense className={classes.root}>
          {followingUserDates.length > 0 &&
            followingUserDates.map((date, index) => {
              const labelId = `checkbox-list-secondary-label-${index}`;
              const dateId = date.id;
              return (
                  <ListItem key={index} button>
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
        <div className="module-spacer--small" />
      </div>
    </>
  );
};

export default function FriendsList() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selfUid, setSelfUid] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  auth.onAuthStateChanged((user) => {
    if (user) {
      setSelfUid(user.uid);
    }
  });
  return (
    <>
      <button className="ProfileHeader_metaItem__23oms" onClick={handleClickOpen}>
        友達一覧を見る
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ×
          </Button>
        </DialogActions>
        <Box className={classes.Dialog}>
          <UserFollowingList selfUid={selfUid} />
        </Box>
      </Dialog>
    </>
  );
}
