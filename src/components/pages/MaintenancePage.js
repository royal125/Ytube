import React from "react";
import mainIcon from "../assets/main.png"; // ✅ correct relative path
import "../style.css"; // Import the CSS file

function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center center">
        {/* Show your imported image */}
        <img
          src={mainIcon}
          alt="Maintenance Mode"
          className="w-8 pt-5 mx-auto mb-4 main"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Site is under maintenance
        </h1>
        <p className="text-gray-600 text-lg">
          We're working hard to improve the user experience. Stay tuned!
        </p>
      </div>
    </div>
  );
}

export default MaintenancePage;
