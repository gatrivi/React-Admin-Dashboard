import React from "react";

const Button = ({ bgColor, color, size, text, borderRadius }) => {
  return (
    <button
      type="button"
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`text-${size} p-3 w-${size} hover:drop-shadow-xl hover:bg-light-gray transition-all duration-300 ease-in-out`}
    >
      {text}
    </button>
  );
};

export default Button;
