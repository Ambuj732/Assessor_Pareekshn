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
import Header from "../Assessor/Header";
import vivaStudentListMarking from "../../actions/viva/vivaStudentListMarking";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import practicalStudentList from "../../actions/PracticalViva/practicalStudentList";

function PracticalPageViva() {
  const [practicalStudentLists, setPracticalStudentLists] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const exam_id = location.state?.exam_id;
  console.log(exam_id);
  const navigate = useNavigate();
  const activeExam_pc = JSON.parse(localStorage.getItem("activeExam_PS"));
  console.log(activeExam_pc);

  const getPracticalStudentList = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      const activeExam_pc = JSON.parse(localStorage.getItem("activeExam_PS"));
      console.log("activeExam:", activeExam_pc);
      console.log("User :: ", user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
      };
      console.log(data);
      const response = await practicalStudentList(data);
      console.log(" Practical student list", response);
      if (response?.data?.code === 1000)
        setPracticalStudentLists(response?.data?.students);
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

  const goToVivaMarkSubmissionPage = (student_id) => {
    console.log(student_id);
    navigate("/viva-mark-submission", {
      state: { exam_id: exam_id, student_id },
    });
  };

  const handleStartClick = (data) => {
    const st_id = data.student_id;
    console.log(st_id);
    if (data.is_vivadone === 0) {
      swal({
        title:
          "The student has not completed their theory exam. Viva will be activated after the theory completed.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      navigate("/practical-insturction-page", {
        state: { exam_id: exam_id, student_id: st_id },
      });
    }
  };

  useEffect(() => {
    getPracticalStudentList();
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
              className="h-6 cursor-pointer"
              onClick={handleBack}
            />
            <span className="text-black font-semibold text-lg">Practical</span>
          </div>
          {practicalStudentLists.length > 0 &&
            activeExam_pc.viva_practical === 1 &&
            practicalStudentLists.map((data) => (
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
                      {activeExam_pc.viva_practical === 0 && (
                        <div
                          className="w-40 bg-[#0C49CA] flex items-center justify-center h-12 rounded-full text-white font-medium cursor-pointer"
                          onClick={() => {
                            goToVivaMarkSubmissionPage(data.student_id);
                          }}
                        >
                          <span>Marks Submission</span>
                        </div>
                      )}
                      <div
                        className="w-32 bg-[#ED6A20] flex items-center justify-center h-12 rounded-full text-white font-medium cursor-pointer"
                        onClick={() => handleStartClick(data)}
                      >
                        <span>Start</span>
                      </div>
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

export default PracticalPageViva;
