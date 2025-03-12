import styles from "../style";
import { mindpath } from "../assets";
import { footerLinks} from "../constants";

const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-[1] flex flex-col justify-start mr-10">
        <img
          src={mindpath}
          alt="MindPath"
          className="w-[180px] h-[49px] object-contain"
        />
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        {footerLinks.map((footerlink) => (
          <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
            <h4 className="font-poppins font-bold text-[20px] leading-[27px] text-white">
              {footerlink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerlink.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`font-poppins font-thin text-[14px] leading-[24px] text-white cursor-pointer ${
                    index !== footerlink.links.length - 1 ? "mb-1" : "mb-0"
                  }`}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="w-full flex justify-center items-center md:flex-row flex-col pt-6 mt-8">
      <p className="font-poppins font-thin text-center text-[14px] leading-[27px] text-white">
        © 2024 MindPath. All Rights Reserved
      </p>
    </div>

  </section>
);

export default Footer;
