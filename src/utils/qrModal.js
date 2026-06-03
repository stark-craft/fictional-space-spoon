
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

import { triggerPurchaseNotification } from "./notify";

let modalElement = null;
let closeHandler = null;

export function openQRModal(card) {
  closeQRModal();

  // Create overlay
  const modal = document.createElement("div");
  modal.id = "qr-modal-overlay";

  Object.assign(modal.style, {
    position: "fixed",
    inset: "0",
    background: "rgba(0, 0, 0, 0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    zIndex: "99998",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: "0",
    transition: "opacity 0.3s ease",
    fontFamily: "'Inter', sans-serif",
  });

  // Content box
  const content = document.createElement("div");

  Object.assign(content.style, {
    background: "linear-gradient(145deg, #0d0d2b, #141432)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "36px",
    display: "flex",
    gap: "36px",
    maxWidth: "720px",
    width: "90%",
    color: "#fff",
  });

  // ─── Left side: QR + Cancel ───
  const leftSide = document.createElement("div");

  Object.assign(leftSide.style, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    flexShrink: "0",
  });

  // QR code box
  const qrBox = document.createElement("div");
  qrBox.tabIndex = 0;

  Object.assign(qrBox.style, {
    width: "180px",
    height: "180px",
    background: "#fff",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    outline: "none",
  });

  qrBox.innerHTML = `
    <svg viewBox="0 0 180 180" width="160" height="160">
      <rect x="10" y="10" width="50" height="50" rx="4" fill="#000"/>
      <rect x="120" y="10" width="50" height="50" rx="4" fill="#000"/>
      <rect x="10" y="120" width="50" height="50" rx="4" fill="#000"/>
      <rect x="18" y="18" width="34" height="34" rx="2" fill="#fff"/>
      <rect x="128" y="18" width="34" height="34" rx="2" fill="#fff"/>
      <rect x="18" y="128" width="34" height="34" rx="2" fill="#fff"/>
      <rect x="26" y="26" width="18" height="18" rx="1" fill="#000"/>
      <rect x="136" y="26" width="18" height="18" rx="1" fill="#000"/>
      <rect x="26" y="136" width="18" height="18" rx="1" fill="#000"/>
      <rect x="70" y="10" width="10" height="10" fill="#000"/>
      <rect x="90" y="10" width="10" height="10" fill="#000"/>
      <rect x="70" y="30" width="10" height="10" fill="#000"/>
      <rect x="100" y="30" width="10" height="10" fill="#000"/>
      <rect x="80" y="50" width="10" height="10" fill="#000"/>
      <rect x="70" y="70" width="10" height="10" fill="#000"/>
      <rect x="90" y="70" width="10" height="10" fill="#000"/>
      <rect x="110" y="70" width="10" height="10" fill="#000"/>
      <rect x="130" y="70" width="10" height="10" fill="#000"/>
      <rect x="150" y="70" width="10" height="10" fill="#000"/>
      <rect x="10" y="80" width="10" height="10" fill="#000"/>
      <rect x="30" y="80" width="10" height="10" fill="#000"/>
      <rect x="50" y="80" width="10" height="10" fill="#000"/>
      <rect x="80" y="80" width="10" height="10" fill="#000"/>
      <rect x="100" y="80" width="10" height="10" fill="#000"/>
      <rect x="70" y="100" width="10" height="10" fill="#000"/>
      <rect x="90" y="100" width="10" height="10" fill="#000"/>
      <rect x="120" y="100" width="10" height="10" fill="#000"/>
      <rect x="150" y="100" width="10" height="10" fill="#000"/>
      <rect x="120" y="120" width="10" height="10" fill="#000"/>
      <rect x="140" y="120" width="10" height="10" fill="#000"/>
      <rect x="160" y="120" width="10" height="10" fill="#000"/>
      <rect x="120" y="140" width="10" height="10" fill="#000"/>
      <rect x="150" y="140" width="10" height="10" fill="#000"/>
      <rect x="130" y="160" width="10" height="10" fill="#000"/>
      <rect x="160" y="160" width="10" height="10" fill="#000"/>
    </svg>
  `;

  // QR focus/hover effects
  qrBox.addEventListener("focus", () => {
    qrBox.style.transform = "scale(1.08)";
    qrBox.style.boxShadow = "0 0 0 4px rgba(76, 175, 80, 0.7)";
  });

  qrBox.addEventListener("blur", () => {
    qrBox.style.transform = "scale(1)";
    qrBox.style.boxShadow = "none";
  });

  qrBox.addEventListener("mouseenter", () => {
    qrBox.style.transform = "scale(1.08)";
    qrBox.style.boxShadow = "0 0 0 4px rgba(76, 175, 80, 0.7)";
  });

  qrBox.addEventListener("mouseleave", () => {
    if (document.activeElement !== qrBox) {
      qrBox.style.transform = "scale(1)";
      qrBox.style.boxShadow = "none";
    }
  });

  // QR label
  const qrLabel = document.createElement("div");

  Object.assign(qrLabel.style, {
    fontSize: "12px",
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
  });

  qrLabel.textContent = "Scan with phone or press Enter";

  // Cancel button
  const cancelBtn = document.createElement("div");
  cancelBtn.tabIndex = 0;

  Object.assign(cancelBtn.style, {
    padding: "10px 32px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.6)",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.15s ease",
    textAlign: "center",
    outline: "none",
    marginTop: "4px",
  });

  cancelBtn.textContent = "Cancel";

  cancelBtn.addEventListener("focus", () => {
    cancelBtn.style.background = "rgba(255,255,255,0.15)";
    cancelBtn.style.borderColor = "rgba(255,255,255,0.4)";
    cancelBtn.style.color = "#fff";
  });

  cancelBtn.addEventListener("blur", () => {
    cancelBtn.style.background = "rgba(255,255,255,0.08)";
    cancelBtn.style.borderColor = "rgba(255,255,255,0.12)";
    cancelBtn.style.color = "rgba(255,255,255,0.6)";
  });

  cancelBtn.addEventListener("mouseenter", () => {
    cancelBtn.style.background = "rgba(255,255,255,0.15)";
    cancelBtn.style.color = "#fff";
  });

  cancelBtn.addEventListener("mouseleave", () => {
    if (document.activeElement !== cancelBtn) {
      cancelBtn.style.background = "rgba(255,255,255,0.08)";
      cancelBtn.style.color = "rgba(255,255,255,0.6)";
    }
  });

  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeQRModal();
  });

  leftSide.appendChild(qrBox);
  leftSide.appendChild(qrLabel);
  leftSide.appendChild(cancelBtn);

  // ─── Right side: Card info ───
  const rightSide = document.createElement("div");

  Object.assign(rightSide.style, {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flex: "1",
    minWidth: "0",
  });

  if (card.image) {
    const img = document.createElement("img");
    img.src = card.image;
    img.alt = card.title || "";

    Object.assign(img.style, {
      width: "100%",
      height: "140px",
      objectFit: "cover",
      borderRadius: "10px",
      background: "#1a1a2e",
    });

    rightSide.appendChild(img);
  }

  if (card.title) {
    const el = document.createElement("div");

    Object.assign(el.style, {
      fontSize: "20px",
      fontWeight: "700",
      color: "#fff",
    });

    el.textContent = card.title;
    rightSide.appendChild(el);
  }

  if (card.subtitle) {
    const el = document.createElement("div");

    Object.assign(el.style, {
      fontSize: "13px",
      color: "rgba(255,255,255,0.6)",
      lineHeight: "1.5",
      whiteSpace: "pre-line",
    });

    el.textContent = card.subtitle;
    rightSide.appendChild(el);
  }

  if (card.price) {
    const el = document.createElement("div");

    Object.assign(el.style, {
      fontSize: "18px",
      fontWeight: "700",
      color: "#4caf50",
    });

    el.textContent = card.price;
    rightSide.appendChild(el);
  }

  if (card.meta) {
    const el = document.createElement("div");

    Object.assign(el.style, {
      fontSize: "11px",
      color: "rgba(255,255,255,0.4)",
    });

    el.textContent = card.meta;
    rightSide.appendChild(el);
  }

  if (card.platform) {
    const el = document.createElement("div");

    Object.assign(el.style, {
      fontSize: "11px",
      color: "rgba(255,255,255,0.5)",
      marginTop: "4px",
    });

    el.textContent = "Available on " + card.platform;
    rightSide.appendChild(el);
  }

  content.appendChild(leftSide);
  content.appendChild(rightSide);
  modal.appendChild(content);
  document.body.appendChild(modal);

  modalElement = modal;

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.style.opacity = "1";
    });
  });

  // Focus QR initially
  setTimeout(() => qrBox.focus(), 150);

  // ─── Purchase handler ───
  const handlePurchase = () => {
    triggerPurchaseNotification(card.title);
    closeQRModal();
  };

  qrBox.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    handlePurchase();
  });

  // ─── Keyboard handling inside modal ───
  // Tizen remote keyCode map
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

  const focusables = [qrBox, cancelBtn];
  let fIdx = 0;

  closeHandler = (e) => {
    // Only handle if modal is still open
    if (!document.getElementById("qr-modal-overlay")) return;

    try {
      e.stopPropagation();
    } catch (_) {}

    try {
      e.stopImmediatePropagation();
    } catch (_) {}

    const mappedKey = tizenKeyMap[e.keyCode] || e.key;

    if (
      mappedKey === "Escape" ||
      mappedKey === "Backspace" ||
      mappedKey === "Back" ||
      mappedKey === "XF86Back"
    ) {
      try {
        e.preventDefault();
      } catch (_) {}

      closeQRModal();
      return;
    }

    if (mappedKey === "Enter") {
      try {
        e.preventDefault();
      } catch (_) {}

      if (document.activeElement === qrBox) {
        handlePurchase();
      } else if (document.activeElement === cancelBtn) {
        closeQRModal();
      }

      return;
    }

    if (mappedKey === "ArrowDown" || mappedKey === "ArrowRight") {
      try {
        e.preventDefault();
      } catch (_) {}

      fIdx = (fIdx + 1) % focusables.length;
      focusables[fIdx].focus();
      return;
    }

    if (mappedKey === "ArrowUp" || mappedKey === "ArrowLeft") {
      try {
        e.preventDefault();
      } catch (_) {}

      fIdx = (fIdx - 1 + focusables.length) % focusables.length;
      focusables[fIdx].focus();
    }
  };

  // Use capture phase with highest priority
  document.addEventListener("keydown", closeHandler, true);

  // Close if clicking overlay
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeQRModal();
    }
  });
}

export function closeQRModal() {
  if (closeHandler) {
    document.removeEventListener("keydown", closeHandler, true);
    closeHandler = null;
  }

  if (modalElement) {
    modalElement.style.opacity = "0";

    setTimeout(() => {
      if (modalElement) {
        modalElement.remove();
        modalElement = null;
      }
    }, 300);
  }
}