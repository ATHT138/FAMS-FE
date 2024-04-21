import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  NativeSelect,
  Pagination,
  Stack,
} from "@mui/material";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import InputSearch from "../../../components/ui/input/InputSearch";
import InputDate from "../../../components/ui/input/InputDate";
import ModalUI from "../../../components/ui/modal/ModalUI";
import { ControlPoint, Publish } from "@mui/icons-material";
import ButtonUI from "../../../components/ui/button/ButtonUI";
import SyllabusTable from "../components/SyllabusTable";
import ImportSyllabus from "../components/ImportSyllabus";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";
import {
  selectSyllabusCurrentPage,
  selectSyllabusFilter,
  selectSyllabusList,
  selectSyllabusTotalPage,
  syllabusAcitons,
} from "../../../features/syllabus/syllabus.slice";
import { useNavigate } from "react-router-dom";
import { ListParams } from "../../../models";

const SyllabusList = () => {
  const sizeOptions = [5, 10, 20, 50, 100];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const syllabusList = useAppSelector(selectSyllabusList);
  const totalPage = useAppSelector(selectSyllabusTotalPage);
  const currentPage = useAppSelector(selectSyllabusCurrentPage);
  const filter = useAppSelector(selectSyllabusFilter);
  const [syllabusFilter, setSyllabusFilter] = useState<ListParams | null>({
    num_page: 1,
    size_page: 10,
    sort_by: [],
    search_by: [],
  });

  const handleSortBy = (sortBy: string) => {
    return sortBy;
    //   var isChanged = false;
    //   var updatedFilter = syllabusFilter;
    //   updatedFilter?.sort_by?.forEach((item, index) => {
    //     if (item.type === sortBy) {
    //       let newItem = {
    //         type: item.type,
    //         value: item.value === "asc" ? "desc" : "asc",
    //       };
    //       console.log(newItem, item);
    //       updatedFilter?.sort_by ? updatedFilter.sort_by[index] = newItem :
    //         { type: item.type, value: item.value };
    //       isChanged = true;
    //     }
    //   });
    //   console.log(updatedFilter);
    //   if (!isChanged) {
    //     let value = {
    //       type: sortBy,
    //       value: "asc",
    //     };
    //     updatedFilter = {
    //       ...updatedFilter,
    //       // @ts-expect-error
    //       sort_by: [...updatedFilter?.sort_by, value],
    //     };
    //   }
    //   setSyllabusFilter(updatedFilter);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    dispatch(syllabusAcitons.setFilter({ ...filter, num_page: page }));
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    setSyllabusFilter({
      ...syllabusFilter!,
      size_page: parseInt(event.target.value),
    });
    dispatch(
      syllabusAcitons.setFilter({
        ...filter,
        size_page: parseInt(event.target.value),
      })
    );
  };
  const createSyllabus = () => {
    navigate("/syllabus/create");
  };

  const duplicateSyllabus = (id: string) => {
    dispatch(syllabusAcitons.duplicateSyllabus(id));
  };

  useEffect(() => {
    dispatch(syllabusAcitons.setFilter(syllabusFilter!));
  }, [syllabusFilter]);
  return (
    <Box width="100%">
      <Box width="100%" padding="20px 0px 20px 30px">
        <TypographyUI title="Syllabus" variant="h3" letterSpacing="0.3rem" />
      </Box>
      <Divider sx={{ borderBottom: "2px solid #000" }} />
      <Box width="100%" padding="20px 0px 20px 30px">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <InputSearch />
            <InputDate />
          </Stack>
          <Stack
            direction="row"
            width="20%"
            spacing={2}
            justifyContent="flex-end"
            marginRight={3}
          >
            <ModalUI
              bgcolor="#D45B13"
              color="#fff"
              title="Import"
              icon={<Publish />}
              modalTitle="Import Syllabus"
              children={<ImportSyllabus type={"syllabus"} />}
            />
            <ButtonUI
              icon={<ControlPoint />}
              title="Add Syllabus"
              bgcolor="#2D3748"
              color="#fff"
              onClick={createSyllabus}
            />
          </Stack>
        </Stack>
      </Box>
      <SyllabusTable
        syllabusList={syllabusList}
        handleSortBy={(sortBy) => handleSortBy(sortBy)}
        duplicateSyllabus={(id) => duplicateSyllabus(id)}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        margin={3}
      >
        <div></div>
        <Pagination
          count={totalPage}
          page={currentPage}
          color="primary"
          variant="outlined"
          onChange={handleChange}
        />
        <Box sx={{ minWidth: 70, textAlign: "right" }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Page Size
            </InputLabel>
            <NativeSelect
              defaultValue={syllabusFilter?.size_page}
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

export default SyllabusList;
