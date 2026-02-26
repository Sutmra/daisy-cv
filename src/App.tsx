/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import Hero3D from './components/Hero3D';
import Traits from './components/Traits';
import Experience from './components/Experience';
import { ArrowDown } from 'lucide-react';

export default function App() {
  return (
    <div className="text-white min-h-screen font-sans selection:bg-cyan-500 selection:text-black">
      <Hero3D />
      
      {/* Hero Overlay */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="pointer-events-auto"
        >
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            资深产品专家
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-widest uppercase mb-12">
            数字化转型顾问 <span className="mx-4 text-cyan-500">/</span> 能源行业架构师
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 animate-bounce pointer-events-auto cursor-pointer"
        >
          <ArrowDown className="w-8 h-8 text-gray-500" />
        </motion.div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10 bg-gradient-to-b from-transparent via-black/80 to-black">
        <Traits />
        <Experience />
        
        <footer className="py-12 text-center text-gray-600 text-sm border-t border-white/5 bg-black">
          <p>© 2024 Tech Visionary Portfolio. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
