import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { Button, Group, Text } from "@mantine/core";

const UploadVideo = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const [videoURL, setVideoURL] = useState(propertyDetails.video || null);
  const [errorMessage, setErrorMessage] = useState("");
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const MAX_FILE_SIZE_MB = 50; // Updated maximum file size limit
  const ALLOWED_FORMATS = ["mp4", "webm", "ogg"]; // Allowed video formats

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, video: videoURL }));
    nextStep();
  };

  const deleteVideo = () => {
    setVideoURL(null); // Remove the uploaded video
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dbandd0k7",
        uploadPreset: "zf9wfsfi",
        multiple: false, // Allow only one file upload
        maxFiles: 1,
        resourceType: "video", // Restrict to videos only
      },
      (err, result) => {
        if (result.event === "success") {
          const uploadedFile = result.info;
          if (
            ALLOWED_FORMATS.includes(uploadedFile.format.toLowerCase()) &&
            uploadedFile.bytes / 1024 / 1024 <= MAX_FILE_SIZE_MB
          ) {
            setVideoURL(uploadedFile.secure_url);
            setErrorMessage("");
          } else {
            setErrorMessage(
              `Please upload a valid video format (MP4, WEBM, OGG) and ensure it's under ${MAX_FILE_SIZE_MB} MB.`
            );
          }
        } else if (err) {
          setErrorMessage("Error uploading video. Please try again.");
        }
      }
    );
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      {videoURL ? (
        <div className="uploadedVideoContainer">
          <div className="uploadedVideo">
            <video src={videoURL} controls className="videoPreview" />
            <MdClose
              className="deleteIcon"
              size={20}
              onClick={deleteVideo} // Delete video functionality
            />
          </div>
        </div>
      ) : (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Video (Max 50MB)</span>
        </div>
      )}

      {errorMessage && <Text color="red">{errorMessage}</Text>}

      <Group position="center" mt={"xl"}>
        <Button
          onClick={handleNext}
          disabled={!videoURL} // Disable Next until a video is uploaded
        >
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadVideo;
