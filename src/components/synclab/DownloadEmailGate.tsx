import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Download, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { downloadRequestSchema } from "@/lib/download-request";
import { requestDownload } from "@/lib/download-request.functions";

export function DownloadEmailGate({ downloadId, downloadName, label = "DOWNLOAD ZIP", variant = "signal" }: {
  downloadId: string; downloadName: string; label?: string; variant?: "signal" | "outline";
}) {
  const sendRequest = useServerFn(requestDownload);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [requestId, setRequestId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  return (
    <Dialog onOpenChange={(open) => { if (open) { setError(""); setDownloadUrl(""); setRequestId(crypto.randomUUID()); } }}>
      <DialogTrigger asChild><Button variant={variant} className="mt-7 w-full"><Download />{label}</Button></DialogTrigger>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground">{downloadUrl ? "Your download is ready" : "Get SYNCLAB"}</DialogTitle>
          <DialogDescription className="break-words">{downloadName}</DialogDescription>
        </DialogHeader>
        {downloadUrl ? (
          <div className="space-y-5" role="status">
            <CheckCircle2 className="size-8 text-signal" />
            <p className="text-sm leading-6 text-muted-foreground">Thank you! Your download link has been sent to {email}.</p>
            <Button asChild variant="signal" className="w-full"><a href={downloadUrl} target="_blank" rel="noopener noreferrer"><Download />Download ZIP</a></Button>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={async (event) => {
            event.preventDefault();
            if (busy) return;
            const parsed = downloadRequestSchema.safeParse({ email, downloadId, requestId, website });
            if (!parsed.success) { setError("Enter a valid email address."); return; }
            setBusy(true); setError("");
            try {
              const result = await sendRequest({ data: parsed.data });
              if (result.ok) setDownloadUrl(result.downloadUrl);
              else setError(result.message);
            } catch { setError("We couldn't send your download email. Please try again later."); }
            finally { setBusy(false); }
          }}>
            <div className="space-y-2">
              <label htmlFor={`email-${downloadId}`} className="text-sm font-medium text-foreground">Email address</label>
              <Input id={`email-${downloadId}`} type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => { setEmail(event.target.value); setRequestId(crypto.randomUUID()); }} disabled={busy} placeholder="you@example.com" />
            </div>
            <div className="hidden" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label></div>
            <p className="text-sm leading-6 text-muted-foreground">We’ll email you a thank-you message with the download link for this version.</p>
            {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" variant="signal" className="w-full" disabled={busy}>{busy ? <LoaderCircle className="animate-spin motion-reduce:animate-none" /> : <Send />}{busy ? "Sending…" : "Email my download"}</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}