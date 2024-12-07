import React, { useContext, useState } from "react";
import { Box, Button, Checkbox, Group, NumberInput, Modal, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import UserDetailContext from "../../context/UserDetailsContext.js";
import useProperties from "../../hooks/useProperties.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api.js";
import { useTranslation } from "react-i18next";
import "@mantine/core/styles.css";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
 
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx_K0qUomsdUS8c5inbr7B9IZv9E8pqCWzbJCw0QKTYmX9X-LYGsrpdMohJda79V8Xh/exec";
const role = localStorage.getItem("role");
const agentEmail =  localStorage.getItem("email")
 const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const [previewOpened, setPreviewOpened] = useState(false);
  const { t } = useTranslation("face");

  const form = useForm({
    initialValues: {
      rooms: propertyDetails.rooms || 0,
      parking: propertyDetails.parking || 0,
      balcony: propertyDetails.balcony || false,
      bathrooms: propertyDetails.bathrooms || 0,
    },
    validate: {
      rooms: (value) => (value < 1 ? t("Must have at least one room") : null),
      bathrooms: (value) => (value < 1 ? t("Must have at least one bathroom") : null),
    },
  });


  const email = localStorage.getItem("email");
  const { rooms, parking, bathrooms, balcony } = form.values;
 
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        rooms,
        parking,
        bathrooms,
        balcony,
      }));
      
      mutate();
     }
  };

  const handleBalconyChange = (event) => {
    const isChecked = event.currentTarget.checked;
    form.setFieldValue("balcony", isChecked);
    setPropertyDetails((prev) => ({ ...prev, balcony: isChecked }));
  };

  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      // First, create residency in the database
      const dbResponse = await createResidency(
        {
          ...propertyDetails,
          rooms,
          parking,
          bathrooms,
          email,
          token,
                

        },
      );

      const status = role === 'agent' ? 'published' : 'pending';
       const formData = new FormData();
      Object.entries({
        ...propertyDetails,
        rooms,
        parking,
        bathrooms,
        balcony,
        email,
        status,
        agentEmail
      
      }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });

      return dbResponse;
    },
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success(t("Added Successfully"), { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        video: "",
        price: 0,
        country: "",
        district: "",
        metro: "",
        address: "",
        balcony: false,
        images: null,
        rooms: 0,
        parking: 0,
        bathrooms: 0,
        ownerEmail: "",
        email,
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  return (
    <Box
      className="max-w-lg mx-auto my-6 bg-white shadow-lg p-6 rounded-lg"
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
        className="space-y-4"
      >
        <NumberInput
          withAsterisk
          label={t("Rooms")}
          min={0}
          {...form.getInputProps("rooms")}
          className="text-gray-700"
        />
        <NumberInput
          label={t("Parking")}
          min={0}
          {...form.getInputProps("parking")}
          className="text-gray-700"
        />
        <NumberInput
          withAsterisk
          label={t("Bathrooms")}
          min={0}
          {...form.getInputProps("bathrooms")}
          className="text-gray-700"
        />
        <Checkbox
          label={t("Balcony")}
          checked={form.values.balcony}
          onChange={handleBalconyChange}
          className="mt-4 text-gray-700"
        />

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
            variant="default"
            onClick={prevStep}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
          >
            {t("Back")}
          </Button>
          <Button
            variant="outline"
            color="blue"
            onClick={() => setPreviewOpened(true)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md"
          >
            {t("Preview")}
          </Button>
          <Button
            type="submit"
            color="green"
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white rounded-md"
          >
            {isLoading ? t("Submitting") : t("Add Property")}
          </Button>
        </Group>
      </form>

      {/* Preview Modal */}
      <Modal
        opened={previewOpened}
        onClose={() => setPreviewOpened(false)}
        title={t("Preview Your Details")}
        centered
      >
        <div className="p-4">
          {propertyDetails.images && propertyDetails.images.length > 0 && (
            <Carousel
              slideSize="50%"
              slideGap="md"
              controlsOffset="md"
              loop
              autoplay
            >
              {propertyDetails.images.map((image, index) => (
                <Carousel.Slide key={index}>
                  <img
                    src={image}
                    alt={`Property ${index + 1}`}
                    className="w-full object-cover rounded-lg"
                    style={{ maxHeight: "200px", width: "100%" }}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          )}
          {propertyDetails.video && (
            <div className="mt-4">
              <Text><strong>{t("Video")}:</strong></Text>
              <video
                src={propertyDetails.video}
                controls
                className="w-full rounded-lg"
                style={{ maxHeight: "300px" }}
              />
            </div>
          )}
          <div className="space-y-2 text-gray-700">
            <Text style={{ fontSize: '1rem', lineHeight: '1.5' }}><strong>{t("Title")}:</strong> {propertyDetails.title}</Text>
            <Text style={{ fontSize: '1rem', lineHeight: '1.5' }}><strong>{t("Description")}:</strong> {propertyDetails.description}</Text>
            <Text style={{ fontSize: '1rem', lineHeight: '1.5' }}><strong>{t("Price")}:</strong> {propertyDetails.price}</Text>
            <Text style={{ fontSize: '1rem', lineHeight: '1.5' }}><strong>{t("Country")}:</strong> {propertyDetails.country}</Text>
            <Text style={{ fontSize: '1rem', lineHeight: '1.5' }}><strong>{t("District")}:</strong> {propertyDetails.district}</Text>
            <Text style={{ fontSize: '1rem', lineHeight: '1.5' }}><strong>{t("Metro")}:</strong> {propertyDetails.metro}</Text>
            <Text style={{ fontSize: '1rem', lineHeight: '1.5' }}><strong>{t("Address")}:</strong> {propertyDetails.address}</Text>
            <Text><strong>{t("Rooms")}:</strong> {rooms}</Text>
            <Text><strong>{t("Bathrooms")}:</strong> {bathrooms}</Text>
            <Text><strong>{t("Parking")}:</strong> {parking}</Text>
            <Text><strong>{t("Balcony")}:</strong> {balcony ? t("Yes") : t("No")}</Text>
          </div>
        </div>
        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setPreviewOpened(false)}>
            {t("Confirm Submit")}
          </Button>
        </Group>
      </Modal>
    </Box>
  );
};

export default Facilities;

