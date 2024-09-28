import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Header from "../Assessor/Header";
import pcVivaExamFetch from "../../actions/PC-Viva/pcVivaExamFetch";
import pcVivaExamSubmit from "../../actions/PC-Viva/pcVivaExamSubmit";

const ExamChart = () => {
  const [pcVivaExamData, setPCVivaExamData] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [errors, setErrors] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const exam_id = location.state?.exam_id;
  const student_id = location.state?.student_id;
  console.log(student_id);
  console.log(exam_id);

  const getPCVivaExamDetails = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
        student_id: student_id,
        viva_by: "assessor",
      };
      console.log(data);
      const response = await pcVivaExamFetch(data);
      console.log(" Pc viva exam: ", response);
      if (response?.data?.code === 1000)
        setPCVivaExamData(response?.data?.question);
      setTotalQuestion(response?.data?.total_question);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const handlePCVivaExamSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
        student_id: student_id,
      };
      console.log(data);
      const response = await pcVivaExamSubmit(data);
      if (response.data.code === 1000) {
      }
      swal({
        title: "Thanks",
        icon: "success",
      });
      setTimeout(() => {
        navigate("/assessor-home");
      }, 1000);
    } catch (error) {
      console.log("Error while getting data :: ", error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getPCVivaExamDetails();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <span>Question Status</span>
      <div className=" flex flex-col justify-center items-center">
        <div>Total Question:{totalQuestion}</div>
        <div className="flex flex-col gap-4">
          <div className=" flex gap-5 justify-center items-center">
            <div className="flex gap-4">
              <div className="w-4 h-4 rounded-full border bg-green-700"></div>
              <span> Attempted</span>
            </div>
            <span>Question is coming here</span>
          </div>
          <div className="flex gap-5 justify-center items-center">
            <div className="flex gap-4 justify-center items-center">
              <div className="w-4 h-4 rounded-full border bg-gray-700-700"></div>
              <span>Not Attempted</span>
            </div>
            <span>Question is coming here</span>
          </div>
        </div>
        <div className="">
          <button
            className="px-7 py-2 border text-center"
            onClick={handlePCVivaExamSubmit}
          >
            Done
          </button>
          <button className="px-7 py-2 border text-center" onClick={goBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamChart;
