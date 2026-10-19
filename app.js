const versionLabel = document.querySelector("#firmware-version");
const unsupportedNotice = document.querySelector("#unsupported");

if (!("serial" in navigator)) {
  unsupportedNotice.hidden = false;
}

const variants = [
  ["C6 2.06", "firmware/manifest-c6.json"],
  ["S3 2.06", "firmware/manifest-s3.json"],
  ["S3 1.43C", "firmware/manifest-s3-143c.json"],
];

Promise.all(variants.map(async ([name, path]) => {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const manifest = await response.json();
  return `${name}: ${manifest.version}`;
}))
  .then((versions) => {
    versionLabel.textContent = versions.join(" · ");
  })
  .catch(() => {
    versionLabel.textContent = "Firmware chwilowo niedostępny";
  });
