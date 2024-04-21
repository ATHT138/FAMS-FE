import {
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  Pagination,
  Stack,
} from "@mui/material";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import InputSearch from "../../../components/ui/input/InputSearch";
import ModalUI from "../../../components/ui/modal/ModalUI";
import { AddCircleOutline } from "@mui/icons-material";
import UserTable from "../components/UserTable";
import AddEditUser from "../components/AddEditUser";
import React, { useState, useEffect } from "react";
import {
  selectCurrentPage,
  selectListUser,
  selectTotalPage,
  userActions,
} from "../../../features/user-management/user.slice";
import { User } from "../../../models";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { toast } from "react-toastify";
import { useDebounce } from "../../../hooks";

const UserList = () => {
  const sizeOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectListUser);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPage = useAppSelector(selectTotalPage);
  const [userList, setUserList] = useState<User[] | null>([]);

  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const debounceSearchTerms = useDebounce(searchTerms, 500);

  const [sizePage, setSizePage] = useState<number>();

  useEffect(() => {
    dispatch(
      userActions.checkGetAllUsers({
        pageNumber: currentPage,
        pageSize: sizePage,
        searchTerms: debounceSearchTerms,
      })
    );
  }, [debounceSearchTerms, sizePage]);

  const handleInputChange = (searchTerms: string) => {
    setSearchTerms((prevState) => {
      let newSearchTerms = [...prevState];
      newSearchTerms[0] = searchTerms;
      return newSearchTerms;
    });
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    setSizePage(parseInt(event.target.value));
  };

  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    e.preventDefault();
    dispatch(
      userActions.checkGetAllUsers({
        pageNumber: page,
        pageSize: sizePage,
        searchTerms: searchTerms,
      })
    );
  };

  const handleDeactivateUser = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const user = userList!.filter((user) => user.userId === id);
    if (user && user.length > 0) {
      if (!user[0].status) {
        alert("User is inactive, you cannot deactivate this user");
        return;
      }
      dispatch(userActions.deactivateUser(id));
      setUserList(userList!.filter((user) => user.userId !== id));
    }
  };

  const handleDeleteUser = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const user = userList!.filter((user) => user.userId === id);
    if (user && user.length > 0) {
      console.log(user[0]);

      if (user[0].status) {
        toast.info("User is active, you cannot delete this user");
        return;
      }
      dispatch(userActions.deleteUser(id));
      setUserList(userList!.filter((user) => user.userId !== id));
    }
  };
  useEffect(() => {
    dispatch(
      userActions.checkGetAllUsers({
        pageNumber: 1,
        pageSize: 5,
        searchTerms: [],
      })
    );
  }, []);
  useEffect(() => {
    setUserList(users);
  }, [users]);
  return (
    <Box width="100%" position="relative">
      <Box width="100%" padding="20px 0px 20px 30px" border="solid #fff">
        <TypographyUI
          title="User Management"
          variant="h3"
          letterSpacing="0.3rem"
        />
      </Box>
      <Box width="100%" padding="20px 30px 20px 30px">
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <InputSearch
              onChange={(event) => handleInputChange(event.target.value)}
            />
          </Stack>
          <Stack
            direction="row"
            width="10%"
            spacing={2}
            justifyContent="flex-end"
          >
            <ModalUI
              title="Add User"
              bgcolor="#2D3748"
              color="#fff"
              icon={<AddCircleOutline />}
              modalTitle="Add a new user"
              children={<AddEditUser />}
            />
          </Stack>
        </Stack>
      </Box>
      <UserTable
        userList={userList}
        handleDeleteUser={(e, id) => handleDeleteUser(e, id)}
        handleDeactivateUser={(e, id) => handleDeactivateUser(e, id)}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        margin={4}
      >
        <div></div>
        <Pagination
          count={totalPage}
          page={currentPage}
          color="primary"
          variant="outlined"
          onChange={handleChange}
        />
        <Box sx={{ minWidth: 70 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Size
            </InputLabel>
            <NativeSelect
              defaultValue={sizePage}
              onChange={handlePageSizeChange}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
            >
              {sizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default UserList;
