/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import DetailPage from "./DetailPage";
import { platformLogos } from "../data/content";
import { recordPersonalizationEvent } from "../utils/personalization";

function getPromoPlatformName(item) {
  return item?.qrData?.platform || item?.platform || item?.title || "App";
}

function isInstalledPromoApp(platformName) {
  return [
    "Netflix",
    "Prime Video",
    "JioHotstar",
    "Lionsgate Play",
    "Discovery+",
    "Hoichoi",
  ].includes(platformName);
}

function getPromoSpotlightTitle(item) {
  return item?.qrData?.title || item?.title || getPromoPlatformName(item);
}

function getPromoSpotlightDescription(item) {
  const platformName = getPromoPlatformName(item);

  if (/prime video/i.test(platformName)) {
    return "Universes collasping 2 decades of film-making lead to this moment, Doom is here!! See the biggest MCU Event, Rent Now on Prime ";
  }

  if (/netflix/i.test(platformName)) {
    return "Stream this Epic/Twisted Story, Scan the QR to Rent Now, or view complete event details.";
  }

  if (/JioHotstar/i.test(platformName)) {
    return "Come see Peter Parker in a world without Tony Stark, when his DNA is mutating, Rent Now";
  }

  if (/SonyLiv/i.test(platformName)) {
    return "Now exclusively on sonyLiv, Stream this Epic/Twisted Story";
  }

  if (/Apple TV+/i.test(platformName)) {
    return "Feel every corner, every crash. The F1 movie- now on Apple TV+";
  }

  if (/BookMyShow|ticket|MakeMytrip|stadium/i.test(`${platformName} ${item?.title || ""}`)) {
    return "Book tickets, scan the QR, or view complete event details.";
  }

  return "Explore this sponsored experience, open the app, or learn more.";
}

function getPromoPrimaryActionLabel(item) {
  const platformName = getPromoPlatformName(item);

  if (/prime video/i.test(platformName)) return "Rent now";
  if (/netflix|jiohotstar/i.test(platformName)) return "Open app";

  if (/BookMyShow|ticket|stadium|MakeMytrip|fifa/i.test(`${platformName} ${item?.title || ""}`)) {
    return "Scan QR";
  }

  return "Open app";
}

const USB_PREVIEW_VIDEO_BY_TITLE = [
  {
    match: /avengers|doomsday/i,
    fileName: "avengers_doomsday.mp4",
  },
  {
    match: /taylor|swift|eras/i,
    fileName: "taylor_eras_tour.mp4",
  },
  {
    match: /fifa|world cup/i,
    fileName: "fifa.mp4",
  },
  {
    match: /spider[-\s]?man|spiderman/i,
    fileName: "spider_man.mp4",
  },
  {
    match: /sitaare|sitara|zameen\s*par/i,
    fileName: "sitaare_zameen_par.mp4",
  },
  {
    match: /curious\s*case|the\s*curious\s*case/i,
    fileName: "curious_case.mp4",
  },
  {
    match: /adalat|insaaf|jung/i,
    fileName: "adalat_insaaf_ki_jung.mp4",
  },
  {
    match: /makemytrip|make\s*my\s*trip|dubai/i,
    fileName: "makemytrip_dubai.mp4",
  },
];

const DEFAULT_AUTO_ADVANCE_MS = 50000;
const VIDEO_PREVIEW_HOLD_MS = 180000;
const PREVIEW_HINT_DELAY_MS = 1000;

const PLATFORM_APP_IDS = {
  Netflix: "org.tizen.netflix-app",
  "Prime Video": "org.tizen.primevideo",
  JioHotstar: "fiZNCxMH9Y.Hotstar",
  YouTube: "9Ur5IzDKqV.TizenYouTube",
  Spotify: "rJeHak5zRg.Spotify",
  "Apple TV+": "com.apple.appletv",
  SonyLIV: "EUKHUxrGQA.SonyLIV",
  "Sony+": "EUKHUxrGQA.SonyLIV",
  BookMyShow: "3201512006314",
  "Lionsgate Play": "Vj65Xmn9SM.LionsgatePlay",
  "Discovery+": "cksstv4hb0.dplusin",
  Gaana: "SfrqKpeYMs.Gaana",
  Hoichoi: "reAEEFwRi8.hoichoi",
  Aha: "Sf1P8YsDLG.ahaapp",
  MakeMyTrip: "",
};

