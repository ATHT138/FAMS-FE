import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

interface InputValueProps {
  color?: string;
  setResult?: React.Dispatch<React.SetStateAction<string>>;
}

const InputValue = (props: InputValueProps) => {
  const { color } = props;

  
  return (
    <TextField
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

export default InputValue;
