import { synclabConfig } from "./synclab-config";
import { downloadRequestSchema, type DownloadRequestResult } from "./download-request";
import type { SendTemplateEmailOptions, SendTemplateEmailResult } from "./email-templates/send-email";

type Sender = (template: string, email: string, options: SendTemplateEmailOptions) => Promise<SendTemplateEmailResult>;

export async function processDownloadRequest(input: unknown, send: Sender): Promise<DownloadRequestResult> {
  const parsed = downloadRequestSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: "Enter a valid email address and try again." };
  const data = parsed.data;
  const download = synclabConfig.downloads.find((item) => item.id === data.downloadId && item.publicRelease && item.availability === "available");
  if (!download || !/^https:\/\//.test(download.downloadUrl)) {
    return { ok: false, message: "This download is not available. Please choose another version." };
  }
  try {
    const result = await send("download-thank-you", data.email, {
      templateData: { downloadName: download.displayName, version: download.version, downloadUrl: download.downloadUrl },
      idempotencyKey: `download-thank-you-${download.id}-${data.requestId}`,
      replyTo: "christophershivers@synclabsapp.com",
    });
    if (!result.sent) return { ok: false, message: "We cannot send to this address because it has unsubscribed or cannot receive our emails. Contact SYNCLAB Support for help." };
    return { ok: true, downloadUrl: download.downloadUrl };
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? error.code : undefined;
    if (code === "domain_not_verified") return { ok: false, message: "SYNCLAB download emails are not ready yet. Please try again after our email setup is verified." };
    if (error && typeof error === "object" && "status" in error && error.status === 429) {
      const seconds = "retryAfterSeconds" in error && typeof error.retryAfterSeconds === "number" ? error.retryAfterSeconds : 60;
      return { ok: false, message: `Email sending is busy. Please wait ${seconds} seconds before trying again.` };
    }
    return { ok: false, message: "We couldn't send your download email. Please try again later or contact SYNCLAB Support." };
  }
}