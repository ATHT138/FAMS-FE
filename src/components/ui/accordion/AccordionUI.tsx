import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Stack,
} from "@mui/material";
import { ReactNode } from "react";
import { ExpandMore } from "@mui/icons-material";
import TypographyUI from "../typography/TypographyUI";

type Props = {
  headerChildren?: ReactNode;
  children?: ReactNode | undefined;
  detail?: string | undefined;
  icon?: ReactNode | undefined;
  subDetail?: any | string | ReactNode;
  select?: ReactNode;
  show?: boolean;
  color?: AccordionProps["color"];
  bgcolor?: AccordionProps["color"];
};

const AccordionUI = ({
  children,
  detail,
  icon,
  subDetail,
  show,
  select,
  bgcolor,
  color,
  headerChildren,
}: Props) => {
  return (
    <Accordion sx={{ borderRadius: "10px", width: "100%" }} disabled={show}>
      <AccordionSummary
        sx={{
          backgroundColor: bgcolor,
          color: color,
          borderRadius: "10px",
        }}
        expandIcon={
          <ExpandMore
            sx={{
              color: "#fff",
              border: "1px solid #fff",
              borderRadius: "50%",
            }}
          />
        }
        onClick={(event) => event.stopPropagation()}
      >
        <Stack width="100%" direction="row" spacing={3} alignItems="center">
          {icon && icon}
          {detail && <TypographyUI title={`${detail}`} variant="h6" />}
          {subDetail && <div>{subDetail}</div>}
          {select && <Box width="100%">{select}</Box>}
          {headerChildren && <>{headerChildren}</>}
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionUI;
