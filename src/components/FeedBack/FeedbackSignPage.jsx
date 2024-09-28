import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import SignatureCanvas from "react-signature-canvas";
import Header from "../Assessor/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import setFeedbackSign from "../../actions/AssessorDashboard/setFeedbackSign";

const FeedbackSignPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const exam_id = location.state?.exam_id;
  console.log(exam_id);
  const feedback_id = location.state?.feedback_id;
  console.log(feedback_id);
  const ass_id = location.state?.ass_id;
  console.log(ass_id);
  const signCanvasRef = useRef(null);

  const clearSignature = () => {
    signCanvasRef.current.clear();
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
        reject(error);
      };
    });
  };

  const handleSubmit = async () => {
    const signatureData = signCanvasRef.current.toDataURL();
    if (signCanvasRef.current.isEmpty()) {
      toast.error("Please provide a signature before submitting.");
      return;
    }
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log(user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
        feedback_id: feedback_id,
        feedback_id_assessor: ass_id,
        offline: 0,
        file: signatureData,
      };
      console.log(data);
      const response = await setFeedbackSign(data);
      console.log(response);
      if (response?.data?.code === 1000) {
        toast.success("Thanks");
        setTimeout(() => {
          navigate("/assessor-home");
        }, 1000);
      } else {
        toast.error("Failed to submit signature, please try again.");
      }
    } catch (error) {
      console.error("Error submitting signature:", error);
      toast.error("An error occurred while submitting.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex px-8 py-4 justify-between mx-5">
        <span className="text-2xl font-semibold font-custom my-2">
          Feedback
        </span>
      </div>
      <div className=" flex flex-col justify-center items-center ">
        <ToastContainer />
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h1 className="text-2xl font-semibold text-center text-[#1C4481] mb-6">
            Sign Below
          </h1>
          <SignatureCanvas
            penColor="red"
            canvasProps={{
              className: "w-full h-64 border border-gray-300 rounded-lg",
            }}
            ref={signCanvasRef}
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={clearSignature}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Clear Signature
            </button>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className={`mt-6 w-full py-3 text-white font-semibold rounded-lg bg-blue-900 hover:bg-blue-900 `}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSignPage;
