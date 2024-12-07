import React, { useRef, useEffect } from "react";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const MultiDateSelector = ({ setSelectedDates }) => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarInstance = Flatpickr(calendarRef.current, {
      mode: "multiple",
      dateFormat: "Y-m-d",
      onChange: (dates) => {
        setSelectedDates(dates); // Update parent component with selected dates
      },
    });

    return () => {
      calendarInstance.destroy();
    };
  }, [setSelectedDates]);

  return (
    <div>
      <h2>Select Multiple Dates</h2>
      <input ref={calendarRef} type="text" placeholder="Select dates" />
    </div>
  );
};

export default MultiDateSelector;
