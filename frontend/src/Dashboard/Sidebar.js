import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import GridViewIcon from "@mui/icons-material/GridView";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import WifiIcon from "@mui/icons-material/Wifi";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SummarizeIcon from "@mui/icons-material/Summarize";
import "./Sidebar.css";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useAppStore } from "./appStore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
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

function ResponsiveDrawer() {
  const theme = useTheme();
  const open = useAppStore((state) => state.dopen);

  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* <ListItem onClick={() => navigate("/admin")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "intial" : "center",
                px: 3.5,
              }}
            >
              <ListItemIcon>
                <GridViewIcon className="icon3" />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem> */}

          <ListItem onClick={() => navigate("/admin-user-details")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "intial" : "center",
                px: 3.5,
              }}
            >
              <ListItemIcon>
                <AddHomeWorkIcon className="icon3" />
              </ListItemIcon>
              <ListItemText>User Details</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem onClick={() => navigate("/admin-user-activity")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "intial" : "center",
                px: 3.5,
              }}
            >
              <ListItemIcon>
                <MeetingRoomIcon className="icon3" />
              </ListItemIcon>
              <ListItemText>User Activity </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem onClick={() => navigate("/admin-add-credits")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "intial" : "center",
                px: 3.5,
              }}
            >
              <ListItemIcon>
                <MeetingRoomIcon className="icon3" />
              </ListItemIcon>
              <ListItemText>Add credit </ListItemText>
            </ListItemButton>
          </ListItem>


          <ListItem onClick={() => navigate("/admin-profile")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "intial" : "center",
                px: 3.5,
              }}
            >
              <ListItemIcon>
                <AssignmentIndIcon className="icon3" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItemButton>
          </ListItem>

         

         
         
          <ListItem onClick={() => navigate("#")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "intial" : "center",
                px: 3.5,
              }}
            >
              <ListItemIcon>
                <SupportAgentIcon className="icon3" />
              </ListItemIcon>
              <ListItemText>24 X 7 Helps </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem onClick={() => navigate("/login")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "intial" : "center",
                px: 3.5,
              }}
            >
              <ListItemIcon>
                <LoginTwoToneIcon className="icon3" />
              </ListItemIcon>
              <ListItemText>Log -Out</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
    
  );
}
export default ResponsiveDrawer;