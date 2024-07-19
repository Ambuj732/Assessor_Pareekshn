import React from "react";
import Header from "../../components/Assessor/Header";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import arrowright from "../../assets/Assessor/arrowright.png";
import { useNavigate } from "react-router";
function ExamList() {
  const navigate = useNavigate();
  const goToPage = () => {
    navigate(-1);
  };

  const assessorHome = () => {
    navigate("/assessor-home");
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="bg-[#EDEDED] p-6 min-h-screen">
        <div className="flex items-center gap-4">
          <img
            src={arrowLeft}
            alt=""
            className="h-8 cursor-pointer"
            onClick={goToPage}
          />
          <span className="text-xl font-semibold">Exam List</span>
        </div>
        <div className="bg-white my-3 rounded-2xl py-4 flex flex-col items-center gap-6">
          <div
            className={`bg-[#EDEDED] w-[calc(100%-20px)] flex items-center px-8 h-16 rounded-md justify-between cursor-pointer`}
            onClick={assessorHome}
          >
            <span className="font-medium text-lg">23-2-2023</span>
            <div className="bg-[#1C4481] h-10 flex w-44 rounded-3xl justify-between items-center px-3">
              <span className="text-white text-lg">Exam Details</span>
              <img src={arrowright} alt="" />
            </div>
          </div>
          <div
            className={`bg-[#EDEDED] w-[calc(100%-20px)] flex items-center px-8 h-16 rounded-md justify-between`}
          >
            <span className="font-medium text-lg">23-2-2023</span>
            <div className="bg-[#1C4481] h-10 flex w-44 rounded-3xl justify-between items-center px-3">
              <span className="text-white text-lg">Exam Details</span>
              <img src={arrowright} alt="" />
            </div>
          </div>
          <div
            className={`bg-[#EDEDED] w-[calc(100%-20px)] flex items-center px-8 h-16 rounded-md justify-between`}
          >
            <span className="font-medium text-lg">23-2-2023</span>
            <div className="bg-[#1C4481] h-10 flex w-44 rounded-3xl justify-between items-center px-3">
              <span className="text-white text-lg">Exam Details</span>
              <img src={arrowright} alt="" />
            </div>
          </div>
          <div
            className={`bg-[#EDEDED] w-[calc(100%-20px)] flex items-center px-8 h-16 rounded-md justify-between`}
          >
            <span className="font-medium text-lg">23-2-2023</span>
            <div className="bg-[#1C4481] h-10 flex w-44 rounded-3xl justify-between items-center px-3">
              <span className="text-white text-lg">Exam Details</span>
              <img src={arrowright} alt="" />
            </div>
          </div>
          <div
            className={`bg-[#EDEDED] w-[calc(100%-20px)] flex items-center px-8 h-16 rounded-md justify-between`}
          >
            <span className="font-medium text-lg">23-2-2023</span>
            <div className="bg-[#1C4481] h-10 flex w-44 rounded-3xl justify-between items-center px-3">
              <span className="text-white text-lg">Exam Details</span>
              <img src={arrowright} alt="" />
            </div>
          </div>
          <div
            className={`bg-[#EDEDED] w-[calc(100%-20px)] flex items-center px-8 h-16 rounded-md justify-between`}
          >
            <span className="font-medium text-lg">23-2-2023</span>
            <div className="bg-[#1C4481] h-10 flex w-44 rounded-3xl justify-between items-center px-3">
              <span className="text-white text-lg">Exam Details</span>
              <img src={arrowright} alt="" />
            </div>
          </div>
          <div
            className={`bg-[#EDEDED] w-[calc(100%-20px)] flex items-center px-8 h-16 rounded-md justify-between`}
          >
            <span className="font-medium text-lg">23-2-2023</span>
            <div className="bg-[#1C4481] h-10 flex w-44 rounded-3xl justify-between items-center px-3">
              <span className="text-white text-lg">Exam Details</span>
              <img src={arrowright} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamList;
