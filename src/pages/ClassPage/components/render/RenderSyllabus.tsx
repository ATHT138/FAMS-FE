import { Reddit } from "@mui/icons-material";
import { Box, Chip, Divider, Grid, Stack } from "@mui/material";
import TypographyUI from "../../../../components/ui/typography/TypographyUI";
import { Syllabus, SyllabusView } from "../../../../models";
import { FormatType, formatFromISOString } from "../../../../utils/formatDate";

interface RenderSyllabusProps {
  syllabusView?: SyllabusView | Syllabus | null;
}

const RenderSyllabus = ({ syllabusView }: RenderSyllabusProps) => {
  return (
    <Box sx={{ color: "#000" }}>
      <Grid container>
        <Grid
          item
          xs={3}
          justifyContent="center"
          alignItems="center"
          display="flex"
          bgcolor="#2D3748"
        >
          <Box>
            <Reddit
              fontSize="large"
              sx={{ border: "1px solid #000", borderRadius: "50%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box
            width="100%"
            border="1px solid #fff"
            borderRadius="0px 10px 10px 0px"
            boxShadow={20}
          >
            <Stack padding={3} spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <TypographyUI
                  variant="h4"
                  title={`${syllabusView?.topicName}`}
                  letterSpacing="0.3rem"
                />
                <Chip
                  label="Active"
                  sx={{ padding: 2, bgcolor: "#2D3748", color: "#fff" }}
                />
              </Stack>
              <Stack
                spacing={2}
                direction="row"
                divider={
                  <Divider
                    flexItem
                    orientation="vertical"
                    sx={{ border: "1px solid #000" }}
                  />
                }
                fontSize={18}
              >
                <Box>
                  {(syllabusView as SyllabusView)?.syllabuseCode}{" "}
                  {(syllabusView as SyllabusView)?.version}
                </Box>
                <Box display="flex" gap={1}>
                  <strong>3</strong>
                  <div>days</div>
                  <i>({20} hours)</i>
                </Box>
                <Box display="flex" gap={1}>
                  <div>on</div>
                  <i>
                    {formatFromISOString(
                      syllabusView?.createDate ?? "",
                      FormatType.DATE
                    )}
                  </i>
                  <div>by</div>
                  <strong>{syllabusView?.createBy}</strong>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RenderSyllabus;
