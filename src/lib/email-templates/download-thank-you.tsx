import { Body, Button, Container, Head, Heading, Html, Link, Preview, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props { downloadName?: string; version?: string; downloadUrl?: string }

function DownloadThankYou({ downloadName = "SYNCLAB", version = "1.0.0", downloadUrl }: Props) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Thank you for choosing SYNCLAB. Your download is ready.</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={brand}>SYNCLAB</Text>
          <Heading style={heading}>Thank you for choosing SYNCLAB.</Heading>
          <Text style={text}>Your {downloadName} download is ready. Version {version}.</Text>
          {downloadUrl ? <Button href={downloadUrl} style={button}>Download SYNCLAB</Button> : null}
          <Text style={text}>Extract the ZIP package, then open the included SYNCLAB application. Keep this email so you can return to your download.</Text>
          <Text style={text}>Questions? Reply to this email or visit the <Link href="https://synclab-sound-smith.lovable.app/help-center" style={link}>Help Center</Link>.</Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" };
const container = { padding: "40px 24px", maxWidth: "560px" };
const brand = { color: "#101827", fontSize: "22px", fontWeight: "700" };
const heading = { color: "#101827", fontSize: "26px", lineHeight: "34px" };
const text = { color: "#465268", fontSize: "16px", lineHeight: "26px" };
const button = { backgroundColor: "#eaae31", color: "#101827", padding: "16px 24px", borderRadius: "4px", fontWeight: "700" };
const link = { color: "#101827", textDecoration: "underline" };

export const template = {
  component: DownloadThankYou,
  subject: "Thank you — your SYNCLAB download is ready",
  displayName: "SYNCLAB download thank-you",
  previewData: { downloadName: "SYNCLAB for macOS (Apple Silicon)", version: "1.0.0" },
} satisfies TemplateEntry;