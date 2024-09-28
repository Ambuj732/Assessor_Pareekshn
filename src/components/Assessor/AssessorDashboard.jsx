import { React, useEffect, useState } from "react";
import Header from "./Header";
import papers from "../../assets/Assessor/papers.png";
import complete from "../../assets/Assessor/complete.png";
import explanation from "../../assets/Assessor/explanation.png";
import { useNavigate } from "react-router";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./customCalender.css";
import assessorEvents from "../../actions/AssessorDashboard/assessorEvents";
import ExamList from "./ExamList";

const AssessorDashboard2 = () => {
  const navigate = useNavigate();
  const [range, setRange] = useState({ from: null, to: null });
  const [eventData, setEventData] = useState({
    assessorMsg: [],
    exam_ids: [],
    events: [],
    totalCompleted: 0,
    totalInCompleted: 0,
    totalBatch: 0,
  });

  const getAssessorEventData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        startDate: range.from ? range.from.toISOString().split("T")[0] : null,
        endDate: range.to ? range.to.toISOString().split("T")[0] : null,
      };
      const response = await assessorEvents(data);
      if (response?.data?.code === 1000) {
        setEventData({
          assessorMsg: response.data.assessorMsg || [],
          exam_ids: response.data.exam_ids || [],
          events: response.data.events || [],
          totalCompleted: response.data.totalCompleted || 0,
          totalInCompleted: response.data.totalInCompleted || 0,
          totalBatch: response.data.totalBatch || 0,
        });
      }
    } catch (error) {
      console.log("Error while getting data :: ", error);
    }
  };

  const handleSubmit = () => {
    getAssessorEventData();
  };

  const goToPage = () => {
    navigate("/assessor-examlist");
  };

  useEffect(() => {
    getAssessorEventData();
  }, []);

  return (
    <div className="max-h-screen">
      <Header />

      <div className="p-4 bg-[#EDEDED] flex  gap-6">
        <div className=" h-auto bg-white  px-4 p-4 w-8/12 rounded-2xl ">
          <span className="text-3xl font-semibold mx-3">Dashboard</span>
          <div className=" flex gap-14 mt-7 px-10 items-center">
            <div className=" relative w-[180px] h-[285px] border rounded-3xl bg-gradient-to-t from-customBlack to-customGray flex flex-col">
              <div className="w-[108px] h-[108px]  rounded-full absolute top-7 left-8 bg-[#444242] flex justify-center items-center">
                <img src={papers} />
              </div>
              <div className=" w-full absolute top-36  flex flex-col justify-center items-center">
                <span className="text-[#A8A8A8] font-custom font-bold text-md ">
                  Total Batches
                </span>
                <span className="text-3xl text-white font-semibold">
                  {eventData.totalInCompleted +
                    eventData.totalBatch +
                    eventData.totalCompleted}
                </span>
                <span className="font-custom text-xs text-[#A8A8A8] text-nowrap">
                  Lorem Ipsum is simply
                </span>
                <span className="font-custom text-xs text-[#A8A8A8] text-nowrap">
                  dummy text of the printing
                </span>
              </div>
            </div>
            <div className=" relative w-[180px] h-[285px] border rounded-3xl bg-gradient-to-b from-customLightGreen via-customGreen to-customDarkGreen flex flex-col">
              <div className="w-[108px] h-[108px]  rounded-full absolute top-7 left-8 bg-[#444242] flex justify-center items-center">
                <img src={complete} />
              </div>
              <div className=" w-full absolute top-36  flex flex-col justify-center items-center">
                <span className="text-[#BDDCAD] font-custom font-bold text-md ">
                  Completed
                </span>
                <span className="text-3xl text-white font-semibold">
                  {" "}
                  {eventData.totalCompleted}
                </span>
                <span className="font-custom text-xs text-white text-nowrap">
                  Lorem Ipsum is simply
                </span>
                <span className="font-custom text-xs text-white text-nowrap">
                  dummy text of the printing
                </span>
              </div>
            </div>
            <div className=" relative w-[180px] h-[285px] border rounded-3xl bg-gradient-to-b from-customLightYellow via-customBrown to-customDarkBrown flex flex-col">
              <div className="w-[108px] h-[108px]  rounded-full absolute top-7 left-8 bg-[#444242] flex justify-center items-center">
                <img src={papers} />
              </div>
              <div
                className=" w-full absolute top-36  flex flex-col justify-center items-center cursor-pointer"
                onClick={goToPage}
              >
                <span className="text-[#FFEACA] font-custom font-bold text-md ">
                  In-Progress
                </span>
                <span className="text-3xl text-white font-semibold">
                  {eventData.totalBatch}
                </span>
                <span className="font-custom text-xs text-white text-nowrap">
                  Lorem Ipsum is simply
                </span>
                <span className="font-custom text-xs text-white text-nowrap">
                  dummy text of the printing
                </span>
              </div>
            </div>

            <div className=" relative w-[182px] h-[285px] border rounded-3xl bg-gradient-to-b from-customLightBlue via-customMediumBlue to-customDarkBlue flex flex-col">
              <div className="w-[108px] h-[108px]  rounded-full absolute top-7 left-8 bg-[#444242] flex justify-center items-center">
                <img src={explanation} />
              </div>
              <div className=" w-full absolute top-36  flex flex-col justify-center items-center">
                <span className="text-[#B0DBE4] font-custom font-extrabold text-md ">
                  Pending
                </span>
                <span className="text-3xl text-white font-semibold">
                  {" "}
                  {eventData.totalInCompleted}
                </span>
                <span className="font-custom text-xs text-[#B0DBE4] text-nowrap">
                  Lorem Ipsum is simply
                </span>
                <span className="font-custom text-xs text-[#B0DBE4] text-nowrap">
                  dummy text of the printing
                </span>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <span className="text-[0D001D] font-custom font-semibold text-2xl ">
              Messages
            </span>
            <div className="overflow-y-scroll h-[500px] border mt-8 rounded-xl w-[90%] px-4 ">
              <div className="flex flex-col  justify-center h-auto mt-5 ">
                {eventData.assessorMsg.map((msg, index) => (
                  <div className="w-[670px]  border-[1px] border-[#A2D0D7] rounded-xl bg-[#C5F4FB4F]  flex p-4 mb-4 items-center ml-5">
                    <span
                      key={index}
                      className="text-[#18454B] font-semibold text-md"
                    >
                      {msg.msgs}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3 h-auto bg-white rounded-2xl overflow-y-scroll p-4 flex flex-col gap-5">
          <span className="text-3xl font-semibold mx-3">Calendar</span>

          <div className="calendar-container flex">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              footer={
                <button
                  className="fetch-btn bg-blue-900 text-white p-2 rounded"
                  onClick={handleSubmit}
                >
                  Fetch Events
                </button>
              }
            />
            <div className="date-info text-center mt-4">
              <p>
                Start Date:{" "}
                {range?.from ? range.from.toLocaleDateString() : "Not selected"}
              </p>
              <p>
                End Date:{" "}
                {range?.to ? range.to.toLocaleDateString() : "Not selected"}
              </p>
            </div>
          </div>
          <span className="text-[#1C4481] font-custom font-semibold text-lg">
            Upcoming Events
          </span>
          <div className="overflow-y-scroll h-[300px] border rounded-xl">
            <div className="flex flex-col gap-4 justify-center items-center h-auto mt-4 ">
              {eventData?.events?.map((event, index) => (
                <div
                  key={event.id}
                  className="w-[404px] h-[34px] border rounded-3xl bg-[#A50DBE66] p-5 mb-2 flex items-center "
                >
                  <span className="text-[#37103E] font-semibold text-md">
                    {event.title} : {new Date(event.start).toLocaleDateString()}
                    -{new Date(event.end).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessorDashboard2;
