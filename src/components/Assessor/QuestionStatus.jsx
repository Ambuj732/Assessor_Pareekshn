import React from "react";
import logo from "/logo.png";
import avatar from "/avatar.png";
import questionMark from "/questionMark.png";
import logout from "/logout.png";
import arrowDown from "/arrowDown.png";
import indicator from "/indicator.png";
import mandatory from "/mandatory.png";
import volume from "/volume.png";
import reset from "/reset1.png";
import previous from "/previous.png";
import play from "/play.png";
import next from "/next.png";
import lock from "/lock.png";
import timer from "/timer.png";
import Header from "../../components/Assessor/Header";
import mic from "../../assets/Assessor/mic.png";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";

function QuestionStatus() {
  return (
    <div className="flex flex-col">
      <Header />
      <div>
        {/* Theory and Language */}
        <div className="flex px-12 py-4 justify-between">
          <span className="text-[#0C49CA] text-2xl font-medium font-custom my-2">
            Question Status
          </span>
        </div>
        <div className="min-h-screen bg-[#F3F7FF] flex flex-col mx-8 px-8 py-4 gap-4 border rounded-2xl">
          <div className="flex items-center gap-2">
            <img src={arrowLeft} alt="" className="h-8" />
            <span className="text-black font-semibold text-lg">Back</span>
          </div>
          <div className="h-96 w-full flex flex-col items-center gap-8">
            <div className="h-96 w-5/6 bg-white rounded-3xl flex shadow-customShadow">
              <div className="flex flex-col px-8 justify-center w-1/2 h-full gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-lg text-[#1C4481] font-medium">
                    Total Question
                  </span>
                  <span className="text-7xl text-[#3A3A3A] font-medium">
                    50
                  </span>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col text-[#334E15] bg-[#A0C279] p-3 rounded-xl w-36 ">
                    <span className="font-medium">Attempted</span>
                    <span className="text-2xl font-semibold">35</span>
                  </div>
                  <div className="flex flex-col text-[#334E15] bg-[#EBA6A8] p-3 rounded-xl w-36 ">
                    <span className="font-medium">Not Attempted</span>
                    <span className="text-2xl font-semibold">15</span>
                  </div>
                </div>
              </div>
              <div className="w-1/2 h-full flex items-center justify-center relative">
                <div className="h-64 w-64 rounded-full border-[70px] border-[#DCECFF]"></div>
                <div className="h-56 w-56 rounded-full border-[40px] absolute border-[#1e5ba7]"></div>
                <div className="bg-[#FF5A5F] top-6 left-8 flex items-center justify-center text-xl font-semibold h-12 w-24 absolute rounded-lg">
                  <span>15</span>
                </div>
                <div className="bg-[#6EB51E] top-12 right-6 flex items-center justify-center text-xl font-semibold h-12 w-24 absolute rounded-lg">
                  <span>35</span>
                </div>
              </div>
            </div>
            <div className="bg-[#1C4481] w-24 h-12 flex items-center justify-center text-white rounded-full">
              <span>Done</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionStatus;
