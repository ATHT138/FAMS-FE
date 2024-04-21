import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Material } from "../../../../models";
import { Box, Link, Skeleton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  open: boolean;
  trainingDay: number;
  unitIndex: number;
  unitName: string;
  materials: Material[];
  handleOpen: () => void;
};

export default function MaterialListListUI({
  open,
  trainingDay,
  unitIndex,
  unitName,
  materials,
}: Props) {
  // const [Uploading, setUploading] = React.useState(false);
  // const [newLink, setNewLink] = React.useState<File>();
  // const [message, setMessage] = React.useState<string>("");
  // const dispatch = useAppDispatch();

  const handleClose = () => {};

  return (
    <>
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
      </Dialog>
    </>
  );
}
