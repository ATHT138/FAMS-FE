import { Stack } from "@mui/material";
import InputValue from "./InputValue";
import SearchResultList from "./SearchResultList";

interface SearchWithSuggestionProps {
  color?: string;
}

const SearchWithSuggestion = (props: SearchWithSuggestionProps) => {
  const { color } = props;

  return (
    <Stack>
      <InputValue color={color} />
      <SearchResultList />
    </Stack>
  );
};

export default SearchWithSuggestion;
