import { Link, type LinkProps } from "@tanstack/react-router";
import {
  Activity,
  AudioLines,
  ChevronRight,
  Circle,
  Disc3,
  Download,
  Drum,
  Headphones,
  KeyboardMusic,
  Menu,
  Mic2,
  MonitorDown,
  Music2,
  Play,
  Search,
  Send,
  SlidersHorizontal,
  Square,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { helpCenterCategories, supportCategories, synclabConfig, type Availability } from "@/lib/synclab-config";

type PageMode = "home" | "features" | "ai" | "studio" | "desktop" | "pricing" | "support" | "help" | "config" | "privacy" | "terms" | "contact";

type StatusTone = "ready" | "soon" | "development" | "desktop";


const footerLinks = [
  { label: "Features", to: "/features" },
  { label: "AI Tools", to: "/ai-tools" },
  { label: "Desktop", to: "/desktop" },
  { label: "Pricing", to: "/pricing" },
  { label: "Support", to: "/support" },
  { label: "Help Center", to: "/help-center" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Contact", to: "/contact" },
  { label: "Config", to: "/config" },
] as const satisfies ReadonlyArray<{ label: string; to: LinkProps["to"] }>;

const navItems = [
  { label: "Features", to: "/features" },
  { label: "AI Tools", to: "/ai-tools" },
  { label: "Studio", to: "/studio" },
  { label: "Desktop", to: "/desktop" },
  { label: "Pricing", to: "/pricing" },
  { label: "Support", to: "/support" },
] as const;

const featureCards = [
  {
    title: "AI Vocal Forge",
    icon: Mic2,
    status: synclabConfig.availability.aiVocalForge,
    description: "Generate and shape vocals while keeping musical decisions in your hands.",
    items: ["Voice", "Emotion", "Pitch", "Formant", "Speed", "Style", "Pronunciation", "Timing"],
  },
  {
    title: "Hum-to-Beat",
    icon: AudioLines,
    status: synclabConfig.availability.humToBeat,
    description: "Turn human rhythm ideas into usable beats placed directly on the timeline.",
    items: ["Humming", "Beatboxing", "Tapping", "Clapping", "Rhythm ideas", "Beat mapping"],
  },
  {
    title: "Hardware-Style Synth",
    icon: KeyboardMusic,
    status: "in-development" as Availability,
    description: "A tactile sound-design environment shaped like serious studio hardware.",
    items: ["Oscillators", "Filters", "Envelopes", "LFOs", "Modulation", "Arpeggiator", "Step sequencer", "Effects", "Presets"],
  },
  {
    title: "Drum Machine",
    icon: Drum,
    status: "in-development" as Availability,
    description: "Fast pattern building with performance controls and production-ready sequencing.",
    items: ["Velocity pads", "Drum kits", "Step sequencing", "Swing", "Probability", "Rolls", "Velocity", "Effects"],
  },
  {
    title: "Powerful Sampler",
    icon: Disc3,
    status: "in-development" as Availability,
    description: "Shape recordings, one-shots, chops and instruments without leaving the project.",
    items: ["Trim", "Time stretch", "Pitch", "Reverse", "Loop", "ADSR", "Filtering", "Keyboard mapping", "MIDI recording", "Resampling"],
  },
  {
    title: "Professional Mixer",
    icon: SlidersHorizontal,
    status: "in-development" as Availability,
    description: "A complete signal-flow view for balancing, routing, automating and finishing tracks.",
    items: ["Channel strips", "Faders", "Meters", "Pan", "Mute", "Solo", "Buses", "Sends", "Returns", "Effects", "Routing", "Automation", "Mastering"],
  },
];

const aiTools = [
  ["AI Vocal Forge", "Create vocals from text and lyrics with editable voice, emotion and timing."],
  ["Hum-to-Beat", "Convert human rhythm ideas into structured beats."],
  ["AI Co-Producer", "Assist with basslines, drums, synth melodies, chords, percussion, arrangements, transitions, breakdowns and drops."],
  ["Stem Separator", "Separate supported material into vocals, drums, bass, guitar, piano, other and instrumental stems."],
  ["Voice Remover", "Create an instrumental version from supported audio."],
  ["AI Mastering", "Analyze dynamics, frequency balance, loudness, stereo image and peaks, then suggest mastering adjustments."],
] as const;

const firstRunActions = [
  "Make a Beat",
  "Record Vocals",
  "Create AI Vocals",
  "Create a Synth Sound",
  "Create a Drum Pattern",
  "Chop a Sample",
  "Mix a Track",
  "Master a Track",
  "Open a Project",
  "Learn SYNCLAB",
];

const screenshotNames = [
  "Main DAW",
  "AI Vocal Forge",
  "Drum Machine",
  "Synth",
  "Sampler",
  "Mixer",
  "Hum-to-Beat",
  "AI Co-Producer",
] as const;

function statusLabel(status: Availability) {
  if (status === "available") return "Available Now";
  if (status === "desktop-version") return "Desktop Version";
  if (status === "in-development") return "In Development";
  return "Coming Soon";
}

function statusTone(status: Availability): StatusTone {
  if (status === "available") return "ready";
  if (status === "desktop-version") return "desktop";
  if (status === "in-development") return "development";
  return "soon";
}

function StatusBadge({ status }: { status: Availability }) {
  const tone = statusTone(status);
  return <span className={cn("status-badge", `status-${tone}`)}>{statusLabel(status)}</span>;
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-3 focus-ring rounded-md" aria-label="SYNCLAB Vocal Forge home">
      <span className="brand-emblem" aria-hidden="true">
        <span />
      </span>
      <span className="leading-none">
        <span className={cn("block font-display font-bold tracking-normal text-foreground", compact ? "text-lg" : "text-xl")}>SYNCLAB</span>
        <span className="mt-1 block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">VOCAL FORGE</span>
      </span>
    </Link>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <BrandMark />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="nav-link" activeProps={{ className: "nav-link nav-link-active" }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <DownloadButton label="Download SYNCLAB" />
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation menu" onClick={() => setOpen(true)}>
          <Menu />
        </Button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 bg-background/98 px-5 py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <BrandMark compact />
            <Button variant="ghost" size="icon" aria-label="Close navigation menu" onClick={() => setOpen(false)}>
              <X />
            </Button>
          </div>
          <nav className="mt-10 grid gap-3" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="mobile-nav-link" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8">
            <DownloadButton label="Download SYNCLAB" fullWidth />
          </div>
        </div>
      ) : null}
    </header>
  );
}

