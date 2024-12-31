import React, { useState, useEffect } from "react";
import { getFormattedTime, getFormattedDay } from "../utils/timeFormats";

const Home: React.FC = () => {
  const [localTime, setLocalTime] = useState<string>(getFormattedTime(true));
  const [localDay, setLocalDay] = useState<string>(getFormattedDay());
  const [timeFormat, setTimeFormat] = useState<boolean>(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLocalTime(getFormattedTime(timeFormat));
      setLocalDay(getFormattedDay());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeFormat]);

  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const progress = (currentHour / 24) * 100;

  // Get time-based greeting
  const getGreeting = () => {
    const hour = now.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 22) return "Good Evening";
    return "Good Night";
  };

  // Get color based on time of day
  const getTimeColor = () => {
    const hour = now.getHours();
    if (hour < 6) return "#2C3E50"; // Night
    if (hour < 12) return "#E67E22"; // Morning
    if (hour < 17) return "#3498DB"; // Afternoon
    if (hour < 20) return "#E74C3C"; // Evening
    return "#2C3E50"; // Night
  };

  return (
    <>
      <div className="h-full sm:h-1/2 w-full sm:w-10/12 flex flex-col justify-center">
        {/* Greeting Section */}
        <div className="text-2xl sm:text-3xl mb-4 text-gray-400 font-light">
          <span>{getGreeting()}</span>
        </div>

        {/* Date Section */}
        <div className="justify-start text-4xl sm:text-[5vh] font-light tracking-wide">
          <span>{localDay}</span>
        </div>

        {/* Clock Section */}
        <div
          className={`relative my-8 flex justify-center items-center 
            sm:text-[20vh] text-4xl p-10 font-bold leading-none
            transition-all duration-500 ease-in-out`}
        >
          {/* Progress Bar Border */}
          <div
            className="absolute inset-0 border-8 rounded-xl transition-all duration-500"
            style={{
              borderImageSource: `conic-gradient(${getTimeColor()} ${progress}%, rgba(2, 48, 32, 0.5) 0deg)`,
              borderImageSlice: 1,
            }}
          ></div>

          {/* Time Display */}
          <span className="relative z-10 transition-all duration-300 ease-in-out">
            {localTime}
          </span>
        </div>

        {/* Format Toggle Section */}
        <div className="flex justify-end mt-4">
          <button
            className={`px-4 py-2 rounded-full transition-all duration-300 
              ${timeFormat 
                ? 'bg-opacity-20 hover:bg-opacity-30' 
                : 'bg-opacity-30 hover:bg-opacity-40'} 
              backdrop-blur-sm 
              ${timeFormat ? 'text-gray-300' : 'text-gray-400'}
              border border-gray-600 hover:border-gray-500`}
            onClick={() => setTimeFormat(!timeFormat)}
          >
            <span className="text-sm sm:text-base">
              {timeFormat ? '12hr Format' : '24hr Format'}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;