import React from "react";
import { Box, Group, Button, Radio } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";

const BasicDetails = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {
  const { t } = useTranslation("type");

  const form = useForm({
    initialValues: {
      propertyType: propertyDetails.propertyType || "",
      residencyType: propertyDetails.residencyType || "",
      type: propertyDetails.type || "",
    },
    validate: {
      propertyType: (value) => (value ? null : t("propertyTypeRequired")),
      residencyType: (value) => (value ? null : t("residencyTypeRequired")),
      type: (value) => (value ? null : t("transactionTypeRequired")),
    },
  });

  const { propertyType, type, residencyType } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        propertyType,
        type,
        residencyType,
      }));
      nextStep();
    }
  };

  return (
    <Box
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200"
      sx={(theme) => ({
        [theme.fn.smallerThan("sm")]: {
          padding: theme.spacing.sm,
        },
      })}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Transaction Type Section */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 text-lg mb-2">
            {t("transactionType")}
          </label>
          <Group className="flex flex-wrap gap-2">
            {["Rent", "Sale", "DailyRent", "Lease"].map((value) => (
              <Radio
                key={value}
                value={value}
                label={t(value.toLowerCase())}
                checked={type === value}
                onChange={() => form.setFieldValue("type", value)}
                className="font-medium"
              />
            ))}
          </Group>
        </div>

        {/* Residency Type Section */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 text-lg mb-2">
            {t("residencyType")}
          </label>
          <Group className="flex flex-wrap gap-2">
            {["New", "Old", "Mixed"].map((value) => (
              <Radio
                key={value}
                value={value}
                label={t(value.toLowerCase())}
                checked={residencyType === value}
                onChange={() => form.setFieldValue("residencyType", value)}
                className="font-medium"
              />
            ))}
          </Group>
        </div>

        {/* Property Type Section */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 text-lg mb-2">
            {t("propertyType")}
          </label>
          <Group className="flex flex-wrap gap-2">
            {["Office", "Commercial", "Cottage", "Apartment", "Land", "House"].map((value) => (
              <Radio
                key={value}
                value={value}
                label={t(value.toLowerCase())}
                checked={propertyType === value}
                onChange={() => form.setFieldValue("propertyType", value)}
                className="font-medium"
              />
            ))}
          </Group>
        </div>

        {/* Navigation Buttons */}
        <Group
          position="center"
          className="mt-8 gap-4"
          sx={(theme) => ({
            [theme.fn.smallerThan("sm")]: {
              flexDirection: "column",
              gap: theme.spacing.sm,
            },
          })}
        >
          <Button
            variant="outline"
            onClick={prevStep}
            className="border-gray-400 text-gray-700 hover:bg-gray-100 transition-colors w-full sm:w-auto"
          >
            {t("previous")}
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-md w-full sm:w-auto"
          >
            {t("nextStep")}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
