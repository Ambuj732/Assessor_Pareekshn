import React from "react";
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
import translate from "../../assets/LoginScreen/translate.png";
import angleDown from "../../assets/LoginScreen/angleDown.png";
import indicatorExam from "../../assets/LoginScreen/indicatorExam.png";
import questionIndicator from "../../assets/LoginScreen/questionIndicator.png";
import info from "../../assets/LoginScreen/Info.png";
import speak from "../../assets/LoginScreen/speak.png";
import livevideo from "../../assets/LoginScreen/livevideo.png";
import image from "../../assets/LoginScreen/image.png";

import { useState, useEffect } from "react";
import TextOptions from "../../components/Exams/TextOptions";
import ImageOptions from "../../components/Exams/ImageOptions";
import QuestionSection from "../../components/Exams/QuestionSection";
import Descriptive from "../../components/Exams/Descriptive";
import Record from "../../components/Exams/Record";
import { Outlet } from "react-router-dom";
import getStudentProfile from "../../actions/Dashboard/getStudentProfile";
import vivaQuestionIndex from "../../actions/Viva/vivaQuestionIndex";

function Question() {
  const [time, setTime] = useState(600);
  const [studentProfile, setStudentProfile] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const getStudentData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user.usercode,
        id_self_student: user.id_self_student,
      };
      const response = await getStudentProfile(data);
      console.log("Profile Percentage response:", response);
      if (response?.data?.code === 1000)
        setStudentProfile(response?.data?.profile);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getQuestions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {
        usercode: user.usercode,
        id_self_student: user.id_self_student,
        exam_id: 8582,
        student_id: 211158,
        req_by: "web",
      };
      const response = await vivaQuestionIndex(data);
      if (response?.data?.code === 1000) setQuestions(response?.data?.question);
    } catch (error) {
      console.log("Error while getting data :: ", error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else {
        setTime(600); // restart the timer after 10 minutes
      }
    }, 1000); // update every second

    getStudentData();
    getQuestions();
    return () => clearInterval(timer); // cleanup the timer on component unmount
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <>
      <div className="min-h-screen font-custom">
        {/* Header */}
        <div className="h-20 bg-[#305187] px-8 flex items-center justify-between">
          <img src={logo} alt="" className="h-4/5 my-auto" />
          <span className="font-medium text-white text-xl">Online Exam</span>
          <div className="flex  gap-6">
            <div className="flex items-center justify-around py-1 gap-2 bg-[#FEFEFF1A] rounded-full h-14 w-[200px] px-2 pr-8">
              <img
                src={studentProfile.profile_pic}
                alt=""
                className="h-10 rounded-full"
              />
              <div className="flex flex-col font-medium text-white">
                <span className="w-[150px]">{studentProfile.student_name}</span>
                <span>{studentProfile.id}</span>
              </div>
            </div>
            <div className="flex gap-3 h-14">
              <img src={logout} alt="" />
              <img src={questionMark} alt="" />
            </div>
          </div>
        </div>
        {/* Main */}
        <div className="flex flex-col">
          <div className="flex justify-between p-4 px-8 items-center">
            <span className="text-2xl font-medium text-[#1C4481]">Theory</span>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col bg-[#DDEAFF] px-4 rounded-md py-1">
                <span className="font-medium text-sm">Default Language</span>
                <span className="font-bold">{questions.lang}</span>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex flex-col text-sm font-medium">
                  <span>You can translate question</span>
                  <span>into other languages</span>
                </div>
                <img src={translate} alt="" />
              </div>
              <div
                className="border-2 border-[#1C4481] text-[#1C4481] h-10 w-28 flex items-center justify-between px-2 rounded-md
						"
              >
                <span>English</span>
                <img src={angleDown} alt="" />
              </div>
            </div>
          </div>
          <div className="bg-white h-14 border ml-8 mt-4 rounded-l-2xl flex items-center px-4 justify-between">
            <div className="flex items-center w-1/3 justify-between">
              <img src={questionIndicator} alt="" className="h-5 " />
              {questions.map((q, index) => (
                <div
                  key={index}
                  className={`h-8 w-8 flex items-center justify-center rounded-lg font-semibold text-lg ${
                    currentQuestionIndex === index
                      ? "bg-[#A6E097] text-[#14540E]"
                      : "border-2 border-[#14540E] text-[#14540E]"
                  }`}
                >
                  {index + 1}
                </div>
              ))}
              <img
                src={questionIndicator}
                alt=""
                className="scale-x-[-1] h-5"
              />
            </div>
            <span className="font-medium text-xl">
              Time Remaining -{" "}
              <span className="font-semibold text-2xl">{formatTime(time)}</span>
            </span>
            <img src={indicatorExam} alt="" className="h-5" />
          </div>
          <div className="flex">
            <div className="w-1/2 ml-8 px-2 mt-1 border-r flex flex-col gap-4">
              <div className="flex mt-6 justify-between items-center">
                <span className="font-semibold text-[#1C4481]">
                  {questions[currentQuestionIndex]?.title}
                </span>
                <div className="flex items-center gap-3">
                  <div className="h-8 border-[#14540E] border w-28 flex items-center justify-center rounded-full text-sm">
                    <span className="font-semibold text-[#5F5F5F]">
                      Max Marks {questions[currentQuestionIndex]?.max_marks}
                    </span>
                  </div>
                  <div className="bg-[#FAFF0D] px-3 rounded-full h-9 flex items-center justify-center font-medium gap-1 text-sm">
                    <img src={info} alt="" className="h-4" />
                    <span>It is Mandatory Question</span>
                  </div>
                  <img src={speak} alt="" className="h-7" />
                </div>
              </div>
              <div className="border-t-2 border-[#c2c2c2]"></div>
              <QuestionSection
                question={questions[currentQuestionIndex]}
                onAnswerChange={handleAnswerChange}
              />
              <div className="border-t border-[#c2c2c2]"></div>
              <div className="w-full h-32 flex items-center justify-between px-8">
                <div className="flex flex-col items-center gap-2">
                  <img src={livevideo} alt="" className="h-20" />
                  <span className="font-medium text-[#444444]">Live Video</span>
                </div>
                <div className="flex gap-4 items-center justify-between ">
                  <div className="flex flex-col items-center gap-2">
                    <div className="border-2 flex-col border-[#1C4481] rounded-full h-11 w-11 flex items-center justify-center">
                      <img src={reset} alt="" className="h-8" />
                    </div>
                    <span>Reset</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="border-2 flex-col border-[#1C4481] rounded-full h-11 w-11 flex items-center justify-center">
                      <img src={previous} alt="" className="h-6" />
                    </div>
                    <span>Previous</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="border-2 flex-col border-[#1C4481] rounded-full h-11 w-11 flex items-center justify-center">
                      <img src={play} alt="" className="h-6" />
                    </div>
                    <span>Play</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="border-2 flex-col border-[#1C4481] rounded-full h-11 w-11 flex items-center justify-center">
                      <img src={next} alt="" className="h-6" />
                    </div>
                    <span>Next</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="border-2 flex-col border-[#1C4481] rounded-full h-11 w-11 flex items-center justify-center">
                      <img src={lock} alt="" className="h-6" />
                    </div>
                    <span>Lock</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 mt-1">
              <div className="bg-[#F3F7FF] mx-4 rounded-xl p-6 flex flex-col gap-6">
                <span className="font-semibold">Ans.</span>
                <TextOptions />
                {/* <TextOptions /> */}
                {/* <Descriptive /> */}
                {/* <Record /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Question;
