import React, { useState } from "react";
import { Input, Box, InputGroup, Button, HStack } from "@chakra-ui/react";

import FormInput from "./FormInput";

const defaultData = [
  { id: "time", caption: "Time (min:sec)", content: "" },
  { id: "distance", caption: "Distance(m)", content: "" },
  { id: "split", caption: "Split (min:sec)", content: "" },
];

const ErgForm = () => {
  const [formData, setFormData] = useState(defaultData);

  return (
    <>
      <Box>
        {formData.map((form, index) => (
          <FormInput
            updateForm={updateForm}
            form={form}
            key={index}
            id={form.id}
          />
        ))}
      </Box>
      <HStack>
        <Button onClick={handleCalculate}>Calculate</Button>
        <Button onClick={handleClear}> Clear</Button>
      </HStack>
    </>
  );

  function handleClear() {
    const updatedFormData = formData.map((form) => {
      const updatedForm = form;
      updatedForm.content = "";
      return updatedForm; // Update the content property
    });
    setFormData(updatedFormData);
  }

  function updateForm(id, value) {
    const updatedFormData = formData.map((form) => {
      if (form.id !== id) return form; // Return the form as is if the IDs don't match
      const updatedForm = form;
      updatedForm.content = value;
      return updatedForm; // Update the content property
    });
    setFormData(updatedFormData); // Set the updated data
  }

  function handleCalculate() {
    let count = 0;

    // only proceed if exactly two elements are filled out
    for (let i = 0; i < formData.length; i++) {
      const formContent = formData[i].content;
      if (formContent !== "") {
        // validate data
        if (i === 0) {
          // validate mm:ss
          const pattern = /^\d{1,3}:[0-5][0-9]$/;
          if (!pattern.test(formContent)) return;
        } else if (i === 1) {
          // validate meters
          if (isNaN(formContent)) return;
        } else if (i === 2) {
          // validate mm:ss
          const pattern = /^\d{1,3}:[0-5][0-9]$/;
          if (!pattern.test(formContent)) return;
        }

        count += 1;
      }
    }
    if (count !== 2) return;

    // check if distance is 0 lol
    if (formData[0].content === "") {
      // calculate total time
      const distance = Number(formData[1].content);

      // seconds per 500m
      const splitSeconds = calculateTotalSeconds(formData[2].content);

      // total seconds it takes to finish the piece
      const totalSeconds = (splitSeconds * distance) / 500;

      const timeMinutes = parseInt(Math.floor(totalSeconds / 60));
      const timeSeconds = parseInt(totalSeconds % 60);

      const formattedTime = `${timeMinutes}:${String(timeSeconds).padStart(
        2,
        "0"
      )}`;

      const updatedFormData = [...formData];

      updatedFormData[0].content = formattedTime;
      setFormData(updatedFormData);
    } else if (formData[1].content === "") {
      // calculate total distance travelled

      // retrieve total time
      const totalSeconds = calculateTotalSeconds(formData[0].content);

      // retrieve split
      const split = calculateTotalSeconds(formData[2].content);

      const totalDistance = ((totalSeconds / split) * 500).toFixed(2);

      const updatedFormData = [...formData];
      updatedFormData[1].content = totalDistance;
      setFormData(updatedFormData);
    } else if (formData[2].content === "") {
      const totalSeconds = calculateTotalSeconds(formData[0].content);
      const distance = Number(formData[1].content);

      const totalSplitSeconds = (totalSeconds / distance) * 500;

      // convert split seconds to format
      const splitMinutes = parseInt(Math.floor(totalSplitSeconds / 60));
      const splitSeconds = parseInt(totalSplitSeconds % 60);
      const formattedTime = `${splitMinutes}:${String(splitSeconds).padStart(
        2,
        "0"
      )}`;

      const updatedFormData = [...formData];

      updatedFormData[2].content = formattedTime;
      setFormData(updatedFormData);
    }
  }

  function calculateTotalSeconds(string) {
    const [minutes, seconds] = string.split(":").map(Number);
    return minutes * 60 + seconds;
  }
};

export default ErgForm;
