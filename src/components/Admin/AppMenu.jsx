import React from "react";
// import IconExpandLess from "@material-ui/icons/ExpandLess";
// import IconExpandMore from "@material-ui/icons/ExpandMore";
// import IconDashboard from "@material-ui/icons/Dashboard";
import IconShoppingCart from "@material-ui/icons/ShoppingCart";
import IconPeople from "@material-ui/icons/People";
import IconBarChart from "@material-ui/icons/BarChart";
import IconRestaurant from '@material-ui/icons/Restaurant'
import IconAdd from '@material-ui/icons/Add';

import Customers from './components/Customers';
import Reports from './components/Reports';
import Restaurants from './components/Restaurants';
import Requests from './components/Requests';
import Orders from './components/Orders';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  createStyles,
} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    appMenu: {
      width: "100%",
      backgroundColor: "#eeeeee",
      height: "100%",
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
      color: "#555555",
    },
    menuItemIcon: {
      color: "#555555",
    },
  })
);

const AppMenu = (props) => {
  const classes = useStyles();
 // const [open, setOpen] = useState(false);

//   function handleClick() {
//     setOpen(!open);
//   }

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {/* <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconDashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem> */}

      <div onClick={() => props.setComponent(<Customers />)}>
      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconPeople />
        </ListItemIcon>
        <ListItemText primary="Customers"/>
      </ListItem>
      </div>

      <div onClick={() => props.setComponent(<Restaurants />)}>
      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconRestaurant />
        </ListItemIcon>
        <ListItemText primary="Restaurants" />
      </ListItem>
      </div>

      <div onClick={() => props.setComponent(<Orders />)}>
      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconShoppingCart />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      </div>

      <div onClick={() => props.setComponent(<Requests />)}>
      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconAdd />
        </ListItemIcon>
        <ListItemText primary="Reg. Requests" />
      </ListItem>
      </div>

      <div onClick={() => props.setComponent(<Reports />)}>
      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconBarChart />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      </div>
      {/* <ListItem button onClick={handleClick} className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconLibraryBooks />
        </ListItemIcon>
        <ListItemText primary="Nested Pages" />
        {open ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Nested Page 1" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Nested Page 2" />
          </ListItem>
        </List>
      </Collapse> */}
    </List>
  );
};

export default AppMenu;
