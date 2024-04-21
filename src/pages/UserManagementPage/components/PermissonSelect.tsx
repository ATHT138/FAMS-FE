import {
  AddCircleOutline,
  CreateOutlined,
  StarOutline,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useState } from "react";

interface Props {
  getLabel: "Syllabus" | "Program" | "Class" | "Material" | "User";
  permission?: string | null;
  sendValue: (value: string) => void;
}

const PermissonSelect = ({ sendValue, permission }: Props) => {
  const [labelChange, setLabelChange] = useState<string | null | undefined>(
    permission
  );

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setLabelChange(event.target.value);
    sendValue(event.target.value);
  };

  const menuItems = [
    { id: 1, icon: <VisibilityOffOutlined />, label: "Access denied" },
    { id: 2, icon: <VisibilityOutlined />, label: "View" },
    { id: 3, icon: <CreateOutlined />, label: "Modify" },
    { id: 4, icon: <AddCircleOutline />, label: "Create" },
    { id: 5, icon: <StarOutline />, label: "Full access" },
  ];

  return (
    <FormControl>
      <InputLabel size="small" sx={{ width: "250px" }}>
        Select
      </InputLabel>
      <Select
        value={labelChange ?? ""}
        size="small"
        label="Select"
        sx={{ width: "250px", borderRadius: "10px", boxShadow: 3 }}
        onChange={handleSelectChange}
      >
        {menuItems.map((item) => {
          return (
            <MenuItem
              value={item.label}
              sx={{ gap: 2, marginTop: 1, marginBottom: 1 }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <div>{item.icon}</div>
                <div>{item.label}</div>
              </Stack>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default PermissonSelect;
