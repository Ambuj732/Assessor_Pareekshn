import React from "react";
import getCorporateProfile from "../actions/Dashboard/getCorporateProfile";
import login from "../actions/LoginScreens/login";
function ApiTesting() {
  const apiTestingHandler = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User Respone:", user);
    try {
      const data = {
        usercode: user?.token,
        // id_corp: 2,
        password: 123456,
        username: "Kool@Tech",
        // id_batch: 8644,
        // req_by: "web",
        // exam_id: "8551",
        // student_id: "211086",
        // sub_user_id: "28",
        // user_id: 1,
        // req_by: "web",
        // shuffle_ques: "1",
        // shuffle_ans: 0,
        // total_question: 4,
        // total_time_taken: 3.46,
        // type: 1,
        // students: [{ student_id: 211037, attempted: 1 }],
      };
      console.log("Testing data:", data);
      await login(data);
    } catch (error) {
      console.log("Error while testing api :: ", error);
    }
  };

  return (
    <div className="flex h-screen text-white text-3xl items-center justify-center bg-black">
      <button onClick={apiTestingHandler} className="bg-gray-900 h-40 w-60">
        Testing Page
      </button>
    </div>
  );
}

export default ApiTesting;
