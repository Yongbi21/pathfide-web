import React from 'react'
import { Navbar, Footer, ContactPageHero } from "../components";
import styles from '../style';


const ContactUsPage = () => {
  return (
    <div className="w-full bg-dirtywhite overflow-hidden">
    <div className={`bg-dirtywhite border border-b border-[#f6f4fa] border-[1px] ${styles.paddingX} ${styles.flexCenter} shadow-sm fixed top-0 left-0 w-full z-50`}>
      <div className={`${styles.boxWidthNavBar}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-whtite mt-[100px] ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <ContactPageHero />
      </div>
    </div>

    <div className={`bg-blue ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Footer /> 
      </div>
    </div>

    </div>
  )
}

export default ContactUsPage