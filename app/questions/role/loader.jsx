import React from "react";

export const Spinner = ({ size = "md" }) => {
    const sizeClass = size === "lg" ? "h-12 w-12" : "h-8 w-8"; // Size can be adjusted
    return (
        <div className={`animate-spin border-t-4 border-indigo-600 ${sizeClass} rounded-full`}></div>
    );
};
