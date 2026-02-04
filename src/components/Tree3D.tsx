import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useRef, useMemo, useCallback } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { X, RotateCcw } from "lucide-react";

// Tree part information
const treePartInfo = {
  bark: {
    title: "Bark (Dermal Tissue)",
    description:
      "The bark is the outermost layer of the stem, composed of cork cells that form the protective outer covering. It contains:",
    tissues: [
      "Cork (Phellem) - Dead cells filled with suberin, providing waterproofing",
      "Cork Cambium (Phellogen) - Meristematic tissue producing new cork cells",
      "Phelloderm - Living parenchyma cells for storage",
      "Lenticels - Pores for gas exchange through the bark",
    ],
    color: "#8B4513",
  },
  branches: {
    title: "Branches (Vascular & Ground Tissue)",
    description:
      "Branches extend the vascular system to transport water and nutrients to leaves. They contain:",
    tissues: [
      "Xylem - Transports water and minerals from roots to leaves",
      "Phloem - Transports sugars from leaves to rest of plant",
      "Vascular Cambium - Produces new vascular tissue for growth",
      "Pith - Central ground tissue for nutrient storage",
    ],
    color: "#6B4423",
  },
  leaves: {
    title: "Leaves (Photosynthetic Tissue)",
    description:
      "Leaves are the primary site of photosynthesis, containing specialized tissues:",
    tissues: [
      "Epidermis - Protective outer layer with stomata for gas exchange",
      "Mesophyll - Palisade and spongy parenchyma cells rich in chloroplasts",
      "Vascular Bundles (Veins) - Xylem and phloem for transport",
      "Guard Cells - Control stomatal opening for CO₂ uptake",
    ],
    color: "#228B22",
  },
  roots: {
    title: "Roots (Absorption Tissue)",
    description:
      "Roots anchor the plant and absorb water and minerals from soil. They contain:",
    tissues: [
      "Root Epidermis - Outer layer with root hairs for absorption",
      "Root Cortex - Ground tissue storing starch and nutrients",
      "Endodermis - Inner layer with Casparian strip controlling water flow",
      "Root Vascular Cylinder - Central xylem and phloem for transport",
    ],
    color: "#654321",
  },
};

type TreePart = keyof typeof treePartInfo;

// Seeded random for consistent tree generation
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Create organic trunk with lathe geometry
function OrganicTrunk({ onClick, hovered, setHovered }: {
  onClick: () => void;
  hovered: boolean;
  setHovered: (h: boolean) => void;
}) {
  const geometry = useMemo(() => {
    // Create trunk profile points
    const points: THREE.Vector2[] = [];
    const segments = 20;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = t * 4 - 1.5; // Height from -1.5 to 2.5
      
      // Organic radius that tapers and has bumps
      let radius = 0.4 * (1 - t * 0.7); // Base taper
      radius += Math.sin(t * 8) * 0.03; // Bumps
      radius += Math.sin(t * 15) * 0.015; // Fine detail
      radius = Math.max(radius, 0.08); // Minimum radius at top
      
      points.push(new THREE.Vector2(radius, y));
    }
    
    return new THREE.LatheGeometry(points, 16);
  }, []);

  return (
    <mesh
      geometry={geometry}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
    >
      <meshStandardMaterial
        color={hovered ? "#A67C52" : "#8B5A2B"}
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  );
}

// Organic branch using tube geometry
function OrganicBranch({ 
  start, 
  end, 
  startRadius, 
  endRadius: _endRadius,
  onClick,
  hovered,
  setHovered,
  midOffset = new THREE.Vector3(0, 0.2, 0)
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  startRadius: number;
  endRadius: number;
  onClick: () => void;
  hovered: boolean;
  setHovered: (h: boolean) => void;
  midOffset?: THREE.Vector3;
}) {
  const geometry = useMemo(() => {
    const mid = start.clone().lerp(end, 0.5).add(midOffset);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return new THREE.TubeGeometry(curve, 12, startRadius, 8, false);
  }, [start, end, startRadius, midOffset]);

  return (
    <mesh
      geometry={geometry}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
    >
      <meshStandardMaterial
        color={hovered ? "#9B7653" : "#6B4423"}
        roughness={0.85}
        metalness={0.05}
      />
    </mesh>
  );
}

