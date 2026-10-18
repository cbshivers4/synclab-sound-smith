import { createServerFn } from "@tanstack/react-start";
import { downloadRequestSchema } from "./download-request";

export const requestDownload = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => downloadRequestSchema.parse(input))
  .handler(async ({ data }) => {
    const { processDownloadRequest } = await import("./download-request.server");
    const { sendTemplateEmail } = await import("./email-templates/send-email");
    return processDownloadRequest(data, sendTemplateEmail);
  });