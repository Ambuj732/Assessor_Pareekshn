import React, { useState, useEffect } from "react";
import blurredImage from "/blurredImage.png";
import expandRight from "/Expand_right.png";
import dots from "/dots.png";
import books from "/bookCorner.png";
import star from "/star.png";
import cap from "/cap.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import fetchPhotoSlider from "../../actions/AssessorDashboard/fetchPhotoSlider";

function AboutPareekshn() {
  const [photo, setPhoto] = useState([]);
  const [errors, setErrors] = useState(null);

  const getFetchPhotoSliderData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const response = await fetchPhotoSlider();
      if (response?.data?.code === 1000) setPhoto(response?.data?.photos);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    getFetchPhotoSliderData();
  }, []);

  return (
    <div className="w-1/2 p-10 gap-4 flex flex-col justify-items-center h-screen relative">
      <img
        src={books}
        alt=""
        className="absolute top-0 right-0 h-20 grayscale"
      />
      <img src={star} alt="" className="absolute top-0 left-1/2 h-24" />
      <img src={cap} alt="" className="absolute h-16 bottom-36 left-2" />
      <div className="flex flex-col text-xl text-[#1C4481]">
        <span className="font-medium">About</span>
        <span className="font-bold text-2xl">Pareekshn</span>
      </div>

      <Carousel
        className="mt-16"
        autoPlay
        autoFocus
        infiniteLoop
        interval={1300}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        {photo &&
          photo.map((data) => (
            <div className="overflow-hidden flex flex-col justify-center items-center gap-4 ">
              <div className="flex justify-center items-center">
                <img src={data.photo_url} alt="" className="h-80" />
                <div className="h-[290px] bg-[#CBD9FF] rounded-3xl w-[420px] z-[-1] absolute"></div>
                <div className="h-[240px] rounded-3xl w-[450px] z-[-1] absolute bg-[#9CB8FF87]"></div>
              </div>
              <p className="text-center text-sm mt-4">
                <span className="font-semibold">{data.photo_text}</span>
              </p>
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default AboutPareekshn;
