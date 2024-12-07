import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getProperty } from "../../utils/api";
import PuffLoader from "react-spinners/PuffLoader";
import { AiOutlineClose, AiOutlinePlus, AiTwotoneCar } from "react-icons/ai";
import { MdMeetingRoom, MdLocationPin } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import GoogleMapSection from "../../components/Map/GoogleMapSection";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import { Modal } from "@mantine/core";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/residency";
const API_BASE_URLU = "http://localhost:3000/api/user";

export const AgentPublishedId = () => {
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
  const [DiscountModalOpen, setDiscountModalOpen] = useState(false);

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
  const [discountData, setDiscountData] = useState({
    discount: "",
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
        discount: data.discount || "",
        description: data.description || "",
        address: data.address || "",
        district: data.district || "",
        type: data.type || "",
        metro: data.metro || "",
        images: data.images || [],
      });
    }
  }, [data]);

  React.useEffect(() => {
    if (data) {
      setDiscountData({


        discount: data.discount || "",

      });
    }
  }, [data]);


// Handler to update discountData when input changes
 
// Handler to submit the discount update
const handleDiscountFormSubmit = async (e) => {
  e.preventDefault();

  try {
    // Backend API call to update the discount
    await axios.put(`${API_BASE_URL}/updateDiscount/${id}`, { discount: discountData.discount });




    
    alert("Discount updated successfully!");
    setDiscountModalOpen(false);
  } catch (error) {
    console.error("Error updating discount:", error);
  }
};


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setEditFormData((prev) => ({ ...prev, images: files }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleDiscountInputChange = (e) => {
    const { name, value } = e.target;
    setDiscountData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { ...editFormData };

    updatedData.images = editFormData.images;

    console.log("Updated Data:", updatedData);

    const formData = new FormData();

    Object.entries(updatedData).forEach(([key, value]) => {
      if (key !== "images") {
        formData.append(key, value);
      }
    });

    editFormData.images.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    try {
      // Sending the updated form data (including files) to the backend
      await axios.put(`${API_BASE_URL}/update/${id}`, updatedData);

      alert("Property updated successfully!");
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

 

  const handleFormSubmit = async (e) => {
    const telegramBaseUrl = "https://t.me/Chriwane_uniq";

    const formattedMessage = `
    🚨 *New Submission Received!* 🚨
    
    📄 **User Details**:
    - **Name**: ${formData.name}
    - **Rental Period**: ${formData.rental_period}
    - **Passport No**: ${formData.passport_no}
    - **Cadastral Code**: ${formData.codastral_code}
    
    🏨 **Hotel Information**:
    - **Title**: ${data.title}
    - **Price**: 💰 ${data.price}
    - **Description**: 📝 ${data.description}
    - **Address**: 📍 ${data.address}
    - **District**: ${data.district}
    - **Type**: ${data.type}
    - **Metro**: 🚇 ${data.metro}
    
    🖼 **Images**:
    1️⃣ ${data.images[0]}
    2️⃣ ${data.images[1]}
    3️⃣ ${data.images[2]}
    
    🔔 *Please review and take the necessary action.*
    `;

    const telegramUrl = `${telegramBaseUrl}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(telegramUrl, '_blank');

    e.preventDefault();
    console.log("User Data:", formData.email);
    console.log("Property ID:", id);
    try {
      const email = formData.email;
      // Sending the updated form data (including files) to the backend
      await axios.post(`${API_BASE_URLU}/bookVisit/${id}`, { email });

      alert("Property booked successfully!");
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error booking property:", error);
    }

    try {
      await axios.post(`${API_BASE_URL}/agentsAchieve/${data.id}`);
    } catch (error) {
      console.error("Error submitting rent request:", error);
    }
    finally {
      navigate('/')
    }
    // Close the modal after submission
    setRentAgentModalOpen(false);
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

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  return (
    <div className="wrapper">
      <div className="flex flex-col items-start p-4 md:p-6 w-full max-w-7xl mx-auto">
        <PropertyImages images={data?.images} id={id} />
        <div className="flex flex-col md:flex-row justify-between w-full mt-6">
          <PropertyDetails
            data={data}
            setOpened={setOpened}
            setRentAgentModalOpen={setRentAgentModalOpen}
            showRentOptions={showRentOptions}
            setShowRentOptions={setShowRentOptions}
            handleActionClick={handleActionClick}
            rentByOwner={rentByOwner}
            setEditModalOpen={setEditModalOpen}
            setDiscountModalOpen={setDiscountModalOpen}
          />
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <GoogleMapSection address={data?.address} district={data?.district} country={data?.country} />
          </div>
        </div>
        <AmenitiesModal opened={opened} setOpened={setOpened} amenities={data?.amenities} />
        <RentAgentModal opened={rentAgentModalOpen} setOpened={setRentAgentModalOpen} formData={formData} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />
        <EditPropertyModal opened={editModalOpen} setOpened={setEditModalOpen} editFormData={editFormData} handleEditInputChange={handleEditInputChange} handleImageChange={handleImageChange} handleEditFormSubmit={handleEditFormSubmit} />
        <EditDiscount
  opened={DiscountModalOpen}
  setOpened={setDiscountModalOpen}
  discountData={discountData}
  handleDiscountInputChange={handleDiscountInputChange}
  handleDiscountFormSubmit={handleDiscountFormSubmit}
/>

        <BookingModal opened={modalOpened} propertyId={id} email={user?.email} setOpened={setModalOpened} />
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="wrapper">
    <div className="flex justify-center items-center p-4 md:p-6">
      <PuffLoader />
    </div>
  </div>
);

const ErrorMessage = () => (
  <div className="wrapper">
    <div className="flex justify-center items-center p-4 md:p-6">
      <span>Error while fetching</span>
    </div>
  </div>
);

const PropertyImages = ({ images, id }) => (
  <div className="relative w-full h-[300px] md:h-[600px] mt-6">
    {/* Main Image */}
    <div className="relative w-full h-[200px] md:h-[400px]">
      {images?.length > 0 ? (
        <img
          src={images[0]}
          alt="Main"
          className="object-cover w-full h-full rounded-lg shadow-md"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
    </div>

    {/* Thumbnails */}
    <div className="flex gap-2 md:gap-4 mt-2 md:mt-4 overflow-x-auto">
      {images?.slice(1).map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Thumbnail ${index + 1}`}
          className="object-cover w-1/4 h-[50px] md:h-[100px] rounded-lg shadow-md cursor-pointer hover:opacity-80"
        />
      ))}

    </div>

  </div>
);

