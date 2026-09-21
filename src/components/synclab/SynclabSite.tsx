import { Link, type LinkProps } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  AudioLines,
  CalendarDays,
  Circle,
  Disc3,
  Download,
  Drum,
  ExternalLink,
  Headphones,
  KeyboardMusic,
  Menu,
  Mic2,
  MonitorDown,
  Music2,
  Play,
  RefreshCw,
  Search,
  Send,
  SlidersHorizontal,
  Square,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  helpCenterCategories,
  supportCategories,
  synclabConfig,
  type Availability,
  type DownloadAsset,
  type DownloadAvailability,
} from "@/lib/synclab-config";

type PageMode = "home" | "download" | "features" | "ai" | "studio" | "desktop" | "pricing" | "support" | "help" | "config" | "privacy" | "terms" | "contact";

type StatusTone = "ready" | "soon" | "development" | "desktop";
type SiteLink = { label: string; to?: LinkProps["to"]; href?: string };


const footerLinks: ReadonlyArray<SiteLink> = [
  { label: "Download", to: "/download" },
  { label: "What's New", href: "/download#whats-new" },
  { label: "System Requirements", href: "/download#system-requirements" },
  { label: "Help Center", to: "/help-center" },
  { label: "Support", to: "/support" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
] as const;

const navItems: ReadonlyArray<SiteLink> = [
  { label: "Features", to: "/features" },
  { label: "AI Tools", to: "/ai-tools" },
  { label: "Studio", to: "/studio" },
  { label: "Desktop", to: "/desktop" },
  { label: "Download", to: "/download" },
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

const currentDownloads: DownloadAsset[] = synclabConfig.downloads.filter((download) => download.current && download.publicRelease);
const previousDownloads: DownloadAsset[] = synclabConfig.downloads.filter((download) => !download.current && download.publicRelease && download.downloadUrl);
const developerDownloads: DownloadAsset[] = synclabConfig.downloads.filter((download) => !download.publicRelease);

function statusLabel(status: Availability) {
  if (status === "available") return "AVAILABLE NOW";
  if (status === "desktop-version") return "DESKTOP VERSION";
  if (status === "in-development") return "IN DEVELOPMENT";
  return "COMING SOON";
}

function downloadStatusLabel(status: DownloadAvailability) {
  if (status === "available") return "AVAILABLE NOW";
  if (status === "in-development") return "IN DEVELOPMENT";
  if (status === "coming-soon") return "COMING SOON";
  return "DOWNLOAD CURRENTLY UNAVAILABLE";
}

function formatValue(value: string, fallback = "Not configured") {
  return value.trim().length > 0 ? value : fallback;
}

function hasDownload(download: DownloadAsset) {
  return download.availability === "available" && download.downloadUrl.trim().length > 0;
}

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url.trim());
}

function isZip(download: DownloadAsset) {
  return download.fileType.toLowerCase().includes("zip");
}

function platformAvailability(platform: DownloadAsset["platform"]): Availability {
  const download = currentDownloads.find((item) => item.platform === platform);
  if (!download) return "coming-soon";
  if (download.availability === "available") return "available";
  if (download.availability === "in-development") return "in-development";
  return "coming-soon";
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

const logoPlacementClass = {
  header: "synclab-logo-header",
  hero: "synclab-logo-hero",
  card: "synclab-logo-card",
} as const;

function LogoAsset({ placement = "header" }: { placement?: "header" | "hero" | "card" }) {
  const logo = synclabConfig.brandAssets.logoDark ?? synclabConfig.brandAssets.logoLight;
  if (logo) {
    return (
      <img
        src={logo.url}
        alt={logo.alt}
        loading="lazy"
        className={cn("synclab-logo-img", logoPlacementClass[placement])}
      />
    );
  }
  return (
    <span className={cn("brand-emblem", placement === "hero" && "brand-emblem-hero")} aria-hidden="true">
      <span />
    </span>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-3 focus-ring rounded-md" aria-label="SYNCLAB Vocal Forge home">
      <LogoAsset />
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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <BrandMark />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            item.to ? (
              <Link key={item.label} to={item.to} className="nav-link" activeProps={{ className: "nav-link nav-link-active" }}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            )
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
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-background px-5 py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <BrandMark compact />
            <Button variant="ghost" size="icon" aria-label="Close navigation menu" onClick={() => setOpen(false)}>
              <X />
            </Button>
          </div>
          <nav className="mt-10 grid gap-3" aria-label="Mobile navigation" onClick={() => setOpen(false)}>
            {navItems.map((item) => (
              item.to ? (
                <Link key={item.label} to={item.to} className="mobile-nav-link" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.href} className="mobile-nav-link" onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              )
            ))}
          </nav>
          <div className="mt-8 pb-8">
            <DownloadButton label="Download SYNCLAB" fullWidth />
          </div>
        </div>
      ) : null}
    </header>
  );
}

