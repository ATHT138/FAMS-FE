import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { colorConfig } from "../../../configs/colorConfig";

import { UserPermissionModel } from "../../../models/userPermission.model";
import PermissonSelect from "./PermissonSelect";
import { useEffect, useState } from "react";

const UserPermissionLabel = [
  { id: 1, label: "Super admin" },
  { id: 2, label: "Admin" },
  { id: 3, label: "Trainee" },
  { id: 4, label: "Trainer" },
];

interface UserPermissionTableProps {
  setListUserPermission: (listUserPermission: UserPermissionModel[]) => void;
  fetchUserPermissions: UserPermissionModel[] | null;
  type: "Detail" | "Edit";
}

const UserPermissonTable = ({
  setListUserPermission,
  fetchUserPermissions,
  type,
}: UserPermissionTableProps) => {
  const [updatePermission, setupdatePermission] = useState<
    UserPermissionModel[] | null
  >([]);

  // console.log("update permission", updatePermission);
  // console.log("fetchUserPermissions", fetchUserPermissions);

  const handleCellChange = (
    permissionId: number | null | undefined,
    label: string,
    newValue: string
  ) => {
    const updatedData = updatePermission?.map((permission) => {
      // console.log("updatedData", updatedData);

      if (permission.permissionId === permissionId) {
        return {
          ...permission,
          [label]: newValue,
        };
      }
      return permission;
    });
    setupdatePermission(updatedData ?? []);
    setListUserPermission(updatedData ?? []);
  };

  useEffect(() => {
    setupdatePermission(fetchUserPermissions);
  }, [fetchUserPermissions]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", borderRadius: "100px" }}>
          <TableHead sx={{ bgcolor: colorConfig.mainColor }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Role name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Syllabus</TableCell>
              <TableCell sx={{ color: "#fff" }}>Training program</TableCell>
              <TableCell sx={{ color: "#fff" }}>Class</TableCell>
              <TableCell sx={{ color: "#fff" }}>Learning material</TableCell>
              <TableCell sx={{ color: "#fff" }}>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {updatePermission?.map((permission) => (
              <TableRow key={permission.permissionId}>
                <TableCell>
                  {
                    UserPermissionLabel.find(
                      (label) => label.id === permission.permissionId
                    )?.label
                  }
                </TableCell>
                <TableCell>
                  {type === "Detail" && permission.syllabus}
                  {type === "Edit" && (
                    <PermissonSelect
                      permission={permission.syllabus}
                      getLabel="Syllabus"
                      sendValue={(value) =>
                        handleCellChange(
                          permission.permissionId,
                          "syllabus",
                          value
                        )
                      }
                    />
                  )}
                </TableCell>
                <TableCell>
                  {type === "Detail" && permission.trainingProgram}
                  {type === "Edit" && (
                    <PermissonSelect
                      permission={permission.trainingProgram}
                      getLabel="Program"
                      sendValue={(value) =>
                        handleCellChange(
                          permission.permissionId,
                          "trainingProgram",
                          value
                        )
                      }
                    />
                  )}
                </TableCell>
                <TableCell>
                  {type === "Detail" && permission.class}
                  {type === "Edit" && (
                    <PermissonSelect
                      permission={permission.class}
                      getLabel="Class"
                      sendValue={(value) =>
                        handleCellChange(
                          permission.permissionId,
                          "class",
                          value
                        )
                      }
                    />
                  )}
                </TableCell>
                <TableCell>
                  {type === "Detail" && permission.learningMaterial}
                  {type === "Edit" && (
                    <PermissonSelect
                      permission={permission.learningMaterial}
                      getLabel="Material"
                      sendValue={(value) =>
                        handleCellChange(
                          permission.permissionId,
                          "learningMaterial",
                          value
                        )
                      }
                    />
                  )}
                </TableCell>
                <TableCell>
                  {type === "Detail" && permission.userManagement}
                  {type === "Edit" && (
                    <PermissonSelect
                      permission={permission.userManagement}
                      getLabel="User"
                      sendValue={(value) =>
                        handleCellChange(
                          permission.permissionId,
                          "userManagement",
                          value
                        )
                      }
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserPermissonTable;
