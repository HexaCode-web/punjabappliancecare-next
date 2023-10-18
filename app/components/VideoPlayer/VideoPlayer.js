import React, { useState, useRef } from "react";
import Image from "next/image";
import "./VideoPlayer.css";
const VideoPlayer = ({ videoUrl }) => {
  const [isPlaying, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setFullScreen] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
  };

  const handleLoadedData = () => {
    const video = videoRef.current;
    setDuration(video.duration);
  };

  const skipForward = () => {
    const video = videoRef.current;
    video.currentTime += 5;
  };

  const skipBackward = () => {
    const video = videoRef.current;
    video.currentTime -= 5;
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }

    setFullScreen(!isFullScreen);
  };

  const handleProgressBarClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.pageX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const seekTime = (clickPosition / progressBarWidth) * duration;
    videoRef.current.currentTime = seekTime;
  };

  const handleVolumeIconHover = () => {
    setShowVolumeControl(true);
  };

  const handleVolumeIconLeave = () => {
    setShowVolumeControl(false);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const calculateProgress = () => {
    if (duration > 0) {
      return (currentTime / duration) * 100;
    }
    return 0;
  };
  const handleProgressHover = (e) => {
    const progressBar = e.currentTarget;
    const progressBarWidth = progressBar.clientWidth;
    const hoverPosition = e.pageX - progressBar.getBoundingClientRect().left;
    const hoverTime = (hoverPosition / progressBarWidth) * duration;
    progressBar.title = formatTime(hoverTime);
  };

  const handleProgressLeave = (e) => {
    const progressBar = e.currentTarget;
    progressBar.title = "";
  };

  return (
    <div
      className="video-player-container"
      onMouseEnter={() => {
        setShowControls(true);
      }}
      onDoubleClick={toggleFullScreen}
      onMouseLeave={() => {
        setShowControls(false);
        setShowVolumeControl(false);
      }}
    >
      <video
        onClick={togglePlay}
        ref={videoRef}
        src={videoUrl}
        className="video-player"
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
      ></video>
      <div className={`video-controls ${showControls ? "" : "Fade"}`}>
        <div className="Leftside">
          <Image
            className="play-pause-button"
            onClick={togglePlay}
            src={isPlaying ? "/pause.pmg" : "play.png"}
            alt="Play/Pause"
            width="25"
            height="25"
          />

          <div className="current-time">{formatTime(currentTime)}</div>
        </div>
        <div
          className="progress-bar"
          onClick={handleProgressBarClick}
          onMouseMove={handleProgressHover}
          onMouseLeave={handleProgressLeave}
        >
          <div
            className="progress-bar-fill"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="skip-buttons">
          <Image
            src="/left.png"
            onClick={skipBackward}
            alt="Skip Backward"
            width="25"
            height="25"
          />
          <Image
            src="/right.png"
            onClick={skipBackward}
            alt="Skip Backward"
            width="25"
            height="25"
          />
        </div>
        <div
          className={`volume-control-icon`}
          onMouseEnter={handleVolumeIconHover}
          onMouseLeave={handleVolumeIconLeave}
        >
          <div
            className={`volume-control-range ${
              showVolumeControl ? "" : "fade"
            }`}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              orient="vertical"
            />
          </div>

          <img src={volumeIcon} alt="Volume" />
        </div>
        <div className="full-screen-button" onClick={toggleFullScreen}>
          <img src={fullscreen} alt="Full Screen" />
        </div>
      </div>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export default VideoPlayer;
