import React, { useState } from "react";
import { useQuery } from "react-query";
import {  useLocation, useNavigate } from "react-router-dom";
import { getProperty } from "../../utils/api";
import PuffLoader from "react-spinners/PuffLoader";
import { AiTwotoneCar } from "react-icons/ai";
import { MdMeetingRoom, MdLocationPin } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import GoogleMapSection from "../../components/Map/GoogleMapSection";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import Heart from "../../components/Heart/Heart";
import { Modal } from "@mantine/core";
import axios from "axios";


const API_BASE_URL = "https://new-real-estate-server.vercel.app/api/residency";

export const AdminAgentPubId = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const { data, isLoading, isError } = useQuery(["residency", id], () => getProperty(id));
  const { user } = useAuth0();
  const [opened, setOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [showRentOptions, setShowRentOptions] = useState(false);
  const [rentAgentModalOpen, setRentAgentModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [editFormData, setEditFormData] = useState({
    title: "",
    price: "",
    description: "",
    address: "",
    district: "",
    type: "",
    metro: "",
    images: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    passport_no: "",
    rental_period: "",
    price: "",
    codastral_code: "",
  });

  React.useEffect(() => {
    if (data) {
      setEditFormData({
        title: data.title || "",
        price: data.price || "",
        description: data.description || "",
        address: data.address || "",
        district: data.district || "",
        type: data.type || "",
        metro: data.metro || "",
        images: data.images || [],
      });
    }
  }, [data]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setEditFormData((prev) => ({ ...prev, images: files }));
  };
  
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
  
    // Create a new object to store the updated form data
    const updatedData = { ...editFormData };
  
    // Store the images separately to include them in the object
    updatedData.images = editFormData.images;
  
    // Log the entire updated object to the console for review
    console.log("Updated Data:", updatedData);
  
    // Prepare FormData to send to the backend (for file uploads)
    const formData = new FormData();
    
    // Append all regular form data (non-file fields)
    Object.entries(updatedData).forEach(([key, value]) => {
      if (key !== "images") {
        formData.append(key, value);
      }
    });
  
    // Append images to the form data
    editFormData.images.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });
  
    try {
      // Sending the updated form data (including files) to the backend
      await axios.put(`${API_BASE_URL}/update/${id}`, formData);
  
      alert("Property updated successfully!");
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };
  

  const handleActionClick = async (action) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${action}/${id}`);
      console.log(`${action}:`, response.data);
      navigate("/")
    } catch (error) {
      console.error(`Error ${action.toLowerCase()} post:`, error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const rentByOwner = async () => {
    try {
      await axios.post(`${API_BASE_URL}/generalAchieve/${data.id}`);
    } catch (error) {
      console.error("Error submitting rent request:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/agentsAchieve/${data.id}`);
    } catch (error) {
      console.error("Error submitting rent request:", error);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <PropertyImages images={data?.images} id={id} />
        <div className="flexCenter property-details">
          <PropertyDetails data={data} setOpened={setOpened} setRentAgentModalOpen={setRentAgentModalOpen} showRentOptions={showRentOptions} setShowRentOptions={setShowRentOptions} handleActionClick={handleActionClick} rentByOwner={rentByOwner} setEditModalOpen={setEditModalOpen} />
          <GoogleMapSection address={data?.address} district={data?.district} country={data?.country} />
        </div>
        <AmenitiesModal opened={opened} setOpened={setOpened} amenities={data?.amenities} />
        <RentAgentModal opened={rentAgentModalOpen} setOpened={setRentAgentModalOpen} formData={formData} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />
        <EditPropertyModal opened={editModalOpen} setOpened={setEditModalOpen} editFormData={editFormData} handleEditInputChange={handleEditInputChange} handleImageChange={handleImageChange} handleEditFormSubmit={handleEditFormSubmit} />
        <BookingModal opened={modalOpened} propertyId={id} email={user?.email} setOpened={setModalOpened} />
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="wrapper">
    <div className="flexCenter paddings">
      <PuffLoader />
    </div>
  </div>
);

const ErrorMessage = () => (
  <div className="wrapper">
    <div className="flexCenter paddings">
      <span>Error while fetching</span>
    </div>
  </div>
);

const PropertyImages = ({ images, id }) => (
  <div className="relative w-full h-[500px] mt-6">
    <div className="absolute top-4 left-4 z-10">
      <Heart id={id} />
    </div>
    <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
      <img src={images?.[0]} alt="main home" className="row-span-2 col-span-1 object-cover w-full h-full rounded-lg shadow-md" />
      {images?.slice(1, 3).map((image, index) => (
        <img key={index} src={image} alt={`home ${index + 1}`} className="object-cover w-full h-full rounded-lg shadow-md" />
      ))}
    </div>
  </div>
);