function DownloadButton({ label, fullWidth = false }: { label: string; fullWidth?: boolean }) {
  const hasMac = synclabConfig.urls.macDownload.length > 0;
  if (!hasMac) {
    return (
      <Button variant="signal" size="lg" disabled className={cn(fullWidth && "w-full")} aria-label="Desktop download coming soon">
        <Download />
        Coming Soon
      </Button>
    );
  }
  return (
    <Button asChild variant="signal" size="lg" className={cn(fullWidth && "w-full")}>
      <a href={synclabConfig.urls.macDownload}>
        <Download />
        {label}
      </a>
    </Button>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-hero-grid">
      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-20">
        <div className="relative z-10">
          <p className="eyebrow">SYNCLAB MUSIC TECHNOLOGY</p>
          <h1 className="mt-5 font-display text-6xl font-bold leading-[0.86] tracking-normal text-foreground sm:text-7xl lg:text-8xl">
            <span className="block">Create.</span>
            <span className="block">Record.</span>
            <span className="block">Produce.</span>
            <span className="headline-finish block">Finish.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            SYNCLAB Vocal Forge is a connected music-production workstation built for creators who want powerful production tools without a complicated workflow.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <DownloadButton label="Download SYNCLAB" fullWidth />
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/features">
                Explore Features
                <ChevronRight />
              </Link>
            </Button>
          </div>
          <p className="mt-5 font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground">macOS • Windows • Web • Mobile-ready</p>
        </div>
        <div className="relative z-10">
          <DawMockup />
        </div>
      </div>
    </section>
  );
}

