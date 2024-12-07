import React from 'react';
import { useForm } from '@mantine/form';
import { Box, Button, Group, TextInput, NumberInput, MultiSelect } from '@mantine/core';

const PropertyForm = ({ onSubmit, prevStep, t }) => {
  const form = useForm({
    initialValues: {
      name: '',
      passport_no: '',
      rental_period: [],
      price: 0,
      codastral_code: '',
      owner: '',
      date: [],
    },
    validate: {
      name: (value) => (value ? null : t('nameRequired')),
      passport_no: (value) => (value > 0 ? null : t('passportNoRequired')),
      price: (value) => (value > 0 ? null : t('priceRequired')),
      codastral_code: (value) => (value ? null : t('codastralCodeRequired')),
      owner: (value) => (value ? null : t('ownerRequired')),
    },
  });

  const handleSubmit = () => {
    if (form.validate()) {
      onSubmit(form.values);
    }
  };

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Name */}
        <TextInput
          withAsterisk
          label={t("name")}
          placeholder={t("enterName")}
          {...form.getInputProps("name")}
        />

        {/* Passport Number */}
        <NumberInput
          withAsterisk
          label={t("passport_no")}
          min={0}
          placeholder={t("enterPassportNo")}
          {...form.getInputProps("passport_no")}
        />

        {/* Rental Period */}
        <MultiSelect
          withAsterisk
          label={t("rental_period")}
          data={['1 month', '3 months', '6 months', '12 months']}
          placeholder={t("selectRentalPeriod")}
          {...form.getInputProps("rental_period")}
        />

        {/* Price */}
        <NumberInput
          withAsterisk
          label={t("price")}
          min={0}
          placeholder={t("enterPrice")}
          {...form.getInputProps("price")}
        />

        {/* Codastral Code */}
        <NumberInput
          withAsterisk
          label={t("codastral_code")}
          min={0}
          placeholder={t("enterCodastralCode")}
          {...form.getInputProps("codastral_code")}
        />

        {/* Owner */}
        <TextInput
          withAsterisk
          label={t("owner")}
          placeholder={t("enterOwnerName")}
          {...form.getInputProps("owner")}
        />

        {/* Date */}
        <MultiSelect
          label={t("date")}
          placeholder={t("selectDate")}
          data={['2024-01-01', '2024-02-01', '2024-03-01']} // Add dates or fetch dynamically if needed
          {...form.getInputProps("date")}
        />

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            {t("back")}
          </Button>
          <Button type="submit" color="green">
            {t("nextStep")}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default PropertyForm;
