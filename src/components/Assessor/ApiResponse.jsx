import React, { useState, useEffect } from "react";

const SlidingMessage = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set isVisible to true after 2 seconds
    const timeoutToShow = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Set isVisible to false after 5 seconds
    const timeoutToHide = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Clear timeouts to prevent memory leaks
    return () => {
      clearTimeout(timeoutToShow);
      clearTimeout(timeoutToHide);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-8 right-8 z-10 w-fit transition-all duration-500 ${
        isVisible ? "opacity-100 right-8" : "opacity-0 right-[500px]"
      }`}
    >
      {isVisible && (
        <div className="bg-red-900 text-white px-7 py-3 font-semibold rounded-md shadow-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default SlidingMessage;
