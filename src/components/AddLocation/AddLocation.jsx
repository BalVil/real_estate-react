import React from "react";
import { useForm } from "@mantine/form";
import { Select, TextInput } from "@mantine/core";
import { validateString } from "../../utils/common";
import Map from "../Map/Map";

function AddLocation({ propertyDetails, setPropertyDetails }) {
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
  return (
    <form>
      <div
        className="flexCenter"
        style={{
          flex: 1,
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
        }}
      >
        <div className="flexColStart">
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

        <div style={{ flex: 2 }}>
          <Map address={address} city={city} />
        </div>
      </div>
    </form>
  );
}

export default AddLocation;
