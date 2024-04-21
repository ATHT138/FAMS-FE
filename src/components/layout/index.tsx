import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Siderbar from "./siderbar";

const DashboardPage = () => {
  return (
    <Box width="100%" display="flex" minHeight="100vh">
      <Box width="100%" display="flex" flex="1 1 0%">
        <Siderbar />
        <div style={{ width: "100%" }}>
          <Outlet />
        </div>
      </Box>
    </Box>
  );
};

export default DashboardPage;
