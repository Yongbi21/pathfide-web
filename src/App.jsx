import styles from "./style";
import { Navbar, Hero, Appointment, Footer, CopyRight, Faq, MindPathProcess} from 
"./components";


const App = () => (

  <div className="bg-dirtywhite w-full overflow-hidden">

<div className={`bg-dirtywhite border border-b border-[#f6f4fa] border-[1px] ${styles.paddingX} ${styles.flexCenter} shadow-sm fixed top-0 left-0 w-full z-50`}>
  <div className={`${styles.boxWidthNavBar}`}>
    <Navbar />
  </div>
</div>

    <div className={`bg-dirtywhite mt-[100px] ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>

    <div className={`appointmentBg ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Appointment /> 
      </div>
    </div>

    <div className={`bg-dirtywhite ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <MindPathProcess /> 
      </div>
    </div>

    <div className={`bg-[#d5e4f1] ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Faq /> 
      </div>
    </div>

    <div className={`bg-blue ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Footer /> 
      </div>
    </div>

    </div>
);

export default App
