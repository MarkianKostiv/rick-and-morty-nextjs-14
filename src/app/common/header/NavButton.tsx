"use client";
import React, { useState } from "react";

interface NavButtonProps {
  onClick?: () => void;
}
// передаєму функцію, яка відповідає за показ мобільного меню
export const NavButton = (props: NavButtonProps) => {
  const { onClick } = props;
  // анімуємо кнопку
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className='flex items-center justify-center'
      role='button'
      tabIndex={0}
      onClick={handleClick}
    >
      <button
        className={`flex flex-col w-6 h-6 items-center transition-transform duration-300 ease-in-out transform`}
        onClick={onClick}
      >
        {/* кожен спан міняє своє положення, щоб утворити хрестик при кліку */}
        <span
          className={`block bg-[#757575] w-4 h-0.5 mt-1 ease-in-out duration-300 ${
            isOpen
              ? "rotate-45 translate-y-1 transition-transform ease-in-out duration-300"
              : ""
          }`}
        ></span>
        <span
          className={`block bg-[#757575] w-4 h-0.5 mt-1 ease-in-out duration-300 ${
            isOpen
              ? "opacity-0 transition-opacity ease-in-out duration-300"
              : ""
          }`}
        ></span>
        <span
          className={`block bg-[#757575] w-4 h-0.5 mt-1 ease-in-out duration-300 ${
            isOpen
              ? "-rotate-45 -translate-y-2 transition-transform ease-in-out duration-300"
              : ""
          }`}
        ></span>
      </button>
    </div>
  );
};
