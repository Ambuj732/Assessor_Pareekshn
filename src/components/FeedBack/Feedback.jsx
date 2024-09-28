import { React, useState, useEffect } from "react";
import Header from "../Assessor/Header";
import { useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import feedBackAnswer from "../../actions/AssessorDashboard/feedBackAnswer";
import setFeedbackAnswers from "../../actions/AssessorDashboard/setFeedbackAnswer";

function Feedback() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});
  const [feedbackAnswer, setFeedbackAnswer] = useState(null);
  const [file, setFile] = useState();
  const [submitObj, setSubmitObj] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const exam_id = location.state?.exam_id;
  console.log(exam_id);
  const feedback_id = location.state?.feedback_id;
  console.log(feedback_id);
  const ass_id = location.state?.ass_id;
  console.log(ass_id);

  const type4_1 = [
    { id: 1, name: "Strongly Agree" },
    { id: 2, name: "Agree" },
    { id: 3, name: "Disagree" },
    { id: 4, name: "Strongly Disagree" },
  ];

  const type4_2 = [
    { id: 1, name: "Excellent" },
    { id: 2, name: "Good" },
    { id: 3, name: "Average" },
    { id: 4, name: "Poor" },
  ];

  const type2 = [
    { id: 1, name: "Yes" },
    { id: 2, name: "No" },
  ];

  const getFeedbackAnswerData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log(user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
        feedback_id: feedback_id,
      };
      const response = await feedBackAnswer(data);
      console.log(response);
      if (response?.data?.code === 1000) {
        setFeedbackAnswer(response.data.question);
        setSubmitObj([]);
      } else response?.data?.code === 1000 && response?.data?.noques === 0;
      {
        setTimeout(() => {
          navigate("/feedback-sign", {
            state: { exam_id, feedback_id: feedback_id, ass_id: ass_id },
          });
        }, 1000);
      }
    } catch (error) {
      console.log("Error while fetching feedback data: ", error);
    }
  };

  useEffect(() => {
    getFeedbackAnswerData();
  }, []);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleChange = debounce(
    (event, qid, ftypeid, max_rating, feedback_id) => {
      const value = event.target.value;
      const isTextarea = event.target.type === "textarea";

      setSubmitObj((prevState) => {
        // Filter out any existing entries for this question
        const updatedSubmitObj = prevState.filter(
          (entry) => entry.feedback_ques_id !== qid
        );

        const newRatingObj = {
          feedback_ques_id: qid,
          feedback_id: feedback_id,
          assessor_rating: !isTextarea ? value : max_rating,
          id_fbq_type: ftypeid,
          remarks: isTextarea ? value : "",
        };

        return [...updatedSubmitObj, newRatingObj];
      });
    },
    300
  );

  const renderQuestion = (question) => {
    const {
      question_id,
      question: questionText,
      max_rating,
      id_fbq_type,
      feedback_id,
    } = question;

    const renderRadioButtons = (options) =>
      options.map((option) => (
        <label
          key={option.id}
          className="flex flex-col gap-2 font-medium text-xl text-black"
        >
          {option.name}
          <input
            type="radio"
            name={`feedback-${question_id}`}
            value={option.id}
            className="mr-2 h-10 w-8"
            onChange={(e) =>
              handleChange(e, question_id, id_fbq_type, max_rating, feedback_id)
            }
          />
        </label>
      ));

    const renderTextArea = () => (
      <>
        <span className="font-medium">Remarks</span>
        <textarea
          className="w-full p-4 mt-2 border"
          placeholder="Add your remarks here"
          onChange={(e) =>
            handleChange(e, question_id, id_fbq_type, max_rating, feedback_id)
          }
        />
      </>
    );

    // Switch case based on `max_rating` and `id_fbq_type`
    switch (true) {
      case max_rating === 4 && id_fbq_type === 1:
        return (
          <div key={question_id} className="w-full border p-5">
            <div className="flex gap-4 flex-col">
              <span className="text-3xl text-[#1C4481] font-semibold px-2">
                {questionText}
              </span>
              <hr className="w-full ml-5"></hr>
            </div>
            <div className="flex gap-8 mt-4 px-5">
              {renderRadioButtons(type4_1)}
            </div>
          </div>
        );
      case max_rating === 4 && id_fbq_type === 2:
        return (
          <div key={question_id} className="w-full border p-5">
            <div className="flex gap-4 flex-col">
              <span className="text-3xl text-[#1C4481] font-semibold px-2">
                {questionText}
              </span>
              <hr className="w-full ml-5"></hr>
            </div>
            <div className="flex gap-8 mt-4 px-5">
              {renderRadioButtons(type4_2)}
            </div>
          </div>
        );
      case max_rating === 2 && id_fbq_type === 3:
        return (
          <div key={question_id} className="w-full border p-5">
            <div className="flex gap-4 flex-col">
              <span className="text-3xl text-[#1C4481] font-semibold px-2">
                {questionText}
              </span>
              <hr className="w-full ml-5"></hr>
            </div>
            <div className="flex gap-8 mt-4 px-5">
              {renderRadioButtons(type2)}
            </div>
          </div>
        );
      case max_rating === 2 && id_fbq_type === 5:
        return (
          <div key={question_id} className="w-full border p-5">
            <div className="flex gap-4 flex-col">
              <span className="text-3xl text-[#1C4481] font-semibold px-2">
                {questionText}
              </span>
              <hr className="w-full ml-5"></hr>
            </div>
            <div className="flex gap-8 mt-4 px-5">
              {renderRadioButtons(type2)}
            </div>
            {renderTextArea()}
          </div>
        );
      case id_fbq_type === 4 && max_rating === 0:
        return (
          <div key={question_id} className="w-full border p-5">
            <div className="flex gap-4 flex-col">
              <span className="text-3xl text-[#1C4481] font-semibold px-2">
                {questionText}
              </span>
              <hr className="w-full ml-5"></hr>
            </div>
            {renderTextArea()}
          </div>
        );
      default:
        return null;
    }
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

  const getFile = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile.size > 1048576) {
      toast.error("File size exceeds 1MB. Please upload a smaller file.");
      event.target.value = null;
      return;
    }

    const fileBase64 = await getBase64(selectedFile);
    setFile(fileBase64);
  };

  const feedbackAnswerHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
        feedback_id: feedback_id,
        feedback_id_assessor: ass_id,
        rating: JSON.stringify(submitObj), // I am sending array in json
        file: file,
        attach: 1,
        filename: file?.name,
      };
      console.log(data);
      const response = await setFeedbackAnswers(data);
      console.log(response);
      if (response?.data?.code === 1000) {
        toast.success("Question submitted successfully!");
        getFeedbackAnswerData();
        setFile(null);
      } else {
        toast.error("Request Keys contain wrong data");
      }
    } catch (error) {
      console.log("Error while setting feedback answer:", error);
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
      <div className="w-5/6 mx-28">
        <div className="flex flex-col gap-10">
          {feedbackAnswer ? renderQuestion(feedbackAnswer) : <p>Loading...</p>}
        </div>
      </div>
      <div className="mt-9 w-5/6 mx-28">
        <form onSubmit={handleSubmit(feedbackAnswerHandler)}>
          <div className="flex flex-col  px-4 border">
            <span className="text-lg font-bold ">Attachement</span>
            <input
              type="file"
              id="attachement"
              name="attachement"
              className=" py-2"
              onChange={getFile}
            />
            <div>
              <div className="flex gap-2 items-center">
                <span className="font-extrabold text-lg -mt-2">.</span>
                <span> Allow 1MB Photo</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-extrabold -mt-2">.</span>
                <span className=""> Allow 1MB Pdf or doc/docx</span>
              </div>
            </div>
          </div>
          <div className="mt-7 flex items-center justify-center  px-3">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-900 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Feedback;