const PLATFORM_STORE_IDS = {
  Netflix: "org.tizen.netflix-app",
  "Prime Video": "org.tizen.primevideo",
  JioHotstar: "fiZNCxMH9Y.Hotstar",
  YouTube: "9Ur5IzDKqV.TizenYouTube",
  Spotify: "rJeHak5zRg.Spotify",
  "Apple TV+": "com.apple.appletv",
  SonyLIV: "EUKHUxrGQA.SonyLIV",
  "Sony+": "EUKHUxrGQA.SonyLIV",
  BookMyShow: "3201512006314",
  "Lionsgate Play": "Vj65Xmn9SM.LionsgatePlay",
  "Discovery+": "cksstv4hb0.dplusin",
  Gaana: "SfrqKpeYMs.Gaana",
  Hoichoi: "reAEEFwRi8.hoichoi",
  Aha: "Sf1P8YsDLG.ahaapp",
  MakeMyTrip: "",
};

const STORE_APP_ID = "com.samsung.tv.store";

function getPromoPlatformAppId(item) {
  const platform = getPromoPlatformName(item);
  return item?.qrData?.appId || item?.appId || PLATFORM_APP_IDS[platform] || "";
}

function getPromoPlatformStoreId(item) {
  const platform = getPromoPlatformName(item);

  return (
    item?.qrData?.storeId ||
    item?.storeId ||
    PLATFORM_STORE_IDS[platform] ||
    getPromoPlatformAppId(item) ||
    ""
  );
}

function launchSamsungStoreForPromo(item) {
  const platform = getPromoPlatformName(item);
  const storeWidgetId = getPromoPlatformStoreId(item);

  console.log(
    `[PROMO STORE] Opening Samsung Apps for "${platform}", widget_id: "${storeWidgetId}"`
  );

  if (!window.tizen) {
    alert(`[Dev] Would open Samsung Apps for ${platform}`);
    return;
  }

  try {
    const data = storeWidgetId
      ? [
          new window.tizen.ApplicationControlData("Sub_Menu", ["detail"]),
          new window.tizen.ApplicationControlData("widget_id", [storeWidgetId]),
          new window.tizen.ApplicationControlData("caller_id", [storeWidgetId]),
        ]
      : [];

    const ac = new window.tizen.ApplicationControl(
      "http://tizen.org/appcontrol/operation/default",
      null,
      null,
      null,
      data,
      null
    );

    window.tizen.application.launchAppControl(
      ac,
      STORE_APP_ID,
      () => {
        console.log(`[PROMO STORE] ✅ Opened Samsung Apps for "${platform}"`);
      },
      (err) => {
        console.log(
          "[PROMO STORE] ❌ Store detail failed, opening generic Samsung Apps:",
          err?.message || err
        );

        try {
          const fallbackAc = new window.tizen.ApplicationControl(
            "http://tizen.org/appcontrol/operation/default",
            null,
            null,
            null,
            [],
            null
          );

          window.tizen.application.launchAppControl(
            fallbackAc,
            STORE_APP_ID,
            () => console.log("[PROMO STORE] ✅ Opened generic Samsung Apps"),
            (fallbackErr) =>
              console.log(
                "[PROMO STORE] ❌ Generic store failed:",
                fallbackErr?.message || fallbackErr
              )
          );
        } catch (fallbackException) {
          console.log(
            "[PROMO STORE] ❌ Generic store exception:",
            fallbackException?.message || fallbackException
          );
        }
      }
    );
  } catch (err) {
    console.log("[PROMO STORE] ❌ Exception:", err?.message || err);
  }
}

function launchPromoPlatformApp(item) {
  const platform = getPromoPlatformName(item);
  const appId = getPromoPlatformAppId(item);

  console.log(`[PROMO DEEPLINK] Platform: "${platform}", appId: "${appId}"`);

  if (!window.tizen) {
    alert(`[Dev] Would open app: ${appId || platform}`);
    return;
  }

  if (!appId) {
    console.log(`[PROMO DEEPLINK] No app ID for "${platform}". Opening store.`);
    launchSamsungStoreForPromo(item);
    return;
  }

  try {
    window.tizen.application.getAppInfo(appId);

    const ac = new window.tizen.ApplicationControl(
      "http://tizen.org/appcontrol/operation/default",
      null,
      null,
      null,
      [],
      null
    );

    window.tizen.application.launchAppControl(
      ac,
      appId,
      () => {
        console.log(`[PROMO DEEPLINK] ✅ Launched "${platform}" (${appId})`);
      },
      (err) => {
        console.log(
          `[PROMO DEEPLINK] ❌ Launch failed "${platform}" (${appId}):`,
          err?.message || err
        );
        launchSamsungStoreForPromo(item);
      }
    );
  } catch (err) {
    console.log(
      `[PROMO DEEPLINK] ❌ App not installed / app info failed "${platform}":`,
      err?.message || err
    );
    launchSamsungStoreForPromo(item);
  }
}

