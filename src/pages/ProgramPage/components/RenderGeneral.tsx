import { Box } from "@mui/material";

type Props = {
  information?: string;
};

const RenderGeneral = ({ information }: Props) => {
  return <Box padding={3}>{information}</Box>;
};

export default RenderGeneral;