const PropertyDetails = ({ data, setOpened, setRentAgentModalOpen, showRentOptions, setShowRentOptions, handleActionClick, rentByOwner, setEditModalOpen, setDiscountModalOpen }) => (
  <div className="flex flex-col w-full md:w-1/2">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <span className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">{data?.title}</span>
      <div className="flex items-center space-x-2">
        {data?.discount ? (
          <>
            <span className="text-gray-500 line-through text-lg md:text-xl">$ {data?.price}</span>
            <span className="text-orange-600 text-xl md:text-2xl font-bold">${data?.discount}</span>
          </>
        ) : (
          <span className="text-orange-600 text-xl md:text-2xl font-bold">$ {data?.price}</span>
        )}
      </div>
    </div>
    <div className="font-bold mt-2">({data?.type})</div>
    <Facilities data={data} />
    <button
      onClick={() => setOpened(true)}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
    >
      View Amenities
    </button>
    <span className="text-sm md:text-base mt-4" style={{ textAlign: "justify" }}>
      {data?.description}
    </span>
    <div className="flex items-center mt-4">
      <MdLocationPin size={25} />
      <span className="ml-2 text-sm md:text-base">
        {data?.address} {data?.district}
      </span>
    </div>
    <ActionButtons
      handleActionClick={handleActionClick}
      showRentOptions={showRentOptions}
      setShowRentOptions={setShowRentOptions}
      setRentAgentModalOpen={setRentAgentModalOpen}
      rentByOwner={rentByOwner}
      setEditModalOpen={setEditModalOpen}
      setDiscountModalOpen={setDiscountModalOpen}
    />
  </div>
);

const Facilities = ({ data }) => (
  <div className="flex flex-wrap gap-2 md:gap-6 mt-4">
    {[
      { icon: FaShower, label: `${data?.bathrooms} Bathroom` },
      { icon: AiTwotoneCar, label: `${data?.parking} Parking` },
      { icon: MdMeetingRoom, label: `${data?.rooms} Room` }
    ].map(({ icon: Icon, label }, index) => (
      <div key={index} className="flex items-center gap-2 p-2 md:p-4 rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300">
        <Icon size={20} className="text-blue-500" />
        <span className="text-sm md:text-lg font-semibold text-gray-700">{label}</span>
      </div>
    ))}
  </div>
);

