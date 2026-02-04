import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Optional ID for the heading element - useful for aria-labelledby */
  id?: string;
  /** Heading level: h2 (default) or h3 */
  as?: "h2" | "h3";
}

export function SectionHeader({
  subtitle,
  title,
  description,
  align = "center",
  id,
  as: HeadingTag = "h2",
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left"
      )}
    >
      {subtitle && (
        <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-primary">
          {subtitle}
        </span>
      )}
      <HeadingTag 
        id={id}
        className="mb-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
      </HeadingTag>
      {description && (
        <p
          className={cn(
            "text-lg text-muted-foreground",
            align === "center" ? "mx-auto max-w-2xl" : ""
          )}
        >
          {description}
        </p>
      )}
    </header>
  );
}
