import React, { useState, useEffect } from "react";
import play from "../../assets/Assessor/play.png";
import recordAudio from "../../assets/Assessor/recordAudio.png";
import recordVideo from "../../assets/Assessor/recordVideo.png";
import Record from "../Exam/Record";
import Header from "../Assessor/Header";
import arrow from "/arrow.png";
import previous from "/previous.png";
import next from "/next.png";
import indicator from "/indicator.png";
import { useNavigate, useLocation } from "react-router";
import vivaExamFetch from "../../actions/viva/vivaExamFetch";
import vivaQuestionIndex from "../../actions/viva/vivaQuestionIndex";
import vivaUploadAnswer from "../../actions/viva/vivaUploadAnswer";
import vivaExamSubmit from "../../actions/viva/vivaExamSubmit";
import swal from "sweetalert";

const VivaExam = () => {
  const [vivaExamQuestion, setVivaExamQuestion] = useState([]);
  const [error, setErrors] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [marks, setMarks] = useState("");
  const [remark, setRemark] = useState("");
  const [file, setFile] = useState(null);
  const [type, setType] = useState(null);

  const location = useLocation();
  const exam_id = location.state?.exam_id;
  const student_id = location.state?.student_id;
  console.log(exam_id);
  console.log(student_id);

  const getVivaExamQuestion = async () => {
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
      const response = await vivaExamFetch(data);
      console.log(response);
      if (response.data.code === 1000) {
        setVivaExamQuestion(response.data.exams);
      }
    } catch (error) {
      console.log("Error while getting data :: ", error);
    }
  };

  const handleQuestionIndicatorClick = async (index) => {
    if (marks) {
      await vivaAnswerUploadHandler();
      present;
    }
    setCurrentIndex(index);
    await handleVivaQuestionByIndex(index);

    if (!visitedQuestions.includes(index)) {
      setVisitedQuestions([...visitedQuestions, index]);
    }
  };

  const handleNextQuestion = async () => {
    if (marks) {
      await vivaAnswerUploadHandler();
    }

    if (currentIndex === vivaExamQuestion.totalq - 1) {
      await handleVivaExamSubmit();
      swal({
        title: "Thanks",
        icon: "success",
      });
      return;
    }

    if (currentIndex < vivaExamQuestion.totalq - 1) {
      const nextIndex = currentIndex + 1;
      await handleVivaQuestionByIndex(nextIndex);
      setCurrentIndex(nextIndex);
      console.log(nextIndex);

      if (!visitedQuestions.includes(nextIndex)) {
        setVisitedQuestions([...visitedQuestions, nextIndex]);
      }
    }
  };

  const handlePreviousQuestion = async () => {
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      console.log(previousIndex);
      await handleVivaQuestionByIndex(previousIndex);
      setCurrentIndex(previousIndex);
      if (!visitedQuestions.includes(previousIndex)) {
        setVisitedQuestions([...visitedQuestions, previousIndex]);
      }
    }
  };

  const handleVivaQuestionByIndex = async (index) => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
        student_id: student_id,
        index: index,
        viva_by: "assessor",
      };
      console.log(data);
      const response = await vivaQuestionIndex(data);
      if (response.data.code === 1000) {
        // Update state with the new question
        setVivaExamQuestion((prevQuestions) => ({
          ...prevQuestions,
          question: response.data.question,
        }));
      }
    } catch (error) {
      console.log("Error while getting data :: ", error);
    }
  };

  const vivaAnswerUploadHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log("user :", user);
      const maxMarks = vivaExamQuestion?.question?.max_marks;
      if (marks > maxMarks) {
        swal({
          icon: "error",
          title: "Invalid Marks",
          text: `Marks cannot exceed ${maxMarks}. Please enter valid marks.`,
        });
        return;
      }
      const question_id = vivaExamQuestion?.question?.question_id;
      console.log(question_id);
      const data = {
        file: file,
        sub_user_id: 1,
        user_id: 1,
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
        student_id: student_id,
        index: currentIndex,
        marks: marks,
        remark: remark,
        answer_type: type,
        question_id: question_id,
      };
      console.log(data);
      const response = await vivaUploadAnswer(data);
      console.log(response);
      if (!submittedQuestions.includes(currentIndex)) {
        setSubmittedQuestions([...submittedQuestions, currentIndex]);
      }
    } catch (error) {
      console.log("Error while getting data :: ", error);
    }
  };

  const onRecordingComplete = (base64Data, type) => {
    setFile(base64Data);
    setType(type);
  };

  const renderQuestionIndicators = () => {
    const indicators = [];
    for (let i = 0; i < vivaExamQuestion.totalq; i++) {
      let bgColor = "#ffffff";
      if (submittedQuestions.includes(i)) {
        bgColor = "#e9df55";
      } else if (i === currentIndex) {
        bgColor = "#e85ad9";
      } else if (visitedQuestions.includes(i)) {
        bgColor = "#f405dc";
      }

      indicators.push(
        <div className="flex">
          <div
            key={i}
            className="h-10 w-10 flex items-center justify-center  font-semibold text-2xl cursor-pointer border-[2px] rounded"
            style={{ backgroundColor: bgColor }}
            onClick={() => handleQuestionIndicatorClick(i)}
          >
            <span>{i + 1}</span>
          </div>
        </div>
      );
    }
    return indicators;
  };

  const handleVivaExamSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
        student_id: student_id,
      };
      console.log(data);
      const response = await vivaExamSubmit(data);
      if (response.data.code === 1000) {
      }
    } catch (error) {
      console.log("Error while getting data :: ", error);
    }
  };

  useEffect(() => {
    getVivaExamQuestion();
  }, []);

  return (
    <div className="min-h-screen font-custom">
      <Header />
      <div className="flex px-12 py-4 justify-between">
        <span className="text-[#0C49CA] text-2xl font-medium font-custom my-2">
          Viva
        </span>
      </div>

      {/* Main */}
      <div className="min-h-screen bg-[#F3F7FF] flex flex-col mx-8 px-8 gap-4 border rounded-2xl">
        <div className="bg-white h-16 mt-4 rounded-2xl flex items-center px-4 justify-between">
          <div className="flex items-center w-8/12 justify-between">
            {renderQuestionIndicators()}
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1 -mt-6">
              <div className="w-3 h-3 border rounded-full bg-[#f405dc]"></div>
              <span className="font-semibold">Visited</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 border rounded-full bg-[#e9df55]"></div>
                <span className="font-semibold">Submitted</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 border rounded-full bg-[#858080]"></div>
                <span className="font-semibold">Not visited</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full gap-20">
          <div className="w-full">
            <div className="bg-[#DDEAFF] rounded-lg w-full">
              <div className="py-3 flex justify-between w-full px-8">
                <div className="flex items-center ">
                  <span className="text-[#1C4481] font-semibold">
                    {currentIndex + 1}/{vivaExamQuestion.totalq}- Level (MT Nos-
                    {vivaExamQuestion?.question?.diff_level})
                  </span>
                </div>
                <div className="flex gap-4">
                  <div className="flex border-[1px] border-blue-600 py-2 px-8 bg-white rounded">
                    <span className="font-bold text-blue-600 text-nowrap">
                      {" "}
                      Max Marks-{vivaExamQuestion?.question?.max_marks}
                    </span>
                  </div>
                  <div className="flex justify-center items-center bg-yellow-300 rounded-full w-auto px-4">
                    <span className="font-semibold text-nowrap">
                      {vivaExamQuestion?.question?.question_inst}
                    </span>
                  </div>
                </div>
              </div>
              <hr class="border-t-[1px] border-[#bcbcbc]" />
              <div className="flex px-8 justify-between flex-col py-4">
                <span className="text-black font-bold w-full ">
                  Q- {vivaExamQuestion?.question?.question}
                </span>
                <Record
                  // vivaAnswerUploadHandler={vivaAnswerUploadHandler}
                  onRecordingComplete={onRecordingComplete}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-center gap-72 m-8">
              <div className="flex items-center justify-between w-52">
                <div
                  className="border border-black rounded-full h-14 w-32 gap-3 flex items-center justify-center cursor-pointer"
                  onClick={handlePreviousQuestion}
                >
                  <span>previous</span>
                  <img src={previous} alt="" className="h-6" />
                </div>
                <div
                  className="border border-black rounded-full h-14 w-32 gap-4 flex items-center justify-center cursor-pointer"
                  onClick={handleNextQuestion}
                >
                  {" "}
                  <img src={next} alt="" className="h-6" />
                  <span>next</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[500px] mt-6 bg-[#1C4481] h-52 border rounded-xl">
            <div className=" mx-4 rounded-xl p-6 flex flex-col gap-4 justify-center items-center">
              <span className="font-bold text-white text-lg">Enter marks</span>
              <div className="border rounded-full">
                <input
                  type="number"
                  name="mark"
                  placeholder={`0-${vivaExamQuestion?.question?.max_marks}`}
                  className="w-full rounded-full px-4 py-2 text-center"
                  onChange={(e) => setMarks(e.target.value)}
                />
              </div>
              <div className="border rounded-full">
                <input
                  type="text"
                  name="mark"
                  placeholder="Remark"
                  className="w-full rounded-full px-4 py-2 text-center"
                  onChange={(e) => setRemark(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VivaExam;
