import React, { useEffect, useState } from "react";
import pen from "../../assets/Dashboard/pen.png";
import { IoPerson } from "react-icons/io5";
import close from "../../assets/Dashboard/close.png";

import openbook from "../../assets/Dashboard/openbook.png";
import Header from "../Assessor/Header";
import completeBatch from "../../actions/AssessorDashboard/completedBatchs";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import { Navigate, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const Feedback2 = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const goToPage = () => {
    navigate(-2);
  };
  return (
    <div className="flex flex-col gap-8 ">
      <Header />
      <div className="flex  flex-col mx-2 m-7 ">
        <div className="flex gap-7 ml-10 mb-4">
          <img src={arrowLeft} onClick={goToPage} className="w-10 h-10 " />
          <span className="font-custom text-nowrap text-lg font-bold">
            Back to dashboard
          </span>
        </div>
        <p className="font-custom font-semibold ml-10">
          Please submit the feedback to improve skill development program.
        </p>
      </div>
      <div className="h-70 border-2  rounded-xl mx-10 -mt-6 mb-7">
        <div className="flex justify-between text-[#1C4481] font-medium px-8 text-lg h-16 items-center rounded-t-xl bg-[#EAF2FE] ">
          <span className="text-nowrap mx-2">Batch Details</span>
        </div>
        <div className="flex p-4 flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Assessment Agency Name
                </span>
                <div className="font-medium text-base ml-1">ghfgh</div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Assessor’s Aadhar number
                </span>
                <div className="font-medium text-base ml-1">ghdfgh</div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Training Partner name
                </span>
                <div className="font-medium text-base ml-1">fgfg</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Center Id
                </span>
                <div className="font-medium text-base ml-1">15</div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold text-nowrap">
                  Job role for which assessment conducted{" "}
                </span>
                <div className="font-medium text-base ml-1">07-06-2024</div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Conducted
                </span>
                <div className="font-medium text-base ml-1">201301</div>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full gap-64 mt-4">
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Aadhaar ID
                </span>
                <div className="font-medium text-base ml-1">15</div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5 ml-10">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold text-nowrap">
                  Student Preferred language of assessment
                </span>
                <div className="font-medium text-base ml-1">07-06-2024</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Assessor’s Name
                </span>
                <div className="font-medium text-base ml-1">15</div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold text-nowrap">
                  No of Candidate in the Batches
                </span>
                <div className="font-medium text-base ml-1">07-06-2024</div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Training Center Name
                </span>
                <div className="font-medium text-base ml-1">201301</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Batch ID
                </span>
                <div className="font-medium text-base ml-1">15</div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Sector Name
                </span>
                <div className="font-medium text-base ml-1">07-06-2024</div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Alternate ID (IF any)
                </span>
                <div className="font-medium text-base ml-1">201301</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Center Address on SDMS
                </span>
                <div className="font-medium text-base ml-1">15</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-around mx-10  mb-5">
        <div className="relative h-12 w-1/2">
          <div>
            <input
              type="text"
              id="floating_filled"
              className="block p-5 text-black  w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("mobile_no", {
                required: true,
              })}
            />
            <div
              htmlFor="floating_filled"
              className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
              <label htmlFor="" className="pl-2">
                Actual SPOC Mobile NO
              </label>
            </div>
          </div>
        </div>
        <div className="relative h-12 w-1/2">
          <div>
            <input
              type="text"
              id="floating_filled"
              className="block p-5 text-black w-full  border border-[#bab8b8] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("spoc_name", {
                required: true,
              })}
            />
            <div
              htmlFor="floating_filled"
              className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
              <label htmlFor="" className="pl-2">
                Actual Center SPOC Name
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-around mx-10  mb-5">
        <div className="relative h-12 w-1/2">
          <div>
            <input
              type="text"
              id="floating_filled"
              className="block p-5 text-black  w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("mobile_no", {
                required: true,
              })}
            />
            <div
              htmlFor="floating_filled"
              className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
              <label htmlFor="" className="pl-2">
                Actual SPOC Mobile NO
              </label>
            </div>
          </div>
        </div>
        <div className="relative h-12 w-1/2">
          <div>
            <input
              type="text"
              id="floating_filled"
              className="block p-5 text-black w-full  border border-[#bab8b8] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("spoc_name", {
                required: true,
              })}
            />
            <div
              htmlFor="floating_filled"
              className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
              <label htmlFor="" className="pl-2">
                Actual Center SPOC Name
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-around mx-10  mb-5">
        <div className="relative h-12 w-1/2">
          <div>
            <input
              type="text"
              id="floating_filled"
              className="block p-5 text-black  w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("mobile_no", {
                required: true,
              })}
            />
            <div
              htmlFor="floating_filled"
              className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
              <label htmlFor="" className="pl-2">
                Actual SPOC Mobile NO
              </label>
            </div>
          </div>
        </div>
        <div className="relative h-12 w-1/2">
          <div>
            <input
              type="text"
              id="floating_filled"
              className="block p-5 text-black w-full  border border-[#bab8b8] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("spoc_name", {
                required: true,
              })}
            />
            <div
              htmlFor="floating_filled"
              className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
              <label htmlFor="" className="pl-2">
                Actual Center SPOC Name
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-around mx-10  mb-5">
        <div className="relative h-12 w-1/2">
          <div>
            <input
              type="text"
              id="floating_filled"
              className="block p-5 text-black  w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("mobile_no", {
                required: true,
              })}
            />
            <div
              htmlFor="floating_filled"
              className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
              <label htmlFor="" className="pl-2">
                Actual SPOC Mobile NO
              </label>
            </div>
          </div>
        </div>
        <div className="relative h-12 w-1/2">
          <div>
            <input
              type="text"
              id="floating_filled"
              className="block p-5 text-black w-full  border border-[#bab8b8] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("spoc_name", {
                required: true,
              })}
            />
            <div
              htmlFor="floating_filled"
              className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
              <label htmlFor="" className="pl-2">
                Actual Center SPOC Name
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-10   mb-5">
        <div className="relative h-12 w-1/2">
          <div>
            <input
              type="text"
              id="floating_filled"
              className="block p-5 text-black  w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("mobile_no", {
                required: true,
              })}
            />
            <div
              htmlFor="floating_filled"
              className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
              <label htmlFor="" className="pl-2">
                Actual SPOC Mobile NO
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center m-5">
        <button
          type="submit"
          className="border rounded-3xl py-3 px-20  text-white bg-[#1C4481]"
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default Feedback2;
