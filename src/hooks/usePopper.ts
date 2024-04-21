import { PopperPlacementType } from "@mui/material";
import { useEffect, useState } from "react";

export const usePopper = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [placement, setPlacement] = useState<PopperPlacementType>();

  useEffect(() => {
    handleClick;
  }, [open]);

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return { anchorEl, handleClick, id, open, placement, handleClose };
};
