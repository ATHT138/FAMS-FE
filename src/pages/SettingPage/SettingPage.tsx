import { Settings } from "@mui/icons-material";
import { Box } from "@mui/material";
import { colorConfig } from "../../configs/colorConfig";

const SettingPage = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Settings sx={{ color: colorConfig.gray, fontSize: 300 }} />
    </Box>
  );
};

export default SettingPage;
