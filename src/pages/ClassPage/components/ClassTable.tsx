import {
  ContentCopy,
  DeleteForeverOutlined,
  EditOutlined,
  MoreHoriz,
  Sort,
  VisibilityOffOutlined,
} from "@mui/icons-material";
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
import { Class } from "../../../models";
import { FormatType, formatFromISOString } from "../../../utils/formatDate";
import PopperUI from "../../../components/ui/popper/PopperUI";
import { colorConfig } from "../../../configs/colorConfig";
import { useNavigate, useParams } from "react-router-dom";
import ButtonUI from "../../../components/ui/button/ButtonUI";
import { useAppDispatch } from "../../../store/hooks";
import { classActions } from "../../../features/class/class.slice";

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

interface ClassTableProps {
  classList: Class[] | null;
}

const checkAttendee = (attendee: number) => {
  switch (attendee) {
    case 1:
      return (
        <Chip
          key={1}
          label="Draft"
          sx={{ bgcolor: colorConfig.gray, color: "#000" }}
        />
      );
    case 2:
      return (
        <Chip
          key={2}
          label="Planning"
          sx={{ bgcolor: colorConfig.blue, color: "#fff" }}
        />
      );
    case 3:
      return (
        <Chip
          key={3}
          label="Schedule"
          sx={{ bgcolor: colorConfig.orange, color: "#fff" }}
        />
      );
    case 4:
      return (
        <Chip
          key={4}
          label="Openning"
          sx={{ bgcolor: colorConfig.green, color: "#fff" }}
        />
      );
    case 5:
      return (
        <Chip
          key={5}
          label="Completed"
          sx={{ bgcolor: colorConfig.mainColor, color: "#fff" }}
        />
      );
    case 0:
      return (
        <Chip
          key={4}
          label="De-active"
          sx={{ bgcolor: colorConfig.secoundColor, color: "#fff" }}
        />
      );
    default:
      break;
  }
};

const ClassTable = ({ classList }: ClassTableProps) => {
  const { id } = useParams();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const handeleDetailClass = (id: string) => {
    navigation(`/class/${id}`);
  };

  return (
    <TableContainer key={id} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <div>Class</div>
                <IconButton>
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
                <div>Class Code</div>
                <IconButton>
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
                <div>Created on</div>
                <IconButton>
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
                <div>Created by</div>
                <IconButton>
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
                <IconButton>
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
                <div>Attendee</div>
                <IconButton>
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
                <div>Location</div>
                <IconButton>
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
                <div>FSU</div>
                <IconButton>
                  <Sort fontSize="small" sx={{ color: "#fff" }} />
                </IconButton>
              </Stack>
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classList?.map((item: Class) => {
            return (
              <StyledTableRow key={item.classId}>
                <StyledTableCell
                  onClick={() => handeleDetailClass(item.classId ?? "")}
                >
                  <span>
                    <strong
                      style={{
                        color: colorConfig.blue,
                        textDecoration: "underline",
                      }}
                    >
                      {item.className}
                    </strong>
                  </span>
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => handeleDetailClass(item.classId ?? "")}
                >
                  {item.classCode}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => handeleDetailClass(item.classId ?? "")}
                >
                  {item.classCode && item.createdOn
                    ? formatFromISOString(
                        new Date(item.createdOn).toISOString(),
                        FormatType.DATE
                      )
                    : ""}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => handeleDetailClass(item.classId ?? "")}
                >
                  {item.createdBy}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => handeleDetailClass(item.classId ?? "")}
                >
                  {item.duration}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => handeleDetailClass(item.classId ?? "")}
                >
                  {checkAttendee(item.status ?? 0)}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => handeleDetailClass(item.classId ?? "")}
                >
                  {item.location}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => handeleDetailClass(item.classId ?? "")}
                >
                  {item.fsu}
                </StyledTableCell>
                <StyledTableCell>
                  <PopperUI
                    type="bottom-end"
                    icon={<MoreHoriz />}
                    children={
                      <Box
                        sx={{
                          bgcolor: "#fff",
                          color: "#000",
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
                          title="Edit class"
                          icon={<EditOutlined />}
                          onClick={() => navigation(`${item.classId}/edit`)}
                        />
                        <ButtonUI
                          title="Duplicate class"
                          icon={<ContentCopy />}
                          isSubmitting={true}
                        />
                        <ButtonUI
                          title="De-Active class"
                          icon={<VisibilityOffOutlined />}
                          onClick={() =>
                            dispatch(
                              classActions.setDeActiveClass(item.classId ?? "")
                            )
                          }
                        />
                        <ButtonUI
                          isSubmitting={true}
                          title="Delete class"
                          icon={<DeleteForeverOutlined />}
                        />
                      </Box>
                    }
                  />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClassTable;
