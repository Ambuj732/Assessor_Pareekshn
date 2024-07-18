import React from "react";
import Header from "../../components/Assessor/Header";
import upload from "/upload.png";

function UploadPhoto() {
	return (
		<div className="flex flex-col">
			<Header />
			<div className="flex items-center justify-center h-screen bg-[#EDEDED]">
				<div className="w-2/5 rounded-3xl bg-white h-96 shadow-completedHackathon">
					<div className="flex flex-col justify-between h-96 text-sm items-center p-8">
						<span className="font-semibold text-xl">
							Upload/Capture photo
						</span>
						<img src={upload} alt="" className="h-28" />
						<span className="text-center text-[12px] text-[#6C6C6C] w-2/3">
							Once you Click a picture it will show in this
							window, you can retake the picture clicking on the
							camera icon
						</span>
						<button className="bg-[#1C4481] text-white w-1/3 h-10 rounded-3xl">
							Upload
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UploadPhoto;
