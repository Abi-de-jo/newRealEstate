import React from "react";
import { TextInput, Box, Textarea, Group, Button, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { useTranslation } from 'react-i18next';

const BasicDetails = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {
  const { t } = useTranslation('basic');

  const form = useForm({
    initialValues: {
      title: propertyDetails.title,
      description: propertyDetails.description,
      price: propertyDetails.price,
      area: propertyDetails.area,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) => (value < 10 ? t("priceError") : null),
      area: (value) => (value < 2 ? t("areaError") : null),
    },
  });

  const { title, description, area, price } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, title, description, area, price }));
      nextStep();
    }
  };

  return (
    <Box
      mx="auto"
      my="md"
      px="md"
      sx={(theme) => ({
        maxWidth: "100%",
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
        <TextInput
          withAsterisk
          label={t("title")}
          placeholder={t("propertyNamePlaceholder")}
          {...form.getInputProps("title")}
          sx={(theme) => ({
            marginBottom: theme.spacing.md,
            width: "100%",
          })}
        />
        <Textarea
          placeholder={t("descriptionPlaceholder")}
          label={t("description")}
          withAsterisk
          {...form.getInputProps("description")}
          sx={(theme) => ({
            marginBottom: theme.spacing.md,
            width: "100%",
          })}
        />
        <NumberInput
          withAsterisk
          label={t("price")}
          placeholder={t("pricePlaceholder")}
          {...form.getInputProps("price")}
          sx={(theme) => ({
            marginBottom: theme.spacing.md,
            width: "100%",
          })}
        />
        <NumberInput
          withAsterisk
          label={t("area")}
          placeholder={t("areaPlaceholder")}
          {...form.getInputProps("area")}
          sx={(theme) => ({
            marginBottom: theme.spacing.md,
            width: "100%",
          })}
        />
        <Group position="center" mt="xl">
          <Button
            variant="default"
            onClick={prevStep}
            sx={(theme) => ({
              width: "100%",
              [theme.fn.smallerThan("sm")]: {
                fontSize: theme.fontSizes.sm,
              },
            })}
          >
            {t("previous")}
          </Button>
          <Button
            type="submit"
            sx={(theme) => ({
              width: "100%",
              [theme.fn.smallerThan("sm")]: {
                fontSize: theme.fontSizes.sm,
              },
            })}
          >
            {t("nextStep")}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
