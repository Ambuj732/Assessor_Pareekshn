import React, { useEffect, useState } from "react";
import pen from "../../assets/Dashboard/pen.png";
import openbook from "../../assets/Dashboard/openbook.png";
import Header from "./Header";
import completeBatch from "../../actions/AssessorDashboard/completedBatchs";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import { Navigate, useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function BatchDetails() {
  const [batchdetails, setBatchDetails] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const location = useLocation();
  const exam_id = location.state?.exam_id;
  console.log(exam_id);
  const navigate = useNavigate();

  const itemsPerPage = 5;

  const getBatchDetailsData = async (page) => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        pg: page,
      };
      const response = await completeBatch(data);
      console.log("API response:", response);

      if (response?.data?.code === 1000) {
        const batches = response?.data?.batches;

        // Append new batch data to the existing batchdetails
        setBatchDetails((prevBatchDetails) => [
          ...prevBatchDetails,
          ...batches,
        ]);

        setTotalRecords((prevTotal) => prevTotal + batches.length);

        if (batches.length < itemsPerPage) {
          setAllDataFetched(true);
        }
      } else {
        setAllDataFetched(true);
      }

      setLoading(false);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
      setLoading(false);
    }
  };

  const goToPage = () => {
    navigate(-1);
  };

  const goToFeedbackPage = () => {
    navigate("/feedback", { state: { exam_id } });
  };

  useEffect(() => {
    getBatchDetailsData(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (loading && currentPage === 1) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <Oval
            height={80}
            width={80}
            color="#1C4481"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#EAF2FE"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-2 ">
      <Header />
      <div className="flex justify-between mx-10 mb-12 m-7">
        <div className="flex gap-4 justify-center items-center ">
          <img
            src={arrowLeft}
            onClick={goToPage}
            className="w-7 h-7 cursor-pointer"
          />
          <span className="font-custom text-nowrap text-lg font-bold">
            Batch Details
          </span>
        </div>
        <div
          className="flex gap-2 border rounded-3xl py-2 px-3  text-white bg-[#1C4481]"
          onClick={goToFeedbackPage}
        >
          <img src={pen} />
          <button className="mr-4 text-nowrap">Feed Back</button>
        </div>
      </div>

      {batchdetails.length > 0 &&
        batchdetails.map((data) => (
          <div
            className="h-auto border-2  rounded-xl mx-10 -mt-9 mb-16"
            key={data.id}
          >
            <div className="flex justify-between text-[#1C4481] font-medium px-8 text-lg h-11 items-center rounded-t-xl bg-[#EAF2FE] ">
              <span className="text-nowrap mx-4">Batch Details</span>
            </div>
            <div className="flex p-4 px-8 flex-col gap-4">
              <div className="flex justify-between w-full">
                <div className="flex gap-2 text-sm w-1/5">
                  <img src={openbook} alt="" className="h-5 mt-1" />
                  <div className="flex flex-col">
                    <span className="text-[#1C4481] text-lg font-bold">
                      Department
                    </span>
                    <div className="font-medium text-base ml-1">ghfgh</div>
                  </div>
                </div>
                <div className="flex gap-2 text-sm w-1/5">
                  <img src={openbook} alt="" className="h-5 mt-1" />
                  <div className="flex flex-col">
                    <span className="text-[#1C4481] text-lg font-bold">
                      Institution
                    </span>
                    <div className="font-medium text-base ml-1">ghdfgh</div>
                  </div>
                </div>
                <div className="flex gap-2 text-sm w-1/5">
                  <img src={openbook} alt="" className="h-5 mt-1" />
                  <div className="flex flex-col">
                    <span className="text-[#1C4481] text-lg font-bold">
                      Address
                    </span>
                    <div className="font-medium text-base ml-1">fgfg</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full mt-10">
                <div className="flex gap-2 text-sm w-1/5">
                  <img src={openbook} alt="" className="h-5 mt-1" />
                  <div className="flex flex-col">
                    <span className="text-[#1C4481] text-lg font-bold">
                      Students
                    </span>
                    <div className="font-medium text-base ml-1">
                      {data.no_student}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 text-sm w-1/5">
                  <img src={openbook} alt="" className="h-5 mt-1" />
                  <div className="flex flex-col">
                    <span className="text-[#1C4481] text-lg font-bold">
                      Date of Assessments
                    </span>
                    <div className="font-medium text-base ml-1">
                      {data.date_assessment}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 text-sm w-1/5">
                  <img src={openbook} alt="" className="h-5 mt-1" />
                  <div className="flex flex-col">
                    <span className="text-[#1C4481] text-lg font-bold">
                      Reporting Time
                    </span>
                    <div className="font-medium text-base ml-1">201301</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      <div className="flex justify-center ">
        {!allDataFetched && (
          <button
            onClick={handleLoadMore}
            className="py-2 px-4 rounded bg-blue-900 mb-8 text-white"
          >
            Load More
          </button>
        )}
        {allDataFetched && (
          <p className="font-bold text-2xl text-gray-800 mb-10 hover:scale-105 hover:text-blue-900 cursor-pointer">
            All data loaded
          </p>
        )}
      </div>
    </div>
  );
}

export default BatchDetails;
