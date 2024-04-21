import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import { Syllabus } from "../../../models/syllabus.model";
import { FormatType, formatFromISOString } from "../../../utils/formatDate";
import PopperUI from "../../../components/ui/popper/PopperUI";
import {
  ContentCopy,
  CreateOutlined,
  DeleteForeverOutlined,
  EditOutlined,
  MoreHoriz,
  Sort,
} from "@mui/icons-material";
import { colorConfig } from "../../../configs/colorConfig";
import { useNavigate, useParams } from "react-router-dom";
import ButtonUI from "../../../components/ui/button/ButtonUI";

interface SyllabusListProps {
  syllabusList: Syllabus[];
  handleSortBy: (sortBy: string) => void;
  duplicateSyllabus: (id: string) => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const configStatus = (status: number) => {
  switch (status) {
    case 0:
      return (
        <Chip
          key={0}
          label="Inactive"
          sx={{ bgcolor: colorConfig.hoverColor, color: "#fff" }}
        />
      );
    case 1:
      return (
        <Chip
          key={1}
          label="Active"
          sx={{ bgcolor: colorConfig.mainColor, color: "#fff" }}
        />
      );
    case 2:
      return (
        <Chip
          key={2}
          label="Drafting"
          sx={{ bgcolor: colorConfig.blue, color: "#fff" }}
        />
      );
    default:
      return <Chip key={3} label="NaN" sx={{ bgcolor: colorConfig.gray }} />;
  }
};

const SyllabusTable = ({
  syllabusList,
  handleSortBy,
  duplicateSyllabus,
}: SyllabusListProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  // Handlers
  const handleViewSyllabus = (syllabusId: string) => {
    navigate(`/syllabus/${syllabusId}`);
  };

  // const handleAddTrainingProgram = () => {
  //   navigate("/training-program/create");
  // };

  const handleEditSyllabus = (id: string) => {
    navigate(`/syllabus/${id}/update`);
  };

  // const handleDeleteSyllabus = () => {
  //   console.log("Delete syllabus");
  // };

  return (
    <TableContainer component={Paper} key={id}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <div>Syllabus</div>
                <IconButton onClick={() => handleSortBy("SyllabusName")}>
                  <Sort fontSize="small" sx={{ color: "#fff" }} />
                </IconButton>
              </Stack>
            </StyledTableCell>
            <StyledTableCell>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <div>Code</div>
                <IconButton onClick={() => handleSortBy("Code")}>
                  <Sort fontSize="small" sx={{ color: "#fff" }} />
                </IconButton>
              </Stack>
            </StyledTableCell>
            <StyledTableCell>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <div>Create date</div>
                <IconButton onClick={() => handleSortBy("CreateDate")}>
                  <Sort fontSize="small" sx={{ color: "#fff" }} />
                </IconButton>
              </Stack>
            </StyledTableCell>
            <StyledTableCell>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <div>Create by</div>
                <IconButton onClick={() => handleSortBy("CreateBy")}>
                  <Sort fontSize="small" sx={{ color: "#fff" }} />
                </IconButton>
              </Stack>
            </StyledTableCell>
            <StyledTableCell>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <div>Duration</div>
                <IconButton onClick={() => handleSortBy("Duration")}>
                  <Sort fontSize="small" sx={{ color: "#fff" }} />
                </IconButton>
              </Stack>
            </StyledTableCell>
            <StyledTableCell>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <div>Output standard</div>
                <IconButton onClick={() => handleSortBy("OutputStandard")}>
                  <Sort fontSize="small" sx={{ color: "#fff" }} />
                </IconButton>
              </Stack>
            </StyledTableCell>
            <StyledTableCell>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <div>Status</div>
                <IconButton onClick={() => handleSortBy("Status")}>
                  <Sort fontSize="small" sx={{ color: "#fff" }} />
                </IconButton>
              </Stack>
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {syllabusList?.map((syllabus) => (
            <StyledTableRow key={syllabus.syllabusId}>
              <StyledTableCell
                onClick={() => handleViewSyllabus(syllabus.syllabusId ?? "")}
              >
                {syllabus.topicName
                  ? syllabus.topicName.charAt(0).toUpperCase() +
                    syllabus.topicName.slice(1)
                  : ""}
              </StyledTableCell>
              <StyledTableCell
                onClick={() => handleViewSyllabus(syllabus.syllabusId ?? "")}
              >
                {syllabus.code?.toLocaleUpperCase()}
              </StyledTableCell>
              <StyledTableCell
                onClick={() => handleViewSyllabus(syllabus.syllabusId ?? "")}
              >
                {/* {syllabus.createDate} */}
                {syllabus.createDate
                  ? formatFromISOString(
                      new Date(syllabus.createDate).toISOString(),
                      FormatType.DATE
                    )
                  : ""}
              </StyledTableCell>
              <StyledTableCell
                onClick={() => handleViewSyllabus(syllabus.syllabusId ?? "")}
              >
                {syllabus.createBy}
              </StyledTableCell>
              <StyledTableCell
                onClick={() => handleViewSyllabus(syllabus.syllabusId ?? "")}
              >{`${syllabus.duration} days`}</StyledTableCell>
              <StyledTableCell
                onClick={() => handleViewSyllabus(syllabus.syllabusId ?? "")}
                width="300px"
              >
                <Stack
                  spacing={1}
                  direction="row"
                  sx={{ width: "300px", display: "flex", overflowX: "hidden" }}
                >
                  {syllabus.outputStandard?.map((item, index) => (
                    <Chip key={index} label={`${item}`} />
                  ))}
                </Stack>
              </StyledTableCell>
              <StyledTableCell
                onClick={() => handleViewSyllabus(syllabus.syllabusId ?? "")}
              >
                {configStatus(syllabus.status ?? 0)}
              </StyledTableCell>
              <StyledTableCell>
                <PopperUI
                  type="bottom-start"
                  icon={<MoreHoriz />}
                  children={
                    <Box
                      sx={{
                        bgcolor: "#fff",
                        boxShadow: 2,
                        borderRadius: 3,
                        padding: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: 1,
                      }}
                    >
                      <ButtonUI
                        title="Add Training Program"
                        icon={<CreateOutlined />}
                        color="#000"
                      />
                      <ButtonUI
                        title="Edit Syllabus"
                        icon={<EditOutlined />}
                        color="#000"
                        onClick={(event) => {
                          event.preventDefault();
                          handleEditSyllabus(syllabus?.syllabusId ?? "");
                        }}
                      />
                      <ButtonUI
                        title="Duplicate Syllabus"
                        icon={<ContentCopy />}
                        color="#000"
                        onClick={() => duplicateSyllabus(syllabus.syllabusId!)}
                      />
                      <ButtonUI
                        title="Delete Syllabus"
                        icon={<DeleteForeverOutlined />}
                        color="#000"
                      />
                    </Box>
                  }
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SyllabusTable;
