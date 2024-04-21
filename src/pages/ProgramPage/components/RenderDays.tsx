import { Box } from "@mui/material";

type Props = {
  days?: number;
  hours?: number;
  date?: string;
  createBy?: string;
};

const RenderDays = ({ days, hours, date, createBy }: Props) => {
  return (
    <Box padding={3} boxShadow={3} >
      <strong>{days}</strong> days (<i>{hours} hours</i> ) <br />
      Modified on <i>{date}</i> by <strong>{createBy}</strong>
    </Box>
  );
};

export default RenderDays;
