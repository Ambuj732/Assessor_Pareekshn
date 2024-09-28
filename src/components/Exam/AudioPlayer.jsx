import React from "react";
import audioPlay from "../../assets/LoginScreen/audioPlay.png";
import audioPlayBtn from "../../assets/LoginScreen/audioPlayBtn.png";
import volumeBtn from "../../assets/LoginScreen/volumeBtn.png";
import fullScreen from "../../assets/LoginScreen/fullScreen.png";

function AudioPlayer() {
  return (
    <div className="w-full flex items-center justify-center mt-6">
      <div className="h-60 w-5/6 rounded-xl relative flex items-center justify-center">
        <img src={audioPlay} alt="" className="h-20" />
        <div className="h-7 w-full px-4 absolute bottom-4">
          <div className="bg-white w-full h-full px-1 rounded-full flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <img src={audioPlayBtn} alt="" className="h-5" />
              <div className="h-5 w-7 bg-[#1C4481] flex items-center justify-center font-semibold text-sm rounded">
                <span className="text-white">1X</span>
              </div>
            </div>
            <div className="w-2/3 rounded-full h-2 bg-[#1C4481]">
              <div className="w-3/4 rounded-full h-2 bg-[#60BCFE]"></div>
            </div>
            <div className="flex gap-4 items-center mr-4">
              <span>01:23</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
