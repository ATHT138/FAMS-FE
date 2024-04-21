import { Box, Modal } from "@mui/material";
import { ReactNode, useState } from "react";
import TypographyUI from "../typography/TypographyUI";
import ButtonUI from "../button/ButtonUI";

type Props = {
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
  modalTitle?: string;
  bgcolor?: string;
  color?: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 700,
  bgcolor: "background.paper",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: 24,
};

const ModalUI = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { title, children, icon, modalTitle, bgcolor, color } = props;

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <div>
      <ButtonUI
        title={title}
        icon={icon}
        onClick={handleOpen}
        color={color}
        bgcolor={bgcolor}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              padding: 2,
              bgcolor: "#2D3748",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TypographyUI
              id="modal-modal-title"
              title={modalTitle}
              variant="h5"
            />
          </Box>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalUI;
