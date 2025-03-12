import React, { useState } from 'react';
import styles from "../style";
import { assessment, flashscreen, moodtracker, selfcaretips, threads, videocall } from "../assets";

const MindPathProcess = () => {
  const [currentImage, setCurrentImage] = useState(flashscreen); // Default image

  // Hover handlers
  const handleMouseEnter = (image) => {
    setCurrentImage(image);
  };

  const handleMouseLeave = () => {
    setCurrentImage(videocall); // Reset to default image
  };

  return (
    <section id="mindpathprocess" className={`flex md:flex-row flex-col ${styles.paddingY} items-center justify-center`}>
      {/* Left Content */}
      <div className={`flex-1 flex flex-col gap-4 ${styles.flexCenter} md:my-0 my-10 relative mr-6`}>
        <div className="w-full">
          <h1 className="font-poppins font-bold ss:text-[42px] text-[38px] text-blue mb-8">MindPath Top Features</h1>
        </div>

        {/* Rectangle 1 */}
        <div
          className="w-full hover:bg-[#d5e4f1] duration-300 rounded-md p-8 border-2 border-[#d5e4f1] hover:border-[#d5e4f1] flex items-center gap-6"
          onMouseEnter={() => handleMouseEnter(assessment)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="font-poppins font-semibold text-blue text-[70px] p-2">1</div>
          <div className="ml-4">
            <h2 className="font-poppins font-regular text-blue text-[20px] mb-2">Assessment</h2>
            <p className="font-poppins font-light text-blue w-sm">
              Get personalized assessments that help identify your mental health needs, providing tailored guidance to support your journey toward well-being.
            </p>
          </div>
        </div>

        {/* Rectangle 2 */}
        <div
          className="w-full hover:bg-[#d5e4f1] duration-300 rounded-md p-8 border-2 border-[#d5e4f1] hover:border-[#d5e4f1] flex items-center gap-6"
          onMouseEnter={() => handleMouseEnter(moodtracker)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="font-poppins font-semibold text-blue text-[70px] p-2">2</div>
          <div>
            <h2 className="font-poppins font-regular text-blue text-[20px] mb-2">Mood Tracker</h2>
            <p className="font-poppins font-light text-blue w-sm">
              Monitor your emotions daily with our intuitive mood tracker, designed to help you understand patterns and triggers in your mental health.
            </p>
          </div>
        </div>

        {/* Rectangle 3 */}
        <div
          className="w-full hover:bg-[#d5e4f1] duration-300 rounded-md p-8 border-2 border-[#d5e4f1] hover:border-[#d5e4f1] flex items-center gap-6"
          onMouseEnter={() => handleMouseEnter(selfcaretips)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="font-poppins font-semibold text-blue text-[70px] p-2">3</div>
          <div>
            <h2 className="font-poppins font-regular text-blue text-[20px] mb-2">Selfcare Tips</h2>
            <p className="font-poppins font-light text-blue w-sm">
              Access curated self-care strategies and tips to help you build a healthier routine, reduce stress, and nurture your mental well-being.
            </p>
          </div>
        </div>

        {/* Rectangle 4 */}
        <div
          className="w-full hover:bg-[#d5e4f1] duration-300 rounded-md p-8 border-2 border-[#d5e4f1] hover:border-[#d5e4f1] flex items-center gap-6"
          onMouseEnter={() => handleMouseEnter(threads)} // Replace with another image if available
          onMouseLeave={handleMouseLeave}
        >
          <div className="font-poppins font-semibold text-blue text-[70px] p-2">4</div>
          <div>
            <h2 className="font-poppins font-regular text-blue text-[20px] mb-2">Threads</h2>
            <p className="font-poppins font-light text-blue w-sm">
              Engage with a supportive community through interactive threads where you can share experiences, insights, and find encouragement.
            </p>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className={`flex-1 flex justify-center items-center xl:px-0 sm:px-16 px-6 mb-10`} style={{ height: '100%' }}>
        <img
          src={currentImage}
          alt="MindPath Feature"
          className="w-64 h-auto object-contain rounded-md shadow-xl p-2 rounded-xl mt-12"
        />
      </div>
    </section>
  );
};

export default MindPathProcess;