// Leaf shape component
function LeafShape({ 
  position, 
  rotation, 
  scale,
  color
}: {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Gentle sway
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = rotation.z + Math.sin(state.clock.elapsedTime * 1.5 + position.x * 5) * 0.08;
    }
  });

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Create leaf shape
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.06, 0.15, 0.12, 0.35, 0.08, 0.5);
    shape.bezierCurveTo(0.04, 0.58, 0.02, 0.62, 0, 0.65);
    shape.bezierCurveTo(-0.02, 0.62, -0.04, 0.58, -0.08, 0.5);
    shape.bezierCurveTo(-0.12, 0.35, -0.06, 0.15, 0, 0);
    
    const geo = new THREE.ShapeGeometry(shape);
    return geo;
  }, []);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
}

// Leaf cluster with many individual leaves
function LeafCluster({ 
  position, 
  onClick,
  hovered,
  setHovered,
  size = 0.6,
  density = 25
}: {
  position: THREE.Vector3;
  onClick: () => void;
  hovered: boolean;
  setHovered: (h: boolean) => void;
  size?: number;
  density?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate leaves
  const leaves = useMemo(() => {
    const leafData: { pos: THREE.Vector3; rot: THREE.Euler; scale: number; color: string }[] = [];
    const seed = position.x * 1000 + position.z * 100;
    
    for (let i = 0; i < density; i++) {
      const theta = seededRandom(seed + i) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(seed + i + 0.1) - 1);
      const r = size * (0.3 + seededRandom(seed + i + 0.2) * 0.7);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.8; // Flatten slightly
      const z = r * Math.cos(phi);
      
      // Color variation
      const hue = 100 + seededRandom(seed + i + 0.3) * 30;
      const lightness = hovered ? 45 + seededRandom(seed + i + 0.4) * 15 : 28 + seededRandom(seed + i + 0.4) * 15;
      
      leafData.push({
        pos: new THREE.Vector3(x, y, z),
        rot: new THREE.Euler(
          seededRandom(seed + i + 0.5) * Math.PI * 0.5,
          theta,
          seededRandom(seed + i + 0.6) * Math.PI * 0.3
        ),
        scale: 0.8 + seededRandom(seed + i + 0.7) * 0.6,
        color: `hsl(${hue}, 65%, ${lightness}%)`
      });
    }
    
    return leafData;
  }, [position, size, density, hovered]);

  // Gentle cluster sway
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + position.x) * 0.03;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 + position.z) * 0.02;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
    >
      {/* Invisible click sphere */}
      <mesh visible={false}>
        <sphereGeometry args={[size * 1.2, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      
      {leaves.map((leaf, i) => (
        <LeafShape
          key={i}
          position={leaf.pos}
          rotation={leaf.rot}
          scale={leaf.scale}
          color={leaf.color}
        />
      ))}
    </group>
  );
}

