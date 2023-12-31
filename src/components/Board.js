import React, { useState } from "react";
import PaddleTab from "./PaddleTab";
import { Flex, Box, HStack, VStack } from "@chakra-ui/react";
import ErgForm from "./ErgForm";
import OCForm from "./OCForm";

const Board = () => {
  const [showErg, setShowErg] = useState(true);

  function handleTabClick(buttonId) {
    if (buttonId === "erg") {
      setShowErg(true);
      return;
    }
    setShowErg(false);
    return;
  }

  return (
    <Box>
      <Flex height="500px" justifyContent={"center"} alignItems={"center"}>
        <VStack>
          <HStack>
            <PaddleTab
              selected={showErg}
              handleTabClick={handleTabClick}
              buttonId="erg"
              buttonText="Erg"
            ></PaddleTab>
            <PaddleTab
              selected={!showErg}
              handleTabClick={handleTabClick}
              buttonId="oc"
              buttonText="OC"
            ></PaddleTab>
          </HStack>

          {showErg ? <ErgForm /> : <OCForm />}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Board;
