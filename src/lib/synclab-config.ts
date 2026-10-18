import synclabLogo from "@/assets/synclab-logo.jpg.asset.json";
import mainViewImage from "@/assets/synclab-main-view.jpg.asset.json";
import studioViewImage from "@/assets/synclab-studio-view-1-2.webp.asset.json";
import liveViewImage from "@/assets/synclab-live-view.jpg.asset.json";
import drums1Image from "@/assets/synclab-drum-machine-1.jpg.asset.json";
import drums2Image from "@/assets/synclab-drum-machine-2.jpg.asset.json";
import acidBassImage from "@/assets/synclab-acid-bass-2.webp.asset.json";
import modularImage from "@/assets/synclab-modular-tech-synth.jpg.asset.json";
import polySynthImage from "@/assets/synclab-poly-synth.webp.asset.json";
import sync4Image from "@/assets/synclab-sync-4-synth-2.webp.asset.json";
import videoSamplerImage from "@/assets/synclab-video-sampler.webp.asset.json";
import looperImage from "@/assets/synclab-live-looper.jpg.asset.json";
import reelImage from "@/assets/synclab-reel-to-reel-recorder.jpg.asset.json";
import padSamplerImage from "@/assets/synclab-pad-sampler.jpg.asset.json";
import mixerImage from "@/assets/synclab-mixer.jpg.asset.json";

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
  productImages: [
    { title: "Main View", description: "The SYNCLAB studio workspace.", imageUrl: mainViewImage.url },
    { title: "Studio View", description: "Arrange tracks on the studio timeline.", imageUrl: studioViewImage.url },
    { title: "Live View", description: "Perform and trigger parts live.", imageUrl: liveViewImage.url },
    { title: "Drum Machine", description: "Build beats with the step sequencer.", imageUrl: drums1Image.url },
    { title: "Drum Machine Kits", description: "Shape drum sounds and patterns.", imageUrl: drums2Image.url },
    { title: "Sync 4 Synth", description: "Design rich sounds with the Sync 4 engine.", imageUrl: sync4Image.url },
    { title: "Video Sampler", description: "Chop and slice samples from video audio.", imageUrl: videoSamplerImage.url },
    { title: "Acid Bass", description: "Program squelchy bass lines with the TD-3 style editor.", imageUrl: acidBassImage.url },
    { title: "Modular Tech Synth", description: "Patch and shape synth sounds.", imageUrl: modularImage.url },
    { title: "Poly Synth", description: "Play lush polyphonic chords.", imageUrl: polySynthImage.url },
    { title: "Live Looper", description: "Record and layer loops.", imageUrl: looperImage.url },
    { title: "Reel-to-Reel Recorder", description: "Capture takes with tape-style recording.", imageUrl: reelImage.url },
    { title: "Pad Sampler", description: "Trigger and record samples across the pad grid.", imageUrl: padSamplerImage.url },
    { title: "Mixer", description: "Balance tracks in the mixer.", imageUrl: mixerImage.url },
  ],
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
      fileName: "SYNCLAB-1.0.0-macOS-arm64.zip",
      displayName: "SYNCLAB for macOS (Apple Silicon)",
      platform: "macOS",
      version: "1.0.0",
      fileType: "ZIP PACKAGE",
      fileSize: "",
      releaseDate: "September 24, 2026",
      downloadUrl: "https://www.dropbox.com/scl/fi/2fyaryesu3x95fthycu3h/SYNCLAB-1.0.0-macOS-arm64.zip?rlkey=ca5hf0baquzxp6v2i9mjzt0of&st=zfql1ak6&dl=1",
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
      fileName: "SYNCLAB-1.0.0-macOS-x64.zip",
      displayName: "SYNCLAB for macOS (Intel)",
      platform: "macOS",
      version: "1.0.0",
      fileType: "ZIP PACKAGE",
      fileSize: "",
      releaseDate: "September 24, 2026",
      downloadUrl: "https://www.dropbox.com/scl/fi/i8jzemxif126m0no50d96/SYNCLAB-1.0.0-macOS-x64.zip?rlkey=lpayeqhks5nqeo9vkd0rdv9dh&st=cd6q5ab2&dl=1",
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
      fileName: "SYNCLAB-1.0.0-Windows-x64.zip",
      displayName: "SYNCLAB for Windows",
      platform: "Windows",
      version: "1.0.0",
      fileType: "ZIP PACKAGE",
      fileSize: "",
      releaseDate: "September 24, 2026",
      downloadUrl: "https://www.dropbox.com/scl/fi/dp034slhrmdfl385v8msu/SYNCLAB-1.0.0-Windows-x64.zip?rlkey=ywyf3q62g4h0m0n3op0o16gni&st=nuh1lpup&dl=1",
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
      features: ["4 synths: Sync 4, Acid Bass, Poly, Modular Tech", "Drum machine", "Multi-track recording", "Pro mixer", "WAV / MP3 export"],
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
