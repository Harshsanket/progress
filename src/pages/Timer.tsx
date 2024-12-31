import React, { useState, useEffect } from "react";

const Timer: React.FC = () => {
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);


  const formatSeconds = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = (minutes: number) => {
    const seconds = minutes * 60;
    setTotalSeconds(seconds);
    setRemainingSeconds(seconds);
    setIsRunning(true);
    
  };


  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && remainingSeconds > 0) {
      intervalId = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            
            clearInterval(intervalId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, remainingSeconds]);

  // Calculate progress percentage
  const progressPercentage =
    totalSeconds > 0 ? (remainingSeconds / totalSeconds) * 100 : 0;

  return (
    <>
      <div className="h-full sm:h-1/2 w-full sm:w-10/12 flex flex-col justify-center">
        <div
          className={`relative flex justify-center items-center 
            sm:text-[20vh] text-4xl p-10 font-bold leading-none`}
        >
          {/* Progress Bar Border */}
          <div
            className="absolute inset-0 border-8"
            style={{
              borderImageSource: `conic-gradient(
      ${
        progressPercentage <= 10
          ? "#FF0000" // Red
          : progressPercentage <= 16
          ? "#FF4500" // Orange-Red
          : progressPercentage <= 23
          ? "#FFA500" // Orange
          : "#088F8F"
      } ${progressPercentage}%, #023020 0deg)`,
              borderImageSlice: 1,
            }}
          ></div>

          {/* Time Display */}
          <span className="relative z-10">
            {(isRunning) ? formatSeconds(remainingSeconds) : `00:00`}
          </span>
        </div>
        <div className="my-5 flex flex-col justify-center items-center p-2">
          <div>
          </div>
          <div className="my-5 grid grid-cols-3 sm:grid-cols-6 gap-4 text-base sm:text-lg">
            <button
              className="border rounded p-2 hover:bg-slate-800"
              onClick={() => startTimer(15)}
            >
              <span>15mins</span>
            </button>
            <button
              className="border rounded p-2 hover:bg-slate-800"
              onClick={() => startTimer(20)}
            >
              <span>20mins</span>
            </button>
            <button
              className="border rounded p-2 hover:bg-slate-800"
              onClick={() => startTimer(30)}
            >
              <span>30mins</span>
            </button>
            <button
              className="border rounded p-2 hover:bg-slate-800"
              onClick={() => startTimer(45)}
            >
              <span>45mins</span>
            </button>
            <button
              className="border rounded p-2 hover:bg-slate-800"
              onClick={() => startTimer(60)}
            >
              <span>1hr</span>
            </button>
            <button
              className="border rounded p-2 hover:bg-slate-800"
              onClick={() => {
                const minutes = window.prompt("Enter minutes:");
                if (minutes && !isNaN(Number(minutes))) {
                  startTimer(Number(minutes));
                }
              }}
            >
              <span>custom</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;