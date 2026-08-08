const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

function waitForEvent(target, eventName, timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`Timed out waiting for ${eventName}`)), timeoutMs);
    target.addEventListener(eventName, () => {
      clearTimeout(t);
      resolve();
    }, { once: true });
  });
}

test("Base64 to Image: Preview converts valid base64 and shows output", async () => {
  const htmlPath = path.join(__dirname, "..", "base64-to-image.html");
  const html = fs.readFileSync(htmlPath, "utf8");

  const dom = new JSDOM(html, {
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true,
    beforeParse(window) {
      // Mock fetch for footer/sidebar includes
      window.fetch = () =>
        Promise.resolve({
          text: () => Promise.resolve(""),
        });

      // Mock object URL APIs used for download link
      window.URL.createObjectURL = () => "blob:mock-url";
      window.URL.revokeObjectURL = () => {};

      // Mock clipboard (not used in this test but prevents errors if clicked elsewhere)
      window.navigator.clipboard = {
        writeText: () => Promise.resolve(),
      };
    },
  });

  // Wait until all scripts run (your code attaches listeners on DOMContentLoaded + load)
  await waitForEvent(dom.window, "load");

  const base64Input = dom.window.document.getElementById("base64-input");
  const convertBtn = dom.window.document.getElementById("convert-btn");

  // Ensure demo base64 was populated on load (your code does this)
  expect(base64Input.value).toMatch(/^iVBORw0KGgo/);

  // Click Preview
  convertBtn.click();

  // Give async handler time to run
  await new Promise((r) => setTimeout(r, 50));

  const outputSection = dom.window.document.getElementById("output-section");
  const previewImg = dom.window.document.getElementById("preview-img");
  const downloadBtn = dom.window.document.getElementById("download-btn");
  const detectedType = dom.window.document.getElementById("detected-type");
  const estimatedSize = dom.window.document.getElementById("estimated-size");
  const base64Length = dom.window.document.getElementById("base64-length");

  // Output should be visible
  expect(outputSection.classList.contains("hidden")).toBe(false);

  // Preview image should be set to a data URL
  expect(previewImg.getAttribute("src")).toMatch(/^data:image\/png;base64,/);

  // Download should be wired up
  expect(downloadBtn.getAttribute("href")).toBe("blob:mock-url");
  expect(downloadBtn.getAttribute("download")).toBe("image.png");

  // Meta fields should be filled
  expect(detectedType.textContent).toBe("image/png");
  expect(estimatedSize.textContent).not.toBe("—");
  expect(base64Length.textContent).toContain("chars");
});
