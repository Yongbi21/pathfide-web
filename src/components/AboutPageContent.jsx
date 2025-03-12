import React from 'react';
import styles from "../style";
import { logo } from "../assets";

const AboutPageContent = () => {
  return (
    <>
      {/* First Section - Introduction */}
      <section id="questions" className={`flex md:flex-row flex-col ${styles.paddingY} items-center justify-center`}>
        <div className={`flex-1 flex flex-col xl:px-0 sm:px-16 px-6 justify-start`}>
          <div className="w-full mb-10">
            <h1 className="font-poppins font-bold text-[32px] text-blue">Our Mission: Empowering Mental Wellness</h1>
          </div>
          <div className={`${styles.paragraph} font-poppins font-normal text-blue`}>   
            <p>At MindPath, our mission is to empower individuals to take control of their mental health. We believe that everyone deserves access to compassionate, professional care, regardless of their background or circumstances. Through innovative technology and a network of dedicated therapists, we aim to break down the barriers that prevent people from seeking help.
            We are committed to creating a community where mental health is prioritized, stigma is eliminated, and healing is within reach for all. Together, we can build a brighter, healthier future—one conversation at a time.</p>
          </div>
        </div>

        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative ml-8`}>
          <img src={logo} alt="Illustration" className="w-[70%] h-[50%]" />
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className={`flex md:flex-row flex-col ${styles.paddingY} items-center justify-center`}>
        <div className={`flex-1 flex flex-col xl:px-0 sm:px-16 px-6 justify-start`}>
          <div className="w-full mb-4">
            <h1 className="font-poppins font-bold text-[32px] text-blue">Our Vision: A Future of Mental Well-Being</h1>
          </div>
          <div className={`${styles.paragraph} font-poppins font-normal text-blue`}>   
            <p>At MindPath, we envision a world where mental health support is readily available to everyone. We strive to create a community where understanding, empathy, and acceptance are the norms. By harnessing technology and compassionate care, we aim to foster a culture where seeking mental health support is as natural as caring for physical health. Together, we’re shaping a future where mental well-being is prioritized and accessible to all.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPageContent;
