import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./components/Assessor/Login.jsx";
import AssessorDashboard from "./components/Assessor/AssessorHome.jsx";
import CorporateHome from "./pages/CorporateHome.jsx";
import BatchDetails from "./components/Assessor/BatchDetails.jsx";
import StudentDetails from "./components/Assessor/StudentDetails.jsx";
import VivaPractical from "./components/Viva/VivaPractical.jsx";
import VCPractical from "./components/VCPage/VCPractical.jsx";
import Descriptive from "./components/Assessor/Descriptive.jsx";
import InstructionModal from "./components/Assessor/InstructionModal.jsx";
import InstructionPage from "./components/Assessor/InstructionPage.jsx";
import GeneralInstruction from "./components/Assessor/GeneralInstruction.jsx";
import GeneralInstruction2 from "./components/Assessor/GeneralInstruction2.jsx";
import PracticalPage from "./components/VCPage/PracticalPage.jsx";
import QuestionStatus from "./components/Assessor/QuestionStatus.jsx";
import Feedback from "./components/FeedBack/Feedback.jsx";
import Feedback2 from "./components/FeedBack/Feedback2.jsx";
import AssessorDashboard2 from "./components/Assessor/AssessorDashboard.jsx";
import UploadPhoto from "./components/Assessor/UploadPhoto.jsx";
import ExamList from "./components/Assessor/ExamList.jsx";
import FeedbackSignPage from "./components/FeedBack/FeedbackSignPage.jsx";
import DescriptiveAnswerStudent from "./components/Assessor/DescriptiveAnswerStudent.jsx";
import VivaMarkSubmission from "./components/Viva/VivaMarkSubmission.jsx";
import VivaExam from "./components/Viva/VivaExam.jsx";
import PracticalPageViva from "./components/Practical/PracticalPageViva.jsx";
import PracticalInstruction from "./components/Practical/PracticalInstruction.jsx";
import PracticalInstructionTwo from "./components/Practical/PracticalInsturctionTwo.jsx";
import PracticalExam from "./components/Practical/PracticalExam.jsx";
import PCVivaExam from "./components/MatrixAssess/PCVivaExam.jsx";
import PCVivaStudentList from "./components/MatrixAssess/PCVivaStudentList.jsx";
import PCVivaInstruction from "./components/MatrixAssess/PCVivaInstruction.jsx";
import PCVivaInstructionTwo from "./components/MatrixAssess/PCVivaInstructionTwo.jsx";
import ExamChart from "./components/MatrixAssess/ExamChart.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<CorporateHome />}>
        <Route path="/" element={<Login />}></Route>
      </Route>

      <Route
        path="/assessor-dashboard"
        element={<AssessorDashboard2 />}
      ></Route>
      <Route path="/assessor-examlist" element={<ExamList />}></Route>
      <Route path="/photo-upload" element={<UploadPhoto />}></Route>
      <Route path="/assessor-home" element={<AssessorDashboard />}></Route>
      <Route path="/batchdetails" element={<BatchDetails />}></Route>
      <Route path="/studentdetails" element={<StudentDetails />}></Route>
      <Route path="/vivapractical" element={<VivaPractical />}></Route>
      <Route
        path="/viva-mark-submission"
        element={<VivaMarkSubmission />}
      ></Route>
      <Route path="/vcpractical" element={<VCPractical />}></Route>
      <Route path="/descriptive" element={<Descriptive />}></Route>
      <Route path="/pc-viva" element={<PCVivaExam />}></Route>
      <Route path="/pc-exam-chart" element={<ExamChart />}></Route>
      <Route
        path="/pc-viva-student-list"
        element={<PCVivaStudentList />}
      ></Route>
      <Route path="/instructionmodal" element={<InstructionModal />}></Route>
      <Route path="/insturctionpage" element={<InstructionPage />}></Route>
      <Route
        path="/practical-insturction-page"
        element={<PracticalInstruction />}
      ></Route>
      <Route
        path="/practical-insturction-pagetwo"
        element={<PracticalInstructionTwo />}
      ></Route>
      <Route
        path="/pc-viva-instruction"
        element={<PCVivaInstruction />}
      ></Route>
      <Route
        path="/pc-viva-instruction-pagetwo"
        element={<PCVivaInstructionTwo />}
      ></Route>
      <Route path="/viva-exam" element={<VivaExam />}></Route>
      <Route path="/practical-exam" element={<PracticalExam />}></Route>
      <Route path="/practicaltwo" element={<PracticalPageViva />}></Route>
      <Route
        path="/generalinstruction"
        element={<GeneralInstruction />}
      ></Route>
      <Route
        path="/generalinstruction2"
        element={<GeneralInstruction2 />}
      ></Route>
      <Route path="/startpractical" element={<PracticalPage />}></Route>
      <Route path="/questionstatus" element={<QuestionStatus />}></Route>
      <Route path="/feedback" element={<Feedback2 />}></Route>
      <Route path="/feedback-question" element={<Feedback />}></Route>
      <Route path="/feedback-sign" element={<FeedbackSignPage />}></Route>
      <Route
        path="/descriptive-answer"
        element={<DescriptiveAnswerStudent />}
      ></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
