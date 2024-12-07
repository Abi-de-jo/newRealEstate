import React from "react";
import { Checkbox, Box, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";

const BasicDetails = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {
  const { t } = useTranslation("amen");

  const form = useForm({
    initialValues: {
      amenities: propertyDetails.amenities || [],
    },
    validate: {
      amenities: (value) => (value.length > 0 ? null : t("amenitiesRequired")),
    },
  });

  const amenitiesList = [
    "AirConditioner",
    "Oven",
    "Microwave",
    "VacuumCleaner",
    "Balcony",
    "Stove",
    "Dishwasher",
    "SmartTV",
    "WiFi",
    "ParkingPlace",
    "PlayStation",
    "Projector",
    "Elevator",
    "Heating",
    "PET",
  ];

  const handleAmenityChange = (amenity) => {
    const newAmenities = form.values.amenities.includes(amenity)
      ? form.values.amenities.filter((item) => item !== amenity)
      : [...form.values.amenities, amenity];

    form.setFieldValue("amenities", newAmenities);
    setPropertyDetails((prev) => ({ ...prev, amenities: newAmenities }));
  };

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      nextStep();
    }
  };

  return (
    <Box
      maw="90%"
      mx="auto"
      my="md"
      className="p-4 bg-white rounded-lg shadow-lg"
      sx={(theme) => ({
        maxWidth: 600,
        [theme.fn.smallerThan("sm")]: {
          padding: theme.spacing.sm,
          maxWidth: "100%",
        },
      })}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-700">{t("selectAmenities")}</h3>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          }}
        >
          {amenitiesList.map((amenity) => (
            <Checkbox
              key={amenity}
              label={t(amenity)}
              checked={form.values.amenities.includes(amenity)}
              onChange={() => handleAmenityChange(amenity)}
              className="text-gray-700"
            />
          ))}
        </div>

        {form.errors.amenities && (
          <p className="text-red-500 mt-2">{form.errors.amenities}</p>
        )}

        <Group
          position="center"
          mt="xl"
          sx={(theme) => ({
            gap: theme.spacing.md,
            flexDirection: "row",
            [theme.fn.smallerThan("sm")]: {
              flexDirection: "column",
            },
          })}
        >
          <Button
            variant="outline"
            onClick={prevStep}
            className="border-gray-400 text-gray-700 hover:bg-gray-100 w-full sm:w-auto"
          >
            {t("back")}
          </Button>
          <Button
            type="submit"
            className="bg-green-500 text-white hover:bg-green-600 transition duration-200 w-full sm:w-auto"
          >
            {t("nextStep")}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
