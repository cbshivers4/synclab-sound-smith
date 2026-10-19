import { expect, test } from "bun:test";
import { legacySiteRedirect } from "./site-host";

test("forwards the retired address to the current one, keeping the page", () => {
  expect(
    legacySiteRedirect("synclab-vocal-forge.lovable.app", "/download", "?x=1", "#macos")
  ).toBe("https://synclab-sound-smith.lovable.app/download?x=1#macos");
});

test("leaves the current address alone", () => {
  expect(legacySiteRedirect("synclab-sound-smith.lovable.app", "/download")).toBeNull();
});

test("leaves the preview address alone", () => {
  expect(
    legacySiteRedirect("id-preview--28ce8cec-aa92-43ee-b8d1-67be709834d9.lovable.app", "/")
  ).toBeNull();
});
