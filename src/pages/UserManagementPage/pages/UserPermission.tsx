import { Box, Divider } from "@mui/material";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import UserPermissonTable from "../components/UserPermissonTable";
import { useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectUserPermissions,
  userPermissionActions,
} from "../../../features/user-permission/userPermission.slice";
import ButtonUI from "../../../components/ui/button/ButtonUI";
import { colorConfig } from "../../../configs/colorConfig";
import { UserPermissionModel } from "../../../models/userPermission.model";

const UserPermission = () => {
  const [type, setType] = useState<"Detail" | "Edit">("Detail");
  const dispatch = useAppDispatch();
  const fetchPermisstions = useAppSelector(selectUserPermissions);
  const [listUserPermission, setListUserPermission] = useState<
    UserPermissionModel[]
  >([]);

  const callBackDataUpdate = () => {
    dispatch(userPermissionActions.updatePermisstions(listUserPermission));
  };

  useLayoutEffect(() => {
    dispatch(userPermissionActions.fetchPermisstions());
  }, []);

  console.log("listUserPermission", listUserPermission);

  return (
    <>
      <Box padding={3} width="100%">
        <TypographyUI
          variant="h3"
          title="User Permission"
          letterSpacing="0.3rem"
        />
        <Divider
          variant="fullWidth"
          sx={{ border: "1px solid #000", marginTop: 3 }}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" margin={2}>
        <ButtonUI
          title="Update permission"
          bgcolor={colorConfig.mainColor}
          color="#fff"
          onClick={() => {
            if (type === "Detail") {
              setType("Edit");
            } else {
              setType("Detail");
              if (listUserPermission.length > 0) {
                callBackDataUpdate();
              }
            }
          }}
        />
      </Box>
      <UserPermissonTable
        setListUserPermission={(listUserPermission: UserPermissionModel[]) => {
          setListUserPermission(listUserPermission);
        }}
        fetchUserPermissions={fetchPermisstions}
        type={type}
      />
    </>
  );
};

export default UserPermission;
