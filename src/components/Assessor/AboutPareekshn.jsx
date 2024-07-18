import React from "react";
import blurredImage from "/blurredImage.png";
import expandRight from "/Expand_right.png";
import dots from "/dots.png";
import books from "/bookCorner.png";
import star from "/star.png";
import cap from "/cap.png";

function AboutPareekshn() {
  return (
    <div className="w-1/2 p-10 gap-4 flex flex-col justify-items-center h-screen relative">
      <img
        src={books}
        alt=""
        className="absolute top-0 right-0 h-20 grayscale"
      />
      <img src={star} alt="" className="absolute top-0 left-1/2 h-24" />
      <img src={cap} alt="" className="absolute h-16 bottom-36 left-2" />
      <div className="flex flex-col text-xl text-[#1C4481]">
        <span className="font-medium">About</span>
        <span className="font-bold text-2xl">Pareekshn</span>
      </div>
      <div className="flex justify-center items-center">
        <img src={blurredImage} alt="" className="h-80" />
        <div className="h-[290px] bg-[#CBD9FF] rounded-3xl w-[420px] z-[-1] absolute"></div>
        <div className="h-[240px] rounded-3xl w-[450px] z-[-1] absolute bg-[#9CB8FF87]"></div>
      </div>
      <p className="text-center text-sm">
        <span className="font-semibold">Lorem Ipsum is simply dummy text</span>
        <br />
        of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy
      </p>
      <div className="flex justify-between w-4/5 mx-auto">
        <img src={expandRight} alt="" className="h-10" />
        <img src={dots} alt="" className="w-12 h-2 mt-3" />
        <img src={expandRight} alt="" className="h-10 scale-x-[-1]" />
      </div>
    </div>
  );
}

export default AboutPareekshn;
