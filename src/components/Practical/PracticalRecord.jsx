import React, { useState, useRef } from "react";
import RecordRTC from "recordrtc";
import Swal from "sweetalert2";
import play from "../../assets/Assessor/play.png";
import recordAudio from "../../assets/Assessor/recordAudio.png";
import recordVideo from "../../assets/Assessor/recordVideo.png";

function PracticalRecord({
  practicalAnswerUploadHandler,
  onRecordingComplete,
}) {
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [vivaAnswer, setVivaAnswer] = useState(null);
  const [answerType, setAnswerType] = useState("");

  const audioRecorderRef = useRef(null);
  const videoRecorderRef = useRef(null);

  const startAudioRecording = async () => {
    if (audioURL) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to re-record audio. This will overwrite the previous recording.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, re-record it!",
      });
      if (!result.isConfirmed) return;
    }
    setVivaAnswer(null);
    setIsRecordingAudio(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioRecorderRef.current = new RecordRTC(stream, { type: "audio" });
    setAudioURL("");
    setVideoURL("");
    audioRecorderRef.current.startRecording();
  };

  // Stop recording audio
  const stopAudioRecording = () => {
    setIsRecordingAudio(false);
    audioRecorderRef.current.stopRecording(() => {
      const audioBlob = audioRecorderRef.current.getBlob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioURL(audioUrl);

      // Convert blob to Base64
      const reader = new FileReader();
      const newBlob = new Blob([audioBlob], { type: "audio/wav" });
      reader.readAsDataURL(newBlob);
      reader.onloadend = () => {
        const base64data = reader.result;
        setVivaAnswer(base64data);
        setAnswerType("audio");

        // Upload the recorded audio
        // vivaAnswerUploadHandler(base64data, "audio");
        if (onRecordingComplete) {
          onRecordingComplete(base64data, "audio");
          setVivaAnswer(null);
          setAnswerType(null);
        }
      };
    });
  };

  // Start recording video
  const startVideoRecording = async () => {
    if (videoURL) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to re-record video. This will overwrite the previous recording.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, re-record it!",
      });
      if (!result.isConfirmed) return;
    }
    setIsRecordingVideo(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRecorderRef.current = new RecordRTC(stream, { type: "video" });
    setAudioURL("");
    setVideoURL("");
    videoRecorderRef.current.startRecording();
  };

  // Stop recording video
  const stopVideoRecording = () => {
    setIsRecordingVideo(false);
    videoRecorderRef.current.stopRecording(() => {
      const videoBlob = videoRecorderRef.current.getBlob();
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoURL(videoUrl);

      // Convert blob to Base64
      const reader = new FileReader();
      const newBlob = new Blob([videoBlob], { type: "video/webm" });
      reader.readAsDataURL(newBlob);
      reader.onloadend = () => {
        const base64data = reader.result;
        setVivaAnswer(base64data);
        setAnswerType("video");

        // vivaAnswerUploadHandler(base64data, "video");
        if (onRecordingComplete) {
          onRecordingComplete(base64data, "video");
        }
      };
    });
  };

  return (
    <div className="min-h-96 flex items-center gap-16">
      {/* Audio Recording Section */}
      <div
        className={`${
          isRecordingAudio || audioURL ? "w-3/4 h-fit p-4" : "w-1/2 h-60"
        } rounded-[60px] bg-white flex items-center justify-center shadow-2xl flex-col gap-6 transition-all duration-700`}
      >
        <span className="text-xl text-[#1C4481] font-medium">Record Audio</span>
        {audioURL && (
          <div className="w-full flex items-center flex-col">
            <audio
              src={audioURL}
              controls
              className="w-full py-2 px-6"
              preload="auto"
            />
            <span className="text-sm">
              Click play button to listen to the recorded audio
            </span>
          </div>
        )}
        <div className="w-24 h-24 rounded-full shadow-completedHackathon xl bg-white flex items-center justify-center">
          <div className="bg-[#1C4481] rounded-full h-16 w-16 flex items-center justify-center">
            <img
              src={isRecordingAudio ? play : recordAudio}
              alt="Record Audio"
              className={`cursor-pointer z-10 transition-all duration-700 ${
                isRecordingAudio ? "h-8 w-8 object-cover" : "h-16 w-16"
              }`}
              onClick={
                isRecordingAudio ? stopAudioRecording : startAudioRecording
              }
            />
          </div>
        </div>
        <span className="text-sm font-medium">
          {isRecordingAudio
            ? "Click to stop recording"
            : audioURL
            ? "Click to re-record audio"
            : "Click to start recording audio"}
        </span>
      </div>

      {/* Video Recording Section */}
      <div
        className={`${
          isRecordingVideo || videoURL ? "w-3/4 h-fit p-4" : "w-1/2 h-60"
        } rounded-[60px] bg-white flex items-center justify-center shadow-2xl flex-col gap-6 transition-all duration-700`}
      >
        <span className="text-xl text-[#1C4481] font-medium">Record Video</span>
        {videoURL && (
          <video className="w-3/4 p-2" controls preload="auto">
            <source src={videoURL} type="video/webm" />
          </video>
        )}
        <div className="w-24 h-24 rounded-full shadow-completedHackathon xl bg-white flex items-center justify-center">
          <div className="bg-[#1C4481] rounded-full h-16 w-16 flex items-center justify-center">
            <img
              src={isRecordingVideo ? play : recordVideo}
              alt="Record Video"
              className={`cursor-pointer z-10 transition-all duration-700 ${
                isRecordingVideo ? "h-8 w-8 object-cover" : "h-16 w-16"
              }`}
              onClick={
                isRecordingVideo ? stopVideoRecording : startVideoRecording
              }
            />
          </div>
        </div>
        <span className="text-sm font-medium">
          {isRecordingVideo
            ? "Click to stop recording"
            : videoURL
            ? "Click to re-record video"
            : "Click to start recording video"}
        </span>
      </div>
    </div>
  );
}

export default PracticalRecord;
