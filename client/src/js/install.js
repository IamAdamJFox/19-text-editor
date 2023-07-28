// Get a reference to the "Install" button element with the ID "buttonInstall"
const installButton = document.getElementById("buttonInstall");

// Event handler for the "beforeinstallprompt" event
window.addEventListener("beforeinstallprompt", (event) => {
  // Save the event in a global variable to trigger the installation prompt later
  window.deferredPrompt = event;

  // Make the "Install" button visible, allowing users to click it for installation
  installButton.classList.toggle("hidden", false);
});

// Click event handler for the "Install" button
installButton.addEventListener("click", async () => {
  // Retrieve the deferred prompt from the global variable
  const promptEvent = window.deferredPrompt;

  // Check if the installation prompt has been triggered
  if (!promptEvent) {
    return; // Exit the function if the prompt hasn't been triggered yet
  }

  // Show the installation prompt to the user
  promptEvent.prompt();

  // Nullify the deferred prompt to prevent it from being displayed again after installation
  window.deferredPrompt = null;

  // Hide the "Install" button after the prompt has been shown
  installButton.classList.toggle("hidden", true);
});

// Event handler for the "appinstalled" event
window.addEventListener("appinstalled", (event) => {
  // Nullify the deferred prompt when the app has been installed to prevent future prompts
  window.deferredPrompt = null;
});

