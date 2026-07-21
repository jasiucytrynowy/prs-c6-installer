const versionLabel = document.querySelector("#firmware-version");
const unsupportedNotice = document.querySelector("#unsupported");

if (!("serial" in navigator)) {
  unsupportedNotice.hidden = false;
}

fetch("firmware/manifest.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then((manifest) => {
    versionLabel.textContent = `Wersja ${manifest.version}`;
  })
  .catch(() => {
    versionLabel.textContent = "Firmware chwilowo niedostępny";
  });
