import React from 'react';
import styles from "../style";

const ContactPageHero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY} items-center justify-center`}>
      
      {/* Text Section */}
      <div className="flex flex-col items-center text-center max-w-[800px] w-full">
        
        {/* Header Section */}
        <h1 className="font-poppins font-bold text-[32px] text-blue mb-5">
          Your Path to Support Starts Here
        </h1>

        <p className={`${styles.paragraph} font-poppins font-normal text-gray/70 mb-6`}>
          Need guidance, have questions, or want to connect? We're here to help. Reach out anytime, and let’s take the next step toward mental wellness together.
        </p> 
        
        {/* Contact Button - Properly Centered */}
        <div className="w-full flex justify-center">
          <a 
            href="mailto:seekmindpath@gmail.com" 
            className="bg-blue text-white font-poppins font-semibold py-3 px-6 rounded-lg hover:bg-blue/80 transition duration-300"
          >
            Contact Us
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default ContactPageHero;
