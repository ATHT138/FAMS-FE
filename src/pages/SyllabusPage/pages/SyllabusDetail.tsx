import { Box, Chip, Divider, IconButton, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import { MoreHoriz } from "@mui/icons-material";
import TabUI from "../../../components/ui/tab";
import GerenalDetail from "../components/details/GeneralDetail";
import OutlineDetail from "../components/details/OutlineDetail";
import OtherDetail from "../components/details/OtherDetail";
import { useEffect } from "react";
import {
  selectSyllabus,
  selectSyllabusOther,
  selectSyllabusOutline,
  syllabusAcitons,
} from "../../../features/syllabus/syllabus.slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
// import { selectCurrentUser } from "../../../features/user-management/user.slice";
import { FormatType, formatFromISOString } from "../../../utils/formatDate";

const tabs = [
  { checkNumber: 0, tabLabel: "General" },
  { checkNumber: 1, tabLabel: "Outline" },
  { checkNumber: 2, tabLabel: "Others" },
];

const SyllabusDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigation = useNavigate()
  const dispatch = useAppDispatch();
  const   syllabus = useAppSelector(selectSyllabus);
  const syllabusOutline = useAppSelector(selectSyllabusOutline);
  const syllabusOthers = useAppSelector(selectSyllabusOther);
  // const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(syllabusAcitons.fetchSyllabusById(id ?? ""));
  }, []);

  const dataTabs = [
    { id: 0, children: <GerenalDetail datas={syllabus} /> },
    { id: 1, children: <OutlineDetail syllabusOutline={syllabusOutline} /> },
    { id: 2, children: <OtherDetail datas={syllabusOthers} /> },
  ];

  return (
    <>
      <Box
        padding={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <div>
          <Stack spacing={2}>
            <TypographyUI
              title="Syllabus"
              variant="h4"
              letterSpacing="0.3rem"
            />
            <div>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={3}
              >
                <TypographyUI
                  title={syllabus?.topicName?.toLocaleUpperCase() ?? ""}
                  variant="h2"
                  letterSpacing="0.3rem"
                />
                <Chip
                  label="active"
                  sx={{
                    fontSize: "large",
                    padding: 2,
                    backgroundColor: "#2D3748",
                    color: "#fff  ",
                  }}
                />
              </Stack>
              <TypographyUI title={`${syllabus?.version}`} variant="h5" />
            </div>
          </Stack>
        </div>
        <IconButton>
          <MoreHoriz fontSize="large" />
        </IconButton>
      </Box>
      <Divider variant="fullWidth" sx={{ border: "1px solid" }} />
      <Box padding={3} marginBottom={4}>
        <Stack>
          <div>
            <strong style={{ fontSize: 24 }}>{syllabus?.dayNumber} </strong>{" "}
            days <i>({syllabus?.duration} hours)</i>
          </div>
          <div>
            Modified on{" "}
            <i>
              {formatFromISOString(
                syllabus?.createdDate ?? "",
                FormatType.DATE
              )}
            </i>{" "}
            <strong>by {syllabus?.createdBy}</strong>
          </div>
        </Stack>
        <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: 4 }}>
          <TabUI tabs={tabs} data={dataTabs} />
        </Box>
      </Box>
    </>
  );
};

export default SyllabusDetail;
