"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarding } from "@/lib/stores/onboarding";

export default function OnboardingCompleteView() {
  const router = useRouter();
  const [stage, setStage] = useState(0);
  const { completeStep, setStep } = useOnboarding();

  useEffect(() => {
    setStep("complete");
    completeStep("complete");

    const timers = [
      setTimeout(() => setStage(1), 2000),
      setTimeout(() => setStage(2), 3500),
      setTimeout(() => router.push("/home"), 6000),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [completeStep, router, setStep]);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-800 to-blue-950 -z-20" />

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-3xl space-y-8">
        <div className="flex justify-center gap-2 mb-4 h-8">
          {stage === 0 && (
            <div className="flex gap-2">
              <motion.div
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="w-2 h-2 bg-blue-400 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.3,
                }}
              />
              <motion.div
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.6,
                }}
              />
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {stage === 1 && (
            <motion.div
              key="hi"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg">
                Hi
              </h1>
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                We&apos;re getting some stuff ready
              </h1>
              <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide">
                Please wait, this won&apos;t take too long
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full blur-3xl opacity-10 pointer-events-none" />
    </div>
  );
}
