export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">

  <div className="mx-auto max-w-6xl px-8 py-10">

    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

      <div>

        <h2 className="text-2xl font-bold text-blue-400">
          🛡 ScamSense
        </h2>

        <p className="mt-2 text-slate-300">
          AI-powered Scam & Phishing Detection
        </p>

      </div>

      <div className="text-center md:text-right">

        <p className="text-slate-400">
          Powered by
        </p>

        <p className="font-medium">
          React • Golang • Gemini AI
        </p>

        <p className="mt-3 text-sm text-slate-500">
          © 2026 ScamSense. Built for Awareness.
        </p>

      </div>

    </div>

  </div>

</footer>
  );
}