import React from "react";
import { useForm } from "@mantine/form";
import { Button, Group, Select, TextInput } from "@mantine/core";
import { validateString } from "../../utils/common";
import Map from "../Map/Map";
import "./AddLocation.css";

function AddLocation({ nextStep, propertyDetails, setPropertyDetails }) {
  const form = useForm({
    initialValues: {
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },
    validate: {
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const { city, address } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, city, address }));
      nextStep();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flexCenter form-content">
        <div className="flexColStart form-content_first">
          <Select
            w={"100%"}
            withAsterisk
            label="City"
            clearable
            searchable
            {...form.getInputProps("city")}
            data={["Kyiv", "Kharkiv", "Lviv", "Dnipro", "Odesa"]}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="Address"
            {...form.getInputProps("address")}
          />
        </div>

        <div className="form-content_second">
          <Map address={address} city={city} />
        </div>
      </div>

      <Group mt={"xl"}>
        <Button type="submit">Next Step</Button>
      </Group>
    </form>
  );
}

export default AddLocation;
