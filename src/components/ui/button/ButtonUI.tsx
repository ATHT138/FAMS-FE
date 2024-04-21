import { Button, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export interface Props {
  title?: string;
  isSubmitting?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  onSubmit?: React.MouseEventHandler<HTMLButtonElement>;
  bgcolor?: string;
  color?: string;
}

const ButtonUI = (props: Props) => {
  const buttonStyle: SxProps<Theme> = {
    width: "auto",
    height: "100%",
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: props.bgcolor,
    color: props.color,
    borderRadius: 3,
    textTransform: "none",
    "&:hover": {
      backgroundColor: props.bgcolor,
      color: props.color,
    },
    // "&:active": {
    //   backgroundColor: colorConfigs.button.activeBg,
    //   color: colorConfigs.button.activeColors,
    // },
  };

  return (
    <Button
      type="submit"
      onClick={props.onClick}
      onSubmit={props.onSubmit}
      sx={buttonStyle}
      disabled={props.isSubmitting}
    >
      {props.icon && <> {props.icon} &nbsp; </>}
      {props.title}
    </Button>
  );
};

export default ButtonUI;
