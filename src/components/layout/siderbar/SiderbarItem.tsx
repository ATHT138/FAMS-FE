import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { menuType } from "./data/config";
import Show from "../../../utils/Show";
import { Link } from "react-router-dom";

interface Props {
  item: menuType;
  onClick?: () => void;
  open?: boolean;
}

const SiderbarItem = (props: Props) => {
  return (
    <ListItemButton component={Link} to={props.item.path as string}>
      <Show>
        <Show.When isTrue={!!(props.item.path || props.item.child)}>
          <ListItemIcon onClick={props.onClick}>{props.item.icon}</ListItemIcon>
          <Collapse in={props.open} orientation="horizontal" timeout={100}>
            <ListItemText>
              <Typography>{props.item.displayText}</Typography>
            </ListItemText>
          </Collapse>
        </Show.When>
      </Show>
    </ListItemButton>
  );
};

export default SiderbarItem;
