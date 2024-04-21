import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSchema } from "../../../schemas";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectIsAuthenticated,
  selectIsLogin,
  userActions,
} from "../../../features/user-management/user.slice";
import { useNavigate } from "react-router-dom";
import ButtonUI from "../../../components/ui/button/ButtonUI";
import { colorConfig } from "../../../configs/colorConfig";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLogin = useAppSelector(selectIsLogin);
  const onSubmit = () => {
    console.log("submit");
    dispatch(
      userActions.login({ email: values.email, password: values.password })
    );
  };

  const { handleSubmit, touched, handleChange, handleBlur, values, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: useSchema,
      onSubmit,
    });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      toast.success("Login successfully");
    } else if (isLogin) {
      dispatch(userActions.logout());
      toast.error("Login failed");
    }
  }, [isAuthenticated, navigate, isLogin]);

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <form style={{ width: "70%" }} onSubmit={handleSubmit} autoComplete="off">
      <Stack spacing={2}>
        <TextField
          id="email"
          type="email"
          value={values.email}
          placeholder="Enter Email"
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.email && touched.email}
          helperText={errors.email}
        />
        <TextField
          id="password"
          type={showPassword ? "text" : "password"}
          value={values.password}
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.password && touched.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            color: "gray",
            placeSelf: "end",
          }}
        >
          <a href="#">Forgot Password?</a>
        </Typography>
        <ButtonUI
          title="Sign In"
          bgcolor={colorConfig.mainColor}
          color="#fff"
          // onClick={onSubmit}
        />
      </Stack>
    </form>
  );
};

export default LoginForm;
