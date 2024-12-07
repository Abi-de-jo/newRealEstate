import React, { useState } from "react";
import { Button, Container, Modal, Stepper } from "@mantine/core";
import AddLocation from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import Facilities from "../Facilities/Facilities";
import HouseType from "../houseType/HouseType";
import Rent from "../Type/Type";
import "./a.css";
import OwnerDetails from "../OwnerDetails";
import UserLogin from "../Login";
import { useTranslation } from "react-i18next";
import UploadVideo from "../UploadVideo";

const AddPropertyModal = ({ opened, setOpened }) => {
  const { t } = useTranslation("add");
  const [active, setActive] = useState(0);
  const { user } = useAuth0();
  const [completed, setCompleted] = useState(false);

  const [propertyDetails, setPropertyDetails] = useState({
    images: [],
    address: "",
    title: "",
    metro: "",
    district: "",
    price: 0,
    rooms: 0,
    area: 0,
    type: "",
    parking: 0,
    bathrooms: 0,
    ownerEmail: "",
    amenities: [],
    description: "",
    email: user?.email,
  });

  const role = localStorage.getItem("role");

  const nextStep = () => {
    setActive((current) => {
      const isLastStep = current >= (role === "user" ? 8 : 7);
      if (isLastStep) {
        setCompleted(true);
      }
      return isLastStep ? current : current + 1;
    });
  };

  const resetStepper = () => {
    setActive(0);
    setCompleted(false);
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      fullScreen
      centered
      overlayProps={{ blur: 3 }}
    >
      <Container
        className="modal-container"
        style={{
          maxWidth: "100%",
          padding: "1rem",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
          orientation="horizontal"
          size="sm"
          className="stepper-horizontal"
          styles={{
            stepIcon: { fontSize: "1rem" },
            step: { flex: "1 0 auto" },
          }}
        >
          {role !== "agent" && role !== "owner" && role !== "admin" && (
            <Stepper.Step
              label={t("ownerCanUpload.label")}
              description={t("ownerCanUpload.description")}
            >
              <UserLogin
                role={role}
                nextStep={nextStep}
                prevStep={prevStep}
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
              />
            </Stepper.Step>
          )}

          <Stepper.Step
            label={t("uploadVideo.label")}
            description={t("uploadVideo.description")}
          >
            <UploadVideo
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step
            label={t("uploadImage.label")}
            description={t("uploadImage.description")}
          >
            <UploadImage
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>

          <Stepper.Step
            label={t("uploadLocation.label")}
            description={t("uploadLocation.description")}
          >
            <AddLocation
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step
            label={t("basicDetails.label")}
            description={t("basicDetails.description")}
          >
            <BasicDetails
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step
            label={t("houseType.label")}
            description={t("houseType.description")}
          >
            <Rent
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step
            label={t("amenities.label")}
            description={t("amenities.description")}
          >
            <HouseType
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>

          {role !== "user" && role !== "owner" && (
            <Stepper.Step
              label={t("ownerDetails.label")}
              description={t("ownerDetails.description")}
            >
              <OwnerDetails
                prevStep={prevStep}
                nextStep={nextStep}
                propertyDetails={propertyDetails}
                setOpened={setOpened}
                setPropertyDetails={setPropertyDetails}
              />
            </Stepper.Step>
          )}

          <Stepper.Step
            label={t("facilities.label")}
            description={t("facilities.description")}
          >
            <Facilities
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setOpened={setOpened}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Completed>
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">{t("completed")}</h2>
              <Button
                onClick={() => {
                  window.location.reload();
                  resetStepper();
                }}
                className="mt-4"
              >
                {t("restart")}
              </Button>
            </div>
          </Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
};

export default AddPropertyModal;
