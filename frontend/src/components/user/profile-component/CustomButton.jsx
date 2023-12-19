import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({
  style,
  variant,
  color,
  onClickFuntion,
  buttonText,
}) => {
  return (
    <Button
      style={style}
      variant={variant}
      color={color}
      onClick={onClickFuntion}
    >
      {buttonText}
    </Button>
  );
};

export default CustomButton;
