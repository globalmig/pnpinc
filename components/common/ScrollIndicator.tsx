"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.span className="w-1 h-2 bg-white rounded-full" animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>

      <motion.p className="mt-2 text-xs text-white text-center tracking-widest" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
        SCROLL
      </motion.p>
    </div>
  );
}
