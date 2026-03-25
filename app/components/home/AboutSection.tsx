'use client';
import React from 'react';
import Image from 'next/image';
import { Github, Linkedin, Twitter, Facebook, Code, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'React', icon: Code },
  { name: 'Next.js', icon: Monitor },
  { name: 'TailwindCSS', icon: Code },
  { name: 'JavaScript', icon: Code },
  { name: 'TypeScript', icon: Code },
];

const AboutPage: React.FC = () => {

  const fadeIn = (direction = 'up', delay = 0) => ({
    hidden: { opacity: 0, y: direction === 'up' ? 20 : 0, x: direction === 'left' ? -20 : 0 },
    show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.7, delay } },
  });

  return (
    <div className="bg-black text-white selection:bg-orange-500/30">

      {/* ================= HERO / INTRO ================= */}
      <section className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center gap-12 px-6 lg:px-20 py-16 relative">

        {/* Left: Profile Image */}
        <motion.div
          className="flex-1 flex justify-center relative"
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Glow behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-orange-500/20 blur-[140px] rounded-full animate-pulse"></div>

          {/* Rings for depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-orange-500/20 animate-spin-slow"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-orange-500/10 animate-spin-slow-reverse"></div>

          {/* Profile Image */}
          <div className="relative w-[300px] h-[400px] bg-neutral-900 rounded-[60px] border-8 border-neutral-900 overflow-hidden shadow-2xl ring-1 ring-white/10">
            <Image 
              src="/images/about.jpg"
              alt="Chamuditha Chiran Profile"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          
        </motion.div>

        {/* Right: Text Content */}
        <motion.div 
          className="flex-1 space-y-6 text-center lg:text-left"
          variants={fadeIn('up', 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-lg font-medium">Hi, I am</p>
          <h1 className="text-6xl md:text-7xl font-black text-orange-500 uppercase">Chamuditha Chiran</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-100">Frontend Developer & UI/UX Enthusiast</h2>
          <p className="text-gray-400 max-w-lg leading-relaxed mt-4">
            I create modern, interactive, and responsive web applications with React, Next.js, and TailwindCSS. 
            I focus on clean UI/UX, performance, and accessibility.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
            <button className="bg-orange-600 hover:bg-orange-500 px-8 py-3 rounded-xl font-bold shadow-lg">Contact Me</button>
          </div>

          
        </motion.div>

      </section>

    </div>
  );
};

export default AboutPage;
