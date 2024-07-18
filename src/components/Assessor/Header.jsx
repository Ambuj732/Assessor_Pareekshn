import React, { useState } from "react";
import logo from "/logo.png";
import avatar from "/avatar.png";
import questionMark from "/questionMark.png";
import logout from "/logout.png";
import InstructionModal from "./InstructionModal";
import instruction from "../../actions/LoginScreen/instructions";

function Header() {
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const instructionHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user,
        assessor_id: 160,
        exam_id: 8558,
      };
      const response = await instruction(data);
      console.log("Instruction ", response);
      if (response?.data?.code === 1000) {
        setInstructions(response?.data.instruction);
        setModalIsOpen(true); // Ensure this line is within the if statement
      }
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  return (
    <div className="h-20 bg-[#305187] px-8 flex items-center justify-between">
      <img src={logo} alt="" className="h-4/5 my-auto" />
      <div className="flex gap-6 items-center">
        <div className="flex items-center justify-around py-1 bg-[#FEFEFF1A] rounded-full h-14 w-[240px] pr-8">
          <img src={avatar} alt="" className="h-12" />
          <div className="flex font-medium text-white">
            <span className="text-nowrap">Narayan Singh</span>
          </div>
        </div>
        <div className="flex gap-3 h-10 cursor-pointer">
          <img src={logout} alt="" />
          <img src={questionMark} onClick={instructionHandler} alt="" />
          <InstructionModal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            instructions={instructions}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
