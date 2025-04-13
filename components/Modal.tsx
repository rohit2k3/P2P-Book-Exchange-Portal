import { useState } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

interface ModalProps {
  name: string;
  email: string;
  phone: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ name, email, phone, setIsOpen, isOpen }) => {
  const handleClose = () => setIsOpen(false);

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 z-50 w-full h-full bg-dark-900/60  flex items-center justify-center"
          onClick={handleClose}
        >
          <div
            className="bg-white dark:bg-neutral-800 dark:border-neutral-700 rounded-xl shadow-lg max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 dark:text-white">Contact Information</h3>
              <button
                type="button"
                className="text-gray-600 dark:text-gray-400"
                onClick={handleClose}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6L18 18" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-dark-800 dark:text-dark-400">
                <strong>Name:</strong> {name}
              </p>
              <p
                className="text-sm text-dark-600 dark:text-dark-400 cursor-pointer flex items-center gap-x-2"
                onClick={handleEmailClick}
              >
                <FaEnvelope />
                {email}
              </p>
              <p
                className="text-sm text-dark-600 dark:text-dark-400 cursor-pointer flex items-center gap-x-2"
                onClick={handlePhoneClick}
              >
                <FaPhoneAlt />
                {phone}
              </p>
            </div>

            <div className="mt-4 text-right">
              <button
                type="button"
                className="py-2 px-4 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
