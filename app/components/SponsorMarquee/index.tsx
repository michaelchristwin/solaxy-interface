import type React from "react";
import styles from "./marquee.module.css";
import { motion } from "framer-motion";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

interface SponsorMarqueeProps {
  children: React.ReactNode;
}

const SponsorMarquee: React.FC<SponsorMarqueeProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [multiplier, setMultiplier] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const calculateMultiplier = useCallback(() => {
    if (!containerRef.current || !marqueeRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const marqueeRect = marqueeRef.current.getBoundingClientRect();

    const containerWidth = containerRect.width;
    const marqueeWidth = marqueeRect.width;

    if (marqueeWidth <= 0) return;

    if (marqueeWidth < containerWidth) {
      setMultiplier(Math.ceil(containerWidth / marqueeWidth));
    } else {
      setMultiplier(1);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    calculateMultiplier();
    if (marqueeRef.current && containerRef.current) {
      const resizeObserver = new ResizeObserver(() => calculateMultiplier());
      resizeObserver.observe(marqueeRef.current);
      resizeObserver.observe(containerRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [calculateMultiplier, isMounted]);

  const mutiplyChildren = useCallback(
    (multiplier: number) => {
      const cappedMultiplier = Math.min(
        Math.max(0, Math.floor(multiplier)),
        100
      );
      return [...Array(cappedMultiplier)].map((_, i) => (
        <Fragment key={i}>{children}</Fragment>
      ));
    },
    [children]
  );

  const marqueeAnimation = {
    x: ["0%", "-100%"],
    transition: {
      duration: 10,
      ease: "linear",
      repeat: Infinity,
    },
  };

  if (!isMounted) return null;
  return (
    <div className={styles.container} ref={containerRef}>
      <motion.div animate={marqueeAnimation} className={styles.marquee}>
        <div ref={marqueeRef} className={styles.firstMarquee}>
          {children}
        </div>
        {mutiplyChildren(multiplier - 1)}
      </motion.div>
      <motion.div animate={marqueeAnimation} className={styles.marquee}>
        {mutiplyChildren(multiplier)}
      </motion.div>
    </div>
  );
};
export default SponsorMarquee;
