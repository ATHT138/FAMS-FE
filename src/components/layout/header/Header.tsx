import { AppBar, Avatar, Box, Stack, Toolbar, Typography } from "@mui/material";
import assets from "../../../assets";
import Show from "../../../utils/Show";
import { colorConfig } from "../../../configs/colorConfig";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  userActions,
} from "../../../features/user-management/user.slice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const auth = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userActions.logout());
    navigate("/sign-in");
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "unset",
        backgroundColor: colorConfig.mainColor,
        color: "#fff",
      }}
    >
      <Toolbar
        sx={{
          height: "6rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img src={assets.images.logo} />
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Box
            sx={{
              padding: "10px 0",
              display: "flex",
              backgroundColor: colorConfig.secoundColor,
              borderRadius: "25px",
              width: "140px",
              textTransform: "none",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ width: "2rem", height: "2rem" }}
              src={assets.images.icon}
              variant="square"
            />
            <Typography>uniGate</Typography>
          </Box>
          <Show>
            <Show.When isTrue={isAuthenticated}>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar />
                <Box
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography variant="h6">{auth?.name}</Typography>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    onClick={handleLogout}
                    variant="subtitle2"
                  >
                    Log out
                  </Typography>
                </Box>
              </Stack>
            </Show.When>
          </Show>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
