import React from "react";
import { Button } from "@chakra-ui/react";

const PaddleTab = ({ handleTabClick, buttonId, buttonText }) => {
  return <Button onClick={() => handleTabClick(buttonId)}>{buttonText}</Button>;
};

export default PaddleTab;
