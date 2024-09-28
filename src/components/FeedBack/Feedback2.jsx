import React, { useEffect, useState } from "react";
import pen from "../../assets/Dashboard/pen.png";
import { IoPerson } from "react-icons/io5";
import close from "../../assets/Dashboard/close.png";
import openbook from "../../assets/Dashboard/openbook.png";
import Header from "../Assessor/Header";
import completeBatch from "../../actions/AssessorDashboard/completedBatchs";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import arrowDown from "../../assets/Assessor/arrowDown.png";
import { Navigate, useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchFeedbackDetails from "../../actions/AssessorDashboard/fetchFeedbackDetails";
import getLanguageData from "../../actions/AssessorDashboard/getLanguage";
import feedbackForm from "../../actions/AssessorDashboard/feedbackForm";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  mobile_no: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),

  spoc_name: Yup.string().required("SPOC name is required"),

  assessement_lang: Yup.string().required("Assessment language is required"),

  address: Yup.string().required("Address is required"),

  date: Yup.date().required("Date is required").nullable(),

  trainer_name: Yup.string().required("Trainer name is required"),

  trainer_no: Yup.string().required("Trainer number is required"),

  tot_location: Yup.number()
    .positive("TOT location must be a positive number")
    .required("TOT location is required"),

  tot_duration: Yup.number()
    .positive("TOT duration must be a positive number")
    .required("TOT duration is required"),

  trainer_id: Yup.string().required("Trainer ID is required"),
});

