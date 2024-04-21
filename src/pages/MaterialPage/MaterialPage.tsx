import { ImportContacts } from "@mui/icons-material";
import { Box } from "@mui/material";
import { colorConfig } from "../../configs/colorConfig";

const MaterialPage = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <ImportContacts sx={{ color: colorConfig.gray, fontSize: 300 }} />
    </Box>
  );
};

export default MaterialPage;
