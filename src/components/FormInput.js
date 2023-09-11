import React from "react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

const FormInput = ({ updateForm, id, form }) => {
  return (
    <InputGroup>
      <InputLeftAddon width="150px" children={form.caption} />
      <Input
        onChange={(event) => updateForm(id, event.target.value)}
        id={id}
        width="115px"
        value={form.content}
      ></Input>
    </InputGroup>
  );
};

export default FormInput;
