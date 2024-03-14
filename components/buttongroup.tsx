import { useRouter } from "next/router";
import React from "react";
import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

interface BottonProps {
  onDelete?: any;
  onEdit?: any;
  onConfigure?: any;
  isDelete?: boolean;
  isEdit?: boolean;
  isConfigure?: boolean;
}

export const ButtonGroup = ({
  isConfigure,
  isDelete,
  isEdit,
  onConfigure,
  onDelete,
  onEdit,
}: BottonProps) => {
  return (
    <div className="gap-1 flex items-center">
      {isDelete && (
        <button type="button" onClick={onDelete}>
          <div className="px-2 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
            <CiTrash />
          </div>
        </button>
      )}

      {isEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="px-2 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
        >
          <FaRegEdit />
        </button>
      )}

      {isConfigure && (
        <button
          type="button"
          onClick={onConfigure}
          className="px-2 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-700"
        >
          <IoMdSettings />
        </button>
      )}
    </div>
  );
};
