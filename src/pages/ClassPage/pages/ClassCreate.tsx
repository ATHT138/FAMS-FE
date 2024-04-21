import { useState } from "react";
import Show from "../../../utils/Show";
import { Box, Stack } from "@mui/material";
import { colorConfig } from "../../../configs/colorConfig";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import ButtonUI from "../../../components/ui/button/ButtonUI";
import ClassAdd from "../components/ClassAdd";
import { useParams } from "react-router-dom";

const styleInput = {
  width: "15vw",
  padding: 10,
  border: "1px solid #000",
  borderRadius: "10px",
};

const ClassCreate = () => {
  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  return (
    <Show>
      <Show.When isTrue={!show && !id}>
        <Box
          width="100%"
          padding="20px 0px 20px 30px"
          bgcolor={colorConfig.mainColor}
          border="solid #fff"
          color="#fff"
        >
          <TypographyUI variant="h6" title="New Class" letterSpacing="0.3rem" />
        </Box>
        <Box padding={3}>
          <TypographyUI
            variant="caption"
            title="Class name"
            fontWeight="Inter"
          />
          <Stack direction="row" spacing={2} alignItems="center">
            <input
              placeholder="Type class name"
              style={styleInput}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <ButtonUI
              title="Create"
              bgcolor={colorConfig.mainColor}
              color="#fff"
              onClick={() => setShow(true)}
            />
          </Stack>
        </Box>
      </Show.When>
      <Show.Else>
        <ClassAdd name={name} inputID={id ?? ""} />
      </Show.Else>
    </Show>
  );
};

export default ClassCreate;
