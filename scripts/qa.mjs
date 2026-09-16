import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const origin = "http://localhost:3000";
const paths = ["", "/about", "/about/filming", "/stay", "/stay/main-house", "/experiences", "/gallery", "/guide", "/explore", "/location", "/reservation"];
const localChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const executablePath = process.env.CHROME_PATH || (existsSync(localChrome) ? localChrome : undefined);
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
const errors = [];
async function loadPageImages(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 650) { await page.evaluate(value => window.scrollTo(0, value), y); await page.waitForTimeout(70); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForLoadState("networkidle");
}
await mkdir("screenshots", { recursive: true });
for (const locale of ["ko", "en"]) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, permissions: ["clipboard-read", "clipboard-write"] });
  const page = await context.newPage();
  page.on("pageerror", error => errors.push(`${locale}: ${error.message}`));
  for (const path of paths) {
    const url = `${origin}/${locale}${path}`;
    const response = await page.goto(url, { waitUntil: "networkidle" });
    if (response?.status() !== 200) errors.push(`${url}: HTTP ${response?.status()}`);
    if (!(await page.locator("h1").count())) errors.push(`${url}: missing h1`);
    if (await page.locator("html").getAttribute("lang") !== locale) errors.push(`${url}: incorrect html language`);
    const broken = await page.locator("img").evaluateAll(images => images.filter(image => image.loading !== "lazy" && (!image.complete || image.naturalWidth === 0)).map(image => image.currentSrc));
    if (broken.length) errors.push(`${url}: broken images ${broken.join(", ")}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
    if (overflow) errors.push(`${url}: horizontal overflow`);
  }
  await page.goto(`${origin}/${locale}`, { waitUntil: "networkidle" });
  await loadPageImages(page);
  await page.screenshot({ path: `screenshots/${locale}-desktop.png`, fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "networkidle" });
  await loadPageImages(page);
  await page.screenshot({ path: `screenshots/${locale}-mobile.png`, fullPage: true });
  await page.setViewportSize({ width: 360, height: 740 });
  await page.reload({ waitUntil: "networkidle" });
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2)) errors.push(`${locale} mobile 360: overflow`);
  await page.locator(".mobile-menu summary").click();
  if (!(await page.locator(".mobile-menu nav").isVisible())) errors.push(`${locale}: mobile menu failed`);
  await page.goto(`${origin}/${locale}/gallery`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: locale === "ko" ? "실내" : "Interior", exact: true }).click();
  await page.locator(".gallery-tile").first().click();
  if (!(await page.locator(".lightbox").isVisible())) errors.push(`${locale}: lightbox failed`);
  await page.keyboard.press("Escape");
  if (await page.locator(".lightbox").count()) errors.push(`${locale}: lightbox Escape failed`);
  await page.goto(`${origin}/${locale}/stay/main-house`, { waitUntil: "networkidle" });
  const switchHref = await page.locator(`.lang-switch a[href="/${locale === "ko" ? "en" : "ko"}/stay/main-house"]`).count();
  if (!switchHref) errors.push(`${locale}: language switch did not preserve page`);
  await page.goto(`${origin}/${locale}/location`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: locale === "ko" ? "한글 주소 복사" : "Copy Korean Address" }).click();
  if (await page.evaluate(() => navigator.clipboard.readText()) !== "강원 홍천군 서면 고루개길 110") errors.push(`${locale}: address copy failed`);
  await context.close();
}
await browser.close();
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log("PASS: 22 routes, images, desktop/mobile overflow, mobile menu, gallery, language switch. Screenshots saved.");
