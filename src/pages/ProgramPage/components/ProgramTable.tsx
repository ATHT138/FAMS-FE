import {
  DeleteOutlineOutlined,
  FolderOpenOutlined,
  PublishedWithChanges,
  ContentCopy,
  CreateOutlined,
  MoreHoriz,
  Sort,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
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
import PopperUI from "../../../components/ui/popper/PopperUI";
import { colorConfig } from "../../../configs/colorConfig";
import { TrainingProgram } from "../../../models";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectCurrentUser } from "../../../features/user-management/user.slice";
import { programActions, selectProgramFilterSort, selectProgramStatus, selectProgramisLoading, selectTrainingProgram } from "../../../features/TrainingProgram/trainingProgram.slice";
import { useEffect } from "react";

interface ProgramListProps {
  programList: TrainingProgram[];
  handleFilter?: (type: string) => void;
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
          label="Inactive"
          sx={{ bgcolor: colorConfig.hoverColor, color: "#fff" }}
        />
      );
    case 1:
      return (
        <Chip
          label="Active"
          sx={{ bgcolor: colorConfig.green, color: "#fff" }}
        />
      );
    case 2:
      return (
        <Chip
          label="Drafting"
          sx={{ bgcolor: colorConfig.blue, color: "#fff" }}
        />
      );
    default:
      return <Chip label="NaN" sx={{ bgcolor: colorConfig.gray }} />;
  }
};

const ProgramTable = ({ programList, handleFilter }: ProgramListProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const User = useAppSelector(selectCurrentUser);
  const filter = useAppSelector(selectProgramFilterSort);
  const status = useAppSelector(selectProgramStatus);
  const program = useAppSelector(selectTrainingProgram);
  const isLoading = useAppSelector(selectProgramisLoading);

  useEffect(() => {
    if (status === "Duplicated successfully") {
      toast.success("Duplicate program successfully");
      navigate(`/training-program/${program?.trainingProgramCode}`);
    }
    if (status === "Change status successfully") {
      toast.success("Change status successfully");
      dispatch(programActions.fetchList({ ...filter }));
    }
  }, [status, dispatch, filter]);

  const handleViewProgram = (programId: number) => {
    navigate(`/training-program/${programId}`);
  };
  const handleEditProgram = (programId: number) => {
    navigate(`/training-program/${programId}/edit`);
  };
  const handleDuplicateProgram = (programId: number) => {
    dispatch(programActions.fetchDuplicate(programId));
    if (status === "Duplicated successfully") {
      toast.success("Duplicate program success");
    } else {
      toast.error("Duplicate program failed");
    }
  };
  const handleActiveOrInactive = (programId: number) => {
    dispatch(
      programActions.changeStatus({
        id: programId,
        userId: User?.userId ?? "0",
      })
    );
  };
  const handlePublishProgram = (programId: number) => {
    navigate(`/training-program/${programId}/edit`);
  };
  const handleViewMaterial = () => {
    console.log("View material");
  };

  const dateToString = (date: Date) => {
    return date.toLocaleDateString("UTC", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const buttonOptions = [
    {
      icon: <FolderOpenOutlined />,
      label: "View Material",
      onClick: handleViewMaterial,
    },
    {
      icon: <CreateOutlined />,
      label: "Edit Program",
      onClick: handleEditProgram,
    },
    {
      icon: <ContentCopy />,
      label: "Duplicate Program",
      onClick: handleDuplicateProgram,
    },
    {
      icon: <Visibility />,
      label: "Active Program",
      onClick: handleActiveOrInactive,
    },
    {
      icon: <VisibilityOff />,
      label: "Inactive Program",
      onClick: handleActiveOrInactive,
    },
    {
      icon: <PublishedWithChanges />,
      label: "Publish Program",
      onClick: handlePublishProgram,
    },
    {
      icon: <DeleteOutlineOutlined />,
      label: "Delete Program",
      onClick: () => {
        toast.error("Delete program");
      },
    },
  ];
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <div>ID</div>
                <IconButton onClick={() => handleFilter && handleFilter("idSortBy")}>
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
                <div>Name</div>
                <IconButton onClick={() => handleFilter && handleFilter("programNameSortBy")} >
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
                <div>Create on</div>
                <IconButton onClick={() => handleFilter && handleFilter("createdOnSortBy")}>
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
                <IconButton onClick={() => handleFilter && handleFilter("createBySortBy")}>
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
                <IconButton onClick={() => handleFilter && handleFilter("durationSortBy")}>
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
                <IconButton onClick={() => handleFilter && handleFilter("statusSortBy")}>
                  <Sort fontSize="small" sx={{ color: "#fff" }} />
                </IconButton>
              </Stack>
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {programList.length > 0
            ? programList.map((value) => (
              <StyledTableRow key={value.trainingProgramCode}>
                <StyledTableCell
                  onClick={() => {
                    handleViewProgram(value.trainingProgramCode ?? 0);
                  }}
                >
                  {value.trainingProgramCode}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    handleViewProgram(value.trainingProgramCode ?? 0);
                  }}
                >
                  {value.name}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    handleViewProgram(value.trainingProgramCode ?? 0);
                  }}
                >
                  {dateToString(new Date(value.createdAt))}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    handleViewProgram(value.trainingProgramCode ?? 0);
                  }}
                >
                  {value.createdBy?.name}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    handleViewProgram(value.trainingProgramCode ?? -1);
                  }}
                >
                  {value.totalDays} days
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    handleViewProgram(value.trainingProgramCode ?? -1);
                  }}
                >
                  {configStatus(value.status ?? 0)}
                </StyledTableCell>
                <StyledTableCell>
                  <PopperUI
                    type="bottom-start"
                    icon={<MoreHoriz />}
                    children={
                      <Box
                        bgcolor={colorConfig.white}
                        boxShadow={3}
                        borderRadius="10px"
                        margin={3}
                      >
                        <List>
                          {buttonOptions.map((option, index) =>
                            (option.label === "Inactive Program" ||
                              option.label === "Publish Program") &&
                              value.status === 0 ? null : (option.label ===
                                "Active Program" ||
                                option.label === "Publish Program") &&
                                value.status === 1 ? null : (option.label ===
                                  "Active Program" ||
                                  option.label === "Inactive Program") &&
                                  value.status === 2 ? null : (
                              <ListItemButton
                                onClick={() =>
                                  option.onClick(
                                    value.trainingProgramCode ?? 0
                                  )
                                }
                                key={index}
                                disabled={
                                  option.label === "View Material" ||
                                    option.label === "Delete Program"
                                    ? true
                                    : false
                                }
                              >
                                <ListItemIcon>{option.icon}</ListItemIcon>
                                <ListItemText primary={option.label} />
                              </ListItemButton>
                            )
                          )}
                        </List>
                      </Box>
                    }
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))
            : null}
        </TableBody>
      </Table>
      {
        ((!isLoading)) ? null : (
          <>
            <Skeleton width="full" height={60} />
            <Skeleton width="full" height={30} />
            <Skeleton width="80%" height={30} />
            <Skeleton width="full" height={60} />
            <Skeleton width="full" height={30} />
            <Skeleton width="80%" height={30} />
            <Skeleton width="full" height={60} />
            <Skeleton width="full" height={30} />
            <Skeleton width="80%" height={30} />
          </>
        )
      }
    </TableContainer >
  );
};

export default ProgramTable;
