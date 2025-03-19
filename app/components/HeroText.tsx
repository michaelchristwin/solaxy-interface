import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TextRollerProps {
  texts: string[];
  duration?: number;
  className?: string;
}

const TextRoller: React.FC<TextRollerProps> = ({
  texts,
  duration = 2000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, duration);
    return () => clearInterval(interval);
  }, [texts, duration]);

  return (
    <div
      className={`relative h-auto min-h-12 sm:min-h-16 md:min-h-20 lg:min-h-24 flex items-center ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full"
        >
          {texts[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const HeroText: React.FC = () => {
  const textsToRoll = [`of the m3ters`, `by the m3ters`, `for the m3ters`];

  return (
    <div className="flex-1">
      <TextRoller
        texts={textsToRoll}
        duration={1500}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-yellow-500"
      />
    </div>
  );
};

export default HeroText;
