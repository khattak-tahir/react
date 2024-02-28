/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Icons24PxBlackBasket = ({ color = "#172B4D", className }) => {
  return (
    <svg
      className={`icons-24px-black-basket ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M4.5 12V18.75C4.5 19.9926 5.50736 21 6.75 21H17.25C18.4926 21 19.5 19.9926 19.5 18.75V12H4.5Z"
        fill={color}
      />
      <path
        className="path"
        d="M20.25 9H17.685L14.901 4.125L13.599 4.875L15.9578 9H8.04225L10.401 4.875L9.099 4.125L6.315 9H3.75C3.33579 9 3 9.33579 3 9.75C3 10.1642 3.33579 10.5 3.75 10.5H20.25C20.6642 10.5 21 10.1642 21 9.75C21 9.33579 20.6642 9 20.25 9Z"
        fill={color}
      />
    </svg>
  );
};

Icons24PxBlackBasket.propTypes = {
  color: PropTypes.string,
};
