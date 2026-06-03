/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

// ─── Notification cards (simple triggers) ────────────────────
const NOTIFY_CARDS = {
  "Breaking Bad": "Breaking Bad - Now on Netflix",
  "Money Heist": "Money Heist - Now on Netflix",
  "Inception": "Inception - Now on Netflix",
  "CNN": "CNN - Live Now",
  "ESPN": "ESPN - Live Now",
  "Netflix": "Netflix - Open App",
};

// ─── Simple notification (popup) ─────────────────────────────
export function triggerNotification(name) {
  const message = NOTIFY_CARDS[name];

  if (!message) return false;

  showNotificationPopup("Notification", message, "info");
  return true;
}

// ─── Purchase success notification ───────────────────────────
export function triggerPurchaseNotification(title) {
  showNotificationPopup(
    "Purchase Successful",
    `You have successfully purchased: ${title}`,
    "success"
  );
}

// ─── Popup implementation ────────────────────────────────────
let popupElement = null;
let popupKeyHandler = null;
let autoDismissTimer = null;

function showNotificationPopup(title, message, type = "info") {
  closeNotificationPopup();

  // Overlay
  const overlay = document.createElement("div");
  overlay.id = "notif-popup-overlay";

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    background: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    zIndex: "99997",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: "0",
    transition: "opacity 0.25s ease",
    fontFamily: "'Inter', sans-serif",
  });

  // Popup box
  const popup = document.createElement("div");

  Object.assign(popup.style, {
    background: "linear-gradient(145deg, #0d0d2b, #141432)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "24px",
    padding: "56px 64px",
    minWidth: "640px",
    maxWidth: "800px",
    textAlign: "center",
    color: "#fff",
    boxShadow:
      "0 20px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)",
    transform: "scale(0.92)",
    transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
  });

  // Icon circle
  const iconCircle = document.createElement("div");

  const iconBg =
    type === "success"
      ? "linear-gradient(135deg, #4caf50, #2e7d32)"
      : "linear-gradient(135deg, #1428A0, #00a8ff)";

  Object.assign(iconCircle.style, {
    width: "88px",
    height: "88px",
    borderRadius: "50%",
    background: iconBg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 28px",
    boxShadow:
      type === "success"
        ? "0 0 40px rgba(76, 175, 80, 0.4)"
        : "0 0 40px rgba(20, 40, 160, 0.4)",
  });

  iconCircle.innerHTML =
    type === "success"
      ? `<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;

  // Brand label
  const brandLabel = document.createElement("div");

  Object.assign(brandLabel.style, {
    fontSize: "14px",
    color: "rgba(255,255,255,0.5)",
    fontWeight: "500",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "10px",
  });

  brandLabel.textContent = "Samsung UG";

  // Title
  const titleEl = document.createElement("div");

  Object.assign(titleEl.style, {
    fontSize: "32px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "14px",
  });

  titleEl.textContent = title;

  // Message
  const messageEl = document.createElement("div");

  Object.assign(messageEl.style, {
    fontSize: "20px",
    color: "rgba(255,255,255,0.75)",
    lineHeight: "1.5",
    marginBottom: "36px",
    wordBreak: "break-word",
  });

  messageEl.textContent = message;

  // OK button
  const okBtn = document.createElement("div");
  okBtn.tabIndex = 0;

  Object.assign(okBtn.style, {
    display: "inline-block",
    padding: "16px 64px",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.12)",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.15s ease",
    outline: "none",
    userSelect: "none",
    letterSpacing: "1px",
  });

  okBtn.textContent = "OK";

  const applyFocus = () => {
    okBtn.style.background = "rgba(255, 255, 255, 0.22)";
    okBtn.style.borderColor = "rgba(255, 255, 255, 0.5)";
    okBtn.style.transform = "scale(1.04)";
  };

  const removeFocus = () => {
    okBtn.style.background = "rgba(255, 255, 255, 0.12)";
    okBtn.style.borderColor = "rgba(255, 255, 255, 0.2)";
    okBtn.style.transform = "scale(1)";
  };

  okBtn.addEventListener("focus", applyFocus);
  okBtn.addEventListener("blur", removeFocus);
  okBtn.addEventListener("mouseenter", applyFocus);

  okBtn.addEventListener("mouseleave", () => {
    if (document.activeElement !== okBtn) removeFocus();
  });

  okBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeNotificationPopup();
  });

  popup.appendChild(iconCircle);
  popup.appendChild(brandLabel);
  popup.appendChild(titleEl);
  popup.appendChild(messageEl);
  popup.appendChild(okBtn);

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  popupElement = overlay;

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      popup.style.transform = "scale(1)";
    });
  });

  // Focus OK button
  setTimeout(() => okBtn.focus(), 150);

  // Auto-dismiss after 5 seconds
  autoDismissTimer = setTimeout(() => {
    closeNotificationPopup();
  }, 5000);

  // Keyboard handling with Tizen remote support
  const tizenKeyMap = {
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    13: "Enter",
    10009: "Back",
    10182: "Exit",
    8: "Backspace",
    27: "Escape",
  };

  popupKeyHandler = (e) => {
    if (!document.getElementById("notif-popup-overlay")) return;

    try {
      e.stopPropagation();
    } catch (_) {}

    try {
      e.stopImmediatePropagation();
    } catch (_) {}

    const mappedKey = tizenKeyMap[e.keyCode] || e.key;

    if (
      mappedKey === "Enter" ||
      mappedKey === "Escape" ||
      mappedKey === "Backspace" ||
      mappedKey === "Back" ||
      mappedKey === "XF86Back"
    ) {
      try {
        e.preventDefault();
      } catch (_) {}

      closeNotificationPopup();
    }
  };

  document.addEventListener("keydown", popupKeyHandler, true);

  // Click overlay to close
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeNotificationPopup();
  });
}

function closeNotificationPopup() {
  if (autoDismissTimer) {
    clearTimeout(autoDismissTimer);
    autoDismissTimer = null;
  }

  if (popupKeyHandler) {
    document.removeEventListener("keydown", popupKeyHandler, true);
    popupKeyHandler = null;
  }

  if (popupElement) {
    popupElement.style.opacity = "0";

    const popup = popupElement.firstChild;

    if (popup) popup.style.transform = "scale(0.92)";

    setTimeout(() => {
      if (popupElement) {
        popupElement.remove();
        popupElement = null;
      }
    }, 250);
  }
}