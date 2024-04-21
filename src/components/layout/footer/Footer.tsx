import { Box } from "@mui/material";
import { colorConfig } from "../../../configs/colorConfig";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        placeContent: "center",
        boxShadow: "unset",
        backgroundColor: colorConfig.mainColor,
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      Copyright @2022 BA Warrior. All right reserved
    </Box>
  );
};

export default Footer;
