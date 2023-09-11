import React from "react";
import { Button } from "@chakra-ui/react";

const PaddleTab = ({ selected, handleTabClick, buttonId, buttonText }) => {
  return (
    <Button
      border={selected && "2px solid black"}
      onClick={() => handleTabClick(buttonId)}
    >
      {buttonText}
    </Button>
  );
};

export default PaddleTab;
