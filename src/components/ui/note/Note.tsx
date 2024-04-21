import { Clear } from "@mui/icons-material";
import { Box } from "@mui/material";
import { colorConfig } from "../../../configs/colorConfig";

type Props = {
  textSearch?: string;
  onClick?: () => void;
};

const styleBox = {
  width: "auto",
  bgcolor: colorConfig.mainColor,
  padding: "10px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontStyle: "italic",
  color: "#fff",
};

const styleIcon = {
  color: "#fff",
  cursor: "pointer",
};

const Note = (props: Props) => {
  return (
    <Box sx={styleBox}>
      {props.textSearch} &nbsp;
      <Clear sx={styleIcon} />
    </Box>
  );
};

export default Note;
