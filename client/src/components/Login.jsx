import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useTranslation } from "react-i18next";

function UserLogin({ nextStep, prevStep }) {
  const { t } = useTranslation("Oupload");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedCode, setSelectedCode] = useState("+995"); // Default to Georgia

  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setPreviewImage(storedImage);
    }
  }, []);

  const countryCodes = [
    { code: "+1", country: "United States" },
    { code: "+44", country: "United Kingdom" },
    { code: "+91", country: "India" },
    { code: "+995", country: "Georgia" },
    // Add other country codes as necessary
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 200;
          const scaleSize = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7);
          setPreviewImage(resizedBase64);
          localStorage.setItem("profileImage", resizedBase64);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const email = localStorage.getItem("email");
    const username = formData.get("username");
    const teleNumber = `${selectedCode}${formData.get("teleNumber")}`;
    const governmentId = formData.get("governmentId");
    const profile = previewImage;

    try {
      const res = await axios.post("http://localhost:3000/api/owner/userToOwner", {
        username,
        teleNumber,
        governmentId,
        email,
        profile,
      });

      localStorage.setItem("newOwner", JSON.stringify(res.data));
      localStorage.setItem("role", "owner");
      updateUser(res.data);
      nextStep();
      navigate("/");
    } catch (err) {
      // Extract error message if available, or use the default translation
      const errorMessage = err.response?.data?.message || err.message || t("error.default");
      setError(errorMessage);
    } finally {
      setIsLoading(false);

      window.location.reload()
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">{t("welcomeBack")}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder={t("username")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex items-center space-x-2">
            <select
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
              className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {t(country.country)} ({country.code})
                </option>
              ))}
            </select>
            <input
              name="teleNumber"
              type="number"
              required
              placeholder={t("telephoneNumber")}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <input
            name="governmentId"
            type="text"
            required
            placeholder={t("governmentId")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {previewImage && (
            <div className="flex items-center justify-center">
              <img src={previewImage} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover" />
            </div>
          )}

          <input
            name="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className={`w-full py-2 text-white font-semibold rounded-lg transition duration-300 ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? t("loading") : t("register")}
          </button>

          {error && <span className="text-red-500 text-sm text-center">{error}</span>}
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
