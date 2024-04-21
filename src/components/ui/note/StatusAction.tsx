import { Box, SxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  displayText?: string;
  icon?: ReactNode;
  style?: SxProps;
};

const StatusAction = ({ displayText, style, icon }: Props) => {
  return (
    <Box padding={"2px 20px 2px 20px"} borderRadius="17.5rem" sx={style}>
      {icon}
      <Typography variant="caption">{displayText}</Typography>
    </Box>
  );
};

export default StatusAction;
