import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const InstructionModal = ({ isOpen, onRequestClose, instructions }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Instructions"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div
        className="flex h-full items-center justify-center fixed top-0 left-16
       z-50  bg-opacity-50"
      >
        <div className="w-1/3 h-1/2 border  rounded-3xl shadow-2xl p-4 bg-white">
          <div className="flex items-center justify-center mb-4">
            <span className="text-xl font-custom text-[#0f056f]">
              Instruction
            </span>
          </div>
          <div className="overflow-y-auto h-full">
            <p>{instructions}</p>
          </div>
          <button
            className=" bg-blue-500 text-white px-4 py-2 rounded-3xl"
            onClick={onRequestClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InstructionModal;
