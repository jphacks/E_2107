// react
import React, { useState, useEffect } from "react";

// mui
import IconButton from "@mui/material/IconButton";
import ListIcon from "@mui/icons-material/List";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// page
import Logout from "./Logout";

const Header = (props)=>{
    const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
      height: 64,
      background: "#fff",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        height: 64,
        width: `calc(100% - ${props.drawerWidth}px)`,
        marginLeft: `${props.drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));



    return (
        <AppBar position="fixed" open={props.open} color="transparent">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(props.open && { display: "none" }) }}
          >
            <ListIcon></ListIcon>
          </IconButton>
          <Typography
            variant="h3"
            noWrap
            component="div"
            className={props.classes.title}
            class="st-Header_start" // 左よせ
          >
            Pudding Profile
          </Typography>
          {/* ログアウトボタン */}
          { props.user &&(
              <Logout />
          )}

        </Toolbar>
      </AppBar>
    )
}
export default Header;