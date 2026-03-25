'use client';

import React from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section className="min-h-screen text-white p-6 md:p-12 relative overflow-hidden">

      {/* Background Grid (same as projects) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f97316" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">
            Get In Touch
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-orange-500 mb-4">
            Contact
          </h2>
          <p className="text-gray-500 text-sm">
            Have a project or idea? Let’s talk.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Contact Info Card */}
          <div className="bg-[#1a1a1a] rounded-2xl border-2 border-orange-500/40 p-6
                          hover:border-orange-500 transition-all duration-300
                          hover:shadow-[0_0_25px_rgba(249,115,22,0.2)]">

            <h3 className="text-xl font-bold mb-6 text-orange-400">
              Contact Info
            </h3>

            <div className="space-y-5 text-gray-400 text-sm">

              <div className="flex items-center gap-3">
                <Mail className="text-orange-500" size={18} />
                <span>chirangachamu03@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-orange-500" size={18} />
                <span>+94 76 226 4561</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-orange-500" size={18} />
                <span>6/243 Senawigama Arawaththa Mahiyanganaya</span>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <a href="https://github.com/chamudithachiran" className="hover:text-orange-400 transition">
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/chamuditha-pemarathna " className="hover:text-orange-400 transition">
                  <Linkedin size={18} />
                </a>
              </div>

            </div>
          </div>

          {/* Contact Form Card */}
          <form
            className="bg-[#1a1a1a] rounded-2xl border-2 border-orange-500/40 p-6
                       hover:border-orange-500 transition-all duration-300
                       hover:shadow-[0_0_25px_rgba(249,115,22,0.2)] space-y-5"
          >

            <h3 className="text-xl font-bold text-orange-400">
              Send Message
            </h3>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700
                         focus:border-orange-500 focus:outline-none text-sm"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700
                         focus:border-orange-500 focus:outline-none text-sm"
            />

            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700
                         focus:border-orange-500 focus:outline-none text-sm"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg
                         bg-orange-500 text-white text-sm font-medium
                         hover:bg-orange-600 transition"
            >
              <Send size={16} />
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;