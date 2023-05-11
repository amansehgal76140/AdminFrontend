import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useLocation } from "react-router-dom";

const DisplayList = [
  { label: "Dashboard", link: "/admin/dashboard" },
  { label: "View All Supplier", link: "/admin/viewsupplier" },
  { label: "Create New Supplier", link: "/admin/addnewsupplier" },
  { label: "Create New Requisition", link: "/admin/newrequisition" },
  { label: "Pending Requisition", link: "/admin/pendingrequisition" },
  { label: "Approved Requisition", link: "/admin/approvedrequisition" },
  { label: "Supplier Quote", link: "/admin/supplierquote" },
  { label: "Receipt Archive", link: "/admin/receiptarchive" },
];

const drawerWidth = 210;

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(-1);

  const handleClick = (text, index) => {
    setActiveTab(index);
    navigate(text.link);
  };

  useEffect(() => {
    const url = location.pathname;
    const index = DisplayList.findIndex((item) => url.includes(item.link));
    setActiveTab(index);
  }, [location.pathname]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "black",
          color: "white",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {DisplayList.map((text, index) => {
          const { label } = text;
          if (index === activeTab)
            return (
              <ListItem
                key={label}
                disablePadding
                sx={{ backgroundColor: "primary.main" }}
              >
                <ListItemButton onClick={() => handleClick(text, index)}>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            );
          return (
            <ListItem key={label} disablePadding>
              <ListItemButton onClick={() => handleClick(text, index)}>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default SideBar;
