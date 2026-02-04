import {
  Leaf,
  Droplets,
  Layers,
  ArrowUp,
  Shield,
  Sparkles,
  TreeDeciduous,
  Sprout,
  FlaskConical,
  Microscope,
  BookOpen,
  ChevronDown,
  Brain,
  Dna,
} from "lucide-react";
import { TissueCard } from "./components/TissueCard";
import { SectionHeader } from "./components/SectionHeader";
import { ProcessStep } from "./components/ProcessStep";
import { InteractiveDiagram } from "./components/InteractiveDiagram";
import { PlantQuiz } from "./components/PlantQuiz";
import { CellAnimation } from "./components/CellAnimation";
import { Tree3D } from "./components/Tree3D";
import { SkipLink } from "./components/SEOHead";
import { useState, useEffect, Suspense } from "react";
import { cn } from "./lib/utils";

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "tissues", label: "Plant Tissues" },
    { id: "tree3d", label: "3D Tree" },
    { id: "diagram", label: "Interactive" },
    { id: "quiz", label: "Quiz" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Accessibility: Skip to main content link */}
      <SkipLink />
      
      {/* Navigation - Semantic header with nav */}
      <header role="banner">
        <nav
          aria-label="Main navigation"
          className={cn(
            "fixed top-0 z-50 w-full transition-all duration-300",
            scrollY > 50
              ? "bg-background/80 backdrop-blur-lg border-b border-border"
              : "bg-transparent"
          )}
        >
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-3" aria-label="Flora Tissue - Home">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Leaf className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <span className="font-display text-xl font-semibold text-foreground">
                  Flora Tissue
                </span>
              </a>
              <ul className="hidden md:flex items-center gap-8" role="menubar">
                {navItems.map((item) => (
                  <li key={item.id} role="none">
                    <button
                      role="menuitem"
                      onClick={() => scrollToSection(item.id)}
                      aria-current={activeSection === item.id ? "page" : undefined}
                      className={cn(
                        "text-sm font-medium transition-colors",
                        activeSection === item.id
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              <button 
                className="hidden md:flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                aria-label="Learn more about plant tissues"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Learn More
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content wrapper for accessibility */}
      <main id="main-content" role="main">
        {/* Hero Section */}
        <section
          id="hero"
          aria-labelledby="hero-title"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background Elements - decorative, hidden from screen readers */}
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-500/10 blur-3xl" />
          </div>

          {/* Grid pattern - decorative */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-primary">
                Exploring Plant Biology
              </span>
            </div>

            <h1 id="hero-title" className="mb-6 font-display text-5xl font-bold leading-tight text-foreground sm:text-6xl lg:text-7xl">
              The Building Blocks of
              <span className="block mt-2 gradient-text">Plant Life</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Discover the fascinating world of plant tissues — the specialized
              structures that enable plants to grow, transport nutrients, and
              thrive in diverse environments.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection("tissues")}
                aria-label="Explore plant tissues - scroll to tissues section"
                className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
              >
                Explore Tissues
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </button>
              <button 
                aria-label="View plant biology research"
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition-all hover:border-primary/50 hover:bg-card/80"
              >
                <Microscope className="h-4 w-4" aria-hidden="true" />
                View Research
              </button>
            </div>

            {/* Floating elements - decorative */}
            <div className="absolute top-32 left-16 animate-float hidden lg:block" aria-hidden="true">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-card/50 backdrop-blur">
                <TreeDeciduous className="h-8 w-8 text-primary/60" />
              </div>
            </div>
            <div
              className="absolute bottom-32 right-16 animate-float hidden lg:block"
              style={{ animationDelay: "1s" }}
              aria-hidden="true"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/20 bg-card/50 backdrop-blur">
                <Sprout className="h-8 w-8 text-accent/60" />
              </div>
            </div>
            <div
              className="absolute top-48 right-32 animate-float hidden lg:block"
              style={{ animationDelay: "0.5s" }}
              aria-hidden="true"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-ocean-500/20 bg-card/50 backdrop-blur">
              <FlaskConical className="h-6 w-6 text-ocean-400/60" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={() => scrollToSection("tissues")}
            className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="text-xs font-medium uppercase tracking-widest">
              Scroll to explore
            </span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      </section>

      {/* Permanent Tissues Section */}
      <section id="tissues" aria-labelledby="tissues-title" className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            id="tissues-title"
            subtitle="Permanent Tissues"
            title="The Three Main Tissue Types"
            description="Plants have three fundamental tissue systems that work together to sustain life: dermal, vascular, and ground tissue. Each serves a unique and essential function."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TissueCard
              title="Dermal Tissue"
              description="The protective outer layer of the plant that acts as a barrier against pathogens, water loss, and physical damage."
              icon={Shield}
              color="primary"
              features={[
                "Single-layer epidermis with waxy cuticle",
                "Contains stomata for gas exchange",
                "Guard cells regulate transpiration",
                "Trichomes provide additional protection",
              ]}
              delay={0}
            />

            <TissueCard
              title="Vascular Tissue"
              description="The transport system of the plant, moving water, minerals, and nutrients throughout the entire organism."
              icon={Droplets}
              color="accent"
              features={[
                "Xylem transports water and minerals upward",
                "Phloem distributes sugars throughout",
                "Forms vascular bundles in stems",
                "Contains both living and dead cells",
              ]}
              delay={100}
            />

            <TissueCard
              title="Ground Tissue"
              description="The matrix tissue that fills the space between dermal and vascular tissues, performing photosynthesis and storage."
              icon={Layers}
              color="secondary"
              features={[
                "Parenchyma cells for photosynthesis",
                "Collenchyma provides flexible support",
                "Sclerenchyma gives rigid structure",
                "Stores water and nutrients",
              ]}
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* 3D Tree Section */}
      <section id="tree3d" aria-labelledby="tree3d-title" className="py-24 px-6 bg-card/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            id="tree3d-title"
            subtitle="3D Exploration"
            title="Interactive Tree Anatomy"
            description="Explore a 3D tree model to understand how different plant tissues work together. Click on the bark, branches, leaves, or roots to learn about their structure."
          />
          <div className="mt-8 flex items-center justify-center gap-3 mb-8">
            <TreeDeciduous className="h-5 w-5 text-fern-500" />
            <span className="text-sm text-muted-foreground">
              Drag to rotate, scroll to zoom, click parts to explore
            </span>
          </div>
          <Suspense
            fallback={
              <div className="h-[500px] md:h-[600px] w-full rounded-xl border border-border bg-card/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading 3D model...</p>
                </div>
              </div>
            }
          >
            <Tree3D />
          </Suspense>
        </div>
      </section>

      {/* Interactive Diagram Section */}
      <section id="diagram" aria-labelledby="diagram-title" className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            id="diagram-title"
            subtitle="Interactive Learning"
            title="Explore Stem Cross-Section"
            description="Click or hover over different layers to understand how tissues are arranged within a plant stem."
          />
          <InteractiveDiagram />
        </div>
      </section>

      {/* Cell Animation Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            subtitle="Cell Visualization"
            title="Understanding Cell Types"
            description="Explore the different cell types that make up plant tissues. Each cell type has unique characteristics and functions."
          />
          <div className="mt-8 flex items-center justify-center gap-3 mb-8">
            <Dna className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Hover over cells to identify their types
            </span>
          </div>
          <CellAnimation />
        </div>
      </section>

      {/* Meristematic Tissues Section */}
      <section id="meristematic" className="py-24 px-6 bg-card/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                subtitle="Growth Centers"
                title="Meristematic Tissues"
                description="These are the plant's growth engines — regions of continuous cell division that enable plants to grow throughout their lives."
                align="left"
              />

              <div className="space-y-6">
                <div className="flex gap-4 rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/40">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <ArrowUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-foreground">
                      Apical Meristems
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Located at root and shoot tips, enabling vertical growth
                      in length. These primary meristems are responsible for the
                      plant's primary growth.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-lg border border-border bg-card p-5 transition-all hover:border-accent/40">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Layers className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-foreground">
                      Lateral Meristems
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Facilitate growth in thickness through vascular cambium
                      and cork cambium. These are responsible for secondary
                      growth in woody plants.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-lg border border-border bg-card p-5 transition-all hover:border-ocean-500/40">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-ocean-500/10">
                    <Sprout className="h-6 w-6 text-ocean-400" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-foreground">
                      Intercalary Meristems
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Found only in monocots at leaf bases and nodes, allowing
                      regrowth after damage — like grass growing back after
                      mowing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual element */}
            <div className="relative">
              <div className="relative mx-auto aspect-square max-w-md">
                {/* Concentric circles representing tissue layers */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-[spin_30s_linear_infinite]" />
                <div className="absolute inset-8 rounded-full border-2 border-dashed border-accent/20 animate-[spin_25s_linear_infinite_reverse]" />
                <div className="absolute inset-16 rounded-full border-2 border-dashed border-ocean-500/20 animate-[spin_20s_linear_infinite]" />

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8 rounded-2xl bg-card/80 backdrop-blur border border-border">
                    <div className="mb-4 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 glow">
                      <Leaf className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Cell Division
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Meristems contain undifferentiated cells that divide to
                      form new tissues
                    </p>
                  </div>
                </div>

                {/* Floating labels */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Apical Growth
                  </span>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    Lateral Growth
                  </span>
                </div>
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
                  <span className="rounded-full bg-ocean-500/10 px-3 py-1 text-xs font-medium text-ocean-400">
                    Differentiation
                  </span>
                </div>
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Specialization
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Process Section */}
      <section id="process" className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                subtitle="Plant Development"
                title="From Cell to Organism"
                description="Understanding how plant tissues develop and differentiate is key to comprehending plant growth and development."
                align="left"
              />

              <div className="mt-8">
                <ProcessStep
                  number={1}
                  title="Cell Division in Meristems"
                  description="Meristematic cells undergo mitosis, producing new cells that will eventually differentiate into specialized tissue types."
                />
                <ProcessStep
                  number={2}
                  title="Cell Elongation"
                  description="Newly formed cells absorb water and expand, increasing in size significantly before they begin to specialize."
                />
                <ProcessStep
                  number={3}
                  title="Cell Differentiation"
                  description="Cells develop specialized structures and functions, becoming part of dermal, vascular, or ground tissue systems."
                />
                <ProcessStep
                  number={4}
                  title="Tissue Organization"
                  description="Differentiated cells organize into functional tissues that work together to support the plant's life processes."
                  isLast
                />
              </div>
            </div>

            {/* Stats/Facts Panel */}
            <div className="lg:pl-12">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="mb-4 font-display text-lg font-semibold text-foreground">
                    Key Facts
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-primary/5 p-4">
                      <div className="font-display text-3xl font-bold text-primary">
                        3
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Main tissue types
                      </div>
                    </div>
                    <div className="rounded-lg bg-accent/5 p-4">
                      <div className="font-display text-3xl font-bold text-accent">
                        2
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Vascular tissues
                      </div>
                    </div>
                    <div className="rounded-lg bg-ocean-500/5 p-4">
                      <div className="font-display text-3xl font-bold text-ocean-400">
                        3
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Meristem locations
                      </div>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-4">
                      <div className="font-display text-3xl font-bold text-primary">
                        ∞
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Growth potential
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FlaskConical className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">
                      Did You Know?
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Unlike animals, plants can grow indefinitely because their
                    meristematic tissues retain the ability to divide throughout
                    the plant's life. This is why some trees can live for
                    thousands of years!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section 
        id="quiz" 
        aria-labelledby="quiz-title"
        className="py-24 px-6 bg-gradient-to-b from-card/30 to-background"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            id="quiz-title"
            subtitle="Test Your Knowledge"
            title="Plant Tissue Quiz"
            description="Put your understanding to the test! Answer these questions about plant tissues and see how much you've learned."
          />
          <div className="mt-8 flex items-center justify-center gap-3 mb-8">
            <Brain className="h-5 w-5 text-marigold-400" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">
              5 questions to challenge your knowledge
            </span>
          </div>
          <PlantQuiz />
        </div>
      </section>
      </main>

      {/* Footer - Semantic footer with SEO-rich content */}
      <footer role="contentinfo" className="border-t border-border bg-card/30 py-12 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3 mb-8">
            {/* Brand */}
            <div>
              <a href="/" className="flex items-center gap-3 mb-4" aria-label="Flora Tissue Home">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Leaf className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <span className="font-display text-lg font-semibold text-foreground">
                  Flora Tissue
                </span>
              </a>
              <p className="text-sm text-muted-foreground">
                Interactive educational platform for learning plant anatomy and tissue types through 3D models.
              </p>
            </div>
            
            {/* Quick Links - SEO internal linking */}
            <nav aria-label="Footer navigation">
              <h2 className="font-semibold text-foreground mb-4">Learn About</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#tissues" className="hover:text-primary transition-colors">Plant Tissue Types</a></li>
                <li><a href="#tree3d" className="hover:text-primary transition-colors">3D Tree Anatomy</a></li>
                <li><a href="#diagram" className="hover:text-primary transition-colors">Stem Cross-Section</a></li>
                <li><a href="#meristematic" className="hover:text-primary transition-colors">Meristematic Tissue</a></li>
                <li><a href="#quiz" className="hover:text-primary transition-colors">Biology Quiz</a></li>
              </ul>
            </nav>
            
            {/* Topics - SEO keyword-rich content */}
            <div>
              <h2 className="font-semibold text-foreground mb-4">Topics Covered</h2>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>Dermal Tissue &amp; Epidermis</li>
                <li>Vascular Tissue: Xylem &amp; Phloem</li>
                <li>Ground Tissue: Parenchyma, Collenchyma, Sclerenchyma</li>
                <li>Stomata &amp; Guard Cells</li>
                <li>Apical, Lateral &amp; Intercalary Meristems</li>
              </ul>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-4 pt-8 border-t border-border sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © 2026 Flora Tissue. Educational content for biology students and educators.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Built with React + Three.js + Tailwind CSS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
