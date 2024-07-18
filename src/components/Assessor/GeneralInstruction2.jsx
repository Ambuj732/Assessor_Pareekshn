import React from "react";
import next from "../../assets/Assessor/next.png";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import { Link } from "react-router-dom";

function Instruction() {
  return (
    <div className="min-h-screen">
      <div className="h-screen m-8 bg-[#1C4481] rounded-2xl flex items-center justify-center flex-col gap-6">
        <div
          className={`bg-white w-5/6 h-5/6 rounded-3xl flex justify-center items-center gap-7`}
        >
          <Link to="/generalinstruction">
            <div className="">
              <img src={arrowLeft} alt="" className="h-15" />
            </div>
          </Link>
          <div className="h-3/4  flex flex-col items-center">
            <div className="bg-[#F3F3F3] h-[400px] w-[700px] p-8 rounded-2xl">
              <span className="text-[#0C49CA] font-semibold text-lg">
                General Instruction
              </span>
              <ul className="list-disc p-2 flex flex-col gap-1">
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>Vivamus rutrum nulla sit amet tincidunt congue.</li>
                <li>Nunc eu mi vitae lorem eleifend dictum.</li>
                <li>Sed ac risus viverra, imperdiet augue ac, cursus magna.</li>
                <li>Duis rhoncus nunc a hendrerit volutpat.</li>
              </ul>
            </div>
            <Link to="/startpractical">
              <div className=" mt-10 text-nowrap border cursor-pointer rounded-3xl text-white py-3 px-10 bg-[#1C4481]">
                <span>Start Viva Practical</span>
              </div>
            </Link>
          </div>
        </div>
        <span className="text-xl text-white font-medium">
          Please write to info@spiwd.in, in case of any
          feedback/suggestions/request
        </span>
      </div>
    </div>
  );
}

export default Instruction;
