import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import download from "../../assets/Assessor/download.svg";
import eye from "../../assets/Assessor/eye.svg";
import Header from "./Header";
import setDescriptiveAnswerStudent from "../../actions/AssessorDashboard/setDescriptiveAnswerStudent";
import descriptiveMarking from "../../actions/AssessorDashboard/descriptiveMarking";
import swal from "sweetalert";

const DescriptiveAnswerStudent = () => {
  const [error, setErrors] = useState(null);
  const [descriptiveAnswer, setDescriptiveAnswer] = useState([]);
  const [marksArray, setMarksArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const exam_id = location.state?.exam_id;
  const st_id = location.state?.student_id;
  console.log(st_id);
  console.log(exam_id);

  const handleBack = () => {
    navigate(-1);
  };

  const stripHtmlTags = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const getDescriptiveAnswerAndQuestion = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
        student_id: st_id,
      };
      console.log(data);
      const response = await setDescriptiveAnswerStudent(data);
      console.log(response);
      if (response.data.code === 1000) {
        setDescriptiveAnswer(response.data.answer);
      }
    } catch (error) {
      console.log("Error while getting Answer :: ", error);
    }
  };

  const handleMarksChange = (question_id, value) => {
    setMarksArray((prevMarks) => {
      const updatedMarks = prevMarks.filter(
        (item) => item.question_id !== question_id
      );
      updatedMarks.push({ question_id, marks: value });
      return updatedMarks;
    });
  };

  const handleDescriptiveMarking = async () => {
    try {
      for (let i = 0; i < descriptiveAnswer.length; i++) {
        const question = descriptiveAnswer[i];
        const marksObject = marksArray.find(
          (mark) => mark.question_id === question.id_qb_question
        );
        if (marksObject && marksObject.marks > question.max_mark) {
          setErrorMessage(
            `Marks for question ${i + 1} cannot exceed ${question.max_mark}`
          );
          return;
        }
      }
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
        student_id: st_id,
        marks: JSON.stringify(marksArray),
      };
      console.log(data);
      const response = await descriptiveMarking(data);
      console.log("Marks Submitted: ", response);
      swal({
        text: "Marks has been submitted",
        icon: "success",
      });
      setErrorMessage("");
    } catch (error) {
      console.log("Error while submitting mark :: ", error);
    }
  };

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    getDescriptiveAnswerAndQuestion();
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <div className="min-h-screen p-4 bg-[#EDEDED] flex">
        <div className="bg-white p-4 w-full rounded-2xl">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <img
                src={arrowLeft}
                alt=""
                className="h-7 cursor-pointer"
                onClick={handleBack}
              />
              <span className="text-black font-semibold text-lg">
                Descriptive
              </span>
            </div>
            <div className="border-[2px] py-3 px-10 rounded-full border-blue-900">
              <span className="text-blue-900 font-bold text-xl">
                Batch-0021AC
              </span>
            </div>
          </div>

          {descriptiveAnswer &&
            descriptiveAnswer.map((answer) => (
              <div className="bg-[#EDF2FF] h-72 w-full rounded-2xl my-4 p-4 relative mb-28">
                <div className="flex items-center justify-between pr-8 mb-3">
                  <div className="flex items-center gap-6">
                    <div className="bg-red-500 w-7 h-8 flex items-center justify-center rounded">
                      <span className="font-bold text-white">Q.</span>
                    </div>
                    <span className="text-blue-800 font-bold ">
                      {answer?.question}
                    </span>
                  </div>
                </div>

                {/* Descriptive Answer Display */}
                <div className="bg-white h-52 rounded-lg flex flex-col shadow-customShadow py-2 px-4 relative overflow-hidden overflow-y-scroll mb-4">
                  {answer?.type === 1 ? (
                    <div className="flex gap-4">
                      <div className="flex font-medium bg-[#4cf64c] w-12 h-7 justify-center items-center rounded">
                        <span className="text-[#0e690e] font-bold px-2">
                          Ans
                        </span>
                      </div>
                      <span className="font-medium">
                        {stripHtmlTags(answer?.answer)}
                      </span>
                    </div>
                  ) : answer?.type === 2 ? (
                    <div className="flex gap-4">
                      <div className="flex font-medium bg-[#4cf64c] w-12 h-7 justify-center items-center rounded">
                        <span className="text-[#0e690e] font-bold">Ans</span>
                      </div>
                      <img
                        src={answer?.answer}
                        alt="Canvas Answer"
                        className="h-52 w-full object-contain"
                      />
                    </div>
                  ) : answer?.attachment_type === 1 ? (
                    <div className="flex gap-4">
                      <div className="flex font-medium bg-[#4cf64c] w-12 h-7 justify-center items-center rounded">
                        <span className="text-[#0e690e] font-bold">Img</span>
                        <img
                          src={answer.attachment}
                          onClick={() => {
                            openModal(answer.attachment);
                          }}
                        />
                      </div>
                    </div>
                  ) : answer?.attachment_type === 2 ? (
                    <div className="flex gap-4">
                      <div className="flex font-medium bg-[#4cf64c] w-12 h-7 justify-center items-center rounded">
                        <span className="text-[#0e690e] font-bold">PDF</span>
                      </div>
                      <a
                        href={answer?.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline text-blue-500"
                      >
                        Open PDF
                      </a>
                    </div>
                  ) : answer?.attachment_type === 3 ? (
                    <div className="flex gap-4">
                      <div className="flex font-medium bg-[#4cf64c] w-12 h-7 justify-center items-center rounded">
                        <span className="text-[#0e690e] font-bold">DOC</span>
                      </div>
                      <a
                        href={answer?.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline text-blue-500"
                      >
                        Open DOC
                      </a>
                    </div>
                  ) : null}

                  {answer?.output && (
                    <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                      {answer?.output?.result_status === 1 ? (
                        <div className="text-green-600 font-bold">
                          Result: Compiled Success
                        </div>
                      ) : (
                        <div className="text-red-600 font-bold">
                          Result: Compile Error
                        </div>
                      )}
                      {answer?.output?.result && (
                        <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                          <pre className="text-black whitespace-pre-wrap">
                            {answer?.output?.result}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="absolute -translate-y-5 w-[95%] mx-4 bg-blue-900 border-[1px] py-3 rounded-full border-white flex justify-between items-center">
                  <div className="flex gap-20 px-20">
                    {answer.attachment_type === 1 && (
                      <div className="flex gap-3">
                        <span className="text-white font-bold text-lg">
                          File name.jpeg
                        </span>
                        <div
                          className="flex items-center justify-center rounded-full border-[2px] border-white w-9 h-9 cursor-pointer"
                          onClick={() => openModal(answer?.attachment)}
                        >
                          <img src={eye} className="w-6 h-6" />
                        </div>
                      </div>
                    )}
                    {answer.attachment_type === 2 &&
                      answer.attachment_type === 3 && (
                        <div className="flex gap-3">
                          <span className="text-white font-bold text-lg">
                            File name.pdf
                          </span>
                          <div
                            className="flex items-center justify-center rounded-full border-[2px] border-white w-9 h-9 cursor-pointer"
                            onClick={() => openModal(answer?.attachment)}
                          >
                            <img src={download} className="w-6 h-6" />
                          </div>
                        </div>
                      )}
                  </div>

                  <div className="flex justify-center items-center gap-5 px-10">
                    <span className="text-white font-bold">Marks</span>
                    <div className="border rounded-full py-3 px-4 bg-white flex items-center justify-center">
                      <input
                        type="tel"
                        name="marks"
                        placeholder={`0-${answer.max_mark}`}
                        className="font-medium text-xl w-20 items-center px-4"
                        onChange={(e) =>
                          handleMarksChange(
                            answer.id_qb_question,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {errorMessage && (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleDescriptiveMarking}
              className="bg-blue-900 text-white py-2 px-6 rounded-lg"
            >
              Submit Marks
            </button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <button
                  onClick={closeModal}
                  className=" top-2 right-2 text-black font-bold text-4xl"
                >
                  X
                </button>
                <img
                  src={modalImage}
                  alt="Modal Content"
                  className="max-w-full max-h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DescriptiveAnswerStudent;
