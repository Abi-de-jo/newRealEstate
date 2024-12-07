import React, { useRef, useMemo } from "react";
import Hero from "./Hero/Hero";
import Buycard from "./BuyCard/BuyCard"; // Updated to use your Buycard component
import useProperties from "../hooks/useProperties"; // Adjust path if needed
import New from "./New";
import { useTranslation } from "react-i18next";

function Buy() {
  const { t } = useTranslation("buy"); // Load translations for the Buy namespace
  const { data: properties, isLoading, isError } = useProperties();
  const scrollRef = useRef(null);

  const filterType = "sale"; // Default type

  // Filter properties by type and price range
  const filteredProperties = useMemo(
    () =>
      properties
        ?.filter((property) => property.type?.toLowerCase() === filterType)
        ?.filter((property) => property.price <= 550), // Corrected price filter
    [properties, filterType]
  );

  // Handle error and loading states
  if (isError) {
    return (
      <div className="text-center text-red-500">
        {t("errorLoading")} {/* Translated Error Message */}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center text-gray-500">
        {t("loadingProperties")} {/* Translated Loading Message */}
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Property Cards Section */}
      <div className="container mx-auto p-8">
        {/* Section Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {t("sectionHeader")} {/* Translated Section Header */}
          </h1>
        </div>

        <div className="relative">
          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide justify-center"
          >
            {filteredProperties?.slice(0, 4)?.map((property) => (
              <div key={property.id} className="flex-shrink-0 w-80">
                <Buycard card={property} />
              </div>
            ))}
            {filteredProperties?.length === 0 && (
              <div className="text-center text-gray-500 w-full">
                {t("noPropertiesFound")} {/* Translated No Properties Message */}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Content */}
      <New />
    </>
  );
}

export default Buy;
