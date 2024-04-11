import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function VideoModal({ title, url, composer, onClose }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false); // Initially, sound is on
  //not working good now
  const [progress, setProgress] = useState(0); // New state for tracking progress
  const [isDragging, setIsDragging] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Current playback time
  const [duration, setDuration] = useState(0); // Total duration of the video

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  const handleVideoClick = () => {
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const currentProgress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(currentProgress);
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleProgressDragStart = () => {
    setIsDragging(true);
  };

  const handleProgressDragEnd = () => {
    setIsDragging(false);
    const updatedTime = (progress / 100) * videoRef.current.duration;
    videoRef.current.currentTime = updatedTime;
  };

  const handleProgressDrag = (event) => {
    if (isDragging) {
      const progressBarWidth = event.target.clientWidth;
      const clickPositionX =
        event.pageX - event.target.getBoundingClientRect().left;
      const newProgress = (clickPositionX / progressBarWidth) * 100;
      setProgress(newProgress);
    }
  };

  const handleProgressClick = (event) => {
    const progressBarWidth = event.target.clientWidth;
    const clickPositionX =
      event.pageX - event.target.getBoundingClientRect().left;
    const newProgress = (clickPositionX / progressBarWidth) * 100;
    setProgress(newProgress);
    const updatedTime = (newProgress / 100) * videoRef.current.duration;
    videoRef.current.currentTime = updatedTime;
  };

  return (
    <div className='fixed inset-0 bg-black z-20 flex flex-col justify-between'>
      <div className='flex justify-between items-center text-white p-4 z-30'>
        <span>{title}</span>
        <button className='text-xl' onClick={onClose}>
          X
        </button>
      </div>
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        className='absolute w-full h-screen flex-grow'
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onClick={handleVideoClick}
        onLoadedMetadata={() => setDuration(videoRef.current.duration)}
      >
        <source src={url} type='video/mp4' />
      </video>
      <div
        className='w-full bg-gray-800 flex justify-between items-center p-4 z-30'
        onMouseDown={handleProgressDragStart}
        onMouseUp={handleProgressDragEnd}
        onMouseMove={handleProgressDrag}
        onClick={handleProgressClick}
      >
        <div className='flex items-center'>
          <button
            className='text-white mr-4'
            onClick={() => navigate(`/musician/${composer}`)}
          >
            {composer}
          </button>
          <span className='text-white'>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        <div
          className='flex-grow bg-gray-300 h-1 mx-4'
          style={{ cursor: 'pointer' }}
        >
          <div
            className='bg-blue-600 h-1'
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <button className='text-white' onClick={toggleSound}>
          {isMuted ? 'Sound On' : 'Sound Off'}
        </button>
      </div>
    </div>
  );
}

export default VideoModal;
