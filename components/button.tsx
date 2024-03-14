import React from "react";
import { FaPlus } from "react-icons/fa6";
interface ButtonProps {
  onClick: any;
  className?: string;
  icon?: React.ReactNode;
  name?: string;
}
const Button = ({ onClick, className, icon, name }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-white  rounded-md ${
        className ?? "bg-green-500 hover:bg-green-600"
      }  cursor-pointer flex items-center gap-1.5`}
    >
      <span>{icon ?? <FaPlus />}</span>
      <span> {name ?? "Add "}</span>
    </button>
  );
};

export default Button;
