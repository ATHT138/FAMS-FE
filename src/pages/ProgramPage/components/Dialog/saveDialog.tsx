import { Box, Button, Dialog, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { Syllabus } from "../../../../models";
type Props = {
  name?: string | null;
  generalInformation: string | undefined | null;
  syllabuses: Syllabus[] | undefined;
  handleCreate: (status: number) => void;
};

const SaveDialogUI = ({
  name,
  generalInformation,
  syllabuses,
  handleCreate,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [checkGeneral, setCheckGeneral] = useState<boolean>(false);
  const [checkSyllabus, setCheckSyllabus] = useState<boolean>(false);
  const [checkName, setCheckName] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    generalInformation == null || generalInformation == ""
      ? setCheckGeneral(false)
      : setCheckGeneral(true);
    syllabuses == null || syllabuses.length == 0
      ? setCheckSyllabus(false)
      : setCheckSyllabus(true);
    name == null || name == "" ? setCheckName(false) : setCheckName(true);
  });

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        save
      </Button>
      {checkGeneral && checkSyllabus ? (
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
          <Box sx={{ ml: 2, fontSize: 20, mt: 1 }}>Do you want to save it?</Box>
          <Button
            sx={{ position: "absolute", bottom: "0", mb: 1, color: "red" }}
            onClick={() => {
              handleClose;
            }}
          >
            Cancel
          </Button>
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
              handleCreate(2);
            }}
          >
            save as draft
          </Button>
          <Button
            sx={{ position: "absolute", bottom: "0", right: "0", mb: 1, mr: 1 }}
            onClick={() => {
              handleCreate(1);
            }}
          >
            Save
          </Button>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: { width: "30%", minHeight: "30%", borderRadius: 8 },
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
          {!checkName ? (
            <Box sx={{ ml: 5, fontSize: 20 }}>- Name is empty</Box>
          ) : null}
          {!checkGeneral ? (
            <Box sx={{ ml: 5, fontSize: 20 }}>
              - General information is empty
            </Box>
          ) : null}
          {!checkSyllabus ? (
            <Box sx={{ ml: 5, fontSize: 20 }}>- Content is empty</Box>
          ) : null}
          <Button
            sx={{ position: "absolute", bottom: "0", right: "0", mb: 1, mr: 2 }}
            onClick={handleClose}
          >
            close
          </Button>
        </Dialog>
      )}
    </>
  );
};
export default SaveDialogUI;
