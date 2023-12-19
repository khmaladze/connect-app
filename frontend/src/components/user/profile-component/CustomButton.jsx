import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({
  style,
  varaint,
  color,
  onClickFuntion,
  buttonText,
}) => {
  return (
    <Button
      style={style}
      variant={varaint}
      color={color}
      onClick={onClickFuntion}
    >
      {buttonText}
    </Button>
  );
};

export default CustomButton;
