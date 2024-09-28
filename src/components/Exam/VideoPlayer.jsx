import React from "react";
import playVideo from "../../assets/LoginScreen/playVideo.png";
import playBtn from "../../assets/LoginScreen/playBtn.png";
import volumeBtn from "../../assets/LoginScreen/volumeBtn.png";
import fullScreen from "../../assets/LoginScreen/fullScreen.png";

function VideoPlayer() {
  return (
    <div className="w-full flex items-center justify-center mt-6">
      <div className="bg-[#353534] h-80 w-5/6 rounded-xl relative flex items-center justify-center">
        <img src={playVideo} alt="" className="h-20" />
        <div className="h-7 w-full px-4 absolute bottom-4">
          <div className="bg-white w-full h-full px-1 rounded-full flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <img src={playBtn} alt="" className="h-5" />
              <div className="h-5 w-7 bg-[#d79f6ad5] flex items-center justify-center font-semibold text-sm rounded">
                <span>1X</span>
              </div>
            </div>
            <div className="w-1/2 rounded-full h-2 bg-[#E7A971]">
              <div className="w-2/3 rounded-full h-2 bg-[#D9449D]"></div>
            </div>
            <div className="flex gap-4 items-center mr-4">
              <span>01:23</span>
              <img src={volumeBtn} alt="" className="h-5" />
              <img src={fullScreen} alt="" className="h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
