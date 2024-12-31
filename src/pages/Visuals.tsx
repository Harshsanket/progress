import React, { useEffect, useState } from "react";

const Visuals: React.FC = () => {
  const [progress, setProgress] = useState({
    day: 0,
    week: 0,
    month: 0,
    year: 0,
  });

  // Calculate progress percentages
  const calculateProgress = () => {
    const now = new Date();

    // Day progress
    const dayProgress = Math.round(
      ((now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) /
        (24 * 3600)) *
        100
    );

    // Week progress (assuming week starts on Sunday = 0)
    const weekProgress = Math.round(
      ((now.getDay() * 24 * 3600 +
        now.getHours() * 3600 +
        now.getMinutes() * 60 +
        now.getSeconds()) /
        (7 * 24 * 3600)) *
        100
    );

    // Month progress
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() +1 ,0
    ).getDate();

    const monthProgress = Math.round(
      (((now.getDate() - 1) * 24 * 3600 +
        now.getHours() * 3600 +
        now.getMinutes() * 60 +
        now.getSeconds()) /
        (daysInMonth * 24 * 3600)) * 100
    );

    // Year progress
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const yearProgress = Math.round(
      ((now - startOfYear) / (365.25 * 24 * 3600 * 1000)) * 100
    );

    setProgress({
      day: dayProgress,
      week: weekProgress,
      month: monthProgress,
      year: yearProgress,
    });
  };

  useEffect(() => {
    calculateProgress();
    const interval = setInterval(calculateProgress, 1000);
    return () => clearInterval(interval);
  }, []);

  // Progress bar border
  const ProgressBar = ({
    label,
    progress,
  }: {
    label: string;
    progress: number;
  }) => (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{progress.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor:
              progress <= 25
                ? "#22c55e"
                : progress <= 75
                ? "#8ecae6"
                : "#ef4444",
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <>
      <div className="h-full sm:h-1/2 w-full sm:w-10/12 flex flex-col justify-center">
        <div className="w-full max-w-3xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Time Progress</h2>
          <ProgressBar label="Day Progress" progress={progress.day} />
          <ProgressBar label="Week Progress" progress={progress.week} />
          <ProgressBar label="Month Progress" progress={progress.month} />
          <ProgressBar label="Year Progress" progress={progress.year} />
        </div>
      </div>
    </>
  );
};

export default Visuals;
