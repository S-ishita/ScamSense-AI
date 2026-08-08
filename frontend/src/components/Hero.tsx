import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="text-center mb-10">

      <Badge className="rounded-full bg-blue-100 text-blue-700 px-4 py-1">
        🛡 Powered by Gemini AI
      </Badge>

      <h1 className="mt-5 text-6xl font-black tracking-tight text-slate-900">
        ScamSense
      </h1>

      <p className="mt-3 text-2xl font-semibold text-slate-700">
        AI-powered Scam & Phishing Detector
      </p>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-500">
        Detect phishing messages, fake job offers,
        banking scams, UPI frauds and malicious links
        in seconds using Gemini AI.
      </p>

    </section>
  );
}