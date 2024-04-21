import { FormControlLabel, Switch, alpha, styled } from "@mui/material";
import { orange } from "@mui/material/colors";

const OrangeSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: orange[600],
    "&:hover": {
      backgroundColor: alpha(orange[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: orange[600],
  },
}));

interface Props {
  checked: boolean;
  handleChange: () => void;
}

const SwitchUI = ({ checked, handleChange }: Props) => {
  return (
    <FormControlLabel
      control={<OrangeSwitch checked={checked} onChange={handleChange} />}
      label={checked ? "Active" : "Inactive"} // Adjust label placement as needed
    />
  );
};

export default SwitchUI;
