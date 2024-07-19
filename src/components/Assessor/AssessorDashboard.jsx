import React from "react";
import Header from "./Header";
import papers from "../../assets/Assessor/papers.png";
import complete from "../../assets/Assessor/complete.png";
import explanation from "../../assets/Assessor/explanation.png";
import calender from "../../assets/Assessor/calender.png";
import { Navigate, useNavigate } from "react-router";
const AssessorDashboard2 = () => {
  const navigate = useNavigate();
  const goToPage = () => {
    navigate("/photo-upload");
  };
  return (
    <div className="max-h-screen">
      <Header />
      <div className="p-4 bg-[#EDEDED] flex  gap-6">
        <div className=" h-screen bg-white p-4 w-8/12 rounded-2xl overflow-y-scroll">
          <span className="text-3xl font-semibold mx-3">Dashboard</span>
          <div className=" flex gap-10 mt-7">
            <div className=" relative w-[180px] h-[285px] border rounded-3xl bg-gradient-to-t from-customBlack to-customGray flex flex-col">
              <div className="w-[108px] h-[108px]  rounded-full absolute top-7 left-8 bg-[#444242] flex justify-center items-center">
                <img src={papers} />
              </div>
              <div className=" w-full absolute top-36  flex flex-col justify-center items-center">
                <span className="text-[#A8A8A8] font-custom font-bold text-md ">
                  Total Batches
                </span>
                <span className="text-3xl text-white font-semibold">923</span>
                <span className="font-custom text-xs text-[#A8A8A8] text-nowrap">
                  Lorem Ipsum is simply
                </span>
                <span className="font-custom text-xs text-[#A8A8A8] text-nowrap">
                  dummy text of the printing
                </span>
              </div>
            </div>
            <div className=" relative w-[180px] h-[285px] border rounded-3xl bg-gradient-to-b from-customLightGreen via-customGreen to-customDarkGreen flex flex-col">
              <div className="w-[108px] h-[108px]  rounded-full absolute top-7 left-8 bg-[#444242] flex justify-center items-center">
                <img src={complete} />
              </div>
              <div className=" w-full absolute top-36  flex flex-col justify-center items-center">
                <span className="text-[#BDDCAD] font-custom font-bold text-md ">
                  Completed
                </span>
                <span className="text-3xl text-white font-semibold">900</span>
                <span className="font-custom text-xs text-white text-nowrap">
                  Lorem Ipsum is simply
                </span>
                <span className="font-custom text-xs text-white text-nowrap">
                  dummy text of the printing
                </span>
              </div>
            </div>
            <div className=" relative w-[180px] h-[285px] border rounded-3xl bg-gradient-to-b from-customLightYellow via-customBrown to-customDarkBrown flex flex-col">
              <div className="w-[108px] h-[108px]  rounded-full absolute top-7 left-8 bg-[#444242] flex justify-center items-center">
                <img src={papers} />
              </div>
              <div
                className=" w-full absolute top-36  flex flex-col justify-center items-center cursor-pointer"
                onClick={goToPage}
              >
                <span className="text-[#FFEACA] font-custom font-bold text-md ">
                  In-Progress
                </span>
                <span className="text-3xl text-white font-semibold">22</span>
                <span className="font-custom text-xs text-white text-nowrap">
                  Lorem Ipsum is simply
                </span>
                <span className="font-custom text-xs text-white text-nowrap">
                  dummy text of the printing
                </span>
              </div>
            </div>

            <div className=" relative w-[182px] h-[285px] border rounded-3xl bg-gradient-to-b from-customLightBlue via-customMediumBlue to-customDarkBlue flex flex-col">
              <div className="w-[108px] h-[108px]  rounded-full absolute top-7 left-8 bg-[#444242] flex justify-center items-center">
                <img src={explanation} />
              </div>
              <div className=" w-full absolute top-36  flex flex-col justify-center items-center">
                <span className="text-[#B0DBE4] font-custom font-extrabold text-md ">
                  Pending
                </span>
                <span className="text-3xl text-white font-semibold">01</span>
                <span className="font-custom text-xs text-[#B0DBE4] text-nowrap">
                  Lorem Ipsum is simply
                </span>
                <span className="font-custom text-xs text-[#B0DBE4] text-nowrap">
                  dummy text of the printing
                </span>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <span className="text-[0D001D] font-custom font-semibold text-2xl ">
              Messages
            </span>
            <div className="w-[90%] h-[400px] border-2  rounded-2xl flex flex-col justify-center mt-10 gap-6">
              <div className="w-[670px] h-[40px] border-[1px] border-[#A2D0D7] rounded-xl bg-[#C5F4FB4F]  flex p-5 items-center ml-5">
                <span className="text-[#18454B] font-semibold text-md">
                  Dear Assessor, All the Best! Regards, Team SPIWD
                </span>
              </div>
              <div className="w-[670px] h-[72px] border-[1px] border-[#A2D0D7] rounded-xl bg-[#F2FCFD4F]  flex p-2 items-center ml-5">
                <div className="w-[60%] h-auto flex flex-col">
                  <span className="text-[#18454B] font-semibold text-md">
                    Hello Assessor. You need to take the viva of every
                  </span>
                  <span className="text-[#18454B] font-semibold text-md">
                    student after he/she has completed
                  </span>
                  <span className="text-[#18454B] font-semibold text-md">
                    his/her theory exam
                  </span>
                </div>
              </div>
              <div className="w-[670px] h-[40px] border-[1px] border-[#A2D0D7] rounded-xl bg-[#C5F4FB4F]  flex p-5 items-center ml-5">
                <span className="text-[#18454B] font-semibold text-md">
                  Dear Assessor, All the Best! Regards, Team SPIWD
                </span>
              </div>
              <div className="w-[670px] h-[72px] border-[1px] border-[#A2D0D7] rounded-xl bg-[#F2FCFD4F]  flex p-2 items-center ml-5">
                <div className="w-[60%] h-auto flex flex-col">
                  <span className="text-[#18454B] font-semibold text-md">
                    Hello Assessor. You need to take the viva of every
                  </span>
                  <span className="text-[#18454B] font-semibold text-md">
                    student after he/she has completed
                  </span>
                  <span className="text-[#18454B] font-semibold text-md">
                    his/her theory exam
                  </span>
                </div>
              </div>
              <div className="w-[670px] h-[40px] border-[1px] border-[#A2D0D7] rounded-xl bg-[#C5F4FB4F]  flex p-5 items-center ml-5">
                <span className="text-[#18454B] font-semibold text-md">
                  Dear Assessor, All the Best! Regards, Team SPIWD
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen w-1/3 bg-white rounded-2xl overflow-y-scroll p-4 flex flex-col gap-5">
          <span className="text-3xl font-semibold mx-3">Calender</span>
          <div className="flex flex-col gap-4">
            <img src={calender} />
            <span className="text-[#1C4481] font-custom font-semibold text-md">
              Upcoming Events
            </span>
            <div className="w-[404px] h-[34px] border rounded-3xl bg-[#A50DBE66]  flex p-5 items-center ml-5">
              <span className="text-[#37103E] font-semibold text-md">
                5:30a Ref F
              </span>
            </div>
            <div className="w-[404px] h-[34px] border rounded-3xl bg-[#BDB5BE66]  flex p-5 items-center ml-5">
              <span className="text-[#37103E] font-semibold text-md">
                5:30a Ref F
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessorDashboard2;
