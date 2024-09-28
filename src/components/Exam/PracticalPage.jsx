import React from "react";
import play from "../../assets/Assessor/play.png";
import recordAudio from "../../assets/Assessor/recordAudio.png";
import recordVideo from "../../assets/Assessor/recordVideo.png";
import Record from "../Exam/Record";
import Header from "../Assessor/Header";
import arrow from "/arrow.png";
import previous from "/previous.png";
import next from "/next.png";
import indicator from "/indicator.png";

const VivaExam = () => {
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
        <div className="flex justify-center items-center">
          <div>
            <div className="bg-[#DDEAFF] rounded-lg w-[90%]">
              <div className="py-3 flex justify-between w-full px-8">
                <div className="flex items-center ">
                  <span className="text-[#1C4481] font-semibold">
                    11/12- Level (MT Nos-3)
                  </span>
                </div>
                <div className="flex gap-4">
                  <div className="flex border-[1px] border-blue-600 py-2 px-8 bg-white rounded">
                    <span className="font-bold text-blue-600">
                      {" "}
                      Max Marks-2
                    </span>
                  </div>
                  <div className="flex justify-center items-center bg-yellow-300 rounded-full w-auto px-4">
                    <span className="font-semibold">
                      It is mandatory Question
                    </span>
                  </div>
                </div>
              </div>
              <hr class="border-t-[1px] border-[#bcbcbc]" />
              <div className="flex px-8 justify-between flex-col py-4">
                <span className="text-black font-bold w-full ">
                  Q- Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ipsam, voluptas. Aut quia consectetur at, illum quasi
                  cupiditate! Nisi, odio illum? Atque, incidunt nisi dolorem Q-
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ipsam, voluptas. Aut quia consectetur at, illum quasi
                  cupiditate! Nisi, odio illum? Atque, incidunt nisi dolorem Q-
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ipsam, voluptas. Aut quia consectetur at, illum quasi
                  cupiditate! Nisi, odio illum? Atque, incidunt nisi dolorem Q-
                  L
                </span>
                <Record />
              </div>
            </div>
            <div className="w-3/4 flex items-center justify-center m-8">
              <div className="flex items-center justify-between w-40">
                <div className="border border-black rounded-full h-14 w-14 flex items-center justify-center cursor-pointer">
                  <img src={previous} alt="" className="h-6" />
                </div>
                <div className="border border-black rounded-full h-14 w-14 flex items-center justify-center cursor-pointer">
                  <img src={next} alt="" className="h-6" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[700px] mt-6 bg-[#1C4481] h-52 border rounded-xl">
            <div className=" mx-4 rounded-xl p-6 flex flex-col gap-4 justify-center items-center">
              <span className="font-bold text-white text-lg">Enter marks</span>
              <div className="border rounded-full">
                <input
                  type="text"
                  name="mark"
                  placeholder="Enter Marks"
                  className="w-full rounded-full px-4 py-2"
                />
              </div>
              <button
                type="submit"
                className=" py-1 px-10 border rounded-full text-blue-500 bg-white "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VivaExam;
