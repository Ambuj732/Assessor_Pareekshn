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
import mic from "../../assets/Assessor/mic.png";
import Header from "./Header";
import vivaExamFetch from "../../actions/AssessorDashboard/vivaExamFetch";

function VivaByAssessor() {
  const [vivaExamData, setVivaExamData] = useState({});
  const [errors, setErrors] = useState(null);

  const getVivaExamDetails = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user,
        assessor_id: 160,
        exam_id: 8558,
        student_id: 211158,
        viva_by: "assessor",
      };
      const response = await vivaExamFetch(data);
      console.log(" Viva Exam Fetch ", response);
      if (response?.data?.code === 1000) setVivaExamData(response?.data);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    getVivaExamDetails();
  }, []);

  return (
    <div>
      <Header />
      <div>
        {/* Theory and Language */}
        <div className="flex px-12 py-4 justify-between">
          <span className="text-[#0C49CA] text-2xl font-medium font-custom my-2">
            Viva/Practical
          </span>
        </div>
        <div className="min-h-screen bg-[#F3F7FF] flex flex-col mx-8 px-8 gap-4 border rounded-2xl">
          <div className="bg-white h-16 mt-4 rounded-2xl flex items-center px-4 justify-between">
            <div className="flex items-center w-8/12 justify-between">
              <img src={arrow} alt="" className="h-8 " />
              <div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
                <span>1</span>
              </div>
              <div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
                <span>2</span>
              </div>
              <div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
                <span>3</span>
              </div>
              <div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
                <span>4</span>
              </div>
              <div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
                <span>5</span>
              </div>
              <div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
                <span>6</span>
              </div>
              <div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
                <span>7</span>
              </div>
              <div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
                <span>8</span>
              </div>
              <div className="border-2 border-[#14540E] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
                <span>9</span>
              </div>
              <div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
                <span>10</span>
              </div>
              <img src={arrow} alt="" className="scale-x-[-1] h-8" />
            </div>
            <img src={indicator} alt="" className="h-12" />
          </div>
          <div>
            <div className="bg-[#DDEAFF] rounded-lg w-full">
              <div className="py-3 flex justify-between w-full px-8">
                <div className="flex items-center ">
                  <span className="text-[#1C4481] font-semibold">
                    11/12- Level {vivaExamData?.exams?.question?.diff_level},
                    (MT Nos-3)
                  </span>
                </div>
                {/* <div className="flex gap-4">
                  <div className="flex justify-center items-center border border-[#1C4481] py-1 px-4 rounded-md bg-white font-medium">
                    <span className="font-bold text-[#1C4481]">
                      Max Marks-{vivaExamData?.exams?.question?.max_marks}
                    </span>
                  </div>
                  <span className="bg-yellow-300 border rounded-3xl px-4 py-1">
                    {vivaExamData?.exams?.question?.question_inst}
                  </span>
                </div> */}
              </div>
              <hr class="border-t-[1px] border-[#bcbcbc]" />
              <div className="flex px-8 justify-between flex-col py-4">
                <span className="text-black font-bold w-full ">
                  Q-
                  {vivaExamData?.exams?.question?.question}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ipsam, voluptas. Aut quia consectetur at, illum quasi
                  cupiditate! Nisi, odio illum? Atque, incidunt nisi dolorem
                  quas fuga unde ullam ad excepturi aspernatur mollitia eligendi
                  quia minus maiores, beatae, natus dicta quibusdam. Aperiam
                  doloribus aliquid velit, magnam, placeat qui distinctio modi
                  facere iure quo et illo, dicta voluptates quasi temporibus id
                  quisquam? Quaerat fuga nemo, quos magnam nisi magni cum
                  reprehenderit! Ducimus officiis at eius perspiciatis odio
                  sequi? Sed nulla quos ipsa? Iste, voluptatibus placeat quasi
                  et commodi soluta inventore ipsam dicta architecto earum a
                  animi provident id obcaecati perferendis, quae voluptates!
                </span>
                {/* <div className="flex mx-auto gap-16">
                  <div className="w-56 h-44 my-4 rounded-[34px] p-4 flex gap-4 items-center flex-col justify-center bg-white shadow-2xl">
                    <span className="text-[#1C4481] font-medium">
                      Record Audio
                    </span>
                    <div className="h-24 w-24 rounded-full bg-white shadow-completedHackathon flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-[#1C4481] flex items-center justify-center">
                        <img src={mic} alt="" className="h-10" />
                      </div>
                    </div>
                  </div>
                  <div className="w-56 h-44 my-4 rounded-[34px] p-4 flex gap-4 items-center flex-col justify-center bg-white shadow-2xl">
                    <span className="text-[#1C4481] font-medium">
                      Record Audio
                    </span>
                    <div className="h-24 w-24 rounded-full bg-white shadow-completedHackathon flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-[#1C4481] flex items-center justify-center">
                        <img src={mic} alt="" className="h-10" />
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {/* <div className="bg-[#1C4481] w-64 h-48 rounded-3xl flex p-4 justify-between flex-col items-center">
              <span className="text-white">Enter Marks</span>
              <div className="h-10 bg-[#E4EFFF] w-2/3 rounded-md flex items-center justify-center">
                <span>0-10</span>
              </div>
              <div className="bg-white h-8 w-1/2 flex flex-col rounded-full justify-center items-center text-[#1C4481] shadow-completedHackathon">
                <span>Submit</span>
              </div>
            </div> */}
          </div>
          <div>Answer</div>
          <div className="w-3/4 flex items-center justify-center">
            <div className="flex items-center justify-between w-40">
              <div className="border border-black rounded-full h-14 w-14 flex items-center justify-center">
                <img src={previous} alt="" className="h-6" />
              </div>
              <div className="border border-black rounded-full h-14 w-14 flex items-center justify-center">
                <img src={next} alt="" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VivaByAssessor;
