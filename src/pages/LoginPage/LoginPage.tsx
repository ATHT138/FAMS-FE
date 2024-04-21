import { Box, Paper, Stack, Typography } from "@mui/material";

import LoginForm from "./components/LoginForm";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <Box width="100%" position="relative">
      <div className="grid-style">
        <Paper
          elevation={10}
          sx={{
            width: "30%",
            height: "auto",
            padding: "40px",
            position: "absolute",
            top: "25%",
            right: "15%",
          }}
        >
          <Stack spacing={8} alignItems="center" textAlign="center">
            <Stack spacing={4}>
              <Typography variant="h3">
                FPT Fresh Academy Training Management
              </Typography>
              <Typography variant="body2">
                If you don’t have the account, please contact &nbsp;
                <a
                  style={{ color: "blue" }}
                  href="https://fsoft-academy.edu.vn/"
                >
                  https://fsoft-academy.edu.vn/
                </a>
              </Typography>
            </Stack>
            <LoginForm />
          </Stack>
        </Paper>
      </div>
    </Box>
  );
};

export default LoginPage;
