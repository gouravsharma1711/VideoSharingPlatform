import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ size = 15, color = "#ffffff", loading = true }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <ClipLoader 
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingSpinner;
