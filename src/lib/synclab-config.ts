import synclabLogo from "@/assets/synclab-logo.jpg.asset.json";

export type Availability = "available" | "coming-soon" | "in-development" | "desktop-version";

export type DownloadPlatform = "macOS" | "Windows" | "Source/Website Package";
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
  platform: "macOS" | "Windows";
  supportedVersion: string;
  processor: string;
  ram: string;
  storage: string;
  audio: string;
  midi: string;
  browsers?: string;
  internet?: string;
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
  productName: "SYNCLAB",
  brandName: "SYNCLAB",
  brandSubline: "STUDIO",
  brandAssets: {
    logo: synclabLogo.url,
  },
  tagline: "Create. Record. Produce. Finish.",
  philosophy: "SIMPLE ENOUGH TO START. POWERFUL ENOUGH TO FINISH.",
  productVersion: "Preview builds (2026-09-21)",
  latestVersion: "Preview builds (2026-09-21)",
  websiteVersion: "",
  downloadAnnouncement: "",
  urls: {
    productionDomain: "",
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
      displayName: "SYNCLAB for macOS (Apple Silicon)",
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
      displayName: "SYNCLAB for macOS (Intel)",
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
      displayName: "SYNCLAB for Windows",
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
      description: "Administrative website source/package download, separate from the SYNCLAB application.",
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
        "Portable SYNCLAB desktop package for 64-bit Windows.",
        "Portable SYNCLAB desktop package for macOS Apple Silicon (arm64).",
        "Portable SYNCLAB desktop package for macOS Intel (x64).",
      ],
      improved: [],
      fixed: [],
      knownIssues: [
        "These packages are portable: extract the ZIP and run the included SYNCLAB app/SYNCLAB.exe. No native installers are included yet.",
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
  ] satisfies SystemRequirement[],
  availability: {},
  pricing: [
    {
      name: "SYNCLAB",
      price: "$19.95",
      billingPeriod: "per month · or $149/year",
      description: "Full access to the SYNCLAB studio after the trial.",
      cta: "Visit SYNCLAB",
      trialStatus: "7-day free trial",
      visible: true,
      features: ["Flagship synth", "Drum machine", "Multi-track recording", "Pro mixer", "WAV / MP3 export"],
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
  "Vocoder",
  "Mixer",
  "Export",
  "Desktop App",
  "Downloads & Installation",
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
  "macOS",
  "Windows",
];
