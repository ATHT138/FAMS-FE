import { menuType } from "./data/config";
import { ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import Show from "../../../utils/Show";

interface Props {
  item: menuType;
  onClick: () => void;
}

const SiderbarIcon = ({ item, onClick }: Props) => {
  return (
    <Show>
      <Show.When isTrue={!!(item.child || item.path)}>
        <ListItemButton
          sx={{ marginTop: 1, marginBottom: 1 }}
          onClick={onClick}
          component={Link}
          to={item.path as string}
        >
          {item.icon}
        </ListItemButton>
      </Show.When>
    </Show>
  );
};

export default SiderbarIcon;
