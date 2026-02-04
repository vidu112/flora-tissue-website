import { cn } from "@/lib/utils";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export function ProcessStep({
  number,
  title,
  description,
  isLast = false,
}: ProcessStepProps) {
  return (
    <div className="relative flex gap-6">
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-6 top-14 h-full w-px bg-gradient-to-b from-primary/40 to-transparent" />
      )}

      {/* Number circle */}
      <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-display text-xl font-bold text-primary">
        {number}
      </div>

      {/* Content */}
      <div className="pb-8">
        <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
