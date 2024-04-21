import { Typography, TypographyProps } from "@mui/material";

export interface Props extends TypographyProps {
  title: string | undefined;
  variant?: TypographyProps["variant"];
  fontWeight?: TypographyProps["fontWeight"];
  letterSpacing?: TypographyProps["letterSpacing"];
  color?: TypographyProps["color"];
}

const TypographyUI = ({
  title,
  variant,
  fontWeight = "bold",
  letterSpacing,
  color,
}: Props) => {
  return (
    <Typography
      variant={variant}
      fontWeight={fontWeight}
      letterSpacing={letterSpacing}
      color={color}
    >
      {title}
    </Typography>
  );
};

export default TypographyUI;
