import { Box, Button, Group, TextInput, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const OwnerDetails = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
  nextStep,
}) => {
  const { t } = useTranslation("Odetails");

  const form = useForm({
    initialValues: {
      ownerName: "",
      ownerNumber: "",
      ownerEmail: "",
    },
    validate: {
      ownerName: (value) => (value ? null : t("ownerNameRequired")),
      ownerNumber: (value) => (value ? null : t("ownerNumberRequired")),
      ownerEmail: (value) => (/^\S+@\S+$/.test(value) ? null : t("invalidEmail")),
    },
  });

  const { ownerName, ownerNumber, ownerEmail } = form.values;

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        ownerName,
        ownerNumber,
        ownerEmail,
      }));

      try {
        await axios.post(`https://new-real-estate-server.vercel.app/api/owner/registerbyAgent`, {
          ownerEmail,
          ownerName,
          ownerNumber,
        });
        nextStep();
      } catch (err) {
        toast.error(t("submitError"));
        throw err;
      }
    }
  };

  return (
    <Box
      maw="90%"
      mx="auto"
      my="sm"
      p="md"
      sx={(theme) => ({
        maxWidth: 400,
        [theme.fn.smallerThan("sm")]: {
          padding: theme.spacing.sm,
          maxWidth: "100%",
        },
      })}
      className="bg-white rounded-lg shadow-lg"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <TextInput
          withAsterisk
          label={t("ownerName")}
          {...form.getInputProps("ownerName")}
        />
        <NumberInput
          withAsterisk
          label={t("ownerNumber")}
          min={0}
          {...form.getInputProps("ownerNumber")}
        />
        <TextInput
          withAsterisk
          label={t("ownerEmail")}
          {...form.getInputProps("ownerEmail")}
        />
        <Group
          position="center"
          mt="xl"
          sx={(theme) => ({
            gap: theme.spacing.md,
            flexDirection: "row",
            [theme.fn.smallerThan("sm")]: {
              flexDirection: "column",
              gap: theme.spacing.sm,
            },
          })}
        >
          <Button
            variant="default"
            onClick={prevStep}
            className="border-gray-400 text-gray-700 hover:bg-gray-100 w-full sm:w-auto"
          >
            {t("back")}
          </Button>
          <Button
            type="submit"
            color="green"
            className="bg-green-500 text-white hover:bg-green-600 w-full sm:w-auto"
          >
            {t("nextStep")}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default OwnerDetails;
