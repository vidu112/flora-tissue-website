import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Cell {
  id: number;
  x: number;
  y: number;
  size: number;
  type: "parenchyma" | "collenchyma" | "sclerenchyma" | "xylem" | "phloem";
  delay: number;
}

const cellTypes = {
  parenchyma: {
    color: "bg-seafoam-200/40",
    border: "border-seafoam-300/60",
    label: "Parenchyma",
    description: "Thin-walled, living cells",
  },
  collenchyma: {
    color: "bg-fern-500/40",
    border: "border-fern-400/60",
    label: "Collenchyma",
    description: "Flexible support cells",
  },
  sclerenchyma: {
    color: "bg-navy-500/40",
    border: "border-navy-400/60",
    label: "Sclerenchyma",
    description: "Rigid support cells",
  },
  xylem: {
    color: "bg-primary/40",
    border: "border-primary/60",
    label: "Xylem",
    description: "Water transport",
  },
  phloem: {
    color: "bg-marigold-400/40",
    border: "border-marigold-300/60",
    label: "Phloem",
    description: "Sugar transport",
  },
};

export function CellAnimation() {
  const [cells, setCells] = useState<Cell[]>([]);
  const [activeType, setActiveType] = useState<keyof typeof cellTypes | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Generate initial cells in a grid pattern with some randomization
    const initialCells: Cell[] = [];
    const types: (keyof typeof cellTypes)[] = ["parenchyma", "collenchyma", "sclerenchyma", "xylem", "phloem"];
    
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 8; col++) {
        const id = row * 8 + col;
        // Create organic clustering of cell types
        let type: keyof typeof cellTypes;
        if (col < 2) {
          type = "phloem";
        } else if (col > 5) {
          type = "xylem";
        } else if (row < 2) {
          type = Math.random() > 0.5 ? "parenchyma" : "collenchyma";
        } else if (row > 3) {
          type = Math.random() > 0.5 ? "parenchyma" : "sclerenchyma";
        } else {
          type = types[Math.floor(Math.random() * 3)]; // parenchyma, collenchyma, sclerenchyma
        }

        initialCells.push({
          id,
          x: col * 12.5 + (Math.random() * 2 - 1),
          y: row * 16.67 + (Math.random() * 2 - 1),
          size: 10 + Math.random() * 2,
          type,
          delay: Math.random() * 2,
        });
      }
    }
    setCells(initialCells);
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground">
            Cell Types Visualization
          </h3>
          <p className="text-sm text-muted-foreground">
            Hover over cells or select a type to highlight
          </p>
        </div>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all",
            isAnimating
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          {isAnimating ? "Pause Animation" : "Resume Animation"}
        </button>
      </div>

      {/* Cell type selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {Object.entries(cellTypes).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setActiveType(activeType === key ? null : key as keyof typeof cellTypes)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
              activeType === key
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/50"
            )}
          >
            <span className={cn("h-2.5 w-2.5 rounded-full", value.color.replace("/40", ""))} />
            {value.label}
          </button>
        ))}
        {activeType && (
          <button
            onClick={() => setActiveType(null)}
            className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Animation container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-navy-800 to-navy-900">
        {cells.map((cell) => {
          const typeData = cellTypes[cell.type];
          const isHighlighted = !activeType || activeType === cell.type;
          
          return (
            <div
              key={cell.id}
              className={cn(
                "absolute rounded-full border-2 transition-all duration-500",
                typeData.color,
                typeData.border,
                isAnimating && "animate-pulse",
                isHighlighted ? "opacity-100" : "opacity-20",
                activeType === cell.type && "scale-110 ring-2 ring-primary/50"
              )}
              style={{
                left: `${cell.x}%`,
                top: `${cell.y}%`,
                width: `${cell.size}%`,
                height: `${cell.size * 1.33}%`,
                animationDelay: `${cell.delay}s`,
                animationDuration: isAnimating ? "3s" : "0s",
              }}
              onMouseEnter={() => setActiveType(cell.type)}
              onMouseLeave={() => setActiveType(null)}
            />
          );
        })}

        {/* Label overlay */}
        {activeType && (
          <div className="absolute bottom-4 left-4 right-4 animate-fade-in rounded-lg bg-background/90 backdrop-blur p-3">
            <div className="flex items-center gap-3">
              <span className={cn(
                "h-4 w-4 rounded-full",
                cellTypes[activeType].color.replace("/40", "")
              )} />
              <div>
                <div className="font-semibold text-foreground">
                  {cellTypes[activeType].label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {cellTypes[activeType].description}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
        {Object.entries(cellTypes).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2 text-muted-foreground">
            <span className={cn("h-2 w-2 rounded-full flex-shrink-0", value.color.replace("/40", ""))} />
            <span className="truncate">{value.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
