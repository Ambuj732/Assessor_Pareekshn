import React from "react";
import logo from "/logo.png";
import avatar from "/avatar.png";
import questionMark from "/questionMark.png";
import logout from "/logout.png";
import arrowDown from "/arrowDown.png";
import indicator from "/indicator.png";
import mandatory from "/mandatory.png";
import volume from "/volume.png";
import reset from "/reset1.png";
import previous from "/previous.png";
import play from "/play.png";
import next from "/next.png";
import lock from "/lock.png";
import timer from "/timer.png";
import Header from "../Assessor/Header";
import mic from "../../assets/Assessor/mic.png";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";

function Feedback() {
  return (
    <div className="flex flex-col">
      <Header />
      <div>
        <div className="flex px-12 py-4 justify-between">
          <span className="text-2xl font-medium font-custom my-2">
            Feedback
          </span>
        </div>
        <div className="min-h-screen flex flex-col mx-8 gap-4">
          <div className="h-36 shadow-customShadow rounded-2xl p-8 flex flex-col justify-center gap-4">
            <span className="text-3xl text-[#1C4481] font-medium">
              The Trainer Is knowledgeable ?
            </span>
            <div className="flex gap-8">
              <label className="flex flex-col gap-1 font-medium text-black">
                Strongly Agree
                <input
                  type="radio"
                  name="knowledge"
                  value="stronglyAgree"
                  className="mr-2 h-5"
                />
              </label>

              <label className="flex flex-col gap-1 font-medium text-black">
                Agree
                <input
                  type="radio"
                  name="knowledge"
                  value="agree"
                  className="mr-2 h-5"
                />
              </label>

              <label className="flex flex-col gap-1 font-medium text-black">
                Disagree
                <input
                  type="radio"
                  name="knowledge"
                  value="disagree"
                  className="mr-2 h-5"
                />
              </label>

              <label className="flex flex-col gap-1 font-medium text-black">
                Strongly Disagree
                <input
                  type="radio"
                  name="knowledge"
                  value="stronglyDisagree"
                  className="mr-2 h-5"
                />
              </label>
            </div>
          </div>
          <div className="h-36 shadow-customShadow rounded-2xl p-8 flex flex-col justify-center gap-4">
            <span className="text-3xl text-[#1C4481] font-medium">
              The Trainer Is knowledgeable ?
            </span>
            <div className="flex gap-8">
              <label className="flex flex-col gap-1 font-medium text-black">
                Strongly Agree
                <input
                  type="radio"
                  name="knowledge"
                  value="stronglyAgree"
                  className="mr-2 h-5"
                />
              </label>

              <label className="flex flex-col gap-1 font-medium text-black">
                Agree
                <input
                  type="radio"
                  name="knowledge"
                  value="agree"
                  className="mr-2 h-5"
                />
              </label>

              <label className="flex flex-col gap-1 font-medium text-black">
                Disagree
                <input
                  type="radio"
                  name="knowledge"
                  value="disagree"
                  className="mr-2 h-5"
                />
              </label>

              <label className="flex flex-col gap-1 font-medium text-black">
                Strongly Disagree
                <input
                  type="radio"
                  name="knowledge"
                  value="stronglyDisagree"
                  className="mr-2 h-5"
                />
              </label>
            </div>
          </div>
          <div className="h-36 shadow-customShadow rounded-2xl p-8 flex flex-col justify-center gap-4">
            <span className="text-3xl text-[#1C4481] font-medium">
              Were you briefed about the scheme in the beginning of the course?
            </span>

            <div className="flex gap-8">
              <label className="flex flex-col gap-1 font-medium text-black">
                Yes
                <input
                  type="radio"
                  name="briefed"
                  value="yes"
                  className="mr-2 h-5"
                />
              </label>

              <label className="flex flex-col gap-1 font-medium text-black">
                No
                <input
                  type="radio"
                  name="briefed"
                  value="no"
                  className="mr-2 h-5"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
