import React from "react";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import "./GetStarted.css";

const GetStarted = () => {
  const { t } = useTranslation('get'); // Specify the namespace for getStarted

  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container bg-blur">
          <span className="text-4xl font-extrabold text-white drop-shadow-md">
            {t('getStartedTitle')} {/* Use translation for title */}
          </span>
          <span className="text-lg text-gray-200 mt-2 drop-shadow-md">
            {t('getStartedSubtitle')} {/* Use translation for subtitle */}
            <br />
            {t('findYourResidence')} {/* Use translation for find residence */}
          </span>
          <a 
            href="https://t.me/rent_tbilisi_ge" 
            className="button mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 transition duration-300"
          >
            {t('getStartedButton')} {/* Use translation for button */}
          </a>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
