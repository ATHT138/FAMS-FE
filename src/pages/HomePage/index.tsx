import { Home } from "@mui/icons-material";
import { Box } from "@mui/material";
import { colorConfig } from "../../configs/colorConfig";

const HomePage = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Home sx={{ fontSize: 300, color: colorConfig.gray }} />
    </Box>
  );
};

export default HomePage;
