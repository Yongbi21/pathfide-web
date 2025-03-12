import React from 'react';
import styles from "../style";
import { hand } from "../assets";
import { faqs } from "../constants";

const Faq = () => {
  return (
    <section id="questions" className={`flex md:flex-row flex-col ${styles.paddingY} items-center justify-center`}>

    <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative mr-6`}>
        <img src={hand} alt="Illustration" className="w-[100%] h-[100%]" />
    </div>

      <div className={`flex-1 flex flex-col xl:px-0 sm:px-16 px-6 mb-10 justify-start`}>
        <div className="w-full mb-10">
          <p className="font-poppins font-regular text-blue mb-4">FAQ's</p>
          <h1 className="font-poppins font-bold text-[36px] text-blue mb-4">Commonly Asked Questions</h1>
        </div>

        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow bg-[#d5e4f1] border border-blue border-t-0 border-l-0 border-r-0 border-b-1 mb-4">
            <input type="radio" name="my-accordion-2" defaultChecked={index === 0} />
            <div className="font-poppins font-bold text-[20px] collapse-title text-blue">{faq.question}</div>
            <div className="font-poppins font-regular text-[16px] text-blue collapse-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Faq;
