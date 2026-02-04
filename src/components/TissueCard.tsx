import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface TissueCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  color: "primary" | "accent" | "secondary";
  delay?: number;
}

export function TissueCard({
  title,
  description,
  icon: Icon,
  features,
  color,
  delay = 0,
}: TissueCardProps) {
  const colorClasses = {
    primary: "border-primary/30 hover:border-primary/60",
    accent: "border-accent/30 hover:border-accent/60",
    secondary: "border-ocean-500/30 hover:border-ocean-500/60",
  };

  const iconColorClasses = {
    primary: "text-primary bg-primary/10",
    accent: "text-accent bg-accent/10",
    secondary: "text-ocean-400 bg-ocean-500/10",
  };

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-lg border-2 bg-card p-6 card-hover",
        colorClasses[color]
      )}
      style={{ animationDelay: `${delay}ms` }}
      aria-label={`${title} - plant tissue type`}
    >
      {/* Decorative gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
        aria-hidden="true"
      />
      
      <div className="relative z-10">
        <div
          className={cn(
            "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
            iconColorClasses[color]
          )}
          aria-hidden="true"
        >
          <Icon className="h-7 w-7" />
        </div>

        <h3 className="mb-3 text-xl font-semibold text-foreground">{title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <ul className="space-y-2" aria-label={`Features of ${title}`}>
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
