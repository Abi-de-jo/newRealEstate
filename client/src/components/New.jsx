import React, { useRef, useMemo } from "react";
import Newcard from "./NewCard/NewCard"; // Updated to use your Newcard component
import useProperties from "../hooks/useProperties"; // Adjust path if needed
import { useTranslation } from "react-i18next";

function New() {
  const { t } = useTranslation("new"); // Load translations for the New namespace
  const { data: properties, isLoading, isError } = useProperties();
  const scrollRef = useRef(null); // Ref for the scrollable container

  const filterType = "rent"; // Default to "rent"

  // Filter and sort properties by type, price, and updatedAt timestamp
  const filteredProperties = useMemo(() => {
    return properties
      ?.filter((property) => property.type?.toLowerCase() === filterType)
      ?.filter((property) => property.price >= 40 && property.price <= 550) // Corrected price range logic
      ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // Sort by updatedAt, newest first
  }, [properties]);

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
                <Newcard card={property} />
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
    </>
  );
}

export default New;
