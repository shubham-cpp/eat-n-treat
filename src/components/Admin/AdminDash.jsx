import { makeStyles, Drawer, CssBaseline, Container } from "@material-ui/core";
import React, {useState} from "react";

import clsx from "clsx";
import AppMenu from "./AppMenu";
import Customers from "./components/Customers";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: "#eeeeee",
    color: "#666666",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    width: "85vw",
    marginRight: "5%",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const AdminDash = (props) => {
  const classes = useStyles();

  const [component, setComponent] = useState(<Customers />);

  return (
    <div
      className={clsx("App", classes.root)}
      style={{ marginTop: "5%", position: "fixed" }}
    >
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <AppMenu setComponent={setComponent}/>
      </Drawer>
      <main className={classes.content}>
        <Container style={{ width: "100%", height: "100%" }} className={classes.container}>
          {component}
        </Container>
      </main>
    </div>
  );
};

export default AdminDash;
