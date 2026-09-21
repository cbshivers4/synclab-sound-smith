import synclabLogo from "@/assets/synclab-logo.jpg.asset.json";
import synclabWindowsZip from "@/assets/synclab-win32-x64.zip.asset.json";

export type Availability = "available" | "coming-soon" | "in-development" | "desktop-version";

export type DownloadPlatform = "macOS" | "Windows" | "Web" | "Universal" | "Source/Website Package";
export type DownloadAvailability = "available" | "coming-soon" | "in-development" | "unavailable";

export type DownloadAsset = {
  id: string;
  fileName: string;
  displayName: string;
  platform: DownloadPlatform;
  version: string;
  fileType: string;
  fileSize: string;
  releaseDate: string;
  downloadUrl: string;
  availability: DownloadAvailability;
  checksum?: string;
  description: string;
  buttonText: string;
  minimumRequirement: string;
  containsInstaller: boolean;
  current: boolean;
  publicRelease: boolean;
};

export type ReleaseNote = {
  version: string;
  releaseDate: string;
  new: string[];
  improved: string[];
  fixed: string[];
  knownIssues: string[];
};

export type SystemRequirement = {
  platform: "macOS" | "Windows" | "Web";
  supportedVersion: string;
  ram: string;
  storage: string;
  audio: string;
  midi: string;
  browsers?: string;
  internet?: string;
};

export type ProductImage = {
  title: string;
  description: string;
  imageUrl: string;
};

export type BrandAsset = {
  url: string;
  alt: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  billingPeriod: string;
  description: string;
  cta: string;
  trialStatus: string;
  visible: boolean;
  features: string[];
};

