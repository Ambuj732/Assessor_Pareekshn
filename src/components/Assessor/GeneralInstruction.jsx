import React, { useState, useEffect } from "react";
import next from "../../assets/Assessor/next.png";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";
import instruction from "../../actions/LoginScreen/instructions";

function Instruction() {
  const [instructions, setInstructions] = useState("");
  const [error, setErrors] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const exam_id = location.state?.exam_id;
  const student_id = location.state?.student_id;
  console.log(exam_id);
  console.log(student_id);

  const getinstructionData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
      };
      console.log(data);
      const response = await instruction(data);
      console.log(response);
      console.log("Instruction ", response);
      if (response?.data?.code === 1000) {
        setInstructions(response?.data.instruction);
      }
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const goToVivaPage = () => {
    navigate("/viva-exam", {
      state: { exam_id: exam_id, student_id: student_id },
    });
  };

  useEffect(() => {
    getinstructionData();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="h-screen m-8 bg-[#1C4481] rounded-2xl flex items-center justify-center flex-col gap-6">
        <div
          className={`bg-white w-5/6 h-5/6 rounded-3xl flex items-center justify-center gap-7 `}
        >
          <Link to="/insturctionpage">
            <div>
              <img src={arrowLeft} alt="" className="h-9 mt-11" />
            </div>
          </Link>
          <div className="h-3/4 flex  items-center">
            <div className="bg-[#F3F3F3] h-[400px] w-[700px]  p-8 rounded-2xl">
              <span className="text-[#0C49CA] font-semibold text-lg">
                General Instruction
              </span>
              <ul className="list-disc p-2 flex flex-col gap-1">
                <li>{instructions}</li>
              </ul>
            </div>
          </div>
          <div
            className=" mt-10  border cursor-pointer rounded-3xl text-white py-3 px-10 bg-[#1C4481]"
            onClick={() => goToVivaPage()}
          >
            <span>Start Viva</span>
          </div>
        </div>
        <span className="text-xl text-white font-medium">
          Please write to info@spiwd.in, in case of any
          feedback/suggestions/request
        </span>
      </div>
    </div>
  );
}

export default Instruction;
