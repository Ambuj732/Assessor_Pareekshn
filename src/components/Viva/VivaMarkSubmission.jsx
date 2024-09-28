import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Header from "../Assessor/Header";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import sound from "../../assets/Assessor/sound.png";
import play from "../../assets/Assessor/play.svg";
import start2 from "../../assets/Assessor/start2.svg";
import vivaStudentAnswersMarking from "../../actions/viva/vivaStudentAnswersMarking";
import vivamarking from "../../actions/viva/vivamarking";
import swal from "sweetalert";

const VivaMarkSubmission = () => {
  const [vivaStudentAnswerData, setVivaStudentAnswerData] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const exam_id = location.state?.exam_id;
  const st_id = location.state?.student_id;
  console.log(st_id);
  console.log(exam_id);

  const getVivaAnswerData = async () => {
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
      const response = await vivaStudentAnswersMarking(data);
      console.log(response);
      if (response.data.code === 1000) {
        setVivaStudentAnswerData(response.data.answer);
      }
    } catch (error) {
      console.log("Error while getting data :: ", error);
    }
  };

  const handleMarksChange = (index, value, maxMark) => {
    if (isNaN(value)) {
      swal({
        text: "Please enter a valid number for marks",
        icon: "warning",
      });
      return;
    }

    const newMarksData = [...marksData];
    newMarksData[index] = { ...newMarksData[index], marks: value };

    setMarksData(newMarksData);
  };

  const handleRemarksChange = (index, value) => {
    const newMarksData = [...marksData];
    newMarksData[index] = { ...newMarksData[index], remarks: value };

    setMarksData(newMarksData);
  };

  const handleVivaMarking = async () => {
    for (let i = 0; i < marksData.length; i++) {
      if (marksData[i].marks === undefined || marksData[i].marks === "") {
        swal({
          text: `Please mark question ${i + 1}`,
          icon: "warning",
        });
        return;
      }

      // Check if any mark exceeds the allowed max mark
      if (marksData[i].marks > vivaStudentAnswerData[i]?.max_mark) {
        swal({
          text: `Marks for question ${i + 1} cannot exceed ${
            vivaStudentAnswerData[i].max_mark
          }`,
          icon: "error",
        });
        return;
      }
    }

    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
        student_id: st_id,
        marks: JSON.stringify(marksData),
      };
      console.log(data);
      const response = await vivamarking(data);
      swal({
        text: "Marks have been submitted successfully",
        icon: "success",
      });
    } catch (error) {
      console.log("Error while submitting marks :: ", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getVivaAnswerData();
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
              <span className="text-black font-semibold text-lg">Viva</span>
            </div>
          </div>
          {vivaStudentAnswerData &&
            vivaStudentAnswerData.map((data, index) => {
              if (data && data.type === 1) {
                return (
                  <>
                    <div className="bg-[#EDF2FF] h-72 w-full rounded-2xl my-4 p-4 relative mb-32">
                      <div className="flex items-center justify-between pr-8 mb-3">
                        <div className="flex items-center gap-6">
                          <div className="bg-red-500 w-7 h-8 flex items-center justify-center rounded">
                            <span className="font-bold text-white">Q.</span>
                          </div>
                          <span className="text-blue-800 font-bold ">
                            {data.question}
                          </span>
                        </div>
                      </div>

                      <div className="bg-white h-52 rounded-lg flex items-center shadow-customShadow py-2 px-4 relative overflow-hidden overflow-y-scroll mb-4  gap-96">
                        <div className="flex font-medium bg-[#4cf64c] w-12 h-7 justify-center items-center rounded">
                          <span className="text-[#0e690e] font-bold px-2">
                            Ans
                          </span>
                        </div>
                        <div className=" w-auto mx-4 bg-blue-900 border-[1px] py-5 rounded-full border-white flex justify-between items-center">
                          <div className="flex  items-center w-full px-10">
                            {/* <div className="border rounded-full w-10 h-10 bg-white cursor-pointer">
                        <img src={play} />
                      </div> */}
                            <div>
                              <audio controls className="h-10 flex">
                                <source src={data?.answer} type="audio/mpeg" />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute -translate-y-5 w-[95%] mx-4 bg-blue-900 border-[1px] py-3 rounded-full border-white flex justify-between items-center">
                        <div className="flex gap-10 justify-center items-center w-[80%]">
                          <span className="text-white font-semibold text-2xl">
                            Remarks
                          </span>
                          <div className="flex w-[80%] h-16 ">
                            <input
                              type="text"
                              name="remarks"
                              className="w-full h-16 rounded bg-[#EDF2FF] px-7 pb-7"
                              onChange={(e) =>
                                handleRemarksChange(index, e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="flex justify-center items-center gap-5 px-10">
                          <span className="text-white font-bold">Marks</span>
                          <div className="border rounded-full py-3 px-4 bg-white flex items-center justify-center">
                            <input
                              type="tel"
                              name="marks"
                              placeholder={`0-${data.max_mark}`}
                              className="font-medium text-xl w-20 items-center px-4"
                              onChange={(e) =>
                                handleMarksChange(
                                  index,
                                  e.target.value,
                                  data.max_mark
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              } else if (data && data.type === 2) {
                return (
                  <>
                    <div className="bg-[#EDF2FF] h-auto w-full rounded-2xl my-4 p-4 relative mb-28">
                      <div className="flex items-center justify-between pr-8 mb-3">
                        <div className="flex items-center gap-6">
                          <div className="bg-red-500 w-7 h-8 flex items-center justify-center rounded">
                            <span className="font-bold text-white">Q.</span>
                          </div>
                          <span className="text-blue-800 font-bold ">
                            {data.question}
                          </span>
                        </div>
                      </div>

                      <div className=" bg-white h-auto rounded-lg flex items-center shadow-customShadow py-4 px-4 relative overflow-hidden overflow-y-scroll mb-4  gap-60">
                        <div className="flex font-medium bg-[#4cf64c] w-12 h-7 justify-center items-center rounded">
                          <span className="text-[#0e690e] font-bold px-2">
                            Ans
                          </span>
                        </div>
                        <div className="">
                          <div className=" flex items-center justify-center border rounded-3xl w-[784px] h-[355px]  bg-[#353534] cursor-pointer">
                            {/* <img src={start2} /> */}

                            <video controls className="w-full h-full">
                              <source src={data.answer} type="video/mp4" />
                            </video>
                          </div>
                          {/* <div className="absolute -translate-y-28 w-[50%] mx-4 bg-blue-900 py-2 rounded-full  flex justify-between items-center">
                            <div className="flex justify-between items-center w-full px-10">
                              <div className="border rounded-full w-7 h-7 bg-white cursor-pointer">
                                <img src={play} />
                              </div>
                              <div className="border rounded-full w-7 h-7 bg-white cursor-pointer">
                                <img src={sound} />
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>

                      <div className="absolute -translate-y-5 w-[95%] mx-4 bg-blue-900 border-[1px] py-3 rounded-full border-white flex justify-between items-center">
                        <div className="flex gap-10 justify-center items-center w-[80%]">
                          <span className="text-white font-semibold text-2xl">
                            Remarks
                          </span>
                          <div className="flex w-[80%] h-16 ">
                            <input
                              type="text"
                              name="remarks"
                              className="w-full h-16 rounded bg-[#EDF2FF] px-7 pb-7"
                              onChange={(e) =>
                                handleRemarksChange(index, e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="flex justify-center items-center gap-5 px-10">
                          <span className="text-white font-bold">Marks</span>
                          <div className="border rounded-full py-3 px-4 bg-white flex items-center justify-center">
                            <input
                              type="tel"
                              name="marks"
                              placeholder={`0-${data.max_mark}`}
                              className="font-medium text-xl w-20 items-center px-4"
                              onChange={(e) =>
                                handleMarksChange(
                                  index,
                                  e.target.value,
                                  data.max_mark
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            })}

          <div className="flex justify-center mt-4" onClick={handleVivaMarking}>
            <button className="bg-blue-900 text-white py-2 px-6 rounded-lg">
              Submit Marks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VivaMarkSubmission;
