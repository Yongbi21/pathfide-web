import styles from "../style";
import { displayimage1 } from "../assets"; // Ensure this path and the file name are correct

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      
      {/* Text Section */}
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0`}>
        
        {/* Header Section */}
        <div className="flex flex-row justify-between items-center w-full mb-5">
          <h1 className="flex-1 font-poppins font-bold ss:text-[42px] text-[28px] text-blue">
            Expert Therapists at Your Fingertips Book Face-to-Face or Online Therapy Sessions Easily
          </h1>
        </div>

        {/* Paragraph Section */}
        <p className={`${styles.paragraph} font-poppins font-normal text-gray/70 max-w-[850px] mb-10`}>
          Find licensed therapists and book personalized sessions anytime, anywhere. Whether you’re addressing mental health, stress management, or personal growth, we’re here to support you. 
        </p>
      </div>

      {/* Image Section */}
      <div className="flex-shrink-0 flex ${styles.flexCenter} md:my-0 my-10 ml-10 relative w-auto">
        <img src={displayimage1} alt="Online Session" className="w-[310px] object-contain" />
      </div>
    </section>
  );
};

export default Hero;
