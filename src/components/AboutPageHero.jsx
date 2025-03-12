import React from 'react'
import styles from "../style";

const AboutPageHero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY} items-center justify-center`}>
      
      {/* Text Section */}
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 text-center max-w-[800px] w-full mx-auto`}>
        
        {/* Header Section */}
        <div className="flex flex-row justify-center items-center w-full mb-5">
          <h1 className="font-poppins font-bold text-[32px] text-white">
          Breaking Barriers, One Conversation at a Time
          </h1>
        </div>


        <p className={`${styles.paragraph} font-poppins font-normal text-white/70 mb-10`}>
            MindPath was created as a safe space where anyone can find guidance, healing, and hope. By bridging the gap between individuals and licensed therapists, we make professional mental health support available with just a few clicks—whether online or in person.
            Mental wellness is a journey, and every step forward matters. At MindPath, we walk with you.
        </p> 
      </div>
    </section>
  );
};

export default AboutPageHero;