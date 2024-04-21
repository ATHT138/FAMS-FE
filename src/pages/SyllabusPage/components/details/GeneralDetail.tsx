import {
  Box,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import {
  CropFree,
  GroupOutlined,
  SettingsOutlined,
  StarOutline,
} from "@mui/icons-material";
import TypographyUI from "../../../../components/ui/typography/TypographyUI";
import { colorConfig } from "../../../../configs/colorConfig";
import { SyllabusDetail } from "../../../../models";


interface GerenalDetailProps {
  datas: SyllabusDetail | null;
}

const GerenalDetail = ({ datas }: GerenalDetailProps) => {
  return (
    <Grid container spacing={2} marginTop={1}>
      <Grid item xs={5}>
        <Box
          // justifyContent="center"
          // alignItems="center"
          padding={3}
          boxShadow={10}
          borderRadius="10px"
        >
          <Grid container justifyContent="space-between">
            <Grid item xs={4}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <StarOutline />
                  </ListItemIcon>
                  <ListItemText>
                    <TypographyUI title="Level" />
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <GroupOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <TypographyUI title="Attendee number" />
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <GroupOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <TypographyUI title="Output Standard" />
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6}>
              <List>
                <ListItem>
                  <ListItemText>
                    <TypographyUI title={`${datas?.level}`} />
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <TypographyUI title={`${datas?.attendeeNumber}`} />
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <Stack direction="row" flexWrap="wrap" gap={2}>
                    {datas?.listOutputStandard?.map((item, index) => (
                      <Chip
                        key={index}
                        label={item}
                        sx={{
                          padding: 1,
                          bgcolor: colorConfig.mainColor,
                          color: "#fff",
                          fontSize: "medium",
                        }}
                      />
                    ))}
                  </Stack>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={7}>
        <Box padding={3} boxShadow={10} borderRadius="10px">
          <Stack spacing={3} direction="row">
            <SettingsOutlined />
            <TypographyUI title="Technical Requirement(s) " />
          </Stack>
          <Box fontSize={16} marginTop={1}>
            <div>{datas?.technicalRequirement}</div>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box padding={3} boxShadow={10} borderRadius="10px">
          <Stack spacing={3} direction="row">
            <CropFree />
            <TypographyUI title="Course objectives" />
          </Stack>
          <Box fontSize={16} marginTop={1}>
            <div dangerouslySetInnerHTML={{ __html: datas?.objective ?? "" }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default GerenalDetail;
