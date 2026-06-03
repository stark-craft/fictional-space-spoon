
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useCallback } from "react";

export default function useKeyNavigation(onHeroExpand, onHeroCollapse) {
  const sectionsRef = useRef([]);

  const registerSection = useCallback((index, element) => {
    sectionsRef.current[index] = element || null;
  }, []);

  useEffect(() => {
    let currentSection = 0;
    let currentItem = 0;
    let scrollTimer = null;
    let pendingScrollTarget = null;
    let featuredReturnFocus = null;

    function getItemsInSection(sectionIndex) {
      const section = sectionsRef.current[sectionIndex];
      if (!section) return [];
      return Array.from(section.querySelectorAll("[tabindex='0']"));
    }

    function scheduleScroll(el, options = {}) {
      pendingScrollTarget = el;

      if (scrollTimer) clearTimeout(scrollTimer);

      scrollTimer = setTimeout(() => {
        if (pendingScrollTarget) {
          try {
            pendingScrollTarget.scrollIntoView({
              block: options.block || "nearest",
              inline: "nearest",
              behavior: options.behavior || "instant",
            });
          } catch (_) {}

          pendingScrollTarget = null;
        }

        scrollTimer = null;
      }, 80);
    }

    function focusItem(sectionIndex, itemIndex, options = {}) {
      const items = getItemsInSection(sectionIndex);
      if (items.length === 0) return false;

      const clampedItem = Math.max(0, Math.min(itemIndex, items.length - 1));

      currentSection = sectionIndex;
      currentItem = clampedItem;

      const el = items[clampedItem];

      el.focus({ preventScroll: true });
      scheduleScroll(el, options);

      return true;
    }

    function syncFocusPosition() {
      const focusedEl = document.activeElement;
      if (!focusedEl) return false;

      for (let sectionIndex = 0; sectionIndex < sectionsRef.current.length; sectionIndex++) {
        const items = getItemsInSection(sectionIndex);
        const itemIndex = items.indexOf(focusedEl);

        if (itemIndex >= 0) {
          currentSection = sectionIndex;
          currentItem = itemIndex;
          return true;
        }
      }

      return false;
    }

    function focusActiveTab(options = {}) {
      const tabSectionIndex = 1;
      const tabSection = sectionsRef.current[tabSectionIndex];
      if (!tabSection) return false;

      const tabItems = getItemsInSection(tabSectionIndex);
      if (tabItems.length === 0) return false;

      const activeTab =
        tabSection.querySelector(".tab-item.active[tabindex='0']") ||
        tabSection.querySelector("[aria-selected='true'][tabindex='0']") ||
        tabSection.querySelector("[data-active='true'][tabindex='0']");

      const activeIndex = activeTab ? tabItems.indexOf(activeTab) : -1;

      return focusItem(
        tabSectionIndex,
        activeIndex >= 0 ? activeIndex : 0,
        options
      );
    }

    function getFeaturedStage() {
      return document.querySelector("[data-featured-stage='true']");
    }

    function getFeaturedButtons() {
      const stage = getFeaturedStage();
      if (!stage) return [];
      return Array.from(stage.querySelectorAll("[data-featured-action='true']"));
    }

    function handleFeaturedNavigation(mappedKey, e) {
      const buttons = getFeaturedButtons();
      if (buttons.length === 0) return false;

      const activeEl = document.activeElement;
      const focusInFeatured = buttons.includes(activeEl);
      const mainContent = document.querySelector(".main-content");
      const focusInMainContent = activeEl && mainContent?.contains(activeEl);

      if (mappedKey === "ArrowUp" && !focusInFeatured && focusInMainContent) {
        try {
          e.preventDefault();
          e.stopImmediatePropagation();
        } catch (_) {}

        featuredReturnFocus = activeEl;

        buttons[0].focus({ preventScroll: true });
        scheduleScroll(buttons[0], { block: "nearest", behavior: "smooth" });

        return true;
      }

      if (!focusInFeatured) return false;

      if (mappedKey === "ArrowLeft" || mappedKey === "ArrowRight") {
        try {
          e.preventDefault();
          e.stopImmediatePropagation();
        } catch (_) {}

        const currentIndex = Math.max(0, buttons.indexOf(activeEl));
        const nextIndex =
          mappedKey === "ArrowRight"
            ? Math.min(buttons.length - 1, currentIndex + 1)
            : Math.max(0, currentIndex - 1);

        buttons[nextIndex]?.focus({ preventScroll: true });
        return true;
      }

      if (
        mappedKey === "ArrowDown" ||
        mappedKey === "Back" ||
        mappedKey === "Backspace" ||
        mappedKey === "Escape" ||
        mappedKey === "XF86Back"
      ) {
        try {
          e.preventDefault();
          e.stopImmediatePropagation();
        } catch (_) {}

        if (featuredReturnFocus && document.contains(featuredReturnFocus)) {
          featuredReturnFocus.focus({ preventScroll: true });
        }

        return true;
      }

      if (mappedKey === "Enter") {
        try {
          e.preventDefault();
          e.stopImmediatePropagation();
        } catch (_) {}

        activeEl.click();
        return true;
      }

      return false;
    }

    function handleKeyDown(e) {
      const key = e.key;

      const tizenKeyMap = {
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        13: "Enter",
        10009: "Back",
        10182: "Exit",
      };

      const mappedKey = tizenKeyMap[e.keyCode] || key;

      const promoQrModal = document.getElementById("promo-qr-modal-overlay");

      if (promoQrModal) {
        if (
          mappedKey === "Enter" ||
          mappedKey === "Back" ||
          mappedKey === "Backspace" ||
          mappedKey === "Escape" ||
          mappedKey === "XF86Back"
        ) {
          try {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
          } catch (_) {}

          window.dispatchEvent(new CustomEvent("promo-qr-modal-close"));
          return;
        }

        try {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        } catch (_) {}

        return;
      }

      const focusedEl = document.activeElement;

      const expandedAiDock = focusedEl?.closest?.(".ai-intent-dock.expanded");

      if (expandedAiDock) {
        if (
          mappedKey === "Enter" ||
          mappedKey === "Back" ||
          mappedKey === "Backspace" ||
          mappedKey === "Escape" ||
          mappedKey === "XF86Back"
        ) {
          return;
        }

        if (
          mappedKey === "ArrowRight" &&
          focusedEl?.classList?.contains("ai-intent-input")
        ) {
          try {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
          } catch (_) {}

          expandedAiDock
            .querySelector(".ai-intent-submit")
            ?.focus({ preventScroll: true });
          return;
        }

        if (
          mappedKey === "ArrowLeft" &&
          focusedEl?.classList?.contains("ai-intent-submit")
        ) {
          try {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
          } catch (_) {}

          expandedAiDock
            .querySelector(".ai-intent-input")
            ?.focus({ preventScroll: true });
          return;
        }
      }

      /**
       * Live Sports Match Centre:
       * Let the Match Centre button and six-option popup handle all arrows locally.
       */
      const liveMatchCentrePanel =
        focusedEl?.closest?.(".live-sports-floating-info");

      if (liveMatchCentrePanel) {
        return;
      }

      /**
       * Apps motion-preview action bar:
       * Let PromoRow handle Enter / Left / Right / Up / Back locally.
       * ArrowDown remains global row navigation.
       */
      const previewAction = focusedEl?.closest?.(".promo-preview-action-bar");

      if (previewAction && mappedKey !== "ArrowDown") {
        return;
      }

      /**
       * Live Sports:
       * When card is expanded and score panel is open,
       * ArrowRight enters Match Centre.
       */
      const livePreviewShell = focusedEl?.closest?.(
        ".live-sports-row-shell.preview-mode"
      );

      const isFocusedLiveSportsCard =
        focusedEl?.classList?.contains("live-sports-card") &&
        focusedEl?.classList?.contains("immersive-card-active");

      if (
        livePreviewShell &&
        isFocusedLiveSportsCard &&
        mappedKey === "ArrowRight"
      ) {
        const matchCentreButton = livePreviewShell.querySelector(
          "[data-live-match-centre='true']"
        );

        if (matchCentreButton) {
          try {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
          } catch (_) {}

          matchCentreButton.focus({ preventScroll: true });
          return;
        }
      }

      /**
       * Apps Sponsored:
       * When motion preview is open,
       * ArrowRight from active card enters the preview action buttons.
       */
      const previewShell = focusedEl?.closest?.(".promo-row-shell.preview-mode");

      const isFocusedSponsoredCard =
        focusedEl?.classList?.contains("promo-card") &&
        focusedEl?.classList?.contains("immersive-card-active");

      if (
        previewShell &&
        isFocusedSponsoredCard &&
        mappedKey === "ArrowRight"
      ) {
        const firstPreviewButton =
          previewShell.querySelector(".promo-preview-action-btn.scan") ||
          previewShell.querySelector(".promo-preview-action-btn");

        if (firstPreviewButton) {
          try {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
          } catch (_) {}

          firstPreviewButton.focus({ preventScroll: true });
          return;
        }
      }

      if (window.__detailPageOpen) return;
      if (document.getElementById("qr-modal-overlay")) return;
      if (document.getElementById("notif-popup-overlay")) return;

      if (handleFeaturedNavigation(mappedKey, e)) return;

      if (
        mappedKey === "Back" ||
        mappedKey === "Backspace" ||
        mappedKey === "Escape" ||
        mappedKey === "XF86Back"
      ) {
        try {
          e.preventDefault();
        } catch (_) {}

        if (window.tizen && window.tizen.application) {
          window.tizen.application.getCurrentApplication().exit();
        } else {
          if (confirm("Exit the app?")) {
            window.close();
          }
        }

        return;
      }

      if (
        !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(
          mappedKey
        )
      ) {
        return;
      }

      try {
        e.preventDefault();
      } catch (_) {}

      try {
        e.stopPropagation();
      } catch (_) {}

      syncFocusPosition();

      const totalSections = sectionsRef.current.filter(Boolean).length;

      switch (mappedKey) {
        case "ArrowRight": {
          const items = getItemsInSection(currentSection);

          if (currentItem < items.length - 1) {
            focusItem(currentSection, currentItem + 1, {
              block: "nearest",
              behavior: "instant",
            });
          }

          break;
        }

        case "ArrowLeft": {
          if (currentItem > 0) {
            focusItem(currentSection, currentItem - 1, {
              block: "nearest",
              behavior: "instant",
            });
          }

          break;
        }

        case "ArrowDown": {
          if (currentSection === 0 && onHeroCollapse) {
            onHeroCollapse();
          }

          for (let i = currentSection + 1; i < totalSections; i++) {
            const items = getItemsInSection(i);

            if (items.length > 0) {
              focusItem(i, 0, {
                block: "center",
                behavior: "auto",
              });
              break;
            }
          }

          break;
        }

        case "ArrowUp": {
          if (currentSection === 1 && onHeroExpand) {
            onHeroExpand();
          }

          if (currentSection === 0) {
            if (onHeroExpand) onHeroExpand();
            break;
          }

          for (let i = currentSection - 1; i >= 0; i--) {
            const items = getItemsInSection(i);

            if (items.length > 0) {
              if (i === 1) {
                focusActiveTab({
                  block: "nearest",
                  behavior: "auto",
                });
                break;
              }

              focusItem(i, 0, {
                block: "center",
                behavior: "auto",
              });

              if (i === 0 && onHeroExpand) onHeroExpand();

              break;
            }
          }

          break;
        }

        case "Enter": {
          const items = getItemsInSection(currentSection);

          if (items[currentItem]) {
            items[currentItem].click();
          }

          break;
        }

        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown, true);

    if (window.tizen && window.tizen.tvinputdevice) {
      try {
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "Enter",
          "Return",
        ].forEach((k) => {
          try {
            window.tizen.tvinputdevice.registerKey(k);
          } catch (_) {}
        });
      } catch (_) {}
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);

      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [onHeroExpand, onHeroCollapse]);

  return { registerSection };
}
