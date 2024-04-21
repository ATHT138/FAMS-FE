import { useEffect, useState } from "react";
import Show from "../../../utils/Show";
import { Box, Stack } from "@mui/material";
import { colorConfig } from "../../../configs/colorConfig";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import ButtonUI from "../../../components/ui/button/ButtonUI";
import AddTrainingProgram from "../components/AddTrainingProgram";
import { useSearchParams } from "react-router-dom";

const ProgramCreate = () => {
  const [params, setParams] = useSearchParams();
  const [name, setName] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (params.get("name") != null) {
      setName(params?.get("name") ?? "");
      setParams();
      setShow(false);
    }
  }, [params]);

  return (
    <Show>
      <Show.When isTrue={!show}>
        <Box
          width="100%"
          padding="20px 0px 20px 30px"
          bgcolor={colorConfig.mainColor}
          border="solid #fff"
          color="#fff"
        >
          <TypographyUI
            variant="h6"
            title="New Training Program"
            letterSpacing="0.3rem"
          />
        </Box>
        <Box padding={3}>
          <TypographyUI
            variant="caption"
            title="Program name*"
            fontWeight="Inter"
          />
          <Stack direction="row" spacing={2} alignItems="center">
            <input
              style={{
                width: "15vw",
                padding: 10,
                border: !error ? "1px solid #000" : "1px solid red",
                borderRadius: "10px",
              }}
              placeholder="Type program name"
              onChangeCapture={() => setError(false)}
              required={true}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <ButtonUI
              title="Create"
              onClick={() => {
                name != "" ? setShow(true) : setError(true);
              }}
              bgcolor="#2D3748"
              color="#fff"
            />
          </Stack>
          {error ? (
            <TypographyUI
              variant="caption"
              title="Required"
              fontWeight="Inter"
              color="red"
            />
          ) : null}
        </Box>
      </Show.When>
      <Show.Else>
        <AddTrainingProgram name={name} />
      </Show.Else>
    </Show>
  );
};

export default ProgramCreate;