function getPromoPrimaryActionType(item) {
  const label = getPromoPrimaryActionLabel(item).toLowerCase();

  if (label.includes("scan")) return "qr";
  if (label.includes("download")) return "store";

  return "app";
}

function getPreviewVideoFileName(item) {
  const text = [
    item?.title,
    item?.qrData?.title,
    item?.platform,
    item?.qrData?.platform,
    item?.qrData?.meta,
  ]
    .filter(Boolean)
    .join(" ");

  const config = USB_PREVIEW_VIDEO_BY_TITLE.find((entry) =>
    entry.match.test(text)
  );

  return config?.fileName || null;
}

function getPreviewPoster(item) {
  return item?.qrData?.image || item?.featuredBackdrop || item?.backdrop || item?.poster;
}

function resolveUsbFileUri(fileName) {
  return new Promise((resolve) => {
    if (!fileName) {
      console.log("[USB PREVIEW] No video file mapped for this card");
      resolve(null);
      return;
    }

    if (!window.tizen?.filesystem) {
      console.log("[USB PREVIEW] Tizen filesystem unavailable. Chrome/dev mode fallback to image.");
      resolve(null);
      return;
    }

    try {
      window.tizen.filesystem.listStorages(
        (storages) => {
          const usbStorage = storages.find(
            (storage) =>
              storage.type === "EXTERNAL" &&
              storage.state === "MOUNTED" &&
              /^removable_/i.test(storage.label)
          );

          if (!usbStorage) {
            console.log("[USB PREVIEW] No mounted USB storage found");
            resolve(null);
            return;
          }

          window.tizen.filesystem.resolve(
            usbStorage.label,
            (rootDir) => {
              try {
                const file = rootDir.resolve(fileName);

                if (!file || !file.isFile) {
                  console.log("[USB PREVIEW] File not found:", fileName);
                  resolve(null);
                  return;
                }

                const uri = file.toURI ? file.toURI() : file.fullPath;
                console.log("[USB PREVIEW] Resolved:", fileName, uri);
                resolve(uri);
              } catch (error) {
                console.log(
                  "[USB PREVIEW] File resolve failed:",
                  fileName,
                  error?.message || error
                );
                resolve(null);
              }
            },
            (error) => {
              console.log(
                "[USB PREVIEW] USB root resolve failed:",
                error?.message || error
              );
              resolve(null);
            },
            "r"
          );
        },
        (error) => {
          console.log(
            "[USB PREVIEW] listStorages failed:",
            error?.message || error
          );
          resolve(null);
        }
      );
    } catch (error) {
      console.log("[USB PREVIEW] exception:", error?.message || error);
      resolve(null);
    }
  });
}

