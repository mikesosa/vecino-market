import React from "react";

export default function ProgressBar({ progress }) {
  const width = `${progress * 100}%`;
  console.log("width", width);
  return (
    <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
      <div
        class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
        style={{ width }}
      ></div>
    </div>
  );
}
