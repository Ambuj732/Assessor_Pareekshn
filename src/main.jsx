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
import AssessorDashboard from "./components/Assessor/AssessorDashboard.jsx";
import CorporateHome from "./pages/CorporateHome.jsx";
import BatchDetails from "./components/Assessor/BatchDetails.jsx";
import StudentDetails from "./components/Assessor/StudentDetails.jsx";
import VivaPractical from "./components/Assessor/VivaPractical.jsx";
import VCPractical from "./components/Assessor/VCPractical.jsx";
import Descriptive from "./components/Assessor/Descriptive.jsx";
import VivaByAssessor from "./components/Assessor/VivaByAssessor.jsx";
import InstructionModal from "./components/Assessor/InstructionModal.jsx";
import InstructionPage from "./components/Assessor/InstructionPage.jsx";
import GeneralInstruction from "./components/Assessor/GeneralInstruction.jsx";
import GeneralInstruction2 from "./components/Assessor/GeneralInstruction2.jsx";
import PracticalPage from "./components/Assessor/PracticalPage.jsx";
import QuestionStatus from "./components/Assessor/QuestionStatus.jsx";
import Feedback from "./components/FeedBack/Feedback.jsx";
import Feedback2 from "./components/FeedBack/Feedback2.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<CorporateHome />}>
        <Route path="/" element={<Login />}></Route>
      </Route>
      <Route path="/dashboard" element={<AssessorDashboard />}></Route>
      <Route path="/batchdetails" element={<BatchDetails />}></Route>
      <Route path="/studentdetails" element={<StudentDetails />}></Route>
      <Route path="/vivapractical" element={<VivaPractical />}></Route>
      <Route path="/vcpractical" element={<VCPractical />}></Route>
      <Route path="/descriptive" element={<Descriptive />}></Route>
      <Route path="/practical" element={<VivaByAssessor />}></Route>
      <Route path="/instructionmodal" element={<InstructionModal />}></Route>
      <Route path="/practical" element={<VivaByAssessor />}></Route>
      <Route path="/insturctionpage" element={<InstructionPage />}></Route>
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
