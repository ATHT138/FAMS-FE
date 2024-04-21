import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Material } from "../../../../models";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Box, Link, Skeleton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../../../configs/firebase";
import { useAppDispatch } from "../../../../store/hooks";
import { materialActions } from "../../../../features/TrainingMaterial/trainingMaterial.slice";

type Props = {
  trainingDay: number;
  unitIndex: number;
  unitName: string;
  materials: Material[];
};

export default function MaterialListBoxUI({
  trainingDay,
  unitIndex,
  unitName,
  materials,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [Uploading] = React.useState(false);
  // const [newLink, setNewLink] = React.useState<File>();
  // const [message, setMessage] = React.useState<string>("");
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    //@ts-expect-error
    const nextValue = event.target.files[0];
    handleSubmit(nextValue);
  };

  const handleSubmit = (value: File) => {
    if (value == null) return;
    const timestamp = new Date().getTime();
    const uniqueFileName = `${timestamp}_${value.name}`;
    const Ref = ref(storage, `docs/${uniqueFileName}`);
    getMetadata(Ref)
      .then(() => {
        toast.error("Upload failed, file already exists!");
      })
      .catch(() => {
        uploadBytes(Ref, value)
          .then(() => {
            getDownloadURL(Ref)
              .then((url) => {
                dispatch(
                  materialActions.create({
                    name: value.name,
                    link: url,
                    trainingContentId: trainingContentId,
                  })
                );
              })
          })
      });
  };

  const handleDelete = (materialId: string) => {
    dispatch(materialActions.delete(materialId));
  }

  return (
    <>
      <Box onClick={handleClickOpen} sx={{}}>
        <FolderOpenIcon
          sx={{
            display: "block",
            marginLeft: "auto",
            marginright: "10px",
          }}
        />
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            padding: "5px 5px 5px 5px",
            backgroundColor: "#2D3748",
            color: "white",
          }}
        >
          Day {trainingDay}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box sx={{ width: "15%" }}>Unit {unitIndex}</Box>
            <Box sx={{ width: "30%" }}>{unitName}</Box>
          </Box>
          <Box
            sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}
          >
            {materials.length > 0 ? (
              materials.map((material) => (
                <Box
                  sx={{
                    position: "flex",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Box>
                    <Link href={material.link}>{material.name}</Link>
                  </Box>
                  <Box>{material.createBy?.toString()}</Box>
                  <Box>
                    <EditIcon />
                  </Box>
                  <Box>
                    <DeleteIcon />
                  </Box>
                </Box>
              ))
            ) : (
              <Skeleton variant="rounded" />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <form style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Box sx={{ position: "flex" }}>
              <LoadingButton
                sx={{ marginLeft: "auto", marginRight: "auto" }}
                component="label"
                role={undefined}
                variant="contained"
                loading={Uploading}
              >
                Upload new
                <label htmlFor="file-input">Choose File</label>
                <input
                  id="file-input"
                  type="file"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </LoadingButton>
            </Box>
          </form>
        </DialogActions>
      </Dialog>
    </>
  );
}