function DawMockup() {
  const tracks = [
    { name: "DRUM", blocks: ["w-28", "w-36", "w-24", "w-32"], tone: "clip-percussion" },
    { name: "BASS", blocks: ["w-44", "w-28", "w-40"], tone: "clip-bass" },
    { name: "SYNTH", blocks: ["w-24", "w-52", "w-32"], tone: "clip-synth" },
    { name: "AI VOX", blocks: ["w-36", "w-28", "w-48"], tone: "clip-vocal" },
  ];
  const meters = ["h-16", "h-24", "h-20", "h-28", "h-14", "h-32"];
  return (
    <div className="daw-shell" aria-label="SYNCLAB Vocal Forge digital audio workstation preview">
      <div className="daw-topbar">
        <div>
          <p className="font-display text-sm font-bold text-foreground">SYNCLAB</p>
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted-foreground">VOCAL FORGE</p>
        </div>
        <div className="transport" aria-label="Transport controls">
          <span className="transport-button"><Play /></span>
          <span className="transport-button"><Square /></span>
          <span className="transport-record"><Circle /></span>
        </div>
        <div className="hidden gap-2 sm:flex">
          <span className="readout">128 BPM</span>
          <span className="readout">D MIN</span>
        </div>
      </div>
      <div className="daw-grid">
        <div className="timeline-panel">
          <div className="timeline-ruler">
            {Array.from({ length: 8 }).map((_, index) => (
              <span key={index}>{index + 1}</span>
            ))}
          </div>
          <div className="track-stack">
            {tracks.map((track, trackIndex) => (
              <div className="track-row" key={track.name}>
                <div className="track-label">
                  <span>{track.name}</span>
                  <span className="tiny-meter" />
                </div>
                <div className="clip-lane">
                  {track.blocks.map((block, blockIndex) => (
                    <span key={`${track.name}-${blockIndex}`} className={cn("clip", track.tone, block, blockIndex % 2 === 0 && "clip-alt")} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mixer-panel" aria-label="Mixer preview">
          {meters.map((height, index) => (
            <div className="mixer-strip" key={index}>
              <span className="knob" />
              <span className="meter"><span className={height} /></span>
              <span className="fader" />
            </div>
          ))}
          <div className="master-strip">
            <span>MASTER</span>
            <span className="master-meter" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatementSection() {
  return (
    <section className="border-b border-border bg-panel px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-4xl font-bold uppercase leading-tight tracking-normal text-foreground sm:text-5xl lg:text-7xl">
          ONE SCREEN. ONE PROJECT. ONE TIMELINE. <span className="text-signal">ONE CONNECTED STUDIO.</span>
        </p>
      </div>
    </section>
  );
}

function FeaturesSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section-shell bg-background" aria-labelledby="features-heading">
      <SectionIntro
        eyebrow="Production system"
        title="Everything connected."
        id="features-heading"
        text="Build a track from the first idea to the final master without breaking your creative flow."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featureCards.map((feature) => {
          const Icon = feature.icon;
          return (
            <article key={feature.title} className="feature-card">
              <div className="flex items-start justify-between gap-4">
                <span className="icon-tile"><Icon /></span>
                <StatusBadge status={feature.status} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-foreground">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${feature.title} controls`}>
                {(compact ? feature.items.slice(0, 8) : feature.items).map((item) => (
                  <li key={item} className="chip">{item}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function AIToolsSection() {
  return (
    <section className="section-shell border-y border-border bg-panel" aria-labelledby="ai-heading">
      <SectionIntro
        eyebrow="Creator-controlled intelligence"
        title="AI Tools"
        id="ai-heading"
        text="SYNCLAB combines traditional music production with AI-assisted creation, designed to help the creator while keeping the creator in control."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {aiTools.map(([title, description], index) => (
          <article key={title} className="ai-card">
            <div className="flex items-center justify-between gap-4">
              <span className="number-mark">0{index + 1}</span>
              <StatusBadge status={index < 2 ? "in-development" : "coming-soon"} />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-foreground">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StudioSection() {
  return (
    <section className="section-shell bg-background" aria-labelledby="studio-heading">
      <SectionIntro
        eyebrow="Production environment"
        title="The SYNCLAB studio view."
        id="studio-heading"
        text="Timeline, performance, sequencing and mixing stay connected in a single production environment."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="studio-board">
          <div className="studio-tabs" aria-label="Studio areas">
            {['Timeline', 'Piano Roll', 'Mixer', 'Automation'].map((tab) => <span key={tab}>{tab}</span>)}
          </div>
          <div className="studio-composition">
            <div className="arrangement-view">
              {['Audio', 'MIDI', 'Automation', 'Markers', 'Song Sections', 'Loop Regions'].map((item, index) => (
                <div key={item} className="arrangement-row">
                  <span>{item}</span>
                  <span className={cn("arrangement-line", index % 2 === 0 ? "w-3/4" : "w-1/2")} />
                </div>
              ))}
            </div>
            <div className="piano-roll" aria-label="Piano roll preview">
              {Array.from({ length: 24 }).map((_, index) => (
                <span key={index} className={cn(index % 5 === 0 ? "note-long" : "note-short", index % 3 === 0 && "note-muted")} />
              ))}
            </div>
          </div>
        </div>
        <div className="xy-card">
          <div className="xy-pad" aria-label="XY performance pad">
            <span className="xy-crosshair" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground">XY Pad</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Control two parameters simultaneously, automate moves, or map gestures to MIDI.
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
            <li>Filter + Reverb</li>
            <li>Distortion + Delay</li>
            <li>Dry/Wet + Stereo Width</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function DesktopSection() {
  const platforms = [
    ["macOS", "Native desktop workflow.", synclabConfig.availability.macInstaller],
    ["Windows", "Professional desktop production.", synclabConfig.availability.windowsInstaller],
    ["Web", "Access SYNCLAB Vocal Forge from the browser.", synclabConfig.availability.web],
  ] as const;
  const architecture = ["Native audio engine", "Native MIDI", "Local project files", "Local sample libraries", "Plugin architecture", "Project recovery", "Autosave", "Low-latency audio", "Local rendering/export"];
  return (
    <section className="section-shell border-y border-border bg-panel" aria-labelledby="desktop-heading">
      <SectionIntro
        eyebrow="Desktop vision"
        title="A real desktop music workstation"
        id="desktop-heading"
        text="SYNCLAB Vocal Forge is designed to grow beyond the browser into a downloadable desktop music-production environment."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {platforms.map(([name, description, status]) => (
          <article key={name} className="platform-card">
            <MonitorDown className="size-7 text-signal" />
            <h3 className="mt-5 font-display text-2xl font-bold text-foreground">{name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            <div className="mt-5"><StatusBadge status={status} /></div>
          </article>
        ))}
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="availability-panel">
          <h3 className="font-display text-2xl font-bold text-foreground">Available Now</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">The current website prepares the product launch, download flow, support structure and official SYNCLAB presentation.</p>
        </div>
        <div className="availability-panel">
          <h3 className="font-display text-2xl font-bold text-foreground">Coming to Desktop</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {architecture.map((item) => <span key={item} className="chip">{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function DownloadSection() {
  const downloads = [
    { title: "macOS", label: "Download SYNCLAB for macOS", url: synclabConfig.urls.macDownload, status: synclabConfig.availability.macInstaller },
    { title: "Windows", label: "Download SYNCLAB for Windows", url: synclabConfig.urls.windowsDownload, status: synclabConfig.availability.windowsInstaller },
    { title: "Web", label: "Open SYNCLAB Vocal Forge", url: synclabConfig.urls.webApp, status: synclabConfig.availability.web },
  ];
  return (
    <section className="section-shell bg-background" aria-labelledby="download-heading">
      <div className="download-cta">
        <p className="eyebrow">Download</p>
        <h2 id="download-heading" className="mt-4 font-display text-5xl font-bold uppercase leading-none tracking-normal text-foreground sm:text-6xl">Your studio.<br />Your system.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {downloads.map((download) => (
            <article key={download.title} className="download-card">
              <h3 className="font-display text-2xl font-bold text-foreground">{download.title}</h3>
              <div className="mt-3"><StatusBadge status={download.status} /></div>
              {download.url ? (
                <Button asChild variant="signal" className="mt-7 w-full">
                  <a href={download.url}>{download.label}</a>
                </Button>
              ) : (
                <Button disabled variant="secondary" className="mt-7 w-full">Coming Soon</Button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="section-shell border-y border-border bg-panel" aria-labelledby="pricing-heading">
      <SectionIntro eyebrow="Plans" title="Pricing" id="pricing-heading" text="Choose the SYNCLAB workflow that matches where you are in the production process." />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {synclabConfig.pricing.filter((plan) => plan.visible).map((plan) => (
          <article key={plan.name} className="price-card">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-2xl font-bold text-foreground">{plan.name}</h3>
              <span className="trial-pill">{plan.trialStatus}</span>
            </div>
            <p className="mt-7 font-display text-4xl font-bold text-foreground">{plan.price}</p>
            <p className="mt-2 text-sm text-muted-foreground">{plan.billingPeriod}</p>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">{plan.description}</p>
            <ul className="mt-6 grid gap-3 text-sm text-muted-foreground">
              {plan.features.map((feature) => <li key={feature} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />{feature}</li>)}
            </ul>
            <Button variant="outline" className="mt-8 w-full">{plan.cta}</Button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductScreenshotsSection() {
  return (
    <section className="section-shell bg-background" aria-labelledby="screenshots-heading">
      <SectionIntro eyebrow="Product previews" title="SYNCLAB interface studies" id="screenshots-heading" text="Original mock interfaces for the production environment, AI tools and sound-design modules." />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {screenshotNames.map((name, index) => <ProductScreen key={name} name={name} index={index} />)}
      </div>
    </section>
  );
}

function ProductScreen({ name, index }: { name: string; index: number }) {
  return (
    <article className="product-screen">
      <div className="screen-header"><span>SYNCLAB</span><span>{name}</span></div>
      <div className="screen-body">
        <div className="screen-sidebar">{Array.from({ length: 5 }).map((_, item) => <span key={item} />)}</div>
        <div className="screen-workspace">
          {Array.from({ length: 8 }).map((_, item) => (
            <span key={item} className={cn("screen-block", (item + index) % 3 === 0 && "screen-block-accent", item % 2 === 0 ? "w-3/4" : "w-1/2")} />
          ))}
        </div>
      </div>
      <h3 className="mt-5 font-display text-lg font-bold text-foreground">{name}</h3>
    </article>
  );
}

function DemoSection() {
  const hasVideo = synclabConfig.urls.youtube.length > 0;
  return (
    <section className="section-shell border-y border-border bg-panel" aria-labelledby="demo-heading">
      <SectionIntro eyebrow="Demo" title="See SYNCLAB in action" id="demo-heading" text="Connect a YouTube, Vimeo or self-hosted product demo when the official walkthrough is ready." />
      <div className="mt-10 demo-frame">
        {hasVideo ? (
          <a href={synclabConfig.urls.youtube} className="demo-link">Open product demo</a>
        ) : (
          <div className="demo-preview">
            <DawMockup />
          </div>
        )}
      </div>
    </section>
  );
}

function FirstTimeAssistantSection() {
  return (
    <section className="section-shell bg-background" aria-labelledby="assistant-heading">
      <div className="assistant-panel">
        <div>
          <p className="eyebrow">First-time flow</p>
          <h2 id="assistant-heading" className="mt-4 font-display text-4xl font-bold uppercase tracking-normal text-foreground">What do you want to do?</h2>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {firstRunActions.map((action) => <Button key={action} variant="outline" className="justify-start">{action}</Button>)}
        </div>
      </div>
    </section>
  );
}

function SupportSection() {
  return (
    <section className="section-shell bg-background" aria-labelledby="support-heading">
      <SectionIntro eyebrow="SYNCLAB Support" title="SYNCLAB Support" id="support-heading" text="Product help, problem reporting and guided learning stay under SYNCLAB support channels." />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["SYNCLAB Help Center", "Searchable documentation.", Search],
          ["Contact SYNCLAB Support", "Professional support form.", Headphones],
          ["Report a Problem", "Bug reporting form.", Activity],
          ["Tutorials & Guides", "Step-by-step tutorials.", Music2],
        ].map(([title, text, Icon]) => {
          const SupportIcon = Icon as typeof Search;
          return (
            <article key={title as string} className="support-card">
              <SupportIcon className="size-7 text-signal" />
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">{title as string}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text as string}</p>
            </article>
          );
        })}
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <HelpCenterPanel />
        <SupportForm />
      </div>
    </section>
  );
}

function HelpCenterPanel() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => helpCenterCategories.filter((category) => category.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <article className="help-panel" aria-labelledby="help-search-heading">
      <h3 id="help-search-heading" className="font-display text-2xl font-bold text-foreground">SYNCLAB Help Center</h3>
      <label className="mt-5 block" htmlFor="help-search">
        <span className="sr-only">How can we help?</span>
        <span className="search-shell"><Search className="size-4" /><input id="help-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="How can we help?" /></span>
      </label>
      <div className="mt-5 flex flex-wrap gap-2">
        {filtered.map((category) => <span key={category} className="chip">{category}</span>)}
      </div>
    </article>
  );
}

function SupportForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <form className="support-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
      <div>
        <h3 className="font-display text-2xl font-bold text-foreground">Contact SYNCLAB Support</h3>
        <p className="mt-2 text-sm text-muted-foreground">Support address is configurable before submissions are routed.</p>
      </div>
      <div className="form-grid">
        <Field label="Name" name="name" />
        <Field label="Email" name="email" type="email" />
        <label className="field-label">Category<select name="category">{supportCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <Field label="Subject" name="subject" />
        <label className="field-label lg:col-span-2">Description<textarea name="description" rows={5} /></label>
        <Field label="Project" name="project" />
        <Field label="SYNCLAB version" name="version" />
        <Field label="Operating system" name="os" />
        <Field label="Device" name="device" />
        <Field label="Audio interface" name="audio-interface" />
        <Field label="Plugin information" name="plugins" />
        <label className="field-label lg:col-span-2">Steps to reproduce<textarea name="steps" rows={4} /></label>
        <label className="field-label lg:col-span-2">Optional screenshot<input name="screenshot" type="file" accept="image/*" /></label>
      </div>
      <Button variant="signal" size="lg" type="submit" className="w-full sm:w-auto"><Send />Submit Support Request</Button>
      {submitted ? <p className="text-sm text-signal">Support routing is ready to connect when the official support address is configured.</p> : null}
    </form>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return <label className="field-label">{label}<input name={name} type={type} /></label>;
}

function ConfigSection() {
  const fields = [
    ["Production domain", synclabConfig.urls.productionDomain],
    ["Web app URL", synclabConfig.urls.webApp],
    ["macOS download URL", synclabConfig.urls.macDownload],
    ["Windows download URL", synclabConfig.urls.windowsDownload],
    ["Support email", synclabConfig.urls.supportEmail],
    ["Help Center URL", synclabConfig.urls.helpCenter],
    ["Privacy URL", synclabConfig.urls.privacy],
    ["Terms URL", synclabConfig.urls.terms],
    ["YouTube URL", synclabConfig.urls.youtube],
    ["Community URL", synclabConfig.urls.community],
    ["Product version", synclabConfig.productVersion],
  ];
  return (
    <section className="section-shell bg-background" aria-labelledby="config-heading">
      <SectionIntro eyebrow="Admin configuration" title="Launch settings" id="config-heading" text="Installer links, support routing, pricing, trials, product version and availability statuses are centralized for later updates." />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {fields.map(([label, value]) => (
          <label key={label} className="field-label config-field">{label}<input readOnly value={value || "Not configured"} /></label>
        ))}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(synclabConfig.availability).map(([feature, status]) => (
          <div key={feature} className="config-status"><span>{feature.replace(/([A-Z])/g, " $1")}</span><StatusBadge status={status} /></div>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="section-shell bg-hero-grid" aria-labelledby="final-heading">
      <div className="final-cta">
        <p className="eyebrow">SIMPLE ENOUGH TO START. POWERFUL ENOUGH TO FINISH.</p>
        <h2 id="final-heading" className="mt-5 font-display text-5xl font-bold uppercase leading-none tracking-normal text-foreground sm:text-7xl">Your ideas deserve a studio.</h2>
        <p className="mt-5 text-lg text-muted-foreground">Start creating with SYNCLAB Vocal Forge.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <DownloadButton label="Download SYNCLAB" fullWidth />
          <Button variant="outline" size="lg" disabled className="w-full sm:w-auto">Open Vocal Forge</Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-panel px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <BrandMark />
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">© SYNCLAB Vocal Forge</p>
        </div>
        <nav className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label="Footer navigation">
          {footerLinks.map((item) => <Link key={item.to} to={item.to} className="footer-link">{item.label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}

function SectionIntro({ eyebrow, title, text, id }: { eyebrow: string; title: string; text: string; id: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-4 font-display text-4xl font-bold uppercase leading-tight tracking-normal text-foreground sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{text}</p>
    </div>
  );
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="border-b border-border bg-hero-grid px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold uppercase leading-none tracking-normal text-foreground sm:text-7xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{text}</p>
      </div>
    </section>
  );
}

function LegalPlaceholder({ title, text }: { title: string; text: string }) {
  return (
    <section className="section-shell bg-background">
      <div className="legal-panel">
        <h1 className="font-display text-4xl font-bold uppercase text-foreground">{title}</h1>
        <p className="mt-5 text-base leading-7 text-muted-foreground">{text}</p>
        <p className="mt-5 text-sm text-muted-foreground">The official URL is configurable in SYNCLAB launch settings.</p>
      </div>
    </section>
  );
}

export function SynclabSite({ mode = "home" }: { mode?: PageMode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        {mode === "home" ? (
          <>
            <HeroSection />
            <StatementSection />
            <FeaturesSection compact />
            <AIToolsSection />
            <StudioSection />
            <DesktopSection />
            <DownloadSection />
            <PricingSection />
            <FirstTimeAssistantSection />
            <ProductScreenshotsSection />
            <DemoSection />
            <SupportSection />
            <FinalCta />
          </>
        ) : null}
        {mode === "features" ? <><PageHero eyebrow="Features" title="Everything connected." text="A professional connected workflow for vocals, beats, synths, sampling, mixing and finishing." /><FeaturesSection /></> : null}
        {mode === "ai" ? <><PageHero eyebrow="AI Tools" title="Assisted creation. Creator control." text="Traditional music production and AI assistance work together without replacing your decisions." /><AIToolsSection /><FirstTimeAssistantSection /></> : null}
        {mode === "studio" ? <><PageHero eyebrow="Studio" title="One screen. One project. One connected studio." text="Timeline, piano roll, mixer and performance controls stay tied to the same session." /><StudioSection /><ProductScreenshotsSection /></> : null}
        {mode === "desktop" ? <><PageHero eyebrow="Desktop" title="A real desktop music workstation." text="The browser experience is designed to grow into native desktop production for macOS and Windows." /><DesktopSection /><DownloadSection /></> : null}
        {mode === "pricing" ? <><PageHero eyebrow="Pricing" title="Plans for every stage." text="Final pricing is configurable so SYNCLAB can launch with the right plan structure." /><PricingSection /></> : null}
        {mode === "support" ? <><PageHero eyebrow="Support" title="SYNCLAB Support." text="Help, tutorials, problem reporting and product support belong to SYNCLAB." /><SupportSection /></> : null}
        {mode === "help" ? <><PageHero eyebrow="Help Center" title="How can we help?" text="Search SYNCLAB guides by recording, MIDI, instruments, mixing, exporting and platform topics." /><section className="section-shell bg-background"><HelpCenterPanel /></section></> : null}
        {mode === "config" ? <><PageHero eyebrow="Configuration" title="SYNCLAB launch settings." text="Centralized fields keep downloads, support, pricing, video, version and availability honest." /><ConfigSection /></> : null}
        {mode === "privacy" ? <LegalPlaceholder title="Privacy" text="The official SYNCLAB Vocal Forge privacy policy can be connected here when the policy URL is ready." /> : null}
        {mode === "terms" ? <LegalPlaceholder title="Terms" text="The official SYNCLAB Vocal Forge terms can be connected here when the terms URL is ready." /> : null}
        {mode === "contact" ? <><PageHero eyebrow="Contact" title="Contact SYNCLAB." text="Reach SYNCLAB Support through the product support request flow." /><SupportSection /></> : null}
      </main>
      <Footer />
    </div>
  );
}
