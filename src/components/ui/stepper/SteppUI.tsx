import {
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import QontoStepIcon from "./QontoStepIcon";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#2D3748",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#2D3748",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

type Props = {
  steps: string[];
  activeStep: number;
};

const SteppUI = ({ steps, activeStep }: Props) => {
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<QontoConnector />}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default SteppUI;
