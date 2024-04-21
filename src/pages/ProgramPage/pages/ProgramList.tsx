import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { colorConfig } from "../../../configs/colorConfig";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import InputSearch from "../../../components/ui/input/InputSearch";
import ModalUI from "../../../components/ui/modal/ModalUI";
import { Close, ControlPoint, FilterList, Publish } from "@mui/icons-material";
import ImportSyllabus from "../../SyllabusPage/components/ImportSyllabus";
import ButtonUI from "../../../components/ui/button/ButtonUI";
import ProgramTable from "../components/ProgramTable";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  programActions,
  selectProgramCurrentPage,
  // selectProgramFilter,
  selectProgramFilterSort,
  selectProgramList,
  selectProgramTotalPage,
} from "../../../features/TrainingProgram/trainingProgram.slice";
import { useNavigate } from "react-router-dom";
import { ListParamTrainingProgram } from "../../../models/common";

const ProgramList = () => {
  const dispatch = useAppDispatch();
  const programList = useAppSelector(selectProgramList);
  const totalPage = useAppSelector(selectProgramTotalPage);
  const currentPage = useAppSelector(selectProgramCurrentPage);
  const filter = useAppSelector(selectProgramFilterSort);
  const nav = useNavigate();
  const [filterValue, setFilterValue] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [warningOpen, setWarningOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(programActions.fetchList(filter));
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    dispatch(programActions.setFilterSort({ ...filter, page: page }));
  };

  const handleSort = (type: string) => {
    dispatch(programActions.setFilterSort(handleSetFilter(type, [])));
  };
  const handleSearch = (value: string[]) => {
    console.log(filterValue);
    dispatch(programActions.setFilterSort(handleSetFilter("Filters", value)));
  };
  const handleSetFilter = (type: string, value: string[]) => {
    const newFilter: ListParamTrainingProgram = {
      ...filter,
      idSortBy:
        type !== "idSortBy"
          ? null
          : filter.idSortBy === "desc" || filter.idSortBy === null
          ? "asc"
          : "desc",
      programNameSortBy:
        type !== "programNameSortBy"
          ? null
          : filter.programNameSortBy === "desc" ||
            filter.programNameSortBy === null
          ? "asc"
          : "desc",
      createdOnSortBy:
        type !== "createdOnSortBy"
          ? null
          : filter.createdOnSortBy === "desc" || filter.createdOnSortBy === null
          ? "asc"
          : "desc",
      createBySortBy:
        type !== "createBySortBy"
          ? null
          : filter.createBySortBy === "desc" || filter.createBySortBy === null
          ? "asc"
          : "desc",
      durationSortBy:
        type !== "durationSortBy"
          ? null
          : filter.durationSortBy === "desc" || filter.durationSortBy === null
          ? "asc"
          : "desc",
      statusSortBy:
        type !== "statusSortBy"
          ? null
          : filter.statusSortBy === "desc" || filter.statusSortBy === null
          ? "asc"
          : "desc",
      Filters: type === "Filters" ? (value.length > 0 ? value : null) : null,
    };
    return newFilter;
  };
  const handleFilterValue = (value: string) => {
    if (!filterValue.includes(value) && searchValue !== "") {
      if (filterValue.length < 4) {
        setFilterValue((prevFilterValue) => [...prevFilterValue, value]);
        handleSearch([...filterValue, value]);
      } else {
        setWarningOpen(true);
      }
    } else {
      null;
    }
  };
  const handleDeleteFilter = (index: number) => {
    const newFilterValue = filterValue.filter((_, i) => i !== index);
    setFilterValue(newFilterValue);
    handleSearch(newFilterValue);
  };
  return (
    <Box width="100%">
      <Box
        width="100%"
        padding="20px 0px 20px 30px"
        bgcolor={colorConfig.mainColor}
        border="solid #fff"
        color="#fff"
      >
        <TypographyUI
          title="Training program"
          variant="h3"
          letterSpacing="0.3rem"
        />
      </Box>
      <Box width="100%" padding="20px 30px 20px 30px">
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
            <ButtonUI
              icon={<FilterList />}
              bgcolor="#2D3748"
              color="#fff"
              onClick={() => handleFilterValue(searchValue)}
            />
          </Stack>
          <Stack
            direction="row"
            width="20%"
            spacing={2}
            justifyContent="flex-end"
          >
            <ModalUI
              bgcolor="#D45B13"
              color="#fff"
              title="Import"
              icon={<Publish />}
              modalTitle="Import Training Program"
              children={<ImportSyllabus type={"trainingProgram"} />}
            />
            <ButtonUI
              icon={<ControlPoint />}
              title="Add Program"
              bgcolor="#2D3748"
              color="#fff"
              onClick={() => {
                nav("/training-program/create");
              }}
            />
          </Stack>
        </Stack>
        <Box sx={{ display: "flex" }}>
          {filterValue.map((value, index) => (
            <Box
              sx={{
                margin: "1px 20px 1px 1px",
                padding: "0 0 0 0.5%",
                border: "1px solid black",
                borderRadius: "5px",
              }}
            >
              <Stack
                flexDirection="row"
                sx={{ padding: "0 0 0 0", margin: "0 0 0 0" }}
              >
                <Typography
                  sx={{ padding: "0 0 0 0", margin: "0 0 0 0" }}
                  variant="subtitle1"
                >
                  {value}
                </Typography>
                <button
                  onClick={() => {
                    handleDeleteFilter(index);
                  }}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5% 0 0 0",
                    margin: "0 0 0 0",
                  }}
                >
                  <Close />
                </button>
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>
      {/* Table training program
       */}
      <ProgramTable
        programList={programList}
        handleFilter={(type: string) => handleSort(type)}
      />
      {/* Pagination */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        margin={4}
      >
        {programList.length > 0 ? (
          <>
            <Pagination
              count={totalPage}
              page={currentPage}
              variant="outlined"
              onChange={handleChange}
            />
            <Box
              sx={{
                display: "flex",
                position: "absolute",
                right: "0",
                marginRight: "10px",
                marginTop: "10px",
              }}
            >
              <Typography variant="subtitle1">Rows per page:</Typography>
              <Select
                variant="standard"
                defaultValue={5}
                onChange={(e) => {
                  dispatch(
                    programActions.setFilterSort({
                      ...filter,
                      pageSize: e.target.value as number,
                      page: 1,
                    })
                  );
                }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </Box>
          </>
        ) : null}
      </Box>
      <Dialog
        open={warningOpen}
        title="Warning"
        onClose={() => setWarningOpen(false)}
        PaperProps={{
          style: { width: "30%", minHeight: "25%", borderRadius: 8 },
        }}
      >
        <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Only 4 filters are allowed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWarningOpen(false)}>close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProgramList;
