import { useState } from "react";
import { cn } from "@/lib/utils";

interface TissueLayer {
  id: string;
  name: string;
  description: string;
  color: string;
  hoverColor: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    width: string;
    height: string;
  };
}

const tissueData: TissueLayer[] = [
  {
    id: "epidermis",
    name: "Epidermis (Dermal)",
    description:
      "The outermost protective layer, typically one cell thick. Contains stomata for gas exchange and a waxy cuticle to prevent water loss.",
    color: "bg-fern-500/40",
    hoverColor: "bg-fern-500/70",
    position: { top: "0", left: "0", width: "100%", height: "15%" },
  },
  {
    id: "cortex",
    name: "Cortex (Ground)",
    description:
      "Located between the epidermis and vascular tissue. Consists of parenchyma cells that store nutrients and may contain chloroplasts for photosynthesis.",
    color: "bg-seafoam-200/30",
    hoverColor: "bg-seafoam-200/60",
    position: { top: "15%", left: "0", width: "100%", height: "25%" },
  },
  {
    id: "phloem",
    name: "Phloem (Vascular)",
    description:
      "Living tissue that transports sugars and organic compounds from leaves to the rest of the plant. Contains sieve tubes and companion cells.",
    color: "bg-marigold-400/40",
    hoverColor: "bg-marigold-400/70",
    position: { top: "40%", left: "10%", width: "35%", height: "20%" },
  },
  {
    id: "xylem",
    name: "Xylem (Vascular)",
    description:
      "Dead at maturity, xylem vessels transport water and minerals upward from roots. Provides structural support with lignified cell walls.",
    color: "bg-primary/40",
    hoverColor: "bg-primary/70",
    position: { top: "40%", left: "55%", width: "35%", height: "20%" },
  },
  {
    id: "pith",
    name: "Pith (Ground)",
    description:
      "Central tissue of the stem, primarily composed of parenchyma cells. Stores nutrients and may become hollow in some species.",
    color: "bg-seafoam-200/20",
    hoverColor: "bg-seafoam-200/50",
    position: { top: "60%", left: "0", width: "100%", height: "25%" },
  },
  {
    id: "endodermis",
    name: "Endodermis",
    description:
      "Inner boundary of the cortex with a specialized waxy strip (Casparian strip) that regulates water and mineral movement into the vascular tissue.",
    color: "bg-terracotta-500/30",
    hoverColor: "bg-terracotta-500/60",
    position: { bottom: "0", left: "0", width: "100%", height: "15%" },
  },
];

export function InteractiveDiagram() {
  const [activeLayer, setActiveLayer] = useState<TissueLayer | null>(null);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
      {/* Diagram */}
      <div className="relative mx-auto w-full max-w-md">
        <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-border bg-card/50 p-4">
          {/* Cross-section visualization */}
          <div className="relative h-full w-full rounded-xl bg-gradient-to-b from-navy-700 to-navy-900 overflow-hidden">
            {tissueData.map((layer) => (
              <button
                key={layer.id}
                className={cn(
                  "absolute transition-all duration-300 cursor-pointer border border-white/10",
                  activeLayer?.id === layer.id ? layer.hoverColor : layer.color,
                  "hover:scale-[1.02] hover:z-10"
                )}
                style={{
                  top: layer.position.top,
                  bottom: layer.position.bottom,
                  left: layer.position.left,
                  right: layer.position.right,
                  width: layer.position.width,
                  height: layer.position.height,
                }}
                onMouseEnter={() => setActiveLayer(layer)}
                onMouseLeave={() => setActiveLayer(null)}
                onClick={() => setActiveLayer(activeLayer?.id === layer.id ? null : layer)}
              >
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white/80 opacity-0 hover:opacity-100 transition-opacity">
                  {layer.name.split(" ")[0]}
                </span>
              </button>
            ))}
            
            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
                  Stem Cross Section
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {tissueData.slice(0, 4).map((layer) => (
            <div
              key={layer.id}
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-1 text-xs transition-all cursor-pointer",
                activeLayer?.id === layer.id
                  ? "bg-white/20 text-foreground"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
              )}
              onMouseEnter={() => setActiveLayer(layer)}
              onMouseLeave={() => setActiveLayer(null)}
            >
              <span className={cn("h-2 w-2 rounded-full", layer.color.replace("/40", "").replace("/30", "").replace("/20", ""))} />
              {layer.name.split(" ")[0]}
            </div>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      <div className="lg:pl-8">
        <div className={cn(
          "rounded-xl border border-border bg-card p-6 transition-all duration-300",
          activeLayer ? "border-primary/50" : ""
        )}>
          {activeLayer ? (
            <div className="animate-fade-in">
              <div className="mb-4 flex items-center gap-3">
                <div className={cn(
                  "h-4 w-4 rounded-full",
                  activeLayer.color.replace("/40", "").replace("/30", "").replace("/20", "")
                )} />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {activeLayer.name}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {activeLayer.description}
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Hover or click on a layer in the diagram to learn more about each tissue type.
              </p>
            </div>
          )}
        </div>

        {/* Quick facts */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-fern-500/10 p-4">
            <div className="text-2xl font-bold text-fern-500">Dermal</div>
            <div className="text-xs text-muted-foreground">Protection</div>
          </div>
          <div className="rounded-lg bg-primary/10 p-4">
            <div className="text-2xl font-bold text-primary">Vascular</div>
            <div className="text-xs text-muted-foreground">Transport</div>
          </div>
          <div className="rounded-lg bg-seafoam-200/20 p-4 col-span-2">
            <div className="text-2xl font-bold text-seafoam-300">Ground</div>
            <div className="text-xs text-muted-foreground">Photosynthesis, Storage & Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
