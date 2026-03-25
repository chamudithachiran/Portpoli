'use client';

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaLinkedinIn, FaFacebook, FaGithub } from "react-icons/fa";

/* ================= SOCIAL LINKS ================= */
const socialLinks = [
  { icon: FaWhatsapp, url: "https://wa.me/94762264561", label: "WhatsApp" },
  { icon: FaLinkedinIn, url: "https://www.linkedin.com/in/chamuditha-pemarathna", label: "LinkedIn" },
  { icon: FaFacebook, url: "https://web.facebook.com/ccmmuudd", label: "Facebook" },
  { icon: FaGithub, url: "https://github.com/chamudithachiran", label: "GitHub" },
];

/* ================= ANIMATIONS ================= */
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const imageAnim = { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } } };

/* ================= AI EFFECTS ================= */
const useIsMobile = () => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => { setMobile(window.innerWidth < 768); }, []);
  return mobile;
};

const MouseGlow = () => {
  const x = useMotionValue(0), y = useMotionValue(0);
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  const background = useTransform([x, y], ([latestX, latestY]) =>
    `radial-gradient(400px at ${latestX}px ${latestY}px, rgba(255,165,0,0.18), transparent 80%)`
  );

  return <motion.div className="pointer-events-none fixed inset-0 z-0" style={{ background }} />;
};

const NeuralShader = () => {
  useEffect(() => {
    const canvas = document.getElementById("neural");
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const nodes = [...Array(70)].map(() => ({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx: Math.random()-0.5, vy: Math.random()-0.5 }));

    const animate = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if(n.x<0||n.x>canvas.width) n.vx*=-1;
        if(n.y<0||n.y>canvas.height) n.vy*=-1;
        nodes.forEach(m=>{
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<120){ ctx.strokeStyle=`rgba(255,165,0,${1-d/120})`; ctx.beginPath(); ctx.moveTo(n.x,n.y); ctx.lineTo(m.x,m.y); ctx.stroke(); }
        });
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);
  return <canvas id="neural" className="fixed inset-0 z-0 opacity-20" />;
};

const AIBrain = () => (
  <motion.svg viewBox="0 0 200 200" className="absolute right-10 top-32 w-40 opacity-40" animate={{ opacity:[0.3,0.6,0.3] }} transition={{ duration:4, repeat:Infinity }}>
    <path d="M100 20 C140 20 160 60 140 90 C160 120 140 160 100 160 C60 160 40 120 60 90 C40 60 60 20 100 20 Z" fill="none" stroke="orange" strokeWidth="2" />
    {[...Array(12)].map((_,i)=><motion.circle key={i} cx={50+Math.random()*100} cy={50+Math.random()*100} r="2" fill="orange" animate={{opacity:[0.2,1,0.2]}} transition={{duration:3, repeat:Infinity}} />)}
  </motion.svg>
);

const AIToggle = ({aiOn,setAiOn}: {aiOn: boolean; setAiOn: (value: boolean) => void}) => (
  <button onClick={()=>setAiOn(!aiOn)} className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-black shadow-lg hover:bg-orange-600">
    {aiOn ? "Disable AI" : "Enable AI"}
  </button>
);

/* ================= COMPONENT ================= */
const HomeSection = () => {
  const isMobile = useIsMobile();
  const [aiOn, setAiOn] = useState(true);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-r from-black via-[#0f0f0f] to-black">

      {aiOn && !isMobile && <MouseGlow />}
      {aiOn && !isMobile && <NeuralShader />}
      {aiOn && <AIBrain />}
      <AIToggle aiOn={aiOn} setAiOn={setAiOn} />

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen gap-12 px-4 sm:px-6 md:px-8">

        {/* LEFT TEXT CONTENT */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 text-center lg:text-left">
          <motion.p variants={item} className="text-sm text-gray-400">Hi I am</motion.p>
          <motion.h2 variants={item} className="text-xl font-semibold text-gray-300">Chamuditha Chiran</motion.h2>
          <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-orange-500">Frontend Developer</motion.h1>

          <motion.div variants={item} className="flex justify-center lg:justify-start gap-4 pt-4">
            {socialLinks.map(({ icon: Icon, url, label }, index) => (
              <motion.a key={index} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} whileHover={{ scale: 1.15 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-500 hover:shadow-[0_0_25px_rgba(255,165,0,0.7)]">
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex justify-center lg:justify-start gap-4 pt-6">
            
            <a href="/cv/ChamudithaChiran-CV.pdf" download className="rounded-md border border-gray-500 px-6 py-2 text-gray-300 hover:border-white hover:text-white">Download CV</a>
          </motion.div>
        </motion.div>

        {/* ================= IMAGE CARD CENTERED ================= */}
        <motion.div variants={imageAnim} initial="hidden" animate="show" whileHover={{ y:-8 }} className="flex justify-center items-center relative">

          <div className="relative w-[420px] h-[420px] rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(255,165,0,0.35)] overflow-hidden">

            {/* Round gradient background */}
            <span className="absolute w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-orange-400/40 via-yellow-300/20 to-transparent blur-3xl pointer-events-none" />

            {/* Image centered */}
            <Image
              src="/images/chamuu.jpg"
              alt="Chamuditha Chiran"
              width={350}
              height={350}
              className="rounded-full object-cover shadow-lg"
              priority
            />

            {/* Optional animated lines overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_,i)=>(
                <motion.div key={i} className="absolute h-px w-full bg-orange-500/20"
                  style={{top:`${(i+1)*15}%`}}
                  animate={{opacity:[0,0.4,0]}}
                  transition={{duration:2+i, repeat:Infinity, ease:"easeInOut"}} />
              ))}
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default HomeSection;
