import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import vc from "../../assets/Assessor/vc.png";
import batchdetails from "../../assets/Assessor/batchdetails.png";
import descriptive from "../../assets/Assessor/descriptive.png";
import pc from "../../assets/Assessor/pc.png";
import viva from "../../assets/Assessor/viva.png";
import studentdetails from "../../assets/Assessor/studentdetails.png";
import camera from "../../assets/Assessor/camera.png";
import cameras from "../../assets/Assessor/cameras.png";
import upload from "../../assets/Assessor/upload.png";
import uploadDashboardImages from "../../actions/LoginScreen/uploadDashboardImages";
import fetchDashboardImages from "../../actions/LoginScreen/fetchDashboardImages";
import Webcam from "react-webcam";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router";

function ImageModal({ isOpen, onClose, imageUrl }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-xl">
        <img src={imageUrl} alt="Full size" className="w-full h-auto" />
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function AssessorDashboard() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [fetchedImages, setFetchedImages] = useState([]);
  const [comment, setComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();
  const exam_id = location.state?.exam_id;
  console.log(exam_id);
  const navigate = useNavigate();

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const uploadPhotoHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log(user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
        file: capturedImage,
        comment: comment,
      };
      console.log(data);
      const response = await uploadDashboardImages(data);
      if (response?.data?.code === 1000) {
        toast.success("Photo Uploaded Successfully");
        getFecthedDashboardImages();
      }
      console.log(response);
    } catch (error) {
      console.log("Error while uploading photo:", error);
      toast.error("Error in Photo uploaded");
    }
  };

  const getFecthedDashboardImages = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log(user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
      };
      console.log(data);
      const response = await fetchDashboardImages(data);
      console.log(response);
      if (response.data.code === 1000) {
        setFetchedImages(response.data.list);
      }
    } catch (error) {
      console.log("Error while fetching images:", error);
    }
  };

  const handleBack = () => {
    if (capturedImage) {
      setCapturedImage(null);
    } else if (isWebcamOpen) {
      setIsWebcamOpen(false);
    } else {
      navigate(-2);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const goToPage = () => {
    navigate("/batchdetails", { state: { exam_id } });
  };
  const studentPage = () => {
    navigate("/studentdetails", { state: { exam_id } });
  };

  const vivaPage = () => {
    navigate("/vivapractical", { state: { exam_id } });
  };

  const vcPractical = () => {
    navigate("/vcpractical", { state: { exam_id } });
  };

  const descriptivePage = () => {
    navigate("/descriptive", { state: { exam_id } });
  };

  const pcVivaPractical = () => {
    navigate("/pc-viva-student-list", { state: { exam_id } });
  };

  const practicalPage = () => {
    navigate("/practicaltwo", { state: { exam_id } });
  };

  useEffect(() => {
    getFecthedDashboardImages();
  }, []);

  const handleInput = (event) => {
    setComment(event.target.value);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="min-h-screen p-4 bg-[#EDEDED] flex gap-10">
        <div className="bg-white p-4 w-8/12 rounded-2xl">
          <div className="flex items-center gap-2">
            <img src={arrowLeft} alt="" className="h-6 cursor-pointer" />
            <span className="text-black font-semibold text-2xl">
              Assessor Home
            </span>
          </div>
          <div className="py-4 flex flex-col gap-3">
            <div className="flex justify-between cursor-pointer">
              <img
                className="h-[300px]"
                src={batchdetails}
                onClick={goToPage}
                alt=""
              />
              <img
                className="h-[300px]"
                src={studentdetails}
                onClick={studentPage}
                alt=""
              />
              <img className="h-[300px]" src={viva} onClick={vivaPage} alt="" />
            </div>
            <div className="flex flex-col gap-5 cursor-pointer">
              <div className="flex justify-between cursor-pointer">
                <img
                  className="h-[300px]"
                  src={vc}
                  onClick={vcPractical}
                  alt=""
                />
                <img
                  className="h-[300px]"
                  src={descriptive}
                  onClick={descriptivePage}
                  alt=""
                />
                <img
                  className="h-[300px]"
                  src={pc}
                  onClick={pcVivaPractical}
                  alt=""
                />
              </div>
              <img
                className="h-[300px] w-[300px]"
                src={viva}
                onClick={practicalPage}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="w-4/12 flex flex-col gap-10 ">
          <div className="w-3/4 flex flex-col items-center  h-2/3 justify-center gap-8 rounded-2xl bg-white shadow-completedHackathon ml-16">
            <span className="font-semibold">Upload Photo</span>
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
                src={cameras}
                alt=""
                className="h-28 pl-4 cursor-pointer "
                onClick={() => setIsWebcamOpen(true)}
              />
            )}

            {capturedImage && (
              <>
                <input
                  type="text"
                  name="comment"
                  placeholder="Enter comment"
                  className="border px-4 rounded-full py-2 border-gray-800 hover:none ml-9"
                  onChange={handleInput}
                />
                <button
                  onClick={uploadPhotoHandler}
                  className="bg-[#1C4481] text-white w-1/2 h-10 rounded-full"
                >
                  Upload
                </button>
              </>
            )}
          </div>

          <div className="w-3/4 border-[1px] h-[500px] rounded-xl ml-16 overflow-y-scroll p-2 bg-white">
            {fetchedImages &&
              fetchedImages.map((data, index) => (
                <div className="flex p-2 items-center" key={index}>
                  <div className="text-center w-10 text-gray-700 font-semibold">
                    {index + 1}.
                  </div>
                  <div className="flex gap-4 p-2 items-center">
                    <div
                      className="border rounded-full cursor-pointer"
                      onClick={() => handleImageClick(data.photo)}
                    >
                      <img
                        src={data.photo}
                        alt={`Uploaded ${index + 1}`}
                        className="border rounded-full w-14 h-14"
                      />
                    </div>
                    <span>{data.comment}</span>
                  </div>
                </div>
              ))}
          </div>
          <ImageModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            imageUrl={selectedImage}
          />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default AssessorDashboard;
