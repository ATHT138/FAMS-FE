import { useState } from "react";

export const useOpenClose = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return { open, setOpen, handleClose, handleOpen };
};
