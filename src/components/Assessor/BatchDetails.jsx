import React, { useEffect, useState } from "react";
import pen from "../../assets/Dashboard/pen.png";
import openbook from "../../assets/Dashboard/openbook.png";
import Header from "./Header";
import completeBatch from "../../actions/AssessorDashboard/completedBatchs";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
function BatchDetails() {
  const [batchdetails, setBatchDetails] = useState({});
  const [erros, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getBatchDetailsData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user,
        assessor_id: 160,
      };
      const response = await completeBatch(data);
      console.log("completed Batch Details", response);
      if (response?.data?.code === 1000)
        setBatchDetails(response?.data?.batches);
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
      setLoading(false);
    }
  };

  const goToPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    getBatchDetailsData();
  }, []);

  if (loading) {
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
    <div className="flex flex-col gap-8 ">
      <Header />
      <div className="flex justify-between mx-10 m-7">
        <div className="flex gap-4 justify-center items-center ">
          <img src={arrowLeft} onClick={goToPage} className="w-10 h-10" />
          <span className="font-custom text-nowrap text-lg font-bold">
            Batch Details
          </span>
        </div>
        <Link to="/feedback">
          <div className="flex gap-2 border rounded-3xl py-2 px-3  text-white bg-[#1C4481]">
            <img src={pen} />
            <button className="mr-4 text-nowrap">Feed Back</button>
          </div>
        </Link>
      </div>
      {batchdetails.length > 0 &&
        batchdetails.map((data) => (
          <div className="h-70 border-2  rounded-xl mx-10 -mt-6 mb-7">
            <div className="flex justify-between text-[#1C4481] font-medium px-8 text-lg h-16 items-center rounded-t-xl bg-[#EAF2FE] ">
              <span className="text-nowrap mx-4">Batch Details</span>
            </div>
            <div className="flex p-4 flex-col gap-4">
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
                      Instutution
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
    </div>
  );
}

export default BatchDetails;
