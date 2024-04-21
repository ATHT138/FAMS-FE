import { Box, Button, Dialog, Divider } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  name: string;
};

const BackDialogUI = ({ name }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)} sx={{ color: "gray" }}>
        Back
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { width: "30%", minHeight: "25%", borderRadius: 8 },
        }}
      >
        <Box
          sx={{
            fontWeight: "bold",
            fontSize: 30,
            color: "white",
            pl: 2,
            pt: 1,
            backgroundColor: "#2D3748",
          }}
        >
          Warning
        </Box>
        <Divider sx={{ mb: 2 }}></Divider>
        <Box sx={{ ml: 2, fontSize: 20, mt: 1 }}>Are you sure?</Box>
        <Button
          sx={{ position: "absolute", bottom: "0", mb: 1, color: "red" }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          sx={{
            position: "absolute",
            bottom: "0",
            right: "0",
            mb: 1,
            mr: 1,
            color: "gray",
          }}
          onClick={() => {
            navigate(`/training-program/create?name=${name}`);
          }}
        >
          Back
        </Button>
      </Dialog>
    </>
  );
};

export default BackDialogUI;
