import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

import Hero from "@/components/Hero";
import AnalyzeForm from "@/components/AnalyzeForm";
import ResultCard from "@/components/ResultCard";
import {
    Zap,
    ShieldCheck,
    BrainCircuit,
} from "lucide-react";
import Footer from "@/components/Footer";
import type { AnalyzeResponse } from "@/types/analyze";
import FeatureCard from "@/components/FeatureCard";
import Navbar from "@/components/Navbar";

export default function Home() {
    const [result, setResult] =
        useState<AnalyzeResponse | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (result && resultRef.current) {
            setTimeout(() => {
                resultRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 200);
        }
    }, [result]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">

            <div className="fixed inset-0 -z-10 overflow-hidden">

                <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-sky-200 blur-3xl opacity-40" />

                <div className="absolute right-0 top-52 h-96 w-96 rounded-full bg-indigo-200 blur-3xl opacity-40" />

                <div className="absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-cyan-200 blur-3xl opacity-40" />

            </div>
        <Navbar />
            <div className="mx-auto max-w-4xl px-6 py-10">

                <Hero />

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl bg-white p-8 shadow-2xl border border-slate-100"
                >
                    <AnalyzeForm onResult={setResult} />
                </motion.div>

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div ref={resultRef}>
                            <ResultCard result={result} />
                        </div>
                    </motion.div>
                )}

                <div className="mt-12 grid gap-5 md:grid-cols-3">

                    <FeatureCard
                        icon={Zap}
                        title="Instant Detection"
                        description="AI analyzes suspicious messages in seconds."
                    />

                    <FeatureCard
                        icon={ShieldCheck}
                        title="Privacy First"
                        description="Messages are processed securely and never stored."
                    />

                    <FeatureCard
                        icon={BrainCircuit}
                        title="Powered by Gemini"
                        description="Advanced AI reasoning for scam detection."
                    />

                </div>

            </div>
<Footer />
        </main>
    );
}