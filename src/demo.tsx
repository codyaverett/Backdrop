import React from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  Typography,
  ListItemText
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: "#7216f8"
    }
  },
  appBar: {
    backgroundColor: "#7216f8"
  },
  fullList: {
    width: "auto"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  paper: {
    height: "calc(100% - 56px)",
    maxHeight: "none",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "visible"
  },
  wrapper: {
    position: "relative",
    top: 0,
    background: "white",
    visibility: "visible !important"
  },
  container: {
    overflow: "auto"
  }
}));

function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      setState({ ...state, [side]: !open });
    }

    setState({ ...state, [side]: open });
  };

  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List disablePadding>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
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
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar elevation={0} position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={toggleDrawer("bottom", true)}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer("bottom", false)}
        onOpen={toggleDrawer("bottom", true)}
        ModalProps={{
          keepMounted: true
        }}
        swipeAreaWidth={56}
        BackdropProps={{
          invisible: true
        }}
        classes={{
          paper: classes.paper
        }}
      >
        <div>
          <Box p={2}>
            <Typography color="textSecondary">Subtitle</Typography>
          </Box>
          <div className={classes.container}>
            {fullList("bottom")}
            {fullList("bottom")}
          </div>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
}

export default SwipeableTemporaryDrawer;
