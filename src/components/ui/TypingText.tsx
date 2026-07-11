"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function TypingText({
  text,
  className = "",
  delay = 0.6,
  speed = 40,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setStarted(false);
    const startTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [started, displayed, text, speed]);

  return (
    <motion.p
      className={className}
      style={{ fontFamily: "var(--font-display)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: started ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-0.5 h-[1em] bg-gold ms-1 align-middle"
        />
      )}
    </motion.p>
  );
}
