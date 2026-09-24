import synclabLogo from "@/assets/synclab-logo.jpg.asset.json";

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
  /**
   * Download location. May be an external URL on any storage provider
   * (GitHub Releases, Cloudflare R2, S3, Dropbox, Google Drive, a SYNCLAB CDN…).
   * Large application packages are never stored inside this website project.
   * Leave empty to keep the platform marked COMING SOON.
   */
  downloadUrl: string;
  availability: DownloadAvailability;
  /** SHA-256 checksum, shown for download verification when configured. */
  checksum?: string;
  description: string;
  buttonText: string;
  minimumRequirement: string;
  containsInstaller: boolean;
  current: boolean;
  publicRelease: boolean;
  /** Optional platform-specific installation steps. */
  installationSteps?: string[];
  /** Optional code-signing / notarization information. */
  signing?: {
    developerIdentity?: string;
    signatureInfo?: string;
    notarizationStatus?: string;
    codeSigningStatus?: string;
  };
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
  processor: string;
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
  productVersion: "Preview builds (2026-09-21)",
  latestVersion: "Preview builds (2026-09-21)",
  websiteVersion: "",
  downloadAnnouncement: "",
  brandAssets: {
    logoDark: { url: synclabLogo.url, alt: "SYNCLAB logo" } as BrandAsset | null,
    logoLight: { url: synclabLogo.url, alt: "SYNCLAB logo" } as BrandAsset | null,
    appIcon: { url: synclabLogo.url, alt: "SYNCLAB app icon" } as BrandAsset | null,
    favicon: "/favicon.png",
  },
  urls: {
    productionDomain: "",
    webApp: "",
    macDownload: "https://www.dropbox.com/scl/fi/b7o5tv8f618ed0qzi2hmg/SYNCLAB-Vocal-Forge-1.0.0-macOS-arm64-2.zip?rlkey=o7fart4kq5c91kckzde01gaup&st=sp2dqbgo&dl=1",
    windowsDownload: "https://www.dropbox.com/scl/fi/poa17oiwg71d6yr648xct/SYNCLAB-Vocal-Forge-1.0.0-Windows-x64-1.zip?rlkey=2ek335rwl5c17yt09f4njbw9p&st=4r49hcdd&dl=1",
    supportEmail: "",
    helpCenter: "",
    privacy: "",
    terms: "",
    youtube: "",
    community: "",
  },
  downloads: [
    {
      id: "macos-arm64-current",
      fileName: "SYNCLAB-Vocal-Forge-1.0.0-macOS-arm64-2.zip",
      displayName: "SYNCLAB Vocal Forge for macOS (Apple Silicon)",
      platform: "macOS",
      version: "1.0.0",
      fileType: "ZIP PACKAGE",
      fileSize: "",
      releaseDate: "September 24, 2026",
      downloadUrl: "https://www.dropbox.com/scl/fi/b7o5tv8f618ed0qzi2hmg/SYNCLAB-Vocal-Forge-1.0.0-macOS-arm64-2.zip?rlkey=o7fart4kq5c91kckzde01gaup&st=sp2dqbgo&dl=1",
      availability: "available",
      checksum: "",
      description:
        "Portable macOS desktop package for Apple Silicon Macs (M1, M2, M3, M4 and later). Extract the ZIP and open the included SYNCLAB app — no installer is included.",
      installationSteps: [
        "Download the ZIP and double-click it to extract the SYNCLAB app.",
        "Because this is an unsigned preview build, macOS may say \"SYNCLAB cannot be opened because the developer cannot be verified.\" Click Cancel — do not move the app to Trash.",
        "Right-click (or Control-click) the SYNCLAB app and choose Open, then click Open in the dialog. It only needs to be approved once.",
        "Alternative: open Apple menu → System Settings → Privacy & Security and click \"Open Anyway\" next to the SYNCLAB message.",
      ],
      buttonText: "DOWNLOAD ZIP",
      minimumRequirement: "macOS version will be confirmed with the production release.",
      containsInstaller: false,
      current: true,
      publicRelease: true,
    },
    {
      id: "macos-x64-current",
      fileName: "SYNCLAB-Vocal-Forge-1.0.0-macOS-x64-2.zip",
      displayName: "SYNCLAB Vocal Forge for macOS (Intel)",
      platform: "macOS",
      version: "1.0.0",
      fileType: "ZIP PACKAGE",
      fileSize: "",
      releaseDate: "September 24, 2026",
      downloadUrl: "https://www.dropbox.com/scl/fi/dr1a5fp9bc0t8xq8u3bz8/SYNCLAB-Vocal-Forge-1.0.0-macOS-x64-2.zip?rlkey=yxilw4c75cwwb830125sp5eo7&st=tfnk3fsv&dl=1",
      availability: "available",
      checksum: "",
      description:
        "Portable macOS desktop package for Intel-based Macs. Extract the ZIP and open the included SYNCLAB app — no installer is included.",
      installationSteps: [
        "Download the ZIP and double-click it to extract the SYNCLAB app.",
        "Because this is an unsigned preview build, macOS may say \"SYNCLAB cannot be opened because the developer cannot be verified.\" Click Cancel — do not move the app to Trash.",
        "Right-click (or Control-click) the SYNCLAB app and choose Open, then click Open in the dialog. It only needs to be approved once.",
        "Alternative: open Apple menu → System Settings → Privacy & Security and click \"Open Anyway\" next to the SYNCLAB message.",
      ],
      buttonText: "DOWNLOAD ZIP",
      minimumRequirement: "macOS version will be confirmed with the production release.",
      containsInstaller: false,
      current: true,
      publicRelease: true,
    },
    {
      id: "windows-current",
      fileName: "SYNCLAB-Vocal-Forge-1.0.0-Windows-x64-1.zip",
      displayName: "SYNCLAB Vocal Forge for Windows",
      platform: "Windows",
      version: "1.0.0",
      fileType: "ZIP PACKAGE",
      fileSize: "",
      releaseDate: "September 24, 2026",
      downloadUrl: "https://www.dropbox.com/scl/fi/poa17oiwg71d6yr648xct/SYNCLAB-Vocal-Forge-1.0.0-Windows-x64-1.zip?rlkey=2ek335rwl5c17yt09f4njbw9p&st=4r49hcdd&dl=1",
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
      availability: "coming-soon",
      checksum: "",
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
      checksum: "",
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
      version: "Preview builds (2026-09-21)",
      releaseDate: "September 21, 2026",
      new: [
        "Portable SYNCLAB Vocal Forge desktop package for 64-bit Windows.",
        "Portable SYNCLAB Vocal Forge desktop package for macOS Apple Silicon (arm64).",
        "Portable SYNCLAB Vocal Forge desktop package for macOS Intel (x64).",
      ],
      improved: [],
      fixed: [],
      knownIssues: [
        "These packages are portable: extract the ZIP and run the included SYNCLAB app/SYNCLAB.exe. No native installers are included yet.",
        "Web release is not available yet.",
        "Full release notes will be published with the production release.",
      ],
    },
  ] satisfies ReleaseNote[],
  systemRequirements: [
    {
      platform: "macOS",
      supportedVersion: "System requirements will be published with the production release.",
      processor: "System requirements will be published with the production release.",
      ram: "System requirements will be published with the production release.",
      storage: "System requirements will be published with the production release.",
      audio: "System requirements will be published with the production release.",
      midi: "System requirements will be published with the production release.",
    },
    {
      platform: "Windows",
      supportedVersion: "Windows 10 or later, 64-bit.",
      processor: "System requirements will be published with the production release.",
      ram: "System requirements will be published with the production release.",
      storage: "Approximately 500 MB free space after extracting the ZIP package.",
      audio: "System requirements will be published with the production release.",
      midi: "System requirements will be published with the production release.",
    },
    {
      platform: "Web",
      supportedVersion: "System requirements will be published with the production release.",
      processor: "System requirements will be published with the production release.",
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
