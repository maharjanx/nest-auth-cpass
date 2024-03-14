// Modal.tsx
import React, { FC, ReactNode } from "react";
import { ImCross } from "react-icons/im";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed backdrop-blur-sm inset-0 z-[9999]  flex items-center justify-center ">
          <div
            className={` bg-white z-50 w-11/12 md:max-w-md h-[40rem] mx-auto rounded min-h-[10vh] shadow-lg  overflow-auto ${className} `}
          >
            <div className="modal-content py-4 text-left px-6">
              <div className="flex  justify-end">
                <button
                  className="modal-close cursor-pointer  font-bold py-3 px-3 hover:text-white hover:rounded-full hover:bg-black hover:bg-opacity-80 z-50 flex-end"
                  onClick={onClose}
                >
                  <ImCross />
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
