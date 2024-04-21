import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

type Props = {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  color?: string;
};

const InputSearch = (props: Props) => {
  const { color, onChange, value } = props;

  return (
    <TextField
      type="search"
      fullWidth
      value={value}
      onChange={onChange}
      variant="outlined"
      placeholder="Search by ..."
      InputProps={{
        style: {
          borderRadius: "10px",
          backgroundColor: `${color}`,
        },
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputSearch;
