import {
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  Pagination,
  Stack,
} from "@mui/material";
import { colorConfig } from "../../../configs/colorConfig";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import InputSearch from "../../../components/ui/input/InputSearch";
import ButtonUI from "../../../components/ui/button/ButtonUI";
import { ControlPoint } from "@mui/icons-material";
import ClassTable from "../components/ClassTable";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  classActions,
  selectClassList,
  selectCurrentClassPage,
  selectTotalClassPage,
} from "../../../features/class/class.slice";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../hooks";

const ClassList = () => {
  const sizeOptions = [5, 10, 20, 50, 100];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classList = useAppSelector(selectClassList);
  const currentPage = useAppSelector(selectCurrentClassPage);
  const totalPage = useAppSelector(selectTotalClassPage);
  const [keyWords, setKeyWords] = useState<string>("");
  const debounceKeyWords = useDebounce(keyWords, 500);
  const [sizePage, setSizePage] = useState<number>(10);
  useEffect(() => {
    dispatch(
      classActions.checkLoading({
        PageSize: sizePage,
        PageIndex: currentPage ?? 1,
        Keywords: debounceKeyWords,
      })
    );
  }, [debounceKeyWords, sizePage]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    setSizePage(parseInt(event.target.value));
  };

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    dispatch(
      classActions.checkLoading({ PageSize: sizePage, PageIndex: page })
    );
  };
  const handleChangeAPI = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setKeyWords(event.target.value);
    dispatch(
      classActions.checkLoading({
        PageSize: sizePage,
        PageIndex: currentPage ?? 1,
        Keywords: keyWords,
      })
    );
  };

  const handleCreateClass = () => {
    navigate("/class/create");
  };

  return (
    <Box width="100%" position="relative">
      <Box
        width="100%"
        padding="20px 0px 20px 30px"
        bgcolor={colorConfig.mainColor}
        border="solid #fff"
        color="#fff"
      >
        <TypographyUI
          title="Training class"
          variant="h3"
          letterSpacing="0.3rem"
        />
      </Box>
      <Box width="100%" padding="20px 30px 20px 30px">
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <div>
              <InputSearch value={keyWords} onChange={handleChangeAPI} />
            </div>
            {/* <PopperUI
              type="bottom-end"
              icon={<FilterList sx={{ color: "#fff" }} />}
              bgcolor={colorConfig.mainColor}
              title="Filter"
              color="#fff"
            /> */}
          </Stack>
          <Box>
            <ButtonUI
              icon={<ControlPoint />}
              title="Create Class"
              bgcolor={colorConfig.orange}
              color="#fff"
              onClick={handleCreateClass}
            />
          </Box>
        </Stack>
      </Box>
      <ClassTable classList={classList} />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        margin={4}
      >
        <div></div>
        <Pagination
          count={totalPage ?? 1}
          page={currentPage ?? 1}
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

export default ClassList;
