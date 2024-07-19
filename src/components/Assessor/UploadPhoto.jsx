import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Assessor/Header";
import arrowLeft from "../../assets/LoginScreen/arrowLeft.png";
import upload from "../../assets/LoginScreen/upload.png";
import { useNavigate } from "react-router";
import imageUploadAssessor from "../../actions/LoginScreen/imageUploadAssessor";
import Webcam from "react-webcam";

function UploadPhoto() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const uploadPhotoHandler = async () => {
    try {
      const assessor_user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log(assessor_user);
      const data = {
        usercode: assessor_user?.token,
        assessor_id: 160,
        exam_id: 8558,
        file: capturedImage,
      };
      console.log(data);
      await imageUploadAssessor(data);
      navigate("/assessor-examlist");
    } catch (error) {
      console.log("Error while uploading photo:", error);
    }
  };

  const handleBack = () => {
    if (capturedImage) {
      setCapturedImage(null);
    } else if (isWebcamOpen) {
      setIsWebcamOpen(false);
    } else {
      // Navigate back two steps
      navigate(-2);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="flex justify-center items-center mt-20">
        <div className="flex flex-col justify-center items-center border rounded-3xl w-[450px] h-[500px] ">
          <div className="flex justify-between items-center w-full px-10">
            <img
              src={arrowLeft}
              alt=""
              className="bg-[#1C4481] w-6 h-6 rounded-full cursor-pointer"
              onClick={handleBack}
            />
            <div className="flex flex-col items-end">
              <span className="font-semibold text-[#AFAFAF]">Candidate</span>
              <span className="font-semibold text-[#555555]">Panel</span>
            </div>
          </div>
          <div className="flex flex-col justify-between text-sm items-center gap-6 my-8">
            <span className="font-bold">Upload/Capture photo</span>
            {isWebcamOpen && !capturedImage && (
              <div className="w-[80%] h-72  relative rounded-md overflow-hidden border border-gray-300">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    facingMode: "environment",
                  }}
                  className="absolute top-4   w-full h-52 items-center"
                />
                <button
                  onClick={capturePhoto}
                  className="bg-[#1C4481] text-white w-1/2 h-10 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2 "
                >
                  Capture
                </button>
              </div>
            )}
            {capturedImage && (
              <div className="flex flex-col items-center">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-24 h-24 rounded-full"
                />
                <button
                  onClick={retakePhoto}
                  className="text-[#1C4481] mt-2 underline cursor-pointer"
                >
                  Retake
                </button>
              </div>
            )}
            {!isWebcamOpen && !capturedImage && (
              <img
                src={upload}
                alt=""
                className="h-28 cursor-pointer"
                onClick={() => setIsWebcamOpen(true)}
              />
            )}
            <span className="text-center text-[12px] text-[#6C6C6C]">
              Once you click a picture it will show in this window. You can
              retake the picture by clicking on the camera icon.
            </span>
            {capturedImage && (
              <button
                onClick={uploadPhotoHandler}
                className="bg-[#1C4481] text-white w-1/2 h-10 rounded-full"
              >
                Upload
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPhoto;