const Feedback2 = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});
  const [set_errors, setError] = useState({});
  const [feedbackData, setFeedbackData] = useState({});
  const [language, setLanguage] = useState([]);
  const location = useLocation();
  const exam_id = location.state?.exam_id;
  console.log(exam_id);
  const navigate = useNavigate();

  const goToPage = () => {
    navigate(-2);
  };

  const feedback_ids = feedbackData.feedback_id;
  const assessor_id = feedbackData.feedback_assessor_id;
  console.log(assessor_id);
  console.log(feedback_ids);

  const feedbackHandler = async (formData) => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log(user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
        feedback_id: feedback_ids,
        actual_center_SPOC_name: formData?.spoc_name,
        actual_SPOC_mobile_no: formData?.mobile_no,
        assessment_conducted_language: Number(formData?.assessement_lang),
        actual_center_address: formData?.address,
        actual_date_of_assessment: formData?.date,
        trainer_name: formData?.trainer_name,
        trainer_no: formData?.trainer_no,
        tot_location: formData?.tot_location,
        tot_duration: formData?.tot_duration,
        trainer_id: formData?.trainer_id,
      };
      console.log(data);
      // await validationSchema.validate(data, { abortEarly: false });
      const response = await feedbackForm(data);
      if (response?.data?.code === 1000) {
        toast.success("form submitted");
        setTimeout(() => {
          navigate("/feedback-question", {
            state: { exam_id, feedback_id: feedback_ids, ass_id: assessor_id },
          });
        }, 1000);
      }
    } catch (error) {
      console.log("Error while signup :: ", error);
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      console.log("Error ", newErrors);
      setError(newErrors);
    }
  };

  const getLanguage = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log(user);
      const response = await getLanguageData();
      if (response.data.code === 1000) {
        setLanguage(response.data.lang_list);
      }
      console.log(response);
    } catch (error) {}
  };

  const getFetchFeedbackDetailsData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("assessor_user"));
      console.log(user);
      const data = {
        usercode: user?.usercode,
        assessor_id: user?.id,
        exam_id: exam_id,
      };
      console.log(data);
      const response = await fetchFeedbackDetails(data);
      if (response.data.code === 1000) {
        setFeedbackData(response?.data);
      }
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
    }
  };

  useEffect(() => {
    getFetchFeedbackDetailsData();
    getLanguage();
  }, []);

  return (
    <div className="flex flex-col gap-8 ">
      <Header />
      <div className="flex  flex-col mx-2 m-4 ">
        <div className="flex gap-4 ml-10 mb-4">
          <img
            src={arrowLeft}
            onClick={goToPage}
            className="w-7 h-7 cursor-pointer"
          />
          <span className="font-custom text-nowrap text-lg font-bold">
            Back to dashboard
          </span>
        </div>
        <p className="font-custom font-semibold ml-10">
          Please submit the feedback to improve skill development program.
        </p>
      </div>
      <div className="h-70 border-2  rounded-xl mx-10 -mt-6 mb-7">
        <div className="flex justify-between text-[#1C4481] font-medium px-8 text-lg h-12 items-center rounded-t-xl bg-[#EAF2FE] ">
          <span className="text-nowrap mx-2">Feedback Details</span>
        </div>
        <div className="flex p-4  px-7 flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Assessment Agency Name
                </span>
                <div className="font-medium text-base ml-1">
                  {feedbackData?.detail?.agency_name}
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Assessor’s Aadhar number
                </span>
                <div className="font-medium text-base ml-1">
                  {feedbackData?.detail?.aadhar}
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Training Partner name
                </span>
                <div className="font-medium text-base ml-1">
                  {feedbackData?.detail?.tp_name}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Center Id
                </span>
                <div className="font-medium text-base ml-1">
                  {feedbackData?.detail?.center_id}
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold text-nowrap">
                  Job role for which assessment conducted
                </span>
                <div className="font-medium text-base ml-1">
                  {feedbackData?.detail?.subject_name}
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Conducted
                </span>
                <div className="font-medium text-base ml-1"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full gap-64 mt-4">
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Aadhaar ID
                </span>
                <div className="font-medium text-base ml-1">
                  {feedbackData?.detail?.aadhar}
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5 ml-10">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold text-nowrap">
                  Student Preferred language of assessment
                </span>
                <div className="font-medium text-base ml-1">
                  {feedbackData?.detail?.student_assessment_lang}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Assessor’s Name
                </span>
                <div className="font-medium text-base ml-1">
                  {feedbackData?.detail?.assessor_name}
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold text-nowrap">
                  No of Candidate in the Batches
                </span>
                <div className="font-medium text-base ml-1">
                  {feedbackData?.detail?.total_student}
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Training Center Name
                </span>
                <div className="font-medium text-base ml-1">
                  {feedbackData?.detail?.tc_name}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Batch ID
                </span>
                <div className="font-medium text-base ml-1">
                  {feedbackData?.detail?.batch_name}
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Sector Name
                </span>
                <div className="font-medium text-base ml-1">
                  {feedbackData?.detail?.sector_name}
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Alternate ID (IF any)
                </span>
                <div className="font-medium text-base ml-1">
                  {feedbackData?.detail?.alternate_id}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex gap-2 text-sm w-1/5">
              <img src={openbook} alt="" className="h-5 mt-1" />
              <div className="flex flex-col">
                <span className="text-[#1C4481] text-lg font-bold">
                  Center Address on SDMS
                </span>
                <div className="font-medium text-base ml-1">
                  {feedbackData?.detail?.center_add_sdms}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form className="" onSubmit={handleSubmit(feedbackHandler)}>
        <div className="p-7">
          <div className="flex gap-5 justify-around mx-10  mb-10">
            <div className="relative h-12 w-1/2">
              <div>
                <input
                  type="text"
                  id="floating_filled"
                  className="block p-5 text-black  w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("mobile_no", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Actual SPOC Mobile NO
                  </label>
                </div>
                {errors.mobile_no && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check mobile Number
                  </p>
                )}

                {/* {set_errors.mobile_no && (
                  <div className="error text-red-600 font-medium text-sm">
                    {set_errors?.mobile_no}
                  </div>
                )} */}
              </div>
            </div>
            <div className="relative h-12 w-1/2">
              <div>
                <input
                  type="text"
                  id="floating_filled"
                  className="block p-5 text-black w-full  border border-[#bab8b8] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("spoc_name", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Actual Center SPOC Name
                  </label>
                </div>
                {errors.spoc_name && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check name
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-around mx-10  mb-12">
            <div className="relative h-12 w-1/2">
              <div>
                <select
                  id="floating_filled"
                  className="block p-5 text-black  w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("assessement_lang", {
                    required: true,
                  })}
                >
                  <option value="">Select Language</option>
                  {language?.map((data) => (
                    <option key={data?.id} value={data?.id}>
                      {data.lang_name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
                </div>
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Assessment Conducted Language
                  </label>
                </div>
                {errors.assessement_lang && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check Language
                  </p>
                )}
              </div>
            </div>
            <div className="relative h-12 w-1/2">
              <div>
                <input
                  type="text"
                  id="floating_filled"
                  className="block p-5 text-black w-full  border border-[#bab8b8] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("address", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Aactual Center Address
                  </label>
                </div>
                {errors.address && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check address
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-around mx-10  mb-12">
            <div className="relative h-12 w-1/2">
              <div>
                <input
                  type="date"
                  id="floating_filled"
                  className="block p-5 text-black  w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("date", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Actual Date of Assessment
                  </label>
                </div>
                {errors.date && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check date
                  </p>
                )}
              </div>
            </div>
            <div className="relative h-12 w-1/2">
              <div>
                <input
                  type="text"
                  id="floating_filled"
                  className="block p-5 text-black w-full  border border-[#bab8b8] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("trainer_name", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Trainer name
                  </label>
                </div>
                {errors.trainer_name && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check trainer name
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-around mx-10  mb-12">
            <div className="relative h-12 w-1/2">
              <div>
                <input
                  type="text"
                  id="floating_filled"
                  className="block p-5 text-black  w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("trainer_no", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Trainee No
                  </label>
                </div>
                {errors.trainer_no && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check trainer no
                  </p>
                )}
              </div>
            </div>
            <div className="relative h-12 w-1/2">
              <div>
                <input
                  type="text"
                  id="floating_filled"
                  className="block p-5 text-black w-full  border border-[#bab8b8] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("tot_location", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    TOT location
                  </label>
                </div>
                {errors.tot_location && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check tot location
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className=" flex gap-5 justify-around mx-10  mb-12">
            <div className="relative h-12 w-[49%]">
              <div>
                <input
                  type="text"
                  id="floating_filled"
                  className="block p-5 text-black  w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("tot_duration", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    TOT Duration
                  </label>
                </div>
                {errors.tot_duration && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check tot duration
                  </p>
                )}
              </div>
            </div>
            <div className="relative h-12 w-[49%]">
              <div>
                <input
                  type="text"
                  id="floating_filled"
                  className="block p-5 text-black  w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("trainer_id", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#2e2f30] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Trainer ID
                  </label>
                </div>
                {errors.trainer_id && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check trainer id
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center m-5">
          <button
            type="submit"
            className="border rounded-3xl py-3 px-20  text-white bg-[#1C4481]"
          >
            submit
          </button>
        </div>
      </form>
      {/* <Feedback fd_id={feedback_ids} /> */}
      <ToastContainer />
    </div>
  );
};

export default Feedback2;