export default function PromoRow({
  title,
  items,
  sourcePage = "foryou",
  rowKey = "sponsored-row",
  variant = "preview",
  immersiveState,
  onSponsoredFocus,
  onSponsoredBlur,
}) {
  const rowRef = useRef(null);
  const activeCardRef = useRef(null);
  const scanButtonRef = useRef(null);
  const detailsButtonRef = useRef(null);
  const qrModalRef = useRef(null);
  const autoAdvanceTimerRef = useRef(null);
  const previewAutoFocusKeyRef = useRef(null);
  const detailReturnFocusRef = useRef(null);

  const [detailCard, setDetailCard] = useState(null);
  const [qrModalItem, setQrModalItem] = useState(null);
  const [previewVideoUri, setPreviewVideoUri] = useState(null);
  const [previewVideoEnded, setPreviewVideoEnded] = useState(false);
  const [showPreviewHint, setShowPreviewHint] = useState(false);

  const isSimpleMode = variant === "simple";
  const isAppSpotlightMode = variant === "appSpotlight";

  const isActiveRow =
    !isSimpleMode && immersiveState?.active && immersiveState.rowKey === rowKey;

  const activeItem = isActiveRow ? immersiveState?.item : null;
  const showBackgroundMedia = isActiveRow && immersiveState?.previewMode && activeItem;

  useEffect(() => {
    function onDetailNavigate(e) {
      setDetailCard({
        card: e.detail.card,
        sourcePage: e.detail.sourcePage,
      });
    }

    window.addEventListener("detail-navigate", onDetailNavigate);

    return () => {
      window.removeEventListener("detail-navigate", onDetailNavigate);
    };
  }, []);

  useEffect(() => {
    if (
      !isAppSpotlightMode ||
      !isActiveRow ||
      !activeItem ||
      !immersiveState?.previewMode ||
      qrModalItem ||
      detailCard
    ) {
      if (!immersiveState?.previewMode) {
        previewAutoFocusKeyRef.current = null;
      }
      return;
    }

    const focusKey = `${rowKey}-${activeItem.id}-preview`;

    if (previewAutoFocusKeyRef.current === focusKey) {
      return;
    }

    previewAutoFocusKeyRef.current = focusKey;

    const timer = setTimeout(() => {
      const promoQrOpen = document.getElementById("promo-qr-modal-overlay");
      const detailOpen = window.__detailPageOpen;

      if (promoQrOpen || detailOpen) return;

      scanButtonRef.current?.focus({ preventScroll: true });
    }, 120);

    return () => {
      clearTimeout(timer);
    };
  }, [
    isAppSpotlightMode,
    isActiveRow,
    activeItem?.id,
    immersiveState?.previewMode,
    qrModalItem,
    detailCard,
    rowKey,
  ]);

  useEffect(() => {
    setShowPreviewHint(false);

    if (
      !isAppSpotlightMode ||
      !isActiveRow ||
      !activeItem ||
      immersiveState?.previewMode
    ) {
      return;
    }

    const timer = setTimeout(() => {
      setShowPreviewHint(true);
    }, PREVIEW_HINT_DELAY_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [
    isAppSpotlightMode,
    isActiveRow,
    activeItem?.id,
    immersiveState?.previewMode,
  ]);

  const getMappedKey = (e) => {
    const keyMap = {
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      13: "Enter",
      10009: "Back",
    };

    return keyMap[e.keyCode] || e.key;
  };

  const isBackKey = (e) => {
    const mappedKey = getMappedKey(e);

    return (
      mappedKey === "Back" ||
      mappedKey === "Backspace" ||
      mappedKey === "Escape" ||
      mappedKey === "BrowserBack" ||
      mappedKey === "XF86Back"
    );
  };

  const handleRowBlur = () => {
    requestAnimationFrame(() => {
      const activeEl = document.activeElement;
      const focusInsideRow = rowRef.current?.contains(activeEl);
      const focusInsidePromoQr = document
        .getElementById("promo-qr-modal-overlay")
        ?.contains(activeEl);

      if (!focusInsideRow && !focusInsidePromoQr) {
        onSponsoredBlur?.();
      }
    });
  };

  const centerCardInRow = (cardEl) => {
    const scroller = cardEl?.closest(".content-row");
    if (!scroller) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const scrollerRect = scroller.getBoundingClientRect();
        const cardRect = cardEl.getBoundingClientRect();

        const targetLeft =
          scroller.scrollLeft +
          (cardRect.left - scrollerRect.left) -
          (scrollerRect.width - cardRect.width) / 2;

        scroller.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: "auto",
        });
      });
    });
  };

  const openDetailPage = (item, returnFocusEl = null) => {
    if (!item?.qrData) return;

    recordPersonalizationEvent({
      type: "detail_open",
      item,
      context: {
        page: sourcePage,
        row: title,
        rowKey,
      },
    });

    const activeEl = document.activeElement;

    const sourceCard =
      returnFocusEl?.closest?.(".promo-card[tabindex='0']") ||
      activeEl?.closest?.(".promo-card[tabindex='0']") ||
      activeCardRef.current ||
      returnFocusEl ||
      null;

    detailReturnFocusRef.current = sourceCard;

    onSponsoredBlur?.();

    setDetailCard({
      card: item.qrData,
      sourcePage,
    });
  };

  const closeDetailPage = () => {
    setDetailCard(null);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const sourceCard = detailReturnFocusRef.current;

        if (sourceCard?.isConnected) {
          sourceCard.focus({ preventScroll: true });
          centerCardInRow(sourceCard);
        } else if (activeCardRef.current?.isConnected) {
          activeCardRef.current.focus({ preventScroll: true });
          centerCardInRow(activeCardRef.current);
        }

        detailReturnFocusRef.current = null;
      });
    });
  };

  const focusScanButton = () => {
    requestAnimationFrame(() => {
      scanButtonRef.current?.focus({ preventScroll: true });
    });
  };

  const focusDetailsButton = () => {
    requestAnimationFrame(() => {
      detailsButtonRef.current?.focus({ preventScroll: true });
    });
  };

  const focusActiveCard = () => {
    requestAnimationFrame(() => {
      activeCardRef.current?.focus({ preventScroll: true });
    });
  };

  const focusSiblingSponsoredCard = (direction) => {
    const activeCard = activeCardRef.current;

    if (!activeCard || !rowRef.current) return;

    const cards = Array.from(
      rowRef.current.querySelectorAll(".promo-card[tabindex='0']")
    );

    const currentIndex = cards.indexOf(activeCard);

    if (currentIndex === -1) return;

    const nextIndex =
      direction === "next"
        ? Math.min(cards.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1);

    const nextCard = cards[nextIndex];

    if (nextCard && nextCard !== activeCard) {
      nextCard.focus({ preventScroll: true });
      centerCardInRow(nextCard);
    } else {
      focusActiveCard();
    }
  };

  const clearAutoAdvanceTimer = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  };

  const getAutoAdvanceDelay = () => {
    const isVideoPreviewCard =
      isAppSpotlightMode && !!getPreviewVideoFileName(activeItem);

    return isVideoPreviewCard ? VIDEO_PREVIEW_HOLD_MS : DEFAULT_AUTO_ADVANCE_MS;
  };

  const focusNextSponsoredCard = () => {
    const activeCard = activeCardRef.current;

    if (!activeCard || !rowRef.current) return;

    const cards = Array.from(
      rowRef.current.querySelectorAll(".promo-card[tabindex='0']")
    );

    const currentIndex = cards.indexOf(activeCard);

    if (currentIndex === -1 || cards.length === 0) return;

    const nextIndex = currentIndex >= cards.length - 1 ? 0 : currentIndex + 1;
    const nextCard = cards[nextIndex];

    if (nextCard) {
      nextCard.focus({ preventScroll: true });
      centerCardInRow(nextCard);
    }
  };

  const startAutoAdvanceTimer = () => {
    clearAutoAdvanceTimer();

    autoAdvanceTimerRef.current = setTimeout(() => {
      const activeEl = document.activeElement;
      const focusInsideRow = rowRef.current?.contains(activeEl);
      const focusInsidePreviewActions = activeEl?.closest?.(".promo-preview-action-bar");
      const promoQrOpen = document.getElementById("promo-qr-modal-overlay");
      const detailOpen = window.__detailPageOpen;

      if (
        isActiveRow &&
        focusInsideRow &&
        !focusInsidePreviewActions &&
        !promoQrOpen &&
        !detailOpen
      ) {
        focusNextSponsoredCard();
        startAutoAdvanceTimer();
      }
    }, getAutoAdvanceDelay());
  };

  const openQrModal = () => {
    if (!activeItem) return;

    recordPersonalizationEvent({
      type: "qr_open",
      item: activeItem,
      context: {
        page: sourcePage,
        row: title,
        rowKey,
      },
    });

    setQrModalItem(activeItem);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        qrModalRef.current?.focus({ preventScroll: true });
      });
    });
  };

  const handlePromoPrimaryAction = () => {
    if (!activeItem) return;

    const actionType = getPromoPrimaryActionType(activeItem);

    recordPersonalizationEvent({
      type: "primary_action",
      item: activeItem,
      context: {
        page: sourcePage,
        row: title,
        rowKey,
        actionType,
      },
    });

    if (actionType === "qr") {
      openQrModal();
      return;
    }

    if (actionType === "store") {
      launchSamsungStoreForPromo(activeItem);
      return;
    }

    launchPromoPlatformApp(activeItem);
  };

  function getSimpleSponsoredActionLabel(item) {
    const platformName = getPromoPlatformName(item);

    const text = [
      item?.title,
      item?.qrData?.title,
      item?.qrData?.meta,
      item?.qrData?.price,
      platformName,
    ]
      .filter(Boolean)
      .join(" ");

    if (/bookmyshow|ticket|stadium|fifa|concert|tour/i.test(text)) {
      return "Buy tickets";
    }

    if (/prime video|rent/i.test(text)) {
      return "Rent now";
    }

    if (/netflix|jiohotstar|apple/i.test(text)) {
      return "Stream now";
    }

    if (/swiggy|today's/i.test(text)) {
      return "Order Now";
    }

    if (/glance|shop|now/i.test(text)) {
      return "Shop Now";
    }

    return "Open details";
  }

  const closeQrModal = () => {
    setQrModalItem(null);

    requestAnimationFrame(() => {
      scanButtonRef.current?.focus({ preventScroll: true });
    });
  };

  useEffect(() => {
    function handleClosePromoQrModal() {
      closeQrModal();
    }

    window.addEventListener("promo-qr-modal-close", handleClosePromoQrModal);

    return () => {
      window.removeEventListener("promo-qr-modal-close", handleClosePromoQrModal);
    };
  }, [qrModalItem]);

  useEffect(() => {
    let cancelled = false;

    async function loadPreviewVideo() {
      setPreviewVideoUri(null);
      setPreviewVideoEnded(false);

      if (
        !isAppSpotlightMode ||
        !isActiveRow ||
        !immersiveState?.previewMode ||
        !activeItem
      ) {
        return;
      }

      const fileName = getPreviewVideoFileName(activeItem);

      console.log("[USB PREVIEW] Active item:", activeItem?.title || activeItem?.qrData?.title);
      console.log("[USB PREVIEW] Matched file:", fileName);

      if (!fileName) {
        return;
      }

      const uri = await resolveUsbFileUri(fileName);

      if (!cancelled) {
        setPreviewVideoUri(uri);
      }
    }

    loadPreviewVideo();

    return () => {
      cancelled = true;
    };
  }, [isAppSpotlightMode, isActiveRow, immersiveState?.previewMode, activeItem?.id]);

  const getQrPayload = (item) => {
    if (item?.qrData?.qrTargetUrl) {
      return item.qrData.qrTargetUrl;
    }

    if (item?.qrTargetUrl) {
      return item.qrTargetUrl;
    }

    const title = item?.qrData?.title || item?.title || "Sponsored content";
    const platform = item?.qrData?.platform || item?.platform || "TV";
    const price = item?.qrData?.price || "";
    const meta = item?.qrData?.meta || "";

    return `${platform} | ${title} | ${price} | ${meta}`;
  };

  const getQrImage = (item) => {
    if (item?.qrData?.qrImage) return item.qrData.qrImage;
    if (item?.qrData?.qrUrl) return item.qrData.qrUrl;
    if (item?.qrData?.qrCode) return item.qrData.qrCode;

    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
      getQrPayload(item)
    )}`;
  };

  const getQrLabel = (item) => {
    const platform = item?.qrData?.platform || item?.platform || "";
    const title = item?.qrData?.title || item?.title || "";
    const meta = item?.qrData?.meta || "";

    if (/ticket|book|stadium|fifa|BookMyShow/i.test(`${platform} ${title} ${meta}`)) {
      return "Scan to book";
    }

    if (/netflix|prime video|jiohotstar|youtube/i.test(platform)) {
      return "Scan to open";
    }

    return "Scan to continue";
  };

  const handlePreviewActionKeyCapture = (e) => {
    const mappedKey = getMappedKey(e);
    const focusedEl = document.activeElement;

    const isOnActiveSponsoredCard =
      focusedEl?.classList?.contains("promo-card") &&
      focusedEl?.classList?.contains("immersive-card-active");

    if (
      isActiveRow &&
      immersiveState?.previewMode &&
      mappedKey === "ArrowRight" &&
      isOnActiveSponsoredCard
    ) {
      e.preventDefault();
      e.stopPropagation();
      focusScanButton();
    }
  };

  useEffect(() => {
    clearAutoAdvanceTimer();

    if (isActiveRow && !qrModalItem && !detailCard) {
      startAutoAdvanceTimer();
    }

    return () => {
      clearAutoAdvanceTimer();
    };
  }, [
    isActiveRow,
    isAppSpotlightMode,
    immersiveState?.previewMode,
    activeItem?.id,
    qrModalItem,
    detailCard,
  ]);

  return (
    <>
      <div
        className={`section promo-row-shell ${isSimpleMode ? "simple-mode" : ""} ${
          isAppSpotlightMode ? "app-spotlight-mode" : ""
        } ${isActiveRow ? "immersive-active" : ""} ${
          immersiveState?.previewMode && isActiveRow ? "preview-mode" : ""
        } ${immersiveState?.mediaMode && isActiveRow ? "media-mode" : ""}`}
        ref={rowRef}
        onBlurCapture={handleRowBlur}
        onKeyDownCapture={(e) => {
          handlePreviewActionKeyCapture(e);
          startAutoAdvanceTimer();
        }}
        onPointerMove={startAutoAdvanceTimer}
      >
        {isActiveRow && activeItem && !isAppSpotlightMode && (
          <div
            className={`promo-row-card-bg ${
              immersiveState?.previewMode ? "preview-active" : ""
            }`}
            aria-hidden="true"
          >
            <img
              src={
                activeItem.qrData?.image ||
                activeItem.featuredBackdrop ||
                activeItem.backdrop ||
                activeItem.poster
              }
              alt=""
              loading="lazy"
            />
            <div className="promo-row-card-bg-wash" />
          </div>
        )}

        {showBackgroundMedia && (
          <div
            className={`promo-row-bg-media ${
              isAppSpotlightMode ? "app-spotlight-preview" : ""
            } ${immersiveState?.mediaMode ? "media-active" : ""}`}
            aria-hidden="true"
          >
            {previewVideoUri && !previewVideoEnded ? (
              <video
                className="promo-row-bg-video"
                src={previewVideoUri}
                poster={getPreviewPoster(activeItem)}
                autoPlay
                muted
                playsInline
                preload="metadata"
                onEnded={() => {
                  setPreviewVideoEnded(true);
                }}
                onError={(e) => {
                  console.log("[USB PREVIEW] video error", e?.currentTarget?.error);
                  setPreviewVideoEnded(true);
                }}
              />
            ) : (
              <img src={getPreviewPoster(activeItem)} alt="" loading="lazy" />
            )}

            <div className="promo-row-bg-media-wash" />

            <div className="promo-row-bg-media-label">
              {immersiveState?.mediaMode ? "Motion preview" : "Preview"}
            </div>

            {isAppSpotlightMode && (
              <div className="promo-app-spotlight-copy">
                <div className="promo-app-spotlight-logo-row">
                  {platformLogos[getPromoPlatformName(activeItem)] && (
                    <img
                      className="promo-app-spotlight-logo"
                      src={platformLogos[getPromoPlatformName(activeItem)]}
                      alt={getPromoPlatformName(activeItem)}
                      loading="lazy"
                    />
                  )}

                  <div>
                    <div className="promo-app-spotlight-platform">
                      {getPromoPlatformName(activeItem)}
                    </div>

                    <div className="promo-app-spotlight-status">
                      {isInstalledPromoApp(getPromoPlatformName(activeItem))
                        ? "Installed"
                        : "Available to download"}
                    </div>
                  </div>
                </div>

                <div className="promo-app-spotlight-title">
                  {getPromoSpotlightTitle(activeItem)}
                </div>

                <div className="promo-app-spotlight-description">
                  {getPromoSpotlightDescription(activeItem)}
                </div>
              </div>
            )}

            <div className="promo-preview-action-bar" aria-hidden="false">
              <button
                type="button"
                ref={scanButtonRef}
                tabIndex={-1}
                className="promo-preview-action-btn scan"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handlePromoPrimaryAction();
                }}
                onKeyDown={(e) => {
                  const mappedKey = getMappedKey(e);

                  e.preventDefault();
                  e.stopPropagation();

                  if (mappedKey === "Enter") {
                    handlePromoPrimaryAction();
                    return;
                  }

                  if (mappedKey === "ArrowRight") {
                    focusDetailsButton();
                    return;
                  }

                  if (mappedKey === "ArrowLeft") {
                    focusActiveCard();
                    return;
                  }

                  if (mappedKey === "ArrowUp" || isBackKey(e)) {
                    focusActiveCard();
                  }
                }}
              >
                <span className="promo-preview-action-icon">▦</span>
                <span>
                  {isAppSpotlightMode
                    ? getPromoPrimaryActionLabel(activeItem)
                    : "Scan QR"}
                </span>
              </button>

              <button
                type="button"
                ref={detailsButtonRef}
                tabIndex={-1}
                className="promo-preview-action-btn details"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openDetailPage(activeItem, activeCardRef.current);
                }}
                onKeyDown={(e) => {
                  const mappedKey = getMappedKey(e);

                  e.preventDefault();
                  e.stopPropagation();

                  if (mappedKey === "Enter") {
                    openDetailPage(activeItem, activeCardRef.current);
                    return;
                  }

                  if (mappedKey === "ArrowLeft") {
                    focusScanButton();
                    return;
                  }

                  if (mappedKey === "ArrowRight") {
                    focusSiblingSponsoredCard("next");
                    return;
                  }

                  if (mappedKey === "ArrowUp" || isBackKey(e)) {
                    focusActiveCard();
                  }
                }}
              >
                <span>More details</span>
                <span className="promo-preview-action-arrow">›</span>
              </button>
            </div>
          </div>
        )}

        {!isAppSpotlightMode && (
          <>
            <div className="promo-row-stage-glow" />
            <div className="promo-row-stage-grid" />
            <div className="promo-row-stage-trace" />
          </>
        )}

        <div className="promo-row-content">
          <div className="section-header">
            <div className="section-title">{title}</div>
          </div>

          <div
            className={`content-row promo-content-row ${
              isActiveRow ? "immersive-active" : ""
            } ${immersiveState?.previewMode && isActiveRow ? "preview-mode" : ""}`}
          >
            {items.map((item, index) => {
              const isFocusedCard =
                isActiveRow && immersiveState?.item?.id === item.id;

              const stackedItems = items.filter(
                (candidate) => candidate.id !== immersiveState?.item?.id
              );

              const stackIndex = isFocusedCard
                ? 0
                : stackedItems.findIndex((candidate) => candidate.id === item.id) + 1;

              const remainingStackCount = Math.max(stackedItems.length - 1, 0);
              const platformName = getPromoPlatformName(item);
              const appLogo = platformLogos[platformName];

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (isFocusedCard) activeCardRef.current = el;
                  }}
                  className={`promo-card ${
                    isFocusedCard ? "immersive-card-active" : ""
                  } ${isActiveRow ? "immersive-card" : ""} ${
                    isActiveRow && !isFocusedCard && stackIndex === 1
                      ? "stack-card-primary"
                      : ""
                  } ${
                    isActiveRow && !isFocusedCard && stackIndex === 2
                      ? "stack-card-ghost ghost-one"
                      : ""
                  } ${
                    isActiveRow && !isFocusedCard && stackIndex === 3
                      ? "stack-card-ghost ghost-two"
                      : ""
                  } ${
                    isActiveRow && !isFocusedCard && stackIndex > 3
                      ? "stack-card-hidden"
                      : ""
                  }`}
                  tabIndex={0}
                  style={{
                    "--stack-order": stackIndex,
                    "--card-index": index,
                  }}
                  onFocus={(e) => {
                    onSponsoredFocus?.({
                      rowKey,
                      sourcePage,
                      item,
                      itemIndex: index,
                    });

                    centerCardInRow(e.currentTarget);
                  }}
                  onClick={(e) => openDetailPage(item, e.currentTarget)}
                  onKeyDown={(e) => {
                    const mappedKey = getMappedKey(e);

                    if (
                      isFocusedCard &&
                      isActiveRow &&
                      immersiveState?.previewMode &&
                      mappedKey === "ArrowRight"
                    ) {
                      e.preventDefault();
                      e.stopPropagation();
                      focusScanButton();
                      return;
                    }

                    if (mappedKey === "Enter") {
                      e.preventDefault();
                      openDetailPage(item, e.currentTarget);
                    }
                  }}
                >
                  <div className="promo-card-img-wrap">
                    <img
                      className="promo-card-img"
                      src={item.poster}
                      alt={item.title}
                      loading="lazy"
                    />
                    <div className="promo-card-overlay" />
                    <div className="promo-badge">SPONSORED</div>
                  </div>

                  {isAppSpotlightMode &&
                    isFocusedCard &&
                    isActiveRow &&
                    !immersiveState?.previewMode &&
                    showPreviewHint && (
                      <div className="promo-card-preview-tooltip">
                        Wait here to see preview
                      </div>
                    )}

                  {isActiveRow &&
                    !isFocusedCard &&
                    stackIndex === 1 &&
                    remainingStackCount > 0 && (
                      <div className="promo-stack-count-badge">
                        +{remainingStackCount}
                      </div>
                    )}

                  {isSimpleMode ? (
                    <div className="promo-card-info promo-simple-card-info">
                      <div className="promo-card-title">{item.title}</div>

                      <div className="promo-simple-focus-row">
                        {appLogo ? (
                          <span className="promo-simple-platform-logo">
                            <img
                              src={appLogo}
                              alt={platformName}
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </span>
                        ) : (
                          <span className="promo-simple-platform-logo fallback">
                            {platformName.slice(0, 1)}
                          </span>
                        )}

                        <span className="promo-simple-action-text">
                          {getSimpleSponsoredActionLabel(item)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="promo-card-bottom">
                      <div className="promo-card-app-row promo-card-app-row-no-status">
                        {appLogo ? (
                          <img
                            className="promo-card-app-logo promo-card-app-logo-large"
                            src={appLogo}
                            alt={platformName}
                            loading="lazy"
                          />
                        ) : (
                          <div className="promo-card-app-logo-fallback promo-card-app-logo-fallback-large">
                            {platformName.slice(0, 1)}
                          </div>
                        )}

                        <span className="promo-card-app-name promo-card-app-name-large">
                          {platformName}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {qrModalItem && (
        <div id="promo-qr-modal-overlay" className="promo-qr-modal-backdrop">
          <div
            ref={qrModalRef}
            className="promo-qr-modal"
            tabIndex={-1}
            role="dialog"
            aria-label="QR code"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              closeQrModal();
            }}
            onKeyDown={(e) => {
              const mappedKey = getMappedKey(e);

              if (mappedKey === "Enter" || isBackKey(e)) {
                e.preventDefault();
                e.stopPropagation();
                closeQrModal();
              }
            }}
          >
            <div className="promo-qr-modal-kicker">{getQrLabel(qrModalItem)}</div>

            <div className="promo-qr-modal-code">
              <img src={getQrImage(qrModalItem)} alt="QR code" loading="lazy" />
            </div>

            <div className="promo-qr-modal-title">
              {qrModalItem.qrData?.platform || qrModalItem.platform || qrModalItem.title}
            </div>

            <div className="promo-qr-modal-hint">
              Press Enter or Back to return
            </div>
          </div>
        </div>
      )}

      {detailCard && (
        <DetailPage
          card={detailCard.card}
          sourcePage={detailCard.sourcePage}
          onClose={closeDetailPage}
        />
      )}
    </>
  );
}
