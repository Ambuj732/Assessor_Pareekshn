import React, { useState, useEffect } from "react";
import logo from "/logo.png";
import avatar from "/avatar.png";
import questionMark from "/questionMark.png";
import logout from "/logout.png";
import arrowDown from "/arrowDown.png";
import arrow from "/arrow.png";
import indicator from "/indicator.png";
import mandatory from "/mandatory.png";
import volume from "/volume.png";
import reset from "/reset1.png";
import previous from "/previous.png";
import play from "/play.png";
import next from "/next.png";
import lock from "/lock.png";
import timer from "/timer.png";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import mic from "../../assets/Assessor/mic.png";
import Header from "../Assessor/Header";
import { useNavigate, useLocation } from "react-router";
import pcVivaExamFetch from "../../actions/PC-Viva/pcVivaExamFetch";
import pcVivaSubmitAnswer from "../../actions/PC-Viva/pcVivaSubmitAnswer";
import pcVivaQuestionFetch from "../../actions/PC-Viva/pcVivaQuestionFetch";
import pcVivaExamSubmit from "../../actions/PC-Viva/pcVivaExamSubmit";

function PCVivaExam() {
  const [pcVivaExamData, setPCVivaExamData] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [mandatory, setMandatory] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [visitedQuestions, setVisitedQuestions] = useState([1]);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const exam_id = location.state?.exam_id;
  const student_id = location.state?.student_id;
  console.log(student_id);
  console.log(exam_id);
  const [errors, setErrors] = useState(null);

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
      setMandatory(response?.data?.mandatory);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const handleCheckboxChange = (subQuestion, isChecked) => {
    const updatedAnswers = [...answers];
    const existingAnswerIndex = updatedAnswers.findIndex(
      (answer) => answer.sub_id_qb_question === subQuestion.sub_id_qb_question
    );

    if (existingAnswerIndex > -1) {
      updatedAnswers[existingAnswerIndex].is_checked = isChecked ? 1 : 0;
    } else {
      if (isChecked) {
        updatedAnswers.push({
          sub_id_qb_iq: subQuestion.sub_id_qb_question,
          marks: subQuestion.sub_question_mark,
          sub_id_chapter: subQuestion.sub_id_chapter,
          is_checked: 1,
        });
      }
    }

    const finalAnswers = updatedAnswers.filter(
      (answer) => answer.is_checked === 1
    );

    setAnswers(finalAnswers);
  };

  const handleNextQuestion = async () => {
    const isAnyChecked = answers.some((answer) => answer.is_checked === 1);
    if (isAnyChecked) {
      await pcVivaAnswerUploadHandler();
    }

    if (currentIndex < totalQuestion) {
      const nextIndex = currentIndex + 1;

      setAnswers([]);

      await handlePCVivaQuestionByIndex(nextIndex);

      setCurrentIndex(nextIndex);
      setVisitedQuestions((prev) => [...prev, nextIndex]);
    } else {
      navigate("/pc-exam-chart", { state: { exam_id, student_id } });
      // await handlePCVivaExamSubmit();
      //   swal({
      //     title: "Thanks",
      //     icon: "success",
      //   });
    }
  };

  const handlePreviousQuestion = async () => {
    if (currentIndex > 1) {
      const previousIndex = currentIndex - 1;
      setAnswers([]);
      await handlePCVivaQuestionByIndex(previousIndex);
      setCurrentIndex(previousIndex);
      if (!visitedQuestions.includes(previousIndex)) {
        setVisitedQuestions((prev) => [...prev, previousIndex]);
      }
    }
  };

  const question_id = pcVivaExamData[0]?.id_qb_question;
  console.log(question_id);

  const pcVivaAnswerUploadHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log("user :", user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
        student_id: student_id,
        index: currentIndex,
        answers: JSON.stringify(answers),
        checked: 1,
        question_id: question_id,
      };
      console.log(data);
      const response = await pcVivaSubmitAnswer(data);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
    }
  };

  const handlePCVivaQuestionByIndex = async (index) => {
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
      const response = await pcVivaQuestionFetch(data);
      console.log(response);
      if (response?.data?.code === 1000) {
        setPCVivaExamData(response?.data?.question);
      }
    } catch (error) {
      console.log("Error while getting data :: ", error);
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
    } catch (error) {
      console.log("Error while getting data :: ", error);
    }
  };

  const renderQuestionIndicators = () => {
    const indicators = [];
    for (let i = 1; i <= totalQuestion; i++) {
      let bgColor = "#ffffff";
      if (visitedQuestions.includes(i)) {
        bgColor = i === currentIndex ? "#e85ad9" : "#f405dc";
      }

      indicators.push(
        <div className="flex" key={i}>
          <div
            className="h-10 w-10 flex items-center justify-center  font-semibold text-2xl cursor-pointer border-[2px] rounded"
            style={{ backgroundColor: bgColor }}
            onClick={() => handlePCVivaQuestionByIndex(i)}
          >
            <span>{i}</span>
          </div>
        </div>
      );
    }
    return indicators;
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getPCVivaExamDetails();
  }, []);

  return (
    <div>
      <Header />
      <div>
        <div className="flex items-center gap-2 mt-4 mb-4 px-8">
          <img
            src={arrowLeft}
            alt=""
            className="h-6 cursor-pointer"
            onClick={handleBack}
          />
          <span className="text-black font-semibold text-lg">Pc-Viva</span>
        </div>
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
          <div>
            {pcVivaExamData &&
              pcVivaExamData.map((data) => (
                <div className="bg-[#DDEAFF] rounded-lg w-full">
                  <div className="py-3 flex justify-between w-full px-8">
                    <div className="flex items-center ">
                      <span className="text-[#1C4481] font-semibold">
                        {currentIndex + 1}/{totalQuestion}- Level (MT {data.nos}
                        -3)
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex justify-center items-center border border-[#1C4481] py-1 px-4 rounded-md bg-white font-medium">
                        <span className="font-bold text-[#1C4481]">
                          mandatory-{mandatory}
                        </span>
                      </div>
                      <span className="bg-yellow-300 border rounded-3xl px-4 py-1">
                        {data?.question_instruction}
                      </span>
                    </div>
                  </div>
                  <hr class="border-t-[1px] border-[#bcbcbc]" />

                  <div className="flex px-8 justify-between flex-col py-4">
                    <span className=" font-bold w-full ">
                      Q-
                      {data?.question}
                    </span>
                  </div>
                  {data?.sub_questions?.map((subQuestion, subIndex) => (
                    <div key={subIndex} className="mt-4 px-8 py-4">
                      <div className="flex gap-4 items-center">
                        <input
                          type="checkbox"
                          name="sub_question"
                          className="w-7 h-7 border border-gray-700"
                          checked={answers.some(
                            (answer) =>
                              answer.sub_id_qb_iq ===
                              subQuestion.sub_id_qb_question
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(subQuestion, e.target.checked)
                          }
                        />
                        <span className="font-semibold text-lg">
                          {subQuestion.sub_question}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>

          <div className="w-3/4 flex items-center justify-center">
            <div className="flex items-center justify-between w-40">
              <div
                className="border border-black rounded-full h-14 w-14 flex items-center justify-center"
                onClick={handlePreviousQuestion}
              >
                <img src={previous} alt="" className="h-6" />
              </div>
              <div
                className="border border-black rounded-full h-14 w-14 flex items-center justify-center"
                onClick={handleNextQuestion}
              >
                <img src={next} alt="" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PCVivaExam;
