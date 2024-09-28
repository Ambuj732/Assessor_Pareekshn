import { React, useState, useEffect } from "react";
import Header from "../../components/Assessor/Header";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import arrowright from "../../assets/Assessor/arrowright.png";
import { useNavigate } from "react-router";
import examList from "../../actions/AssessorDashboard/activeExamList";

function ExamList() {
  const [examListData, setExamListData] = useState([]);
  const navigate = useNavigate();

  const getExamListData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log("user Data:", user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
      };
      console.log(data);
      const response = await examList(data);
      console.log(response);
      if (response?.data?.code === 1000) {
        setExamListData(response?.data?.exams);
      }
    } catch (error) {
      console.log("Error while fetching exam list:", error);
    }
  };

  const goToPage = () => {
    navigate(-1);
  };

  const goToPhotoUploadPage = (exam) => {
    console.log(exam);

    const active_exam = {
      exam_id: exam.id,
      viva_assessor: exam.viva_assessor,
      viva_practical: exam.viva_practical,
      viva_pc: exam.viva_pc,
    };
    localStorage.setItem("activeExam_PS", JSON.stringify(active_exam));
    navigate("/photo-upload", { state: { exam_id: exam.id } });
  };

  useEffect(() => {
    getExamListData();
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <div className="bg-[#EDEDED] p-6 min-h-screen">
        <div className="flex items-center gap-4">
          <img
            src={arrowLeft}
            alt=""
            className="h-6 cursor-pointer"
            onClick={goToPage}
          />
          <span className="text-xl font-semibold">Exam List</span>
        </div>
        <div className="bg-white my-3 rounded-2xl py-4 flex flex-col items-center gap-6">
          {examListData &&
            examListData.map((data) => (
              <div
                className={`bg-[#EDEDED] w-[calc(100%-20px)] flex items-center px-8 h-16 rounded-md justify-between cursor-pointer`}
              >
                <span className="font-medium text-lg">{data.name}</span>
                <div
                  className="bg-[#1C4481] h-10 flex w-44 rounded-3xl justify-between items-center px-3"
                  onClick={() => goToPhotoUploadPage(data)}
                >
                  <span className="text-white text-lg">Exam Details</span>
                  <img src={arrowright} alt="" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ExamList;
