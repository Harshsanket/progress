import React from "react";

const About: React.FC = () => {
  return (
    <>
      <div className="h-full sm:h-1/2 w-full sm:w-10/12 flex flex-col justify-center">
        <span className="font-thin text-lg">
          a <a className="font-bold">Harsh Sanket</a> production —
          <a
            className="text-blue-500 font-normal"
            href="https://www.github.com/harshsanket"
          >
            @Harshsanket
          </a>
        </span>
      </div>
    </>
  );
};

export default About;
