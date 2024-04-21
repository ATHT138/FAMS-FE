import { Box, List, ListItemButton } from "@mui/material";
import sizeConfig from "../../../configs/sizeConfig";
import { Clear, Menu } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import menuData from "./data/menuData";
import SiderbarIcon from "./SiderbarIcon";
import SiderbarItem from "./SiderbarItem";
import Show from "../../../utils/Show";
import SiderbarItemCollapse from "./SiderbarItemCollapse";
import { colorConfig } from "../../../configs/colorConfig";

const Siderbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const styleBox = {
    width: !open ? "auto" : sizeConfig.siderbar.width,
    height: "auto",
    minHeight: "100vh",
    bgcolor: colorConfig.white,
  };

  return (
    <Box sx={styleBox} ref={sidebarRef}>
      <List>
        <ListItemButton onClick={toggleSidebar}>
          {!open ? <Menu /> : <Clear />}
        </ListItemButton>
        {menuData.map((sidebar, index) => (
          <Show key={index}>
            <Show.When isTrue={!open}>
              <SiderbarIcon
                key={index}
                item={sidebar}
                onClick={toggleSidebar}
              />
            </Show.When>
            <Show.When isTrue={open && !!sidebar.child}>
              <SiderbarItemCollapse
                key={index}
                item={sidebar}
                onClick={toggleSidebar}
              />
            </Show.When>
            <Show.When isTrue={open && !sidebar.child}>
              <SiderbarItem
                open={open}
                key={index}
                item={sidebar}
                onClick={toggleSidebar}
              />
            </Show.When>
          </Show>
        ))}
      </List>
    </Box>
  );
};

export default Siderbar;
