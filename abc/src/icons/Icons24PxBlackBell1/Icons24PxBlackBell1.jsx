/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Icons24PxBlackBell1 = ({ color = "#172B4D", className }) => {
  return (
    <svg
      className={`icons-24px-black-bell-1 ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M18 10.5V9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9V10.5C5.96277 11.4248 5.54242 12.2924 4.83975 12.8947C4.21515 13.427 3.82394 14.1827 3.75 15C3.75 16.875 6.834 18 12 18C17.166 18 20.25 16.875 20.25 15C20.1761 14.1827 19.7849 13.427 19.1603 12.8947C18.4576 12.2924 18.0372 11.4248 18 10.5Z"
        fill={color}
      />
      <path
        className="path"
        d="M9.85876 19.425C10.1521 20.3609 11.0193 20.9978 12 20.9978C12.9808 20.9978 13.8479 20.3609 14.1413 19.425C13.4708 19.4745 12.7583 19.5 12 19.5C11.2418 19.5 10.5293 19.476 9.85876 19.425Z"
        fill={color}
      />
    </svg>
  );
};

Icons24PxBlackBell1.propTypes = {
  color: PropTypes.string,
};
