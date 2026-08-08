import { ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="text-center py-12">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
        <ShieldCheck className="h-10 w-10 text-blue-600" />
      </div>

      <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
        ScamSense
      </h1>

      <p className="mt-4 text-xl text-slate-600">
        AI-powered Scam & Phishing Detector
      </p>

      <p className="mx-auto mt-6 max-w-2xl text-slate-500">
        Detect phishing messages, fake job offers, banking scams,
        UPI frauds and malicious links in seconds using Gemini AI.
      </p>
    </header>
  );
}