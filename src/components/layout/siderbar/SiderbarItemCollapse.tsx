import { useState } from "react";
import { menuType } from "./data/config";
import Show from "../../../utils/Show";
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import sizeConfig from "../../../configs/sizeConfig";

export interface Props {
  item: menuType;
  onClick?: () => void;
}

const SiderbarItemCollapse = ({ item, onClick }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Show>
      <Show.When isTrue={!!(item.child && item.path)}>
        <ListItemButton
          sx={{ width: sizeConfig.siderbar.width }}
          onClick={() => setOpen(!open)}
          component={Link}
          to={item.path as string}
        >
          <ListItemIcon onClick={onClick}>{item.icon}</ListItemIcon>
          <ListItemText
            disableTypography
            primary={<Typography>{item.displayText}</Typography>}
          />
          {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
        </ListItemButton>
        <Collapse in={open} timeout={100}>
          {item.child?.map((sidebar, index) => (
            <ListItemButton
              sx={{ width: sizeConfig.siderbar.width, paddingLeft: "4rem" }}
              key={index}
              component={Link}
              to={sidebar.path as string}
            >
              <ListItemText
                disableTypography
                primary={<Typography>{sidebar.displayText}</Typography>}
              />
            </ListItemButton>
          ))}
        </Collapse>
      </Show.When>
      <Show.Else>{null}</Show.Else>
    </Show>
  );
};

export default SiderbarItemCollapse;
