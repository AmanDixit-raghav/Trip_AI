import React from 'react';
import PropTypes from 'prop-types';

export const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className= "bg-white rounded-lg shadow-lg p-6 max-w-md w-full flex flex-row justify-between">
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 h-10 "
        >
          Close
        </button>
      </div>
    </div>
  );
};

export const DialogTrigger = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
    {children}
  </button>
);

export const DialogContent = ({ children }) => (
  <div className="mt-4">{children}</div>
);

export const DialogHeader = ({ children }) => (
  <div className="text-lg font-bold">{children}</div>
);

export const DialogDescription = ({ children }) => (
  <p className="text-sm text-gray-500 mt-2">{children}</p>
);

export const DialogFooter = ({ children }) => (
  <div className="mt-4 flex justify-end">{children}</div>
);

// Prop validation for better debugging
Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

DialogTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

DialogContent.propTypes = {
  children: PropTypes.node.isRequired,
};

DialogHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

DialogDescription.propTypes = {
  children: PropTypes.node.isRequired,
};

// DialogFooter.propTypes = {
//   children: PropTypes.node.isRequired,
// };
