import { Box, Chip, Divider, Stack } from "@mui/material";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import { colorConfig } from "../../../configs/colorConfig";

type Props = {
  name?: string | null;
  days?: number | null;
  hours?: number | null;
  modifiedOn?: string | null;
  modifiedBy: string | null;
  shadow?: number | 0;
};

const RenderContent = ({ name, days, hours, modifiedOn, modifiedBy, shadow }: Props) => {
  return (
    <Box padding={3} boxShadow={shadow} borderRadius="10px" width="100%">
      <Stack spacing={2}>
        <Stack spacing={3} direction="row" alignItems="center">
          <TypographyUI title="Linux" variant="h4" letterSpacing="0.3rem" />
          <Chip
            label="Active"
            sx={{
              bgcolor: colorConfig.mainColor,
              color: "#fff",
            }}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={3}
          divider={
            <Divider
              orientation="vertical"
              sx={{ border: "1px solid #000" }}
              flexItem
            />
          }
        >
          <div>{name}</div>
          <div>
            {days} days (<i>  {hours} hours</i> )
          </div>
          <div>
            Modified on <i>{modifiedOn} by</i> <strong> {modifiedBy}</strong>
          </div>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RenderContent;
