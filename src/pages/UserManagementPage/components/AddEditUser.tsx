import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import { DatePicker } from "@mui/x-date-pickers";
import SwitchUI from "../../../components/ui/toggle/SwitchUI";
import ButtonUI from "../../../components/ui/button/ButtonUI";
import {
  ListParamsCreateUser,
  ListParamsUpdateUser,
  User,
} from "../../../models";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectUserActionIsSuccess,
  userActions,
} from "../../../features/user-management/user.slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const options = ["Super admin", "Admin", "Trainee", "Trainer"];

const valueLabels = [
  { label: "User type", id: "userType" },
  { label: "Name", id: "name" },
  { label: "Password", id: "password" },
  { label: "Email address", id: "email" },
  { label: "Phone", id: "phone" },
  { label: "Date of birh", id: "birthday" },
  { label: "Gender", id: "gender" },
  { label: "Status", id: "status" },
];

interface Props {
  user?: User | null;
}

const AddEditUser = ({ user }: Props) => {
  const [checked, setChecked] = useState<boolean>(true);
  const [data, setData] = useState<ListParamsCreateUser | null>(null);
  const dispatch = useAppDispatch();
  const isSuccess = useAppSelector(selectUserActionIsSuccess);
  const navigate = useNavigate();

  const handleChange = () => {
    setChecked(!checked);
    setData({ ...data, status: !checked });
  };
  const handleSave = () => {
    dispatch(userActions.createUser(data ?? {}));
  };
  const handleUpdate = () => {
    const updateUserData: ListParamsUpdateUser = {
      id: user?.userId,
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      dob: data?.dob,
      gender: data?.gender,
      role: data?.role,
      password: data?.password,
      status: data?.status,
    };
    dispatch(userActions.updateUser(updateUserData ?? {}));
  };
  const convertRole = (role: string | number | null) => {
    switch (role) {
      case "Super admin":
        return 1;
      case "Admin":
        return 2;
      case "Trainee":
        return 3;
      case "Trainer":
        return 4;
      default:
        break;
    }
  };

  useEffect(() => {
    if (user) {
      setData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        role: user.role,
        password: user.password,
        status: user.status,
        dob: user.dob ? new Date(user.dob) : null,
      });
    }
  }, []);

  useEffect(() => {
    if (isSuccess == null) return;
    let action = "";
    if (user && user.userId) {
      action = "Update";
    } else {
      action = "Create";
    }
    if (isSuccess) {
      toast(`${action} User Successfully !`);
      navigate(`/user-management`);
    } else {
      toast.error(`${action} User Failed !`);
    }
    dispatch(userActions.resetStatusUserAction());
  }, [isSuccess]);

  const valueInput: Record<string, React.ReactNode> = {
    userType: (
      <FormControl fullWidth size="small">
        <InputLabel>Select</InputLabel>
        <Select
          label="Select"
          value={data?.role}
          onChange={(e) =>
            setData({ ...data, role: convertRole(e.target.value) })
          }
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ),

    name: (
      <TextField
        fullWidth
        placeholder="User name"
        size="small"
        value={data?.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
    ),
    password: (
      <TextField
        fullWidth
        placeholder="Password"
        size="small"
        value={data?.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
    ),
    email: (
      <TextField
        fullWidth
        placeholder="Email address"
        size="small"
        value={data?.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
    ),
    phone: (
      <TextField
        fullWidth
        placeholder="Phone"
        size="small"
        value={data?.phone}
        onChange={(e) => setData({ ...data, phone: e.target.value })}
      />
    ),
    birthday: (
      <DatePicker
        label="Select date"
        sx={{ width: "100%", fontStyle: "italic" }}
        value={dayjs(data?.dob)}
        onChange={(e) => setData({ ...data, dob: e?.toDate() })}
      />
    ),
    gender: (
      <FormControl>
        <RadioGroup
          row
          defaultValue={data?.gender}
          onChange={(e) =>
            setData({
              ...data,
              gender: e.target.value === "male" ? true : false,
            })
          }
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
    ),
    status: <SwitchUI checked={checked} handleChange={handleChange} />,
  };

  return (
    <Box padding={4}>
      <Stack spacing={2}>
        {valueLabels.map((valueLabel, index) => (
          <Grid
            container
            key={index}
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Grid item xs={3}>
              <TypographyUI title={`${valueLabel.label}`} />
            </Grid>
            <Grid item xs={6}>
              {valueInput[valueLabel.id]}
            </Grid>
          </Grid>
        ))}
      </Stack>
      <Stack spacing={3} direction="row" marginTop={3} justifyContent="center">
        <Button
          variant="text"
          sx={{ textDecoration: "underline", color: "red" }}
        >
          Cancel
        </Button>
        {user == null && (
          <ButtonUI
            title="Save"
            bgcolor="#2D3748"
            color="#fff"
            onClick={handleSave}
          />
        )}
        {user && (
          <ButtonUI
            title="Update"
            bgcolor="#2D3748"
            color="#fff"
            onClick={handleUpdate}
          />
        )}
      </Stack>
    </Box>
  );
};

export default AddEditUser;
