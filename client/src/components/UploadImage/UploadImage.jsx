import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdClose } from "react-icons/md"; // Import a close icon for delete
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";

const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
}) => {
  const [imageURLs, setImageURLs] = useState(propertyDetails.images || []);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const MIN_IMAGES = 3; // Minimum number of images required

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, images: imageURLs }));
    nextStep();
  };

  const deleteImage = (index) => {
    setImageURLs((prev) => prev.filter((_, i) => i !== index)); // Remove image at the specified index
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dbandd0k7",
        uploadPreset: "zf9wfsfi",
        multiple: true,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURLs((prev) => [...prev, result.info.secure_url]);
        }
      }
    );
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      {imageURLs.length === 0 ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Images</span>
        </div>
      ) : (
        <div className="uploadedImagesContainer">
          {imageURLs.map((url, index) => (
            <div className="uploadedImage" key={index}>
              <img src={url} alt={`Uploaded ${index}`} />
              <MdClose
                className="deleteIcon"
                size={20}
                onClick={() => deleteImage(index)} // Add delete functionality
              />
            </div>
          ))}
        </div>
      )}

      <Group position="center" mt={"xl"}>
        <Button
          onClick={handleNext}
          disabled={imageURLs.length < MIN_IMAGES} // Disable Next until minimum images are uploaded
        >
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