export const synclabConfig = {
  productName: "SYNCLAB Vocal Forge",
  brandName: "SYNCLAB",
  brandSubline: "VOCAL FORGE",
  tagline: "Create. Record. Produce. Finish.",
  philosophy: "SIMPLE ENOUGH TO START. POWERFUL ENOUGH TO FINISH.",
  productVersion: "Windows preview build (2026-09-21)",
  latestVersion: "Windows preview build (2026-09-21)",
  brandAssets: {
    logoDark: { url: synclabLogo.url, alt: "SYNCLAB logo" } as BrandAsset | null,
    logoLight: { url: synclabLogo.url, alt: "SYNCLAB logo" } as BrandAsset | null,
    appIcon: { url: synclabLogo.url, alt: "SYNCLAB app icon" } as BrandAsset | null,
    favicon: "/favicon.png",
  },
  urls: {
    productionDomain: "",
    webApp: "",
    macDownload: "",
    windowsDownload: "",
    supportEmail: "",
    helpCenter: "",
    privacy: "",
    terms: "",
    youtube: "",
    community: "",
  },
  downloads: [
    {
      id: "macos-current",
      fileName: "",
      displayName: "SYNCLAB Vocal Forge for macOS",
      platform: "macOS",
      version: "Version pending",
      fileType: "ZIP PACKAGE",
      fileSize: "",
      releaseDate: "",
      downloadUrl: "",
      availability: "unavailable",
      checksum: "",
      description: "Downloadable desktop package for macOS.",
      buttonText: "DOWNLOAD ZIP",
      minimumRequirement: "System requirements will be published with the production release.",
      containsInstaller: false,
      current: true,
      publicRelease: true,
    },
    {
      id: "windows-current",
      fileName: "SYNCLAB-win32-x64.zip",
      displayName: "SYNCLAB Vocal Forge for Windows",
      platform: "Windows",
      version: "Windows preview build (2026-09-21)",
      fileType: "ZIP PACKAGE",
      fileSize: "151 MB",
      releaseDate: "September 21, 2026",
      downloadUrl: synclabWindowsZip.url,
      availability: "available",
      checksum: "",
      description:
        "Portable Windows desktop package (64-bit). Extract the ZIP and run SYNCLAB.exe — no installer is included.",
      buttonText: "DOWNLOAD ZIP",
      minimumRequirement: "Windows 10 or later, 64-bit.",
      containsInstaller: false,
      current: true,
      publicRelease: true,
    },
    {
      id: "web-current",
      fileName: "",
      displayName: "SYNCLAB Vocal Forge Web",
      platform: "Web",
      version: "Version pending",
      fileType: "WEB APP",
      fileSize: "",
      releaseDate: "",
      downloadUrl: "",
      availability: "unavailable",
      description: "Browser-based SYNCLAB Vocal Forge access.",
      buttonText: "OPEN VOCAL FORGE",
      minimumRequirement: "System requirements will be published with the production release.",
      containsInstaller: false,
      current: true,
      publicRelease: true,
    },
    {
      id: "website-package",
      fileName: "",
      displayName: "SYNCLAB Website Package",
      platform: "Source/Website Package",
      version: "Version pending",
      fileType: "ZIP PACKAGE",
      fileSize: "",
      releaseDate: "",
      downloadUrl: "",
      availability: "unavailable",
      description: "Administrative website source/package download, separate from the Vocal Forge application.",
      buttonText: "DOWNLOAD WEBSITE PACKAGE",
      minimumRequirement: "",
      containsInstaller: false,
      current: true,
      publicRelease: false,
    },
  ] satisfies DownloadAsset[],
  releaseNotes: [
    {
      version: "Windows preview build (2026-09-21)",
      releaseDate: "September 21, 2026",
      new: ["Portable SYNCLAB Vocal Forge desktop package for 64-bit Windows."],
      improved: [],
      fixed: [],
      knownIssues: [
        "This package is portable: extract the ZIP and run SYNCLAB.exe. No Windows installer is included yet.",
        "macOS and Web releases are not available yet.",
        "Full release notes will be published with the production release.",
      ],
    },
  ] satisfies ReleaseNote[],
  systemRequirements: [
    {
      platform: "macOS",
      supportedVersion: "System requirements will be published with the production release.",
      ram: "System requirements will be published with the production release.",
      storage: "System requirements will be published with the production release.",
      audio: "System requirements will be published with the production release.",
      midi: "System requirements will be published with the production release.",
    },
    {
      platform: "Windows",
      supportedVersion: "Windows 10 or later, 64-bit.",
      ram: "System requirements will be published with the production release.",
      storage: "Approximately 500 MB free space after extracting the ZIP package.",
      audio: "System requirements will be published with the production release.",
      midi: "System requirements will be published with the production release.",
    },
    {
      platform: "Web",
      supportedVersion: "System requirements will be published with the production release.",
      ram: "System requirements will be published with the production release.",
      storage: "System requirements will be published with the production release.",
      audio: "System requirements will be published with the production release.",
      midi: "System requirements will be published with the production release.",
      browsers: "System requirements will be published with the production release.",
      internet: "System requirements will be published with the production release.",
    },
  ] satisfies SystemRequirement[],
  productImages: [
    { title: "Main DAW", description: "The primary timeline, mixer and production workspace.", imageUrl: "" },
    { title: "AI Vocal Forge", description: "Vocal creation and shaping tools for guided production.", imageUrl: "" },
    { title: "Drum Machine", description: "Pattern creation, velocity control and beat programming.", imageUrl: "" },
    { title: "Synth", description: "Sound design controls for SYNCLAB instruments.", imageUrl: "" },
    { title: "Sampler", description: "Sample editing, mapping and resampling workflows.", imageUrl: "" },
    { title: "Mixer", description: "Channel strips, routing, effects and mastering controls.", imageUrl: "" },
    { title: "Hum-to-Beat", description: "Rhythm capture from humming, tapping and beatboxing ideas.", imageUrl: "" },
    { title: "AI Co-Producer", description: "Arrangement and production assistance inside the SYNCLAB workflow.", imageUrl: "" },
  ] satisfies ProductImage[],
  availability: {
    web: "in-development" as Availability,
    macInstaller: "coming-soon" as Availability,
    windowsInstaller: "coming-soon" as Availability,
    nativeAudioEngine: "desktop-version" as Availability,
    nativeMidi: "desktop-version" as Availability,
    pluginHosting: "desktop-version" as Availability,
    mobileNative: "in-development" as Availability,
    aiVocalForge: "in-development" as Availability,
    humToBeat: "in-development" as Availability,
    stemSeparator: "in-development" as Availability,
  },
  pricing: [
    {
      name: "FREE",
      price: "$0",
      billingPeriod: "Core tools",
      description: "Core SYNCLAB tools for getting ideas moving.",
      cta: "Start Free",
      trialStatus: "No trial required",
      visible: true,
      features: ["Project workspace", "Basic recording", "Starter instruments", "Export-ready workflow"],
    },
    {
      name: "CREATOR",
      price: "Configured by admin",
      billingPeriod: "Billing period configurable",
      description: "Expanded creative and AI tools for regular production.",
      cta: "Start 7-Day Trial",
      trialStatus: "7-day free trial",
      visible: true,
      features: ["AI creative tools", "Advanced instruments", "Expanded project tools", "More export options"],
    },
    {
      name: "PRO / STUDIO",
      price: "Configured by admin",
      billingPeriod: "Billing period configurable",
      description: "Full professional production workflow for serious sessions.",
      cta: "Configure Studio Plan",
      trialStatus: "Trial configurable",
      visible: true,
      features: ["Professional mixer", "Desktop workflow", "Plugin architecture", "Mastering and recovery tools"],
    },
  ] satisfies PricingPlan[],
};

export const supportCategories = [
  "Account",
  "Billing",
  "Audio",
  "MIDI",
  "Recording",
  "Synth",
  "Drum Machine",
  "Sampler",
  "Beat Maker",
  "AI Vocal Forge",
  "Vocoder",
  "Stem Separation",
  "Hum-to-Beat",
  "Mixer",
  "Plugins",
  "Export",
  "Desktop App",
  "Downloads & Installation",
  "Mobile App",
  "Bug Report",
  "Feature Request",
  "Other",
];

export const helpCenterCategories = [
  "Getting Started",
  "Downloads & Installation",
  "Download SYNCLAB",
  "Installing the macOS version",
  "Installing the Windows version",
  "Extracting a ZIP package",
  "Updating SYNCLAB",
  "Previous versions",
  "System requirements",
  "Troubleshooting downloads",
  "Missing files",
  "Installation problems",
  "Recording",
  "MIDI",
  "Synth",
  "Drum Machine",
  "Sampler",
  "Beat Maker",
  "Hum-to-Beat",
  "AI Vocal Forge",
  "Vocoder",
  "Piano Roll",
  "Timeline",
  "Loop Markers",
  "Mixer",
  "Buses",
  "Sends",
  "Effects",
  "Automation",
  "Mastering",
  "Export",
  "Plugins",
  "macOS",
  "Windows",
  "iPhone/iPad",
  "Android",
];
