import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  MenuItem,
  Menu,
  Avatar,
} from "@mui/material";
import Img from "./img9.jpg";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutModal from "../LogoutComp";
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const navItems = [
  { label: "USER DATA", route: "/navbar" },
  // { label: "About", route: "about" },
  // { label: "Contact", route: "contact" },
];
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const adminList = [
  { label: "All User", route:"/dashboard" },
  { label: "Profile", route: "/dashboard/profile" },
  { label: "Active User", route: "/dashboard/activeuser" },
  { label: "CSV", route: "/dashboard/csv" },
  { label: "Trash", route: "/dashboard/trash" },

];
const userList = [
  { label: "All User", route:"/dashboard" },
  { label: "Profile", route: "/dashboard/profile" },


];
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default function MiniDrawerBox() {
    const navigate =useNavigate()
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [modal, setModal] = React.useState(false)

  const OpenModal = ()=>{
    setModal(true)
  }

  const closeModal = ()=>{
    setModal(false)
  }


  const handleDrawerOpen = () => {
    setOpen((prevstate) => !prevstate);
  };
  const handleDrawerClose = () => {
    setOpen((prevstate) => !prevstate);
  };

  const Customdrawer = styled(Drawer)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      width: "fit-content !important",
      "& .MuiDrawer-paper": {
        width: "fit-content !important",
      },
    },
  }));
  const CustomListItemText = styled(ListItemText)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      display: open ? "block" : "none",
    },
  }));
  const CustomAppBar = styled(AppBar)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  }));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openCheck = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  

  let user = localStorage.getItem("user")
  user = JSON.parse(user)
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar
        position="fixed"
        // open={open}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: { sx: "block", md: "none" } }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className="appBar"
            variant="h6"
            noWrap
            component="div"
            display={"flex"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
               flexGrow:1,
               display:"flex",
               mt: {md:0.5},
               ml: {md:1}
    
              }}
            >
              Dashboard
            </Typography>
            {navItems.map((item) => {
              return (
                <Button
                  key={item}
                  sx={{ color: "#fff" }}
                  onClick={() => {
                    navigate(item.route);
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
            
            <Avatar
        id="basic-button"
        onClick={handleClick}
        alt="Remy Sharp"
        src={Img}
        
      />

  
      <Menu
      
        id="basic-menu"
        anchorEl={anchorEl}
        open={openCheck}
        onClose={handleClose}
        sx={{left:1350}}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={()=> navigate("profile")}>Profile</MenuItem>
        <MenuItem onClick={OpenModal}>Logout</MenuItem>
      </Menu>
            <Menu
              elevation={0}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              onClose={handleClose}
              // TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={OpenModal}>Logout</MenuItem>
            </Menu>
      </Typography>
        </Toolbar>
      </CustomAppBar>
      <Customdrawer
        variant="permanent"
        open={open}
        onClose={handleDrawerClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {user.role === "admin" ? 
          adminList.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  navigate(text.route);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <CustomListItemText
                  primary={text.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          )):
          userList.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  navigate(text.route);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <CustomListItemText
                  primary={text.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>))
          }
          <ListItem>
           
          </ListItem>
        </List>
        <Divider />
      </Customdrawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pl: { md: 3, sm: 13, xs: 13 },
          pt: { md: 3, sm: 3, xs: 3 },
        }}
      >
        <DrawerHeader />
        <Typography paragraph>
          {/* <Outlet /> */}
        </Typography>
      </Box>
      <LogoutModal modal={modal} closeModal={closeModal} />
    </Box>
  );
}