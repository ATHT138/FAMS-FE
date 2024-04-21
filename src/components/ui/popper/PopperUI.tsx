import { ReactNode } from "react";
import { Box, Fade, Popper, PopperPlacementType } from "@mui/material";
import { usePopper } from "../../../hooks/usePopper";
import ButtonUI from "../button/ButtonUI";

type Props = {
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
  type: PopperPlacementType;
  bgcolor?: string;
  color?: string;
};

const PopperUI = (props: Props) => {
  const { icon, children, title, type, bgcolor, color } = props;
  const { anchorEl, id, handleClick, open, placement } = usePopper();

  return (
    <>
      <ButtonUI
        title={title}
        icon={icon}
        onClick={handleClick(type)}
        bgcolor={bgcolor}
        color={color}
      />
      <Popper
        id={id}
        sx={{ zIndex: 1200 }}
        open={open}
        anchorEl={anchorEl}
        transition
        placement={placement}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box>{children}</Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default PopperUI;
