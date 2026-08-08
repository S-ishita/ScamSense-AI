import type { AnalyzeResponse } from "@/types/analyze";

import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Target,
  FileText,
  Copy,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface Props {
  result: AnalyzeResponse;
}

export default function ResultCard({ result }: Props) {
  const score = result.risk_score;
  const [displayScore, setDisplayScore] = useState(0);

  let badge = "bg-green-100 text-green-700";

  if (score >= 81) {
    badge = "bg-red-100 text-red-700";
  } else if (score >= 61) {
    badge = "bg-orange-100 text-orange-700";
  } else if (score >= 41) {
    badge = "bg-yellow-100 text-yellow-700";
  }

  useEffect(() => {
  const controls = animate(0, score, {
    duration: 1.2,
    ease: "easeOut",
    onUpdate(value) {
      setDisplayScore(Math.round(value));
    },
  });

  return () => controls.stop();
}, [score]);

  return (
    <Card className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
      <CardContent className="p-8">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <Badge className={badge}>
              {result.risk_level}
            </Badge>

            <h2 className="mt-4 text-7xl font-black tracking-tight">
              {displayScore}
            </h2>

            <p className="text-slate-500">
              Risk Score
            </p>

          </div>

          <ShieldAlert className="h-16 w-16 text-red-500" />

        </div>

        <Progress
          value={score}
          className="mt-6 h-4 rounded-full"
        />

        {/* Confidence + Category */}

        <div className="mt-8 grid gap-4 md:grid-cols-2">

          <div className="rounded-2xl bg-slate-50 p-5 text-center">

            <Target className="mx-auto mb-2 h-6 w-6 text-blue-600" />

            <p className="text-sm text-slate-500">
              Confidence
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {result.confidence}%
            </h3>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5 text-center">

            <AlertTriangle className="mx-auto mb-2 h-6 w-6 text-orange-500" />

            <p className="text-sm text-slate-500">
              Category
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              {result.category}
            </h3>

          </div>

        </div>

        {/* Summary */}

        <div className="mt-10">

          <div className="mb-4 flex items-center gap-2">

            <FileText className="h-5 w-5 text-blue-600" />

            <h3 className="text-xl font-semibold">
              Summary
            </h3>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-700">
            {result.summary}
          </div>

        </div>

        {/* Red Flags */}

        <div className="mt-10">

          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">

            <AlertTriangle className="h-5 w-5 text-red-500" />

            Threat Indicators

          </h3>

          <div className="space-y-3">

            {result.red_flags.map((flag) => (

              <div
                key={flag}
                className="flex gap-4 rounded-2xl border border-red-200 bg-red-50 p-5"
              >

                <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-500" />

                <p className="leading-7 text-slate-700">
                  {flag}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Recommendations */}

        <div className="mt-10">

          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">

            <CheckCircle2 className="h-5 w-5 text-emerald-600" />

            Recommended Actions

          </h3>

          <div className="space-y-3">

            {result.recommendations.map((item) => (

              <div
                key={item}
                className="flex gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
              >

                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />

                <p className="leading-7 text-slate-700">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Copy */}

        <Button
          variant="outline"
          className="mt-10 w-full rounded-xl"
          onClick={() =>
            navigator.clipboard.writeText(
              `Risk Score: ${result.risk_score}

Risk Level: ${result.risk_level}

Category: ${result.category}

Confidence: ${result.confidence}%

Summary:
${result.summary}

Threat Indicators:
${result.red_flags.join("\n")}

Recommendations:
${result.recommendations.join("\n")}`
            )
          }
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Security Report
        </Button>

      </CardContent>
    </Card>
  );
}