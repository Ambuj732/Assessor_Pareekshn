import React, { useState, useEffect } from "react";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import vc from "../../assets/Assessor/vc.png";
import batchdetails from "../../assets/Assessor/batchdetails.png";
import descriptive from "../../assets/Assessor/descriptive.png";
import pc from "../../assets/Assessor/pc.png";
import viva from "../../assets/Assessor/viva.png";
import studentdetails from "../../assets/Assessor/studentdetails.png";
import camera from "../../assets/Assessor/camera.png";
import upload from "../../assets/Assessor/upload.png";
import manoj from "../../assets/Assessor/manoj.png";
import Header from "./Header";
import vivaStudentList from "../../actions/AssessorDashboard/vivaStudentList";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
function VivaPractical() {
  const [vivaStudentLists, setVivaStudentLists] = useState([]);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const getStudentVivaListData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user,
        assessor_id: 160,
        exam_id: 8558,
      };
      const response = await vivaStudentList(data);
      console.log(" Viva student list", response);
      if (response?.data?.code === 1000)
        setVivaStudentLists(response?.data?.students);
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
    getStudentVivaListData();
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <div className="min-h-screen p-4 bg-[#EDEDED] flex">
        <div className="bg-white p-4 w-full rounded-2xl">
          <div className="flex  gap-2">
            <img src={arrowLeft} alt="" className="h-8" onClick={handleBack} />
            <span className="text-black font-semibold text-lg">
              Viva/Practical
            </span>
          </div>
          {vivaStudentLists.length > 0 &&
            vivaStudentLists.map((data) => (
              <>
                <div className="bg-[#EDF2FF] h-60 w-full rounded-2xl my-4 p-4 mb-8">
                  <div className="flex items-center justify-between pr-8 mb-3">
                    <div className="flex items-center gap-6">
                      <img src={data.photo} className="w-12 h-16" alt="" />
                      <div className="flex flex-col">
                        <span className="text-[#1C4481] font-medium text-xl">
                          {data.name}
                        </span>
                        <span>Candidate ID:{data.studentid}</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-40 bg-[#0C49CA] flex items-center justify-center h-12 rounded-full text-white font-medium cursor-pointer">
                        <span>Marks Submission</span>
                      </div>
                      <Link to="/insturctionpage">
                        <div className="w-32 bg-[#ED6A20] flex items-center justify-center h-12 rounded-full text-white font-medium">
                          <span>Start</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="bg-white h-16 rounded-lg flex justify-between shadow-customShadow py-2 px-10 relative">
                    <div className="flex flex-col font-medium">
                      <span>
                        <span className="text-[#1C4481]">Code:</span>{" "}
                        {data.code}
                      </span>
                      <span>
                        <span className="text-[#1C4481]">Mobile:</span>{" "}
                        {data.phoneno}
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
                        <span className="text-[#1C4481]">Email ID:</span>{" "}
                        {data.email}
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
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default VivaPractical;
