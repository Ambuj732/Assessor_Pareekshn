import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import vc from "../../assets/Assessor/vc.png";
import play from "../../assets/Assessor/play.svg";
import batchdetails from "../../assets/Assessor/batchdetails.png";
import descriptive from "../../assets/Assessor/descriptive.png";
import pc from "../../assets/Assessor/pc.png";
import viva from "../../assets/Assessor/viva.png";
import studentdetails from "../../assets/Assessor/studentdetails.png";
import camera from "../../assets/Assessor/camera.png";
import upload from "../../assets/Assessor/upload.png";
import manoj from "../../assets/Assessor/manoj.png";
import Header from "./Header";
import candidateExamStatusandDetailsList from "../../actions/AssessorDashboard/candidateExamStatusandDetailsList";
import { useNavigate } from "react-router";

function VCPractical() {
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
  useEffect(() => {
    getStudentDetailsData();
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <div className="min-h-screen p-4 bg-[#EDEDED] flex">
        <div className="bg-white p-4 w-full rounded-2xl">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <img
                src={arrowLeft}
                alt=""
                className="h-8"
                onClick={handleBack}
              />
              <span className="text-black font-semibold text-lg">
                VC/Practical
              </span>
            </div>
            <div className="w-32 bg-[#1C4481] flex items-center justify-center h-12 rounded-full text-white font-medium text-nowrap">
              <span>Refresh</span>
            </div>
          </div>
          <div className="flex  justify-between gap-7 mt-4 ">
            <div className="flex flex-col h-screen w-3/4 overflow-y-scroll no-scrollbar ">
              {studentData.length > 0 &&
                studentData.map((data) => (
                  <div className="bg-[#EDF2FF] h-70 rounded-2xl  my-4 p-4">
                    <div>
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
                        <Link to="/startpractical">
                          <div className="w-52 bg-[#0C49CA] flex  items-center justify-center gap-2 h-14 rounded-full text-white font-medium text-nowrap cursor-pointer">
                            <img src={play} className="w-10 h-10 -ml-9 " />
                            <span>Start Practical</span>
                          </div>
                        </Link>
                      </div>
                      <div className="border-2 border-[#D6DEF2] bg-white h-16 rounded-lg flex justify-between shadow-customShadow py-2 px-10 relative">
                        <div className="flex flex-col font-medium">
                          <span>
                            <span className="text-[#1C4481]">Code:</span>
                            {data.code}
                          </span>
                          <span>
                            <span className="text-[#1C4481]">Mobile:</span>{" "}
                            {data.mobile}
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
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className=" border-[1px] border-[#C1C1C1] w-1/4  bg-white rounded-3xl h-[400px]">
              <div className="flex flex-col items-center justify-start mt-10">
                <div className=" border-[1px] border-[#007DA5] rounded-2xl w-4/5 px-10 py-2 mb-10  bg-[#BEEAEA]">
                  <div className=" flex flex-col text-[#007DA5] ">
                    <span className="text-nowrap font-bold">
                      Marks Not Updated
                    </span>
                    <span className="text-3xl text-[#007DA5] font-bold">
                      05
                    </span>
                  </div>
                </div>
                <div className=" border-[1px] border-[#7BB441] rounded-2xl w-4/5 px-10 py-2 mb-10 bg-[#DCEBC3]">
                  <div className=" flex flex-col  text-[#42981A] ">
                    <span className="text-nowrap  font-bold">
                      Practical Not Done
                    </span>
                    <span className="text-[#38741c] font-bold text-3xl ">
                      05
                    </span>
                  </div>
                </div>
                <div className=" border-[1px] border-[#75553E] rounded-2xl w-4/5 px-10 py-2 mb-7 bg-[#FCE4D9]">
                  <div className=" flex flex-col  text-[#C8521C] ">
                    <span className="text-nowrap font-bold">
                      Practical&Marks Updated
                    </span>
                    <span className="text-[#C8521C] font-bold text-3xl ">
                      05
                    </span>
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

export default VCPractical;
