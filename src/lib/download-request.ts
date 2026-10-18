import { z } from "zod";

export const downloadRequestSchema = z.object({
  email: z.string().trim().email().max(254),
  downloadId: z.string().min(1).max(80),
  requestId: z.string().uuid(),
  website: z.string().max(0),
});

export type DownloadRequest = z.infer<typeof downloadRequestSchema>;
export type DownloadRequestResult =
  | { ok: true; downloadUrl: string }
  | { ok: false; message: string };