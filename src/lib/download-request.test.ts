import { describe, expect, test } from "bun:test";
import { processDownloadRequest } from "./download-request.server";

const request = { email: "customer@example.com", downloadId: "macos-arm64-current", requestId: "00000000-0000-4000-8000-000000000001", website: "" };

describe("software download email requirement", () => {
  test("an email address is required before any software download", async () => {
    let sent = false;
    const result = await processDownloadRequest({ ...request, email: "" }, async () => { sent = true; return { sent: true }; });
    expect(result.ok).toBe(false);
    expect(sent).toBe(false);
  });

  test.each([
    ["macos-arm64-current", "SYNCLAB-1.0.0-macOS-arm64.zip"],
    ["macos-x64-current", "SYNCLAB-1.0.0-macOS-x64.zip"],
    ["windows-current", "SYNCLAB-1.0.0-Windows-x64.zip"],
  ])("sends the thank-you email and the selected package for %s", async (downloadId, filename) => {
    let recipient = "";
    let template = "";
    let emailedUrl = "";
    const result = await processDownloadRequest({ ...request, downloadId }, async (name, email, options) => {
      template = name; recipient = email; emailedUrl = String(options.templateData?.['downloadUrl']);
      expect(options.idempotencyKey).toBe(`download-thank-you-${downloadId}-${request.requestId}`);
      return { sent: true };
    });
    expect(template).toBe("download-thank-you");
    expect(recipient).toBe("customer@example.com");
    expect(emailedUrl).toContain(filename);
    expect(emailedUrl).toContain("dl=1");
    expect(result).toEqual({ ok: true, downloadUrl: emailedUrl });
  });

  test("never releases the link when email sending fails or is suppressed", async () => {
    const failed = await processDownloadRequest(request, async () => { throw { code: "domain_not_verified" }; });
    const suppressed = await processDownloadRequest(request, async () => ({ sent: false, reason: "recipient_suppressed" }));
    expect(failed.ok).toBe(false);
    expect(suppressed.ok).toBe(false);
    expect("downloadUrl" in failed).toBe(false);
    expect("downloadUrl" in suppressed).toBe(false);
  });

  test("cannot send arbitrary templates or non-public downloads", async () => {
    let calls = 0;
    const result = await processDownloadRequest({ ...request, downloadId: "website-package" }, async () => { calls++; return { sent: true }; });
    expect(result.ok).toBe(false);
    expect(calls).toBe(0);
  });
});