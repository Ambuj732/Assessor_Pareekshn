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
import { useNavigate, useLocation } from "react-router";
import { Oval } from "react-loader-spinner";
import descriptiveStudentList from "../../actions/AssessorDashboard/descriptiveStudentList";

function VivaPractical() {
  const [descriptiveStudentLists, setDescriptiveStudentLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const location = useLocation();
  const exam_id = location.state?.exam_id;
  console.log(exam_id);

  const navigate = useNavigate();

  const getDescriptiveStudentListData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
      };
      console.log(data);
      const response = await descriptiveStudentList(data);
      console.log(" Descriptive student list", response);
      if (response?.data?.code === 1000)
        setDescriptiveStudentLists(response?.data?.students);
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const goToDescriptiveAnswer = (student_id) => {
    console.log(student_id);
    navigate("/descriptive-answer", {
      state: { student_id, exam_id: exam_id },
    });
  };

  useEffect(() => {
    getDescriptiveStudentListData();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <Oval
            height={80}
            width={80}
            color="#1C4481"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#EAF2FE"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="min-h-screen p-4 bg-[#EDEDED] flex">
        <div className="bg-white p-4 w-full rounded-2xl">
          <div className="flex items-center gap-2">
            <img
              src={arrowLeft}
              alt=""
              className="h-7 cursor-pointer"
              onClick={handleBack}
            />
            <span className="text-black font-semibold text-lg">
              Descriptive
            </span>
          </div>
          {descriptiveStudentLists.length > 0 &&
            descriptiveStudentLists.map((data) => (
              <>
                <div className="bg-[#EDF2FF] h-56 w-full rounded-2xl my-4 p-4 mb-8">
                  <div className="flex items-center justify-between pr-8 mb-3">
                    <div className="flex items-center gap-6">
                      <img src={data.photo} className="w-12 h-12" alt="" />
                      <div className="flex flex-col">
                        <span className="text-[#1C4481] font-medium text-xl">
                          {data.name}
                        </span>
                        <span>Candidate ID:{data.studentid}</span>
                      </div>
                    </div>
                    <div
                      className="w-52 py-2 bg-[#0C49CA] flex items-center justify-center h-16 rounded-full text-white font-medium cursor-pointer"
                      onClick={() => goToDescriptiveAnswer(data.student_id)}
                    >
                      <span>Marks Submission</span>
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
