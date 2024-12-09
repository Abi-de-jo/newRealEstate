import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { Button, Group, Select, Checkbox } from "@mantine/core";
import useCountries from "../../hooks/useCountries";
import GoogleMapSection from "../Map/GoogleMapSection";
import { useTranslation } from "react-i18next";

const AddLocation = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const { getAll } = useCountries();
  const { t } = useTranslation("location");

  const form = useForm({
    initialValues: {
      country: propertyDetails?.country || "",
      district: propertyDetails?.district || [],
      address: propertyDetails?.address || "",
      metro: propertyDetails?.metro || [],
    },
    validate: {
      country: (value) => validateString(value),
      district: (value) => (value.length > 0 ? null : t("districtRequired")),
      address: (value) => validateString(value),
      metro: (value) => (value.length > 0 ? null : t("metroRequired")),
    },
  });

  const districtList = [
    "Vera",
    "Mtatsminda",
    "Vake",
    "Sololaki",
    "Chugureti",
    "Saburtalo",
    "Didube",
    "Gldani",
    "Avlabari",
    "Isani",
    "Samgori",
    "Dighomi",
    "Varketili",
    "Ortachala",
    "Abanotubani",
    "Didi Dighomi",
    "Dighomi Massive",
    "Lisi Lake",
    "Vashlijvari",
    "Afrika",
    "Vasizubani",
    "Kukia",
    "Elia",
    "Okrokana",
    "Avchala",
    "Temqa",
    "Tskhneti",
    "Bagebi",
    "Nutsubidze Plato",
    "Vake-Saburtalo",
    "Vezisi",
    "Tkhinvali",
    "Kus Tba (Turtle Lake)",
    "Lisi",
    "Mukhatgverdi",
    "Mukhattskaro",
    "Nutsubidze Plateau",
    "Lisi Adjacent Area",
    "Digomi 1-9",
    "Sof. Digomi (Village Digomi)",
    "Dighmis Chala",
    "Koshigora",
    "Didgori",
    "Old Tbilisi",
    "Krtsanisi",
    "Tsavkisi Valley",
    "Didube-Chughureti",
    "Dighmis Massive (Dighmis Masivi)",
    "Iveri Settlement (Ivertubani)",
    "Svaneti Quarter (Svanetis Ubani)",
    "Gldani-Nadzaladevi",
    "Gld",
  ];

  const metroList = [
    "Liberty Square",
    "Rustaveli",
    "Marjanishvili",
    "Station Square",
    "Tsereteli",
    "Gotsiridze",
    "Nadzaladevi",
    "Didube",
    "Grmagele",
    "Guramishvili",
    "Sarajishvili",
    "Akhmeteli Theatre",
    "State University",
    "Vazha-Pshavela",
    "Delisi",
    "Technical University",
    "Medical University",
    "Avlabari",
    "Isani",
    "300 Aragveli",
    "Samgori",
    "Varketili",
  ];

  const handleDistrictChange = (selectedDistrict) => {
    const updatedDistricts = form.values.district.includes(selectedDistrict)
      ? form.values.district.filter((d) => d !== selectedDistrict)
      : [...form.values.district, selectedDistrict];

    form.setFieldValue("district", updatedDistricts);
    setPropertyDetails((prev) => ({ ...prev, district: updatedDistricts }));
  };

  const handleMetroChange = (selectedMetro) => {
    const updatedMetros = form.values.metro.includes(selectedMetro)
      ? form.values.metro.filter((m) => m !== selectedMetro)
      : [...form.values.metro, selectedMetro];

    form.setFieldValue("metro", updatedMetros);
    setPropertyDetails((prev) => ({ ...prev, metro: updatedMetros }));
  };

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, ...form.values }));
      nextStep();
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault() || handleSubmit()}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Left Side - Inputs */}
        <div className="flex-1 space-y-6">
          <div className="w-full">
            <Select
              label={t("country")}
              clearable
              searchable
              data={getAll()}
              classNames={{
                root: "w-full",
                input:
                  "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                label: "block text-sm font-medium text-gray-700 mb-1",
              }}
              {...form.getInputProps("country")}
            />
          </div>

          {/* Districts Section with Bubble Style */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">
              {t("selectDistricts")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {districtList.map((dis) => (
                <Checkbox
                  key={dis}
                  label={t(dis)}
                  checked={form.values.district.includes(dis)}
                  onChange={() => handleDistrictChange(dis)}
                  classNames={{
                    root: "flex items-center",
                    input: "mr-2 text-blue-600 focus:ring-blue-500",
                    label: "text-sm text-gray-700",
                  }}
                />
              ))}
            </div>
            {form.errors.district && (
              <p className="text-red-500 text-sm mt-2">
                {form.errors.district}
              </p>
            )}
          </div>

          {/* Metro Stations Section with Bubble Style */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">
              {t("selectNearbyMetroStations")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {metroList.map((station) => (
                <Checkbox
                  key={station}
                  label={t(station)}
                  checked={form.values.metro.includes(station)}
                  onChange={() => handleMetroChange(station)}
                  classNames={{
                    root: "flex items-center",
                    input: "mr-2 text-blue-600 focus:ring-blue-500",
                    label: "text-sm text-gray-700",
                  }}
                />
              ))}
            </div>
            {form.errors.metro && (
              <p className="text-red-500 text-sm mt-2">{form.errors.metro}</p>
            )}
          </div>

          {/* Simple Input for Address */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("address")}
            </label>
            <input
              type="text"
              placeholder={t("address")}
              value={form.values.address || ""}
              onChange={(e) => {
                const value = e.target.value;
                form.setFieldValue("address", value);
                setPropertyDetails((prev) => ({
                  ...prev,
                  address: value,
                }));
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
            />
            {form.errors.address && (
              <p className="text-red-500 text-sm mt-2">{form.errors.address}</p>
            )}
          </div>
        </div>

        {/* Right Side - Map */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">{t("mapLocation")}</h3>
          <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
            <GoogleMapSection
              address={form.values.address}
              district={form.values.district.join(", ")}
              country={form.values.country}
              metro={form.values.metro.join(", ")}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Group position="center" mt="xl" className="space-x-4">
        <Button
          variant="outline"
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t("previous")}
        </Button>
        <Button
          type="submit"
          className="px-6 py-2 border border-transparent text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t("nextStep")}
        </Button>
      </Group>
    </form>
  );
};

export default AddLocation;