const PropertyDetails = ({ data, setOpened, setRentAgentModalOpen, showRentOptions, setShowRentOptions, handleActionClick, rentByOwner, setEditModalOpen }) => (
  <div className="flexColStart left">
    <div className="flexStart head">
      <span className="primaryText">{data?.title}</span>
      <span className="orangeText" style={{ fontSize: "1.5rem" }}>$ {data?.price}</span>
    </div>
    <div className="flex flex-col font-bold">({data?.type})</div>
    <Facilities data={data} />
    <button onClick={() => setOpened(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300">
      View Amenities
    </button>
    <span className="secondaryText" style={{ textAlign: "justify" }}>{data?.description}</span>
    <div className="flexStart" style={{ gap: "1rem" }}>
      <MdLocationPin size={25} />
      <span className="secondaryText">{data?.address} {data?.district}</span>
    </div>
    <ActionButtons handleActionClick={handleActionClick} showRentOptions={showRentOptions} setShowRentOptions={setShowRentOptions} setRentAgentModalOpen={setRentAgentModalOpen} rentByOwner={rentByOwner} setEditModalOpen={setEditModalOpen} />
  </div>
);

const Facilities = ({ data }) => (
  <div className="flex flex-wrap gap-6 mt-4">
    {[
      { icon: FaShower, label: `${data?.bathrooms} Bathroom` },
      { icon: AiTwotoneCar, label: `${data?.parking} Parking` },
      { icon: MdMeetingRoom, label: `${data?.rooms} Room` }
    ].map(({ icon: Icon, label }, index) => (
      <div key={index} className="flex items-center gap-2 p-4 rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300">
        <Icon size={24} className="text-blue-500" />
        <span className="text-lg font-semibold text-gray-700">{label}</span>
      </div>
    ))}
  </div>
);

const ActionButtons = ({ handleActionClick, showRentOptions, setShowRentOptions, setRentAgentModalOpen, rentByOwner, setEditModalOpen }) => (
  <div className="flex gap-4 mt-4">
    {/* <button className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition-all duration-300" onClick={() => handleActionClick('archive')}>
      Archive
    </button> */}
    <button className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-all duration-300" onClick={() => handleActionClick('delete')}>
      Delete
    </button>
    {!showRentOptions ? (
      <button className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-all duration-300" onClick={() => setShowRentOptions(true)}>
        Rent
      </button>
    ) : (
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded bg-green-400 text-white hover:bg-green-500 transition-all duration-300" onClick={() => setRentAgentModalOpen(true)}>
          Rent by Agent
        </button>
      </div>
    )}
    <button className="px-4 py-2 rounded bg-green-400 text-white hover:bg-green-500 transition-all duration-300" onClick={rentByOwner}>
      Rent by Owner
    </button>
    <button className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300" onClick={() => setEditModalOpen(true)}>
      Edit Property
    </button>
  </div>
);

const AmenitiesModal = ({ opened, setOpened, amenities }) => (
  <Modal opened={opened} onClose={() => setOpened(false)} title="Amenities" centered>
    <div className="flex flex-col">
      {amenities?.length ? (
        amenities.map((amenity, index) => (
          <button key={index} className="mt-2 p-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-gray-700 transition-all duration-300">
            {amenity}
          </button>
        ))
      ) : (
        <p className="text-gray-500">No amenities available.</p>
      )}
    </div>
  </Modal>
);

const RentAgentModal = ({ opened, setOpened, formData, handleInputChange, handleFormSubmit }) => (
  <Modal opened={opened} onClose={() => setOpened(false)} title="Rent by Agent Form" centered>
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      {['name', 'passport_no', 'rental_period', 'price', 'codastral_code'].map((field) => (
        <input
          key={field}
          type={field === 'passport_no' || field === 'price' || field === 'codastral_code' ? 'number' : 'text'}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
          value={formData[field]}
          onChange={handleInputChange}
          required
          className="p-2 border rounded"
        />
      ))}
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300">
        Submit
      </button>
    </form>
  </Modal>
);

const EditPropertyModal = ({ opened, setOpened, editFormData, handleEditInputChange, handleImageChange, handleEditFormSubmit }) => (
  <Modal opened={opened} onClose={() => setOpened(false)} title="Edit Property" centered>
    <form onSubmit={handleEditFormSubmit} className="flex flex-col gap-4">
      {['title', 'price', 'description', 'address', 'district', 'type', 'metro'].map((field) => (
        <input
          key={field}
          type={field === 'price' ? 'number' : 'text'}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={editFormData[field]}
          onChange={handleEditInputChange}
          required
          className="p-2 border rounded"
        />
      ))}
      <input
        type="file"
        name="images"
        onChange={handleImageChange}
        multiple
        accept="image/*"
        className="p-2 border rounded"
      />
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300">
        Save Changes
      </button>
    </form>
  </Modal>
);

 