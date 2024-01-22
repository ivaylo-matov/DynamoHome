import React from "react";

export const Arrow = ({ isOpen }) => (
    <svg
      className={`closedArrow ${isOpen ? 'open' : ''}`}
      width="8"
      height="4"
      viewBox="0 0 8 4"
    >
      <path
        d="M4 4L7.5 0H0.5L4 4Z"
        fill="#949494"
      />
    </svg>
);