export type Availability = "available" | "coming-soon" | "in-development" | "desktop-version";

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
  productVersion: "Version pending",
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
  "Mobile App",
  "Bug Report",
  "Feature Request",
  "Other",
];

export const helpCenterCategories = [
  "Getting Started",
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