const ActionButtons = ({ handleActionClick, showRentOptions, setShowRentOptions, setRentAgentModalOpen, rentByOwner, setEditModalOpen, setDiscountModalOpen }) => (
  <div className="flex flex-wrap gap-2 md:gap-4 mt-4">
    <button className="px-3 py-1 md:px-4 md:py-2 rounded bg-red-500 text-white text-sm md:text-base hover:bg-red-600 transition-all duration-300" onClick={() => handleActionClick('delete')}>
      Delete
    </button>
    {!showRentOptions ? (
      <button className="px-3 py-1 md:px-4 md:py-2 rounded bg-green-500 text-white text-sm md:text-base hover:bg-green-600 transition-all duration-300" onClick={() => setShowRentOptions(true)}>
        Rent
      </button>
    ) : (
      <div className="flex gap-2">
        <button className="px-3 py-1 md:px-4 md:py-2 rounded bg-green-400 text-white text-sm md:text-base hover:bg-green-500 transition-all duration-300" onClick={() => setRentAgentModalOpen(true)}>
          Rent by Agent
        </button>
      </div>
    )}
    <button className="px-3 py-1 md:px-4 md:py-2 rounded bg-green-400 text-white text-sm md:text-base hover:bg-green-500 transition-all duration-300" onClick={rentByOwner}>
      Rent by Owner
    </button>
    <button className="px-3 py-1 md:px-4 md:py-2 rounded bg-yellow-500 text-white text-sm md:text-base hover:bg-yellow-600 transition-all duration-300" onClick={() => setEditModalOpen(true)}>
      Edit Property
    </button>
    <button className="px-3 py-1 md:px-4 md:py-2 rounded bg-blue-500 text-white text-sm md:text-base hover:bg-blue-600 transition-all duration-300" onClick={() => setDiscountModalOpen(true)}>
      Dicount
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
      {["name", "passport_no", "rental_period", "email", "price", "codastral_code"].map((field) => (
        <input
          key={field}
          type={field === "passport_no" || field === "price" ? "number" : "text"}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")}
          value={formData[field]}
          onChange={handleInputChange}
          required
          className="p-2 border rounded"
        />
      ))}
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
      >
        Submit
      </button>
    </form>
  </Modal>
);




const EditPropertyModal = ({
  opened,
  setOpened,
  editFormData,
  handleEditInputChange,
  handleEditFormSubmit,
  handleImageChange,
  handleRemoveImage,
}) => (
  <Modal
    opened={opened}
    onClose={() => setOpened(false)}
    title="Edit Property"
    centered
  >
    <form
      onSubmit={handleEditFormSubmit}
      className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md"
    >
      {/* Input fields for title, price, discount, etc. */}
      {[
        "title",
        "price",
        "discount",
        "description",
        "address",
        "district",
        "type",
        "metro",
      ].map((field) => (
        <div key={field} className="flex flex-col">
          <label
            htmlFor={field}
            className="text-gray-700 font-semibold mb-2 capitalize"
          >
            {field.replace("_", " ")}
          </label>
          <input
            id={field}
            type={["price", "discount"].includes(field) ? "number" : "text"}
            name={field}
            placeholder={`Enter ${field}`}
            value={editFormData[field]}
            onChange={handleEditInputChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}

      {/* Image Previews with Plus Icon */}
      <div className="flex flex-wrap gap-4">
        {editFormData.images?.map((file, index) => (
          <div
            key={index}
            className="relative w-24 h-24 border rounded-lg shadow-md"
          >
            <img
              src={typeof file === "string" ? file : URL.createObjectURL(file)}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
              title="Remove Image"
            >
              <AiOutlineClose size={16} />
            </button>
          </div>
        ))}

        {/* Plus Icon for Uploading New Images */}
        <label
          className="cursor-pointer flex items-center justify-center w-24 h-24 bg-gray-200 rounded-lg border border-dashed border-gray-400 hover:bg-gray-300 transition-all"
          title="Add New Images"
        >
          <AiOutlinePlus size={24} className="text-gray-500" />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
      >
        Save Changes
      </button>
    </form>
  </Modal>
);



const EditDiscount = ({
  opened,
  setOpened,
  discountData,
  handleDiscountInputChange,
  handleDiscountFormSubmit,
}) => (
  <Modal
    opened={opened}
    onClose={() => setOpened(false)}
    title="Edit Discount"
    centered
  >
    <form
      onSubmit={handleDiscountFormSubmit}
      className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md"
    >
      {/* Discount Input Field */}
      <div className="flex flex-col">
        <label
          htmlFor="discount"
          className="text-gray-700 font-semibold mb-2 capitalize"
        >
          Discount Price
        </label>
        <input
          id="discount"
          type="number"
          name="discount"
          placeholder="Enter Discount Price"
          value={discountData.discount || ""}
          onChange={(e) => handleDiscountInputChange(e)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
      >
        Save Changes
      </button>
    </form>
  </Modal>
);


export default AgentPublishedId;

