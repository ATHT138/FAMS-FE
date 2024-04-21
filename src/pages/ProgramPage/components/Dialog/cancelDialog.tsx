import { Box, Button, Divider, Popover } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
type Props = {
  isDraft: boolean;
  handleClick?: (status: number) => void;
};

const CancelDialogUI = ({ isDraft, handleClick }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)} sx={{ color: "red" }}>
        Cancel
      </Button>
      <Popover
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
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
        <Box sx={{ ml: 2, fontSize: 20, mt: 1 }}>
          {isDraft
            ? "Do you want to save it as draft version?"
            : "Are you sure?"}
        </Box>
        <Button
          sx={{ position: "absolute", bottom: "0", mb: 1, color: "red" }}
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        {isDraft ? (
          <>
            <Button
              sx={{
                position: "absolute",
                bottom: "0",
                ml: "35%",
                mb: 1,
                mr: 1,
                color: "gray",
              }}
              onClick={() => {
                navigate("/training-program");
              }}
            >
              Back
            </Button>
            <Button
              sx={{
                position: "absolute",
                bottom: "0",
                right: "0",
                mb: 1,
                mr: 1,
              }}
              onClick={() => {
                if (handleClick)
                  handleClick(2);
              }}
            >
              Save draft
            </Button>
          </>
        ) : (
          <Button
            sx={{ position: "absolute", bottom: "0", right: "0", mb: 1, mr: 1 }}
            onClick={() => {
              navigate("/training-program");
            }}
          >
            yes
          </Button>
        )}
      </Popover>
    </>
  );
};

export default CancelDialogUI;
