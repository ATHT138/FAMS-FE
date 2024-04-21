import {
  DeleteForeverOutlined,
  EditOutlined,
  MoreHoriz,
  Person,
  PersonOutline,
  Sort,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
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
import { removeDuplicateNumbers } from "../../../utils/checkNumber";
import { FormatType, formatFromISOString } from "../../../utils/formatDate";
import { colorConfig } from "../../../configs/colorConfig";
import PopperUI from "../../../components/ui/popper/PopperUI";
import ModalUI from "../../../components/ui/modal/ModalUI";
import AddEditUser from "./AddEditUser";
import ButtonUI from "../../../components/ui/button/ButtonUI";
import { User } from "../../../models";

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

interface Props {
  handleDeactivateUser: (e: React.MouseEvent, id: string) => void;
  handleDeleteUser: (e: React.MouseEvent, id: string) => void;
  userList: User[] | null;
}

const UserTable = ({ userList, handleDeactivateUser, handleDeleteUser }: Props) => {
  const checkGender = (gender: boolean) => {
    switch (gender) {
      case true:
        return <Person sx={{ color: colorConfig.blue }} />;
      case false:
        return <Person sx={{ color: colorConfig.orange }} />;
      default:
        break;
    }
  };

  const checkRole = (role: number) => {
    switch (role) {
      case 1:
        return (
          <Chip
            label="SuperAdmin"
            sx={{ bgcolor: colorConfig.orange, color: "#fff" }}
          />
        );
        break;
      case 2:
        return (
          <Chip
            label="Admin"
            sx={{ bgcolor: colorConfig.green, color: "#fff" }}
          />
        );
        break;
      case 3:
        return (
          <Chip
            label="Trainer"
            sx={{ bgcolor: colorConfig.blue, color: "#fff" }}
          />
        );
        break;
      case 4:
        return (
          <Chip
            label="Trainee"
            sx={{ bgcolor: colorConfig.mainColor, color: "#fff" }}
          />
        );
        break;
      default:
        break;
    }
  };

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
                <div>Fullname</div>
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
                <div>Email</div>
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
                <div>Date of birth</div>
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
                <div>Gender</div>
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
                <div>Type</div>
                <IconButton>
                  <Sort fontSize="small" sx={{ color: "#fff" }} />
                </IconButton>
              </Stack>
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList?.map((user, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>
                {removeDuplicateNumbers(user.userId ?? "")}
              </StyledTableCell>
              <StyledTableCell>
                <strong>{user.name}</strong>
              </StyledTableCell>
              <StyledTableCell>{user.email}</StyledTableCell>
              <StyledTableCell>
                {user.dob
                  ? formatFromISOString(
                    new Date(user.dob).toISOString(),
                    FormatType.DATE
                  )
                  : ""}
              </StyledTableCell>
              <StyledTableCell>
                {checkGender(user.gender ?? true)}
              </StyledTableCell>
              <StyledTableCell>{checkRole(user.role ?? 0)}</StyledTableCell>
              <StyledTableCell
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PopperUI
                  icon={<MoreHoriz />}
                  type="left-end"
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
                      <ModalUI
                        children={<AddEditUser user={user} />}
                        title="Edit user"
                        icon={<EditOutlined />}
                        modalTitle="Edit user"
                        bgcolor="#fff"
                        color="#000"
                      />
                      <ButtonUI
                        title="Change role"
                        icon={<PersonOutline />}
                        color="#000"
                      />
                      <ButtonUI
                        title="De-active user"
                        icon={<VisibilityOffOutlined />}
                        color="#000"
                        onClick={(e) => handleDeactivateUser(e, user.userId ?? "")}
                        />
                      <ButtonUI
                        title="Delete user"
                        icon={<DeleteForeverOutlined />}
                        color="#000"
                        onClick={(e) => handleDeleteUser(e, user.userId ?? "")}
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

export default UserTable;
