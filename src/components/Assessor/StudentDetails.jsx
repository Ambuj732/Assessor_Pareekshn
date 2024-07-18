import React, { useState, useEffect } from "react";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import vc from "../../assets/Assessor/vc.png";
import batchdetails from "../../assets/Assessor/batchdetails.png";
import descriptive from "../../assets/Assessor/descriptive.png";
import pc from "../../assets/Assessor/pc.png";
import viva from "../../assets/Assessor/viva.png";
import red from "../../assets/Assessor/red.svg";
import green from "../../assets/Assessor/green.svg";
import yellow from "../../assets/Assessor/yellow.svg";
import blue from "../../assets/Assessor/blue.svg";
import grey from "../../assets/Assessor/grey.svg";
import lblue from "../../assets/Assessor/lblue.svg";
import studentdetails from "../../assets/Assessor/studentdetails.png";
import camera from "../../assets/Assessor/camera.png";
import upload from "../../assets/Assessor/upload.png";
import manoj from "../../assets/Assessor/manoj.png";
import Header from "./Header";
import candidateExamStatusandDetailsList from "../../actions/AssessorDashboard/candidateExamStatusandDetailsList";
import { useNavigate } from "react-router";

function VivaPractical() {
  const [studentData, setStudentData] = useState([]);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const getStudentDetailsData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user,
        assessor_id: 160,
        exam_id: 8558,
      };
      const response = await candidateExamStatusandDetailsList(data);
      console.log(" Candidate Exam Status and Details List", response);
      if (response?.data?.code === 1000)
        setStudentData(response?.data?.students);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    getStudentDetailsData();
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <div className="min-h-screen p-4 bg-[#EDEDED] flex">
        <div className="bg-white p-4 w-full rounded-2xl">
          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <img
                src={arrowLeft}
                alt=""
                className="w-10 h-10"
                onClick={handleBack}
              />
              <span className="text-black font-semibold text-lg">
                Student Details
              </span>
            </div>
            <div className="flex">
              {/* <img src={}/> */}
              <button
                className="border rounded-3xl bg-[#1C4481] px-10 py-2 mr-7 text-white"
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
          </div>
          <div className="flex  justify-between gap-7 mt-1 ">
            <div className="flex flex-col h-screen w-3/4 overflow-y-scroll printable  ">
              {studentData.length > 0 &&
                studentData.map((data) => (
                  <div
                    key={data.student_id}
                    className="bg-[#EDF2FF] h-56 w-full rounded-2xl my-4 p-4 "
                  >
                    <div className="flex items-center justify-between pr-8 mb-3">
                      <div className="flex items-center gap-6">
                        <img src={data.photo} alt="" className="w-15 h-20" />
                        <div className="flex flex-col">
                          <span className="text-[#1C4481] font-medium text-xl">
                            {data.name}
                          </span>
                          <span className="text-black font-custom font-medium text-xl">
                            {data.email}
                          </span>
                          <span>Candidate ID: {data.student_id}</span>
                        </div>
                      </div>
                      <div
                        className={` cursor-pointer w-32 flex items-center justify-center h-10 rounded-lg text-white font-medium ${
                          data.login_status === 1
                            ? "bg-[#4CAF50]"
                            : "bg-[#CA4D4D]"
                        }`}
                      >
                        <span>
                          {data.login_status === 1 ? "Online" : "Offline"}
                        </span>
                      </div>
                    </div>
                    <div className="border-[1px] border-[#D6DEF2] bg-white h-16 rounded-lg flex justify-between shadow-customShadow py-2 px-10 relative">
                      <div className="flex flex-col font-medium">
                        <span>
                          <span className="text-[#1C4481]">Code:</span>{" "}
                          {data.code}
                        </span>
                        <span>
                          <span className="text-[#1C4481]">OTP:</span>{" "}
                          {data.otp}
                        </span>
                      </div>
                      <div className="relative">
                        <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gray-300"></div>
                      </div>
                      <div className="flex flex-col font-medium">
                        <span>
                          <span className="text-[#1C4481]">Batch:</span>{" "}
                          {data.batch_name}
                        </span>
                        <span>
                          <span className="text-[#1C4481]">Exam:</span>{" "}
                          {data.exam_name}
                        </span>
                      </div>
                      <div className="relative">
                        <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gray-300"></div>
                      </div>
                      <div className="flex flex-col font-medium">
                        <span>
                          <span className="text-[#1C4481]">Aadhar:</span>{" "}
                          {data.aadhar}
                        </span>
                        <span>
                          <span className="text-[#1C4481]">Mobile:</span>{" "}
                          {data.mobile}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-4 border w-1/3  bg-[#EDF2FF] rounded-2xl h-[500px]">
              <div className="mt-2 mx-4">
                <span className=" font-custom text-[#000000] font-bold">
                  Status
                </span>
              </div>
              <div className=" border rounded-xl w-[420px]  bg-white h-[100px] ml-2 mt-7">
                <div className="flex fle-col justify-between mt-1 mx-4">
                  <div className="flex gap-2 w-1/3 items-center">
                    <img src={red} />
                    <span>offline</span>
                  </div>
                  <div className="flex gap-2 w-1/3 items-center">
                    <img src={green} />
                    <span>Online</span>
                  </div>
                  <div className="flex gap-2 w-1/3 items-center">
                    <img src={yellow} />
                    <span>Viva/Practical Done</span>
                  </div>
                </div>
                <div className="flex fle-col justify-between mt-4 mx-4 text-nowrap">
                  <div className="flex gap-2 w-1/3">
                    <img src={grey} />
                    <span>Theory Done</span>
                  </div>
                  <div className="flex gap-2 w-1/3">
                    <img src={blue} />
                    <span>Both Done</span>
                  </div>
                  <div className="flex gap-2 w-1/3">
                    <img src={lblue} />
                    <span>Not Attempted</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  mt-10 mx-12">
                <div className="flex gap-14">
                  <div className="border-[1px] border-[#284655] flex justify-center items-center rounded-lg bg-[#DAECF5] w-[131px] h-[103px]">
                    <div className="flex flex-col">
                      <span className="text-[#284655] font-bold">
                        Theory Status
                      </span>
                      <span className="text-[#284655] font-bold">03</span>
                    </div>
                  </div>
                  <div className="border-[1px] border-[#B95F69] flex justify-center items-center  rounded-lg bg-[#FFE0E4] w-[131px]  h-[103px]">
                    <div className="flex flex-col mx-4 ">
                      <span className="text-[#B95F69] font-bold">
                        Viva/Practical Status
                      </span>
                      <span className="text-[#B95F69] font-bold">05</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-14 mt-5">
                  <div className="border-[1px] border-[#506E00] rounded-lg flex justify-center items-center  bg-[#D1DBB6] w-[131px] h-[103px]">
                    <div className="flex flex-col justify-center items-center">
                      <span className="text-[#506E00] font-bold">
                        Both Status
                      </span>
                      <span className="text-[#506E00] font-bold">03</span>
                    </div>
                  </div>
                  <div className="border-[1px] border-[#A55625] flex justify-center items-center  rounded-lg bg-[#FAEDCC] w-[131px]  h-[103px]">
                    <div className="flex flex-col mx-4">
                      <span className="text-[#6C561C] font-bold">
                        Viva/Practical Status
                      </span>
                      <span className="text-[#6C561C] font-bold">05</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VivaPractical;
