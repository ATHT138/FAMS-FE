import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={3}>
        <Typography color="red" fontSize={100} textTransform="uppercase">
          Not Found
        </Typography>
        <Button variant="outlined" component={Link} to="/">
          Home Page
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFound;
