import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>

        <div>
          <h3 className="font-semibold">{title}</h3>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>

      </div>

    </Card>
  );
}