// Root system
function RootSystem({ onClick, hovered, setHovered }: {
  onClick: () => void;
  hovered: boolean;
  setHovered: (h: boolean) => void;
}) {
  const roots = useMemo(() => {
    const rootData: { start: THREE.Vector3; end: THREE.Vector3; radius: number }[] = [];
    const numRoots = 6;
    
    for (let i = 0; i < numRoots; i++) {
      const angle = (i / numRoots) * Math.PI * 2 + seededRandom(i) * 0.3;
      const length = 0.8 + seededRandom(i + 10) * 0.6;
      
      // Main root
      rootData.push({
        start: new THREE.Vector3(0, -1.5, 0),
        end: new THREE.Vector3(
          Math.cos(angle) * length,
          -2.3 - seededRandom(i + 20) * 0.4,
          Math.sin(angle) * length
        ),
        radius: 0.06 + seededRandom(i + 30) * 0.03
      });
      
      // Secondary roots
      for (let j = 0; j < 2; j++) {
        const subAngle = angle + (seededRandom(i * 10 + j) - 0.5) * 0.8;
        const subLength = 0.3 + seededRandom(i * 10 + j + 5) * 0.3;
        const startT = 0.3 + j * 0.3;
        
        const mainStart = new THREE.Vector3(0, -1.5, 0);
        const mainEnd = new THREE.Vector3(
          Math.cos(angle) * length,
          -2.3 - seededRandom(i + 20) * 0.4,
          Math.sin(angle) * length
        );
        const branchStart = mainStart.clone().lerp(mainEnd, startT);
        
        rootData.push({
          start: branchStart,
          end: new THREE.Vector3(
            branchStart.x + Math.cos(subAngle) * subLength,
            branchStart.y - 0.3 - seededRandom(i * 10 + j + 15) * 0.2,
            branchStart.z + Math.sin(subAngle) * subLength
          ),
          radius: 0.02 + seededRandom(i * 10 + j + 25) * 0.015
        });
      }
    }
    
    return rootData;
  }, []);

  return (
    <group
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
    >
      {roots.map((root, i) => {
        const mid = root.start.clone().lerp(root.end, 0.5);
        mid.y -= 0.1;
        const curve = new THREE.QuadraticBezierCurve3(root.start, mid, root.end);
        
        return (
          <mesh key={i}>
            <tubeGeometry args={[curve, 8, root.radius, 6, false]} />
            <meshStandardMaterial
              color={hovered ? "#8B7355" : "#5D4E37"}
              roughness={0.95}
              metalness={0.02}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Ground with better detail
function Ground() {
  return (
    <group>
      {/* Main grass ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.52, 0]} receiveShadow>
        <circleGeometry args={[5, 48]} />
        <meshStandardMaterial color="#2D4A2D" roughness={1} />
      </mesh>
      
      {/* Soil ring around trunk base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.51, 0]}>
        <ringGeometry args={[0.35, 1.2, 32]} />
        <meshStandardMaterial color="#3D2817" roughness={1} />
      </mesh>
      
      {/* Exposed soil at roots */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.505, 0]}>
        <ringGeometry args={[1.2, 2.0, 32]} />
        <meshStandardMaterial color="#4A3828" roughness={1} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

// Complete tree model
function TreeModel({ onPartClick }: { onPartClick: (part: TreePart) => void }) {
  const [barkHovered, setBarkHovered] = useState(false);
  const [branchHovered, setBranchHovered] = useState(false);
  const [leafHovered, setLeafHovered] = useState(false);
  const [rootHovered, setRootHovered] = useState(false);

  // Generate branch structure
  const branches = useMemo(() => {
    const branchData: { start: THREE.Vector3; end: THREE.Vector3; startRadius: number; endRadius: number; midOffset: THREE.Vector3 }[] = [];
    
    // Main branches from trunk
    const mainBranches = [
      { height: 1.8, angle: 0.4, length: 1.1, tilt: 0.5 },
      { height: 2.0, angle: Math.PI * 0.5, length: 0.9, tilt: 0.4 },
      { height: 1.5, angle: Math.PI, length: 1.0, tilt: 0.55 },
      { height: 2.2, angle: Math.PI * 1.3, length: 0.85, tilt: 0.45 },
      { height: 1.7, angle: Math.PI * 1.7, length: 0.95, tilt: 0.5 },
    ];

    mainBranches.forEach((b, i) => {
      const start = new THREE.Vector3(
        Math.cos(b.angle) * 0.15,
        b.height,
        Math.sin(b.angle) * 0.15
      );
      const end = new THREE.Vector3(
        Math.cos(b.angle) * b.length,
        b.height + b.tilt,
        Math.sin(b.angle) * b.length
      );
      
      branchData.push({
        start,
        end,
        startRadius: 0.08,
        endRadius: 0.03,
        midOffset: new THREE.Vector3(0, 0.15 + seededRandom(i) * 0.1, 0)
      });

      // Sub-branches
      for (let j = 0; j < 2; j++) {
        const t = 0.4 + j * 0.3;
        const subStart = start.clone().lerp(end, t);
        const subAngle = b.angle + (seededRandom(i * 10 + j) - 0.5) * 1.0;
        const subLength = 0.35 + seededRandom(i * 10 + j + 5) * 0.2;
        
        branchData.push({
          start: subStart,
          end: new THREE.Vector3(
            subStart.x + Math.cos(subAngle) * subLength,
            subStart.y + 0.2 + seededRandom(i * 10 + j + 10) * 0.15,
            subStart.z + Math.sin(subAngle) * subLength
          ),
          startRadius: 0.035,
          endRadius: 0.015,
          midOffset: new THREE.Vector3(0, 0.08, 0)
        });
      }
    });

    return branchData;
  }, []);

  // Leaf cluster positions
  const leafClusters = useMemo(() => [
    { pos: new THREE.Vector3(0.85, 2.5, 0.3), size: 0.55, density: 22 },
    { pos: new THREE.Vector3(-0.65, 2.7, 0.35), size: 0.5, density: 20 },
    { pos: new THREE.Vector3(0.2, 2.9, -0.55), size: 0.6, density: 24 },
    { pos: new THREE.Vector3(-0.5, 2.3, -0.5), size: 0.45, density: 18 },
    { pos: new THREE.Vector3(0.55, 2.2, 0.5), size: 0.5, density: 20 },
    { pos: new THREE.Vector3(-0.75, 2.1, 0.1), size: 0.48, density: 19 },
    { pos: new THREE.Vector3(0, 3.1, 0), size: 0.65, density: 26 },
    { pos: new THREE.Vector3(0.4, 2.6, -0.35), size: 0.45, density: 18 },
    { pos: new THREE.Vector3(-0.3, 2.55, 0.45), size: 0.5, density: 20 },
    { pos: new THREE.Vector3(0.6, 2.0, -0.25), size: 0.4, density: 16 },
  ], []);

  return (
    <group>
      {/* Trunk */}
      <OrganicTrunk
        onClick={() => onPartClick("bark")}
        hovered={barkHovered}
        setHovered={setBarkHovered}
      />

      {/* Branches */}
      {branches.map((branch, i) => (
        <OrganicBranch
          key={`branch-${i}`}
          start={branch.start}
          end={branch.end}
          startRadius={branch.startRadius}
          endRadius={branch.endRadius}
          midOffset={branch.midOffset}
          onClick={() => onPartClick("branches")}
          hovered={branchHovered}
          setHovered={setBranchHovered}
        />
      ))}

      {/* Leaf clusters */}
      {leafClusters.map((cluster, i) => (
        <LeafCluster
          key={`leaf-${i}`}
          position={cluster.pos}
          size={cluster.size}
          density={cluster.density}
          onClick={() => onPartClick("leaves")}
          hovered={leafHovered}
          setHovered={setLeafHovered}
        />
      ))}

      {/* Root system */}
      <RootSystem
        onClick={() => onPartClick("roots")}
        hovered={rootHovered}
        setHovered={setRootHovered}
      />

      {/* Ground */}
      <Ground />
    </group>
  );
}

// Info panel component
function InfoPanel({ part, onClose }: { part: TreePart | null; onClose: () => void }) {
  if (!part) return null;
  const info = treePartInfo[part];

  return (
    <div className="absolute top-4 right-4 w-80 max-h-[calc(100%-2rem)] overflow-y-auto rounded-xl border border-border bg-card/95 backdrop-blur-sm p-5 animate-fade-in z-10 shadow-xl">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-muted transition-colors"
      >
        <X className="h-4 w-4 text-muted-foreground" />
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="h-5 w-5 rounded-full shadow-inner" style={{ backgroundColor: info.color }} />
        <h3 className="font-display text-lg font-semibold text-foreground pr-6">
          {info.title}
        </h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{info.description}</p>

      <ul className="space-y-2.5">
        {info.tissues.map((tissue, index) => (
          <li key={index} className="flex items-start gap-2.5 text-sm text-foreground">
            <span
              className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full"
              style={{ backgroundColor: info.color }}
            />
            {tissue}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Main 3D Tree component
export function Tree3D() {
  const [selectedPart, setSelectedPart] = useState<TreePart | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  const handlePartClick = useCallback((part: TreePart) => {
    setSelectedPart(part);
    setIsRotating(false);
  }, []);

  return (
    <div className="relative w-full">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className="rounded-xl bg-card/90 backdrop-blur-sm border border-border px-4 py-3 shadow-lg">
          <p className="text-xs text-muted-foreground mb-2.5 font-medium">
            Click any part to explore
          </p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(treePartInfo) as TreePart[]).map((part) => (
              <button
                key={part}
                onClick={() => handlePartClick(part)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                  selectedPart === part
                    ? "bg-primary/20 text-primary border border-primary/50 shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: treePartInfo[part].color }}
                />
                {part.charAt(0).toUpperCase() + part.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={cn(
            "rounded-xl px-4 py-2 text-xs font-medium transition-all flex items-center gap-2 shadow-lg",
            isRotating
              ? "bg-primary/20 text-primary border border-primary/50"
              : "bg-card/90 text-muted-foreground border border-border backdrop-blur-sm"
          )}
        >
          <RotateCcw className={cn("h-3.5 w-3.5", isRotating && "animate-spin")} style={{ animationDuration: "3s" }} />
          {isRotating ? "Auto-rotating" : "Rotation paused"}
        </button>
      </div>

      {/* Info Panel */}
      <InfoPanel part={selectedPart} onClose={() => setSelectedPart(null)} />

      {/* 3D Canvas */}
      <div className="h-[550px] md:h-[700px] w-full rounded-2xl overflow-hidden border border-border shadow-2xl" style={{ background: "linear-gradient(180deg, #1e3a5f 0%, #0d1f33 50%, #0a1628 100%)" }}>
        <Canvas
          camera={{ position: [5, 2.5, 5], fov: 42 }}
          shadows
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          {/* Lighting setup */}
          <ambientLight intensity={0.35} color="#b8d4e8" />
          <directionalLight
            position={[8, 12, 6]}
            intensity={1.5}
            color="#fff8e7"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={30}
            shadow-camera-near={0.1}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
          />
          <directionalLight position={[-4, 6, -4]} intensity={0.4} color="#87ceeb" />
          <pointLight position={[0, 6, 0]} intensity={0.3} color="#ffd" distance={15} />
          <hemisphereLight args={["#87CEEB", "#2D4A2D", 0.4]} />

          {/* Tree Model */}
          <TreeModel onPartClick={handlePartClick} />

          {/* Orbit Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 1.6}
            autoRotate={isRotating}
            autoRotateSpeed={0.6}
            minDistance={4}
            maxDistance={14}
            target={[0, 0.8, 0]}
            enableDamping
            dampingFactor={0.05}
          />

          {/* Atmospheric fog */}
          <fog attach="fog" args={["#1e3a5f", 12, 30]} />
        </Canvas>
      </div>

      {/* Instructions */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <kbd className="rounded-md bg-muted px-2.5 py-1 font-mono text-[10px] shadow-sm">Drag</kbd>
          <span>Rotate view</span>
        </span>
        <span className="flex items-center gap-2">
          <kbd className="rounded-md bg-muted px-2.5 py-1 font-mono text-[10px] shadow-sm">Scroll</kbd>
          <span>Zoom</span>
        </span>
        <span className="flex items-center gap-2">
          <kbd className="rounded-md bg-muted px-2.5 py-1 font-mono text-[10px] shadow-sm">Click</kbd>
          <span>Select part</span>
        </span>
      </div>
    </div>
  );
}
