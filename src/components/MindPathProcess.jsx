import React, { useState } from 'react';
import styles from "../style";
import { assessment, flashscreen, moodtracker, selfcaretips, threads, videocall } from "../assets";

const MindPathProcess = () => {
  return (
    <section id="mindpathprocess" className={`flex md:flex-row flex-col ${styles.paddingY} items-center justify-center`}>
      <div className="container mx-auto">
        <span className="block mb-2 text-xs font-medium tracking-widest text-center uppercase">How it works</span>
        <h2 className="font-poppins font-bold ss:text-[42px] text-[28px] text-blue text-center">MindPath’s Key Features</h2>
        <div className="grid gap-6 my-16 lg:grid-cols-4">
          <div className="flex flex-col p-8 space-y-4 rounded-md">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-blue text-white">1</div>
            <p className="font-poppins ss:text-[18px] text-[16px] font-light">
              <b className="font-poppins ss:text-[18px] text-[16px] font-semibold">Assessment. </b>Get personalized assessments that help identify your mental health needs, providing tailored guidance to support your journey toward well-being.
            </p>
          </div>
          <div className="flex flex-col p-8 space-y-4 rounded-md">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-blue text-white">2</div>
            <p className="font-poppins ss:text-[18px] text-[16px] font-light">
            <b className="font-poppins ss:text-[18px] text-[16px] font-semibold">Mood Tracker. </b> Monitor your emotions daily with our intuitive mood tracker, designed to help you understand patterns and triggers in your mental health.
            </p>
          </div>
          <div className="flex flex-col p-8 space-y-4 rounded-md">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-blue text-white">3</div>
            <p className="font-poppins ss:text-[18px] text-[16px] font-light">
            <b className="font-poppins ss:text-[18px] text-[16px] font-semibold">Selfcare Tips. </b>Access curated self-care strategies and tips to help you build a healthier routine, reduce stress, and nurture your mental well-being.
            </p>
          </div>
          <div className="flex flex-col p-8 space-y-4 rounded-md">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-blue text-white">4</div>
            <p className="font-poppins ss:text-[18px] text-[16px] font-light">
            <b className="font-poppins ss:text-[18px] text-[16px] font-semibold">Threads. </b>Engage with a supportive community through interactive threads where you can share experiences, insights, and find encouragement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MindPathProcess;