function DownloadButton({ label, fullWidth = false }: { label: string; fullWidth?: boolean }) {
  return (
    <Button asChild variant="signal" size="lg" className={cn(fullWidth && "w-full")}>
      <a href="#download">
        <Download />
        {label}
      </a>
    </Button>
  );
}

function OpenVocalForgeButton({ fullWidth = false }: { fullWidth?: boolean }) {
  if (!synclabConfig.urls.webApp) {
    return (
      <Button disabled variant="outline" size="lg" className={cn(fullWidth && "w-full", "sm:w-auto")}>
        <ExternalLink />
        VOCAL FORGE WEB COMING SOON
      </Button>
    );
  }
  return (
    <Button asChild variant="outline" size="lg" className={cn(fullWidth && "w-full", "sm:w-auto")}>
      <a href={synclabConfig.urls.webApp} target="_blank" rel="noreferrer">
        <ExternalLink />
        OPEN VOCAL FORGE
      </a>
    </Button>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-hero-grid">
      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-20">
        <div className="relative z-10">
          <div className="hero-brand-lockup">
            <LogoAsset placement="hero" />
            <div>
              <p className="eyebrow">SYNCLAB MUSIC TECHNOLOGY</p>
              <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">VOCAL FORGE</p>
            </div>
          </div>
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
            <OpenVocalForgeButton fullWidth />
          </div>
          <div className="product-info-strip" aria-label="Product information">
            <span>SYNCLAB Vocal Forge</span>
            <span>Latest Version: {formatValue(synclabConfig.latestVersion, "Pending")}</span>
            <span>Available Platforms: macOS • Windows • Web</span>
          </div>
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
        <div className="flex items-center gap-3">
          <LogoAsset placement="card" />
          <div>
            <p className="font-display text-sm font-bold text-foreground">SYNCLAB</p>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted-foreground">VOCAL FORGE</p>
          </div>
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
    ["macOS", "Downloadable desktop version.", platformAvailability("macOS")],
    ["Windows", "Downloadable desktop version.", platformAvailability("Windows")],
    ["Web", "Browser-based SYNCLAB Vocal Forge.", platformAvailability("Web")],
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
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Current platform availability is driven by the centralized SYNCLAB release configuration. ZIP packages are labeled as ZIP packages until a finished installer is configured.</p>
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
  return (
    <section id="download" className="section-shell scroll-mt-24 bg-background" aria-labelledby="download-heading">
      <div className="download-cta">
        <div className="download-heading-row">
          <div>
            <p className="eyebrow">Download</p>
            <h2 id="download-heading" className="mt-4 font-display text-5xl font-bold uppercase leading-none tracking-normal text-foreground sm:text-6xl">DOWNLOAD SYNCLAB VOCAL FORGE</h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">Choose your platform and download the version of SYNCLAB Vocal Forge available for your system.</p>
          </div>
          <div className="download-logo-panel">
            <LogoAsset placement="card" />
            <span>SYNCLAB</span>
            <small>VOCAL FORGE</small>
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {currentDownloads.map((download) => (
            <DownloadCard key={download.id} download={download} />
          ))}
        </div>
        <PreviousVersions />
      </div>
    </section>
  );
}

function DownloadCard({ download }: { download: DownloadAsset }) {
  const ready = hasDownload(download);
  return (
    <article className="download-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-signal">{download.platform}</p>
          <h3 className="mt-3 font-display text-2xl font-bold text-foreground">{download.displayName}</h3>
        </div>
        <LogoAsset placement="card" />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className={cn("download-status", ready ? "download-status-ready" : "download-status-muted")}>{downloadStatusLabel(download.availability)}</span>
        {isZip(download) ? <span className="download-status">ZIP PACKAGE</span> : null}
      </div>
      <dl className="download-meta">
        <div><dt>Version</dt><dd>{formatValue(download.version, "Pending")}</dd></div>
        <div><dt>File type</dt><dd>{formatValue(download.fileType, "Not configured")}</dd></div>
        <div><dt>File size</dt><dd>{formatValue(download.fileSize)}</dd></div>
        <div><dt>Updated</dt><dd>{formatValue(download.releaseDate)}</dd></div>
        <div><dt>Minimum OS</dt><dd>{formatValue(download.minimumRequirement, "Not configured")}</dd></div>
      </dl>
      <p className="mt-5 text-sm leading-6 text-muted-foreground">{download.description}</p>
      {ready ? (
        <Button asChild variant="signal" className="mt-7 w-full">
          {isExternalUrl(download.downloadUrl) ? (
            <a href={download.downloadUrl} target="_blank" rel="noreferrer noopener">
              {download.platform === "Web" ? <ExternalLink /> : <Download />}
              {download.buttonText}
            </a>
          ) : (
            <a href={download.downloadUrl} download={download.fileName || undefined}>
              {download.platform === "Web" ? <ExternalLink /> : <Download />}
              {download.buttonText}
            </a>
          )}
        </Button>
      ) : (
        <div className="mt-7 download-unavailable">
          <AlertTriangle className="size-4" />
          <div>
            <strong>Download currently unavailable</strong>
            <span>Check back soon or contact SYNCLAB Support.</span>
          </div>
        </div>
      )}
      {ready ? <p className="mt-3 text-xs text-muted-foreground">File size: {formatValue(download.fileSize)} • Version: {formatValue(download.version, "Pending")} • Updated: {formatValue(download.releaseDate)}</p> : null}
      {ready && isZip(download) && download.containsInstaller ? (
        <p className="mt-3 text-xs leading-5 text-muted-foreground">Download the ZIP package, extract it, then run the included installer/application.</p>
      ) : null}
      {download.checksum ? (
        <p className="mt-3 break-all font-mono text-xs text-muted-foreground">SHA-256: {download.checksum}</p>
      ) : null}
      {download.platform !== "Source/Website Package" ? (
        <nav className="download-links" aria-label={`${download.platform} download resources`}>
          <a href="#install">Installation Instructions</a>
          <a href="#system-requirements">System Requirements</a>
          <a href="#whats-new">Release Notes</a>
          <a href="#previous-versions">Previous Versions</a>
        </nav>
      ) : null}
    </article>
  );
}

function PreviousVersions() {
  return (
    <section id="previous-versions" className="previous-versions scroll-mt-24" aria-labelledby="previous-versions-heading">
      <h3 id="previous-versions-heading" className="font-display text-2xl font-bold uppercase text-foreground">Previous Versions</h3>
      {previousDownloads.length > 0 ? (
        <div className="mt-5 grid gap-3">
          {previousDownloads.map((download) => (
            <div key={download.id} className="version-row">
              <div>
                <strong>{download.displayName} {download.version}</strong>
                <span>{download.platform} • {download.fileType} • {download.fileSize}</span>
              </div>
              <Button asChild variant="outline">
                <a href={download.downloadUrl} download={download.fileName || undefined}>Download</a>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">Previous versions will appear here after earlier public releases are configured.</p>
      )}
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
      <SectionIntro eyebrow="Product previews" title="SYNCLAB product gallery" id="screenshots-heading" text="Official SYNCLAB screenshots can replace the interface previews from the centralized product image configuration." />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {synclabConfig.productImages.map((image, index) => <ProductScreen key={image.title} image={image} index={index} />)}
      </div>
    </section>
  );
}

function ProductScreen({ image, index }: { image: { title: string; description: string; imageUrl: string }; index: number }) {
  return (
    <article className="product-screen">
      {image.imageUrl ? (
        <img src={image.imageUrl} alt={`${image.title} in SYNCLAB Vocal Forge`} className="product-image" />
      ) : (
        <>
          <div className="screen-header"><span>SYNCLAB</span><span>{image.title}</span></div>
          <div className="screen-body">
            <div className="screen-sidebar">{Array.from({ length: 5 }).map((_, item) => <span key={item} />)}</div>
            <div className="screen-workspace">
              {Array.from({ length: 8 }).map((_, item) => (
                <span key={item} className={cn("screen-block", (item + index) % 3 === 0 && "screen-block-accent", item % 2 === 0 ? "w-3/4" : "w-1/2")} />
              ))}
            </div>
          </div>
        </>
      )}
      <h3 className="mt-5 font-display text-lg font-bold text-foreground">{image.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{image.description}</p>
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
      <DownloadErrorHelp />
    </section>
  );
}

function DownloadErrorHelp() {
  return (
    <article className="download-help-panel">
      <AlertTriangle className="size-6 text-signal" />
      <div>
        <h3 className="font-display text-xl font-bold text-foreground">SYNCLAB couldn't start this download.</h3>
        <p className="mt-2 text-sm text-muted-foreground">If a configured file is unavailable, try again or contact SYNCLAB Support.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button variant="outline"><RefreshCw />Try Again</Button>
          <Button asChild variant="signal"><Link to="/support">Contact Support</Link></Button>
        </div>
      </div>
    </article>
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
    ["macOS legacy download URL", synclabConfig.urls.macDownload],
    ["Windows legacy download URL", synclabConfig.urls.windowsDownload],
    ["Support email", synclabConfig.urls.supportEmail],
    ["Help Center URL", synclabConfig.urls.helpCenter],
    ["Privacy URL", synclabConfig.urls.privacy],
    ["Terms URL", synclabConfig.urls.terms],
    ["YouTube URL", synclabConfig.urls.youtube],
    ["Community URL", synclabConfig.urls.community],
    ["Product version", synclabConfig.productVersion],
    ["Latest version", synclabConfig.latestVersion],
  ];
  return (
    <section className="section-shell bg-background" aria-labelledby="config-heading">
      <SectionIntro eyebrow="Admin configuration" title="Launch settings" id="config-heading" text="Product version, platform files, web URL, ZIP details, release notes, system requirements and availability are centralized for future SYNCLAB releases." />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {fields.map(([label, value]) => (
          <label key={label} className="field-label config-field">{label}<input readOnly value={value || "Not configured"} /></label>
        ))}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {synclabConfig.downloads.map((download) => (
          <article key={download.id} className="config-download">
            <h3>{download.displayName}</h3>
            <dl>
              <div><dt>File</dt><dd>{formatValue(download.fileName)}</dd></div>
              <div><dt>Platform</dt><dd>{download.platform}</dd></div>
              <div><dt>Version</dt><dd>{formatValue(download.version, "Pending")}</dd></div>
              <div><dt>Type</dt><dd>{formatValue(download.fileType)}</dd></div>
              <div><dt>Size</dt><dd>{formatValue(download.fileSize)}</dd></div>
              <div><dt>Release date</dt><dd>{formatValue(download.releaseDate)}</dd></div>
              <div><dt>Minimum OS</dt><dd>{formatValue(download.minimumRequirement)}</dd></div>
              <div><dt>Button</dt><dd>{download.buttonText}</dd></div>
              <div><dt>URL/path</dt><dd>{formatValue(download.downloadUrl)}</dd></div>
              <div><dt>Status</dt><dd>{downloadStatusLabel(download.availability)}</dd></div>
            </dl>
          </article>
        ))}
      </div>
      <DownloadManagementPanel />
      <ReleaseNotesSection />
      <SystemRequirementsSection />
      <DeveloperDownloadSection />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(synclabConfig.availability).map(([feature, status]) => (
          <div key={feature} className="config-status"><span>{feature.replace(/([A-Z])/g, " $1")}</span><StatusBadge status={status} /></div>
        ))}
      </div>
    </section>
  );
}

function ReleaseNotesSection() {
  return (
    <section id="whats-new" className="section-shell scroll-mt-24 border-y border-border bg-panel" aria-labelledby="release-heading">
      <SectionIntro eyebrow="Release notes" title="What's New" id="release-heading" text="Latest SYNCLAB Vocal Forge release information, managed from one configuration source." />
      <div className="mt-10 grid gap-4">
        {synclabConfig.releaseNotes.map((release) => (
          <article key={`${release.version}-${release.releaseDate}`} className="release-card">
            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <h3 className="font-display text-2xl font-bold text-foreground">SYNCLAB Vocal Forge {formatValue(release.version, "Version pending")}</h3>
              <span className="release-date"><CalendarDays className="size-4" />{formatValue(release.releaseDate)}</span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <ReleaseList title="New" items={release.new} />
              <ReleaseList title="Improved" items={release.improved} />
              <ReleaseList title="Fixed" items={release.fixed} />
              <ReleaseList title="Known Issues" items={release.knownIssues} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReleaseList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="release-list">
      <h4>{title}</h4>
      {items.length > 0 ? (
        <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
      ) : (
        <p>Updates will be published with the production release.</p>
      )}
    </div>
  );
}

function InstallHelpSection() {
  const installable = currentDownloads.filter((download) => download.platform === "macOS" || download.platform === "Windows");
  return (
    <section id="install" className="section-shell scroll-mt-24 bg-background" aria-labelledby="install-heading">
      <SectionIntro eyebrow="Install SYNCLAB" title="Install SYNCLAB" id="install-heading" text="Platform-specific installation guidance appears only when it matches the configured package type." />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {installable.map((download) => (
          <article key={`install-${download.id}`} className="install-card">
            <h3>{download.platform}</h3>
            {download.installationSteps && download.installationSteps.length > 0 ? (
              <ol>{download.installationSteps.map((step) => <li key={step}>{step}</li>)}</ol>
            ) : hasDownload(download) && isZip(download) ? (
              <ol>
                <li>Download the ZIP.</li>
                <li>Extract the ZIP.</li>
                {download.containsInstaller ? <li>Open the included application/installer.</li> : null}
                <li>Follow the installation instructions included with the package.</li>
              </ol>
            ) : (
              <p>Installation instructions will be published when the {download.platform} package is configured.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function SystemRequirementsSection() {
  return (
    <section id="system-requirements" className="section-shell scroll-mt-24 bg-background" aria-labelledby="requirements-heading">
      <SectionIntro eyebrow="Compatibility" title="System Requirements" id="requirements-heading" text="Supported operating systems, storage, audio, MIDI and browser requirements are centralized for release updates." />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {synclabConfig.systemRequirements.map((requirement) => (
          <article key={requirement.platform} className="requirements-card">
            <h3>{requirement.platform}</h3>
            <dl>
              <div><dt>Supported version</dt><dd>{requirement.supportedVersion}</dd></div>
              <div><dt>Processor</dt><dd>{requirement.processor}</dd></div>
              <div><dt>RAM</dt><dd>{requirement.ram}</dd></div>
              <div><dt>Storage</dt><dd>{requirement.storage}</dd></div>
              <div><dt>Audio</dt><dd>{requirement.audio}</dd></div>
              <div><dt>MIDI</dt><dd>{requirement.midi}</dd></div>
              {requirement.browsers ? <div><dt>Browsers</dt><dd>{requirement.browsers}</dd></div> : null}
              {requirement.internet ? <div><dt>Internet</dt><dd>{requirement.internet}</dd></div> : null}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function DeveloperDownloadSection() {
  if (developerDownloads.length === 0) return null;
  return (
    <section className="developer-downloads" aria-labelledby="developer-downloads-heading">
      <h3 id="developer-downloads-heading">SYNCLAB Website Package</h3>
      <p>This administrative/developer download area is separate from SYNCLAB Vocal Forge application downloads.</p>
      <div className="mt-5 grid gap-3">
        {developerDownloads.map((download) => (
          <DownloadCard key={download.id} download={download} />
        ))}
      </div>
    </section>
  );
}

function UpdateNotice() {
  const current = synclabConfig.productVersion.trim();
  const latest = synclabConfig.latestVersion.trim();
  if (!latest || latest === current) return null;
  return (
    <div className="update-notice" role="status">
      <RefreshCw className="size-5 text-signal" />
      <div>
        <strong>A new version of SYNCLAB Vocal Forge is available.</strong>
        <span>Current version: {formatValue(current, "Pending")} • New version: {latest}</span>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="signal"><a href="#download"><Download />Download Update</a></Button>
          <Button asChild variant="outline"><a href="#whats-new">What's New</a></Button>
        </div>
      </div>
    </div>
  );
}

function DownloadAnnouncement() {
  const announcement = synclabConfig.downloadAnnouncement.trim();
  if (!announcement) return null;
  return <p className="download-announcement">{announcement}</p>;
}

function VerifyDownloadSection() {
  const checksums = currentDownloads.filter((download) => (download.checksum ?? "").trim().length > 0);
  return (
    <section className="section-shell border-y border-border bg-panel" aria-labelledby="verify-heading">
      <SectionIntro
        eyebrow="Download security"
        title="Verify your download"
        id="verify-heading"
        text="SYNCLAB publishes a SHA-256 checksum for each release package so you can confirm your download is the official file."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <article className="verify-card">
          <h3>macOS</h3>
          <p>Open Terminal and run:</p>
          <code>shasum -a 256 /path/to/SYNCLAB-download-file</code>
          <p>Compare the result with the SHA-256 value shown on the download card.</p>
        </article>
        <article className="verify-card">
          <h3>Windows</h3>
          <p>Open PowerShell and run:</p>
          <code>Get-FileHash .\SYNCLAB-download-file -Algorithm SHA256</code>
          <p>Compare the result with the SHA-256 value shown on the download card.</p>
        </article>
      </div>
      <div className="mt-6 grid gap-3">
        {checksums.length > 0 ? (
          checksums.map((download) => (
            <p key={`sum-${download.id}`} className="verify-sum">
              <strong>{download.platform}</strong>
              <span>{download.checksum}</span>
            </p>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">Checksums appear here once they are configured for a release package.</p>
        )}
        {currentDownloads.some((download) => download.signing) ? (
          <div className="grid gap-3">
            {currentDownloads.filter((download) => download.signing).map((download) => (
              <div key={`sign-${download.id}`} className="verify-sum">
                <strong>{download.platform} signing</strong>
                <span>
                  {[
                    download.signing?.developerIdentity,
                    download.signing?.signatureInfo,
                    download.signing?.notarizationStatus,
                    download.signing?.codeSigningStatus,
                  ].filter(Boolean).join(" • ")}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Signing and notarization details will be published when signed SYNCLAB installers are released.</p>
        )}
      </div>
    </section>
  );
}

function DownloadManagementPanel() {
  const platformIds = ["macos-current", "windows-current", "web-current"] as const;
  const [selected, setSelected] = useState<string>(platformIds[0]);
  const record = synclabConfig.downloads.find((download) => download.id === selected) ?? synclabConfig.downloads[0]!;
  const [draft, setDraft] = useState<Record<string, string>>({});
  const value = (field: string, fallback: string) => draft[`${selected}-${field}`] ?? fallback;
  const update = (field: string, next: string) => setDraft((previous) => ({ ...previous, [`${selected}-${field}`]: next }));
  const snippet = JSON.stringify(
    {
      id: record.id,
      platform: record.platform,
      version: value("version", record.version),
      downloadUrl: value("downloadUrl", record.downloadUrl),
      fileName: value("fileName", record.fileName),
      fileType: value("fileType", record.fileType),
      fileSize: value("fileSize", record.fileSize),
      releaseDate: value("releaseDate", record.releaseDate),
      minimumRequirement: value("minimumRequirement", record.minimumRequirement),
      checksum: value("checksum", record.checksum ?? ""),
      buttonText: value("buttonText", record.buttonText),
      availability: value("availability", record.availability),
      enabled: value("availability", record.availability) === "available",
    },
    null,
    2,
  );
  return (
    <section className="download-management" aria-labelledby="download-management-heading">
      <h3 id="download-management-heading">Download Management</h3>
      <p>
        Large macOS and Windows packages stay on external storage — GitHub Releases, Cloudflare R2, Amazon S3, Dropbox, Google Drive or any
        SYNCLAB-controlled CDN. Paste the external download URL here; the matching download button activates as soon as the URL is saved
        into the site configuration and the status is set to AVAILABLE NOW. Never paste private storage credentials or signed secret URLs.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {platformIds.map((id) => {
          const item = synclabConfig.downloads.find((download) => download.id === id);
          if (!item) return null;
          return (
            <Button key={id} variant={selected === id ? "signal" : "outline"} onClick={() => setSelected(id)}>
              {item.platform}
            </Button>
          );
        })}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="field-label config-field">Version<input value={value("version", record.version)} onChange={(event) => update("version", event.target.value)} /></label>
        <label className="field-label config-field">External download URL<input value={value("downloadUrl", record.downloadUrl)} placeholder="https://…" onChange={(event) => update("downloadUrl", event.target.value)} /></label>
        <label className="field-label config-field">File name<input value={value("fileName", record.fileName)} onChange={(event) => update("fileName", event.target.value)} /></label>
        <label className="field-label config-field">File type<input value={value("fileType", record.fileType)} onChange={(event) => update("fileType", event.target.value)} /></label>
        <label className="field-label config-field">File size<input value={value("fileSize", record.fileSize)} onChange={(event) => update("fileSize", event.target.value)} /></label>
        <label className="field-label config-field">Release date<input value={value("releaseDate", record.releaseDate)} onChange={(event) => update("releaseDate", event.target.value)} /></label>
        <label className="field-label config-field">Minimum operating system<input value={value("minimumRequirement", record.minimumRequirement)} onChange={(event) => update("minimumRequirement", event.target.value)} /></label>
        <label className="field-label config-field">SHA-256 checksum<input value={value("checksum", record.checksum ?? "")} onChange={(event) => update("checksum", event.target.value)} /></label>
        <label className="field-label config-field">Download button text<input value={value("buttonText", record.buttonText)} onChange={(event) => update("buttonText", event.target.value)} /></label>
        <label className="field-label config-field">
          Status
          <select value={value("availability", record.availability)} onChange={(event) => update("availability", event.target.value)}>
            <option value="available">AVAILABLE NOW</option>
            <option value="coming-soon">COMING SOON</option>
            <option value="in-development">IN DEVELOPMENT</option>
            <option value="unavailable">UNAVAILABLE / MAINTENANCE</option>
          </select>
        </label>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">Release configuration for {record.displayName}:</p>
      <pre className="download-management-snippet">{snippet}</pre>
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
          <OpenVocalForgeButton fullWidth />
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
          {footerLinks.map((item) => item.to ? (
            <Link key={item.label} to={item.to} className="footer-link">{item.label}</Link>
          ) : (
            <a key={item.label} href={item.href} className="footer-link">{item.label}</a>
          ))}
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
            <ReleaseNotesSection />
            <InstallHelpSection />
            <SystemRequirementsSection />
            <PricingSection />
            <FirstTimeAssistantSection />
            <ProductScreenshotsSection />
            <DemoSection />
            <SupportSection />
            <FinalCta />
          </>
        ) : null}
        {mode === "download" ? (
          <>
            <PageHero
              eyebrow="Downloads"
              title="SYNCLAB VOCAL FORGE"
              text="Download the tools you need to create, record, produce and finish your music."
            />
            <section className="section-shell bg-background">
              <UpdateNotice />
              <DownloadAnnouncement />
              <div className="product-info-strip">
                <div><dt>Latest version</dt><dd>{formatValue(synclabConfig.latestVersion, "Pending")}</dd></div>
                <div><dt>Release date</dt><dd>{formatValue(currentDownloads.find((item) => hasDownload(item))?.releaseDate ?? "")}</dd></div>
                <div><dt>Available platforms</dt><dd>macOS • Windows • Web</dd></div>
              </div>
            </section>
            <DownloadSection />
            <VerifyDownloadSection />
            <ReleaseNotesSection />
            <InstallHelpSection />
            <SystemRequirementsSection />
            <SupportSection />
          </>
        ) : null}
        {mode === "features" ? <><PageHero eyebrow="Features" title="Everything connected." text="A professional connected workflow for vocals, beats, synths, sampling, mixing and finishing." /><FeaturesSection /></> : null}
        {mode === "ai" ? <><PageHero eyebrow="AI Tools" title="Assisted creation. Creator control." text="Traditional music production and AI assistance work together without replacing your decisions." /><AIToolsSection /><FirstTimeAssistantSection /></> : null}
        {mode === "studio" ? <><PageHero eyebrow="Studio" title="One screen. One project. One connected studio." text="Timeline, piano roll, mixer and performance controls stay tied to the same session." /><StudioSection /><ProductScreenshotsSection /></> : null}
        {mode === "desktop" ? <><PageHero eyebrow="Desktop" title="A real desktop music workstation." text="macOS and Windows packages stay accurately labeled by their configured release status." /><DesktopSection /><DownloadSection /><InstallHelpSection /><SystemRequirementsSection /></> : null}
        {mode === "pricing" ? <><PageHero eyebrow="Pricing" title="Plans for every stage." text="Final pricing is configurable so SYNCLAB can launch with the right plan structure." /><PricingSection /></> : null}
        {mode === "support" ? <><PageHero eyebrow="Support" title="SYNCLAB Support." text="Help, tutorials, problem reporting and product support belong to SYNCLAB." /><SupportSection /></> : null}
        {mode === "help" ? <><PageHero eyebrow="Help Center" title="How can we help?" text="Search SYNCLAB guides by downloads, installation, recording, MIDI, instruments, mixing, exporting and platform topics." /><section className="section-shell bg-background"><HelpCenterPanel /><DownloadErrorHelp /></section></> : null}
        {mode === "config" ? <><PageHero eyebrow="Configuration" title="SYNCLAB launch settings." text="Centralized fields keep downloads, support, pricing, video, version and availability honest." /><ConfigSection /></> : null}
        {mode === "privacy" ? <LegalPlaceholder title="Privacy" text="The official SYNCLAB Vocal Forge privacy policy can be connected here when the policy URL is ready." /> : null}
        {mode === "terms" ? <LegalPlaceholder title="Terms" text="The official SYNCLAB Vocal Forge terms can be connected here when the terms URL is ready." /> : null}
        {mode === "contact" ? <><PageHero eyebrow="Contact" title="Contact SYNCLAB." text="Reach SYNCLAB Support through the product support request flow." /><SupportSection /></> : null}
      </main>
      <Footer />
    </div>
  );
}
