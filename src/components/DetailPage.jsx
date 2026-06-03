/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState, useCallback } from "react";
import { forYouPromos, appsPromos } from "../data/promoContent";
import { platformLogos } from "../data/content";
import { recordPersonalizationEvent } from "../utils/personalization";

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
  aha: "Sf1P8YsDLG.ahaapp",
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
  aha: "Sf1P8YsDLG.ahaapp",
  MakeMyTrip: "",
};

const PLATFORM_WEB_URLS = {
  Netflix: "https://www.netflix.com",
  "Prime Video": "https://www.primevideo.com",
  JioHotstar: "https://www.hotstar.com",
  YouTube: "https://www.youtube.com",
  Spotify: "https://open.spotify.com",
  "Apple TV+": "https://tv.apple.com",
  "Sony+": "https://www.sonyliv.com",
  BookMyShow: "https://in.bookmyshow.com",
};

const BROWSER_APP_ID = "org.tizen.browser";
const STORE_APP_ID = "com.samsung.tv.store";

const DEFAULT_QR_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=14&data=" +
  encodeURIComponent(
    "https://www.makemytrip.com/holidays-international/dubai-vacation-tour-packages.html"
  );

function isQrImageUrl(value) {
  if (!value) return false;

  const url = String(value);
  const pathname = url.split("?")[0].toLowerCase();

  return /qr/i.test(url) || /\.(png|jpg|jpeg|webp|svg)$/.test(pathname);
}

function getDetailQrUrl(card) {
  const target =
    card?.qrImage ||
    card?.qrUrl ||
    card?.qrTargetUrl ||
    card?.webUrl ||
    card?.url ||
    card?.link ||
    "";

  if (!target) return DEFAULT_QR_URL;
  if (isQrImageUrl(target)) return target;

  return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=14&data=${encodeURIComponent(
    target
  )}`;
}

function getPlatformInitial(platform) {
  if (!platform) return "A";
  return platform.trim().slice(0, 1).toUpperCase();
}

function getPlatformLogo(platform) {
  return platformLogos?.[platform] || null;
}

function getPlatformLogoFromCard(card) {
  return card?.platformLogo || platformLogos?.[card?.platform] || null;
}

function getPrimaryActionLabel(card) {
  if (card?.primaryActionLabel) return card.primaryActionLabel;
  if (card?.platform === "BookMyShow") return "Buy Tickets Now";
  if (card?.platform === "Fancode") return "Open on FanCode";
  if (card?.platform === "Prime Video") return "Rent Now";
  if (card?.platform === "Netflix") return "Stream Now";
  if (card?.platform === "JioHotstar") return "Watch Now";
  return card?.platform ? `Open ${card.platform}` : "Continue";
}

function getWebActionLabel(card) {
  return card?.webActionLabel || "Open in Web";
}

function getDetailBadges(card) {
  if (Array.isArray(card?.badges) && card.badges.length > 0) {
    return card.badges;
  }

  if (card?.meta) {
    return card.meta
      .split("•")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 5);
  }

  return [];
}

function getQrPanelTitle(card) {
  if (card?.qrLabel) return card.qrLabel;
  if (card?.platform === "BookMyShow") return "Scan to Book";
  if (card?.platform === "Fancode") return "Scan to Watch";
  return "Scan to Continue";
}

function NotInstalledModal({ platform, onClose, onGoToStore }) {
  const cancelRef = useRef(null);
  const installRef = useRef(null);
  const [focusIdx, setFocusIdx] = useState(1);

  useEffect(() => {
    const btns = [cancelRef.current, installRef.current];
    btns[focusIdx]?.focus();
  }, [focusIdx]);

  useEffect(() => {
    const tizenKeyMap = {
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      13: "Enter",
      10009: "Back",
      27: "Escape",
      8: "Backspace",
    };

    function onKey(e) {
      const key = tizenKeyMap[e.keyCode] || e.key;

      try {
        e.stopImmediatePropagation();
        e.preventDefault();
      } catch (_) {}

      if (key === "ArrowLeft" || key === "ArrowRight") {
        setFocusIdx((idx) => (idx === 0 ? 1 : 0));
        return;
      }

      if (key === "Enter") {
        if (focusIdx === 0) onClose();
        else onGoToStore();
        return;
      }

      if (
        key === "Back" ||
        key === "Escape" ||
        key === "Backspace" ||
        key === "XF86Back"
      ) {
        onClose();
      }
    }

    window.addEventListener("keydown", onKey, true);

    return () => window.removeEventListener("keydown", onKey, true);
  }, [focusIdx, onClose, onGoToStore]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(0, 0, 0, 0.74)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          width: "520px",
          maxWidth: "88vw",
          borderRadius: "22px",
          background: "#16161d",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 22px 70px rgba(0,0,0,0.62)",
          padding: "34px 38px 30px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "20px",
            margin: "0 auto 22px",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06))",
            border: "1px solid rgba(255,255,255,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            fontWeight: "800",
            color: "rgba(255,255,255,0.92)",
          }}
        >
          {getPlatformInitial(platform)}
        </div>

        <div
          style={{
            fontSize: "24px",
            lineHeight: 1.2,
            fontWeight: "760",
            color: "#fff",
            marginBottom: "12px",
            letterSpacing: "-0.2px",
          }}
        >
          {platform} is not installed
        </div>

        <div
          style={{
            maxWidth: "410px",
            margin: "0 auto",
            fontSize: "15px",
            lineHeight: 1.55,
            fontWeight: "400",
            color: "rgba(255,255,255,0.62)",
          }}
        >
          To continue, install this app from Samsung Apps on your TV.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            marginTop: "32px",
          }}
        >
          <button
            ref={cancelRef}
            type="button"
            tabIndex={0}
            onClick={onClose}
            style={{
              minWidth: "132px",
              height: "48px",
              borderRadius: "999px",
              border:
                focusIdx === 0
                  ? "2px solid rgba(255,255,255,0.92)"
                  : "1px solid rgba(255,255,255,0.18)",
              background:
                focusIdx === 0
                  ? "rgba(255,255,255,0.18)"
                  : "rgba(255,255,255,0.07)",
              color: focusIdx === 0 ? "#fff" : "rgba(255,255,255,0.72)",
              fontSize: "15px",
              fontWeight: "700",
              fontFamily: "inherit",
              outline: "none",
              cursor: "pointer",
              transform: focusIdx === 0 ? "scale(1.035)" : "scale(1)",
              transition: "transform 0.12s ease, border-color 0.12s ease",
            }}
          >
            Cancel
          </button>

          <button
            ref={installRef}
            type="button"
            tabIndex={0}
            onClick={onGoToStore}
            style={{
              minWidth: "178px",
              height: "48px",
              borderRadius: "999px",
              border:
                focusIdx === 1
                  ? "2px solid rgba(255,255,255,0.96)"
                  : "1px solid rgba(255,255,255,0.2)",
              background:
                focusIdx === 1
                  ? "rgba(255,255,255,0.94)"
                  : "rgba(255,255,255,0.12)",
              color: focusIdx === 1 ? "#11131a" : "#fff",
              fontSize: "15px",
              fontWeight: "800",
              fontFamily: "inherit",
              outline: "none",
              cursor: "pointer",
              transform: focusIdx === 1 ? "scale(1.035)" : "scale(1)",
              transition: "transform 0.12s ease, border-color 0.12s ease",
            }}
          >
            Go to Apps
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DetailPage({ card, onClose, sourcePage }) {
  const allPromos = sourcePage === "apps" ? appsPromos : forYouPromos;

  const [notInstalledModal, setNotInstalledModal] = useState(null);
  const [focusZone, setFocusZone] = useState("watch");
  const [currentCard, setCurrentCard] = useState(card);

  const watchRef = useRef(null);
  const webRef = useRef(null);
  const promoRefs = useRef([]);

  const currentOtherPromos = allPromos.filter(
    (p) => p.qrData?.title !== currentCard.title
  );

  useEffect(() => {
    window.__detailPageOpen = true;

    return () => {
      window.__detailPageOpen = false;
    };
  }, []);

  useEffect(() => {
    setCurrentCard(card);
    setNotInstalledModal(null);
    setFocusZone("watch");
  }, [card]);

  useEffect(() => {
    if (focusZone === "watch") watchRef.current?.focus();
    else if (focusZone === "web") webRef.current?.focus();
    else if (focusZone.startsWith("promo-")) {
      const idx = parseInt(focusZone.split("-")[1], 10);
      promoRefs.current[idx]?.focus();
    }
  }, [focusZone]);

  useEffect(() => {
    setTimeout(() => watchRef.current?.focus(), 120);
  }, []);

  useEffect(() => {
    function onDetailNavigate(e) {
      setCurrentCard(e.detail.card);
      setNotInstalledModal(null);
      setFocusZone("watch");
    }

    window.addEventListener("detail-navigate", onDetailNavigate);

    return () => window.removeEventListener("detail-navigate", onDetailNavigate);
  }, []);

  const openStoreForPlatform = useCallback((platform) => {
    const storeWidgetId = PLATFORM_STORE_IDS[platform] || PLATFORM_APP_IDS[platform];

    console.log(
      `[DETAIL STORE] Opening Samsung Apps for "${platform}", widget_id: "${storeWidgetId}"`
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
          console.log(`[DETAIL STORE] ✅ Opened Samsung Apps for "${platform}"`);
        },
        (err) => {
          console.log(
            "[DETAIL STORE] ❌ Store detail failed, opening generic Samsung Apps:",
            err?.message || err
          );

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
            () => console.log("[DETAIL STORE] ✅ Opened generic Samsung Apps"),
            (fallbackErr) =>
              console.log(
                "[DETAIL STORE] ❌ Generic store failed:",
                fallbackErr?.message || fallbackErr
              )
          );
        }
      );
    } catch (err) {
      console.log("[DETAIL STORE] ❌ Exception:", err?.message || err);
    }
  }, []);

  const openPlatformApp = useCallback(() => {
    const platform = currentCard.platform;
    const appId =
      currentCard.appId ||
      currentCard.platformAppId ||
      PLATFORM_APP_IDS[platform];

    recordPersonalizationEvent({
      type: "app_launch",
      item: currentCard,
      context: {
        page: sourcePage,
        row: "Detail Page",
      },
    });

    console.log(`[DETAIL DEEPLINK] Platform: "${platform}", appId: "${appId}"`);

    if (!window.tizen) {
      console.log("[DETAIL DEEPLINK] No tizen detected. Chrome/dev mode.");
      alert(`[Dev] Would open app: ${appId || platform}`);
      return;
    }

    if (!appId) {
      console.log(
        `[DETAIL DEEPLINK] No app ID for "${platform}". Opening Samsung Apps directly.`
      );
      openStoreForPlatform(platform);
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
          console.log(`[DETAIL DEEPLINK] ✅ Launched "${platform}" (${appId})`);
        },
        (err) => {
          console.log(
            `[DETAIL DEEPLINK] ❌ Launch failed "${platform}" (${appId}):`,
            err?.message || err
          );
          openStoreForPlatform(platform);
        }
      );
    } catch (err) {
      console.log(
        `[DETAIL DEEPLINK] ❌ App not installed / app info failed "${platform}":`,
        err?.message || err
      );
      openStoreForPlatform(platform);
    }
  }, [currentCard, openStoreForPlatform]);

  const openBrowser = useCallback(() => {
    const platform = currentCard.platform;

    const webUrl =
      currentCard.webUrl ||
      currentCard.url ||
      currentCard.link ||
      PLATFORM_WEB_URLS[platform] ||
      "https://www.samsung.com";

    recordPersonalizationEvent({
      type: "primary_action",
      item: currentCard,
      context: {
        page: sourcePage,
        row: "Detail Page",
        actionType: "web_open",
      },
    });

    console.log(`[BROWSER] Opening ${BROWSER_APP_ID} with URL: ${webUrl}`);

    if (!window.tizen) {
      alert(`[Dev] Would open TV browser: ${webUrl}`);
      return;
    }

    try {
      const ac = new window.tizen.ApplicationControl(
        "http://tizen.org/appcontrol/operation/view",
        webUrl,
        null,
        null,
        [],
        null
      );

      window.tizen.application.launchAppControl(
        ac,
        BROWSER_APP_ID,
        () => console.log("[BROWSER] ✅ Launched"),
        (err) => {
          console.log(
            "[BROWSER] ❌ Failed, trying next-browser:",
            err?.message || err
          );

          try {
            window.tizen.application.launchAppControl(
              ac,
              "org.tizen.next-browser",
              () => console.log("[BROWSER] ✅ next-browser launched"),
              (e2) =>
                console.log("[BROWSER] ❌ next-browser failed:", e2?.message || e2)
            );
          } catch (e2) {
            console.log("[BROWSER] ❌ next-browser exception:", e2);
          }
        }
      );
    } catch (err) {
      console.log("[BROWSER] ❌ Exception:", err?.message || err);
    }
  }, [currentCard, sourcePage]);

  const openMoreSponsoredPromo = (promo) => {
    recordPersonalizationEvent({
      type: "detail_open",
      item: promo,
      context: {
        page: sourcePage,
        row: "More Sponsored",
      },
    });

    window.dispatchEvent(
      new CustomEvent("detail-navigate", {
        detail: { card: promo.qrData, sourcePage },
      })
    );
  };

  const goToStore = useCallback(() => {
    const platform = notInstalledModal?.platform || currentCard.platform;
    const storeWidgetId = PLATFORM_STORE_IDS[platform] || PLATFORM_APP_IDS[platform];

    console.log(
      `[STORE] Opening Samsung Apps for "${platform}", widget_id: "${storeWidgetId}"`
    );

    setNotInstalledModal(null);

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
          console.log(`[STORE] ✅ Opened Samsung Apps for "${platform}"`);
        },
        (err) => {
          console.log(
            "[STORE] ❌ Store detail failed, opening generic Samsung Apps:",
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
              () => console.log("[STORE] ✅ Opened generic Samsung Apps"),
              (fallbackErr) =>
                console.log(
                  "[STORE] ❌ Generic store failed:",
                  fallbackErr?.message || fallbackErr
                )
            );
          } catch (fallbackException) {
            console.log(
              "[STORE] ❌ Generic store exception:",
              fallbackException?.message || fallbackException
            );
          }
        }
      );
    } catch (err) {
      console.log("[STORE] ❌ Exception:", err?.message || err);
    }
  }, [currentCard.platform, notInstalledModal]);

  useEffect(() => {
    if (notInstalledModal) return;

    const tizenKeyMap = {
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      13: "Enter",
      10009: "Back",
      27: "Escape",
      8: "Backspace",
    };

    function onKey(e) {
      const key = tizenKeyMap[e.keyCode] || e.key;

      try {
        e.preventDefault();
        e.stopImmediatePropagation();
      } catch (_) {}

      if (
        key === "Back" ||
        key === "Escape" ||
        key === "Backspace" ||
        key === "XF86Back"
      ) {
        onClose();
        return;
      }

      if (key === "Enter") {
        if (focusZone === "watch") openPlatformApp();
        else if (focusZone === "web") openBrowser();
        else if (focusZone.startsWith("promo-")) {
          const idx = parseInt(focusZone.split("-")[1], 10);
          promoRefs.current[idx]?.click();
        }

        return;
      }

      if (key === "ArrowRight") {
        if (focusZone === "watch") setFocusZone("web");
        else if (focusZone.startsWith("promo-")) {
          const idx = parseInt(focusZone.split("-")[1], 10);

          if (idx < currentOtherPromos.length - 1) {
            setFocusZone(`promo-${idx + 1}`);
          }
        }
      }

      if (key === "ArrowLeft") {
        if (focusZone === "web") setFocusZone("watch");
        else if (focusZone.startsWith("promo-")) {
          const idx = parseInt(focusZone.split("-")[1], 10);

          if (idx > 0) setFocusZone(`promo-${idx - 1}`);
        }
      }

      if (key === "ArrowDown") {
        if (focusZone === "watch" || focusZone === "web") {
          setFocusZone("promo-0");
        }
      }

      if (key === "ArrowUp") {
        if (focusZone.startsWith("promo-")) setFocusZone("watch");
      }
    }

    window.addEventListener("keydown", onKey, true);

    return () => window.removeEventListener("keydown", onKey, true);
  }, [
    focusZone,
    notInstalledModal,
    onClose,
    openPlatformApp,
    openBrowser,
    currentOtherPromos.length,
  ]);

  const watchFocused = focusZone === "watch";
  const webFocused = focusZone === "web";
  const platformLogo = getPlatformLogoFromCard(currentCard);
  const platformLabel = getPrimaryActionLabel(currentCard);
  const webActionLabel = getWebActionLabel(currentCard);
  const detailBadges = getDetailBadges(currentCard);
  const qrPanelTitle = getQrPanelTitle(currentCard);

  const getActionButtonStyle = (focused) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px 28px",
    borderRadius: "14px",
    background: focused
      ? "linear-gradient(135deg, #1428A0, #0070CC)"
      : "rgba(255,255,255,0.08)",
    border: focused
      ? "1px solid rgba(255,255,255,0.3)"
      : "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    outline: "none",
    transition: "all 0.12s ease",
    transform: focused ? "scale(1.03)" : "scale(1)",
    boxShadow: focused ? "0 0 24px rgba(20,40,160,0.45)" : "none",
  });

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "var(--bg-primary, #060614)",
          overflowY: "auto",
          fontFamily: "'Inter', sans-serif",
          color: "#fff",
          animation: "detailFadeIn 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "40px",
            padding: "52px 60px 40px",
          }}
        >
          <div style={{ flex: "0 0 65%", maxWidth: "65%" }}>
            <div
              style={{
                display: "flex",
                gap: "32px",
                alignItems: "flex-start",
                marginBottom: "32px",
              }}
            >
              {currentCard.image && (
                <div
                  style={{
                    flexShrink: 0,
                    width: "600px",
                    height: "320px",
                    borderRadius: "14px",
                    overflow: "hidden",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "#0d0d20",
                  }}
                >
                  <img
                    src={currentCard.image}
                    alt={currentCard.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}

              <div style={{ flex: 1, paddingTop: "8px" }}>
                {currentCard.platform && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "fit-content",
                      minHeight: "34px",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      marginBottom: "14px",
                    }}
                  >
                    {platformLogo ? (
                      <span
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "8px",
                          background: "#fff",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "4px",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={platformLogo}
                          alt={currentCard.platform}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            display: "block",
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </span>
                    ) : (
                      <span
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.16)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "13px",
                          fontWeight: "800",
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        {getPlatformInitial(currentCard.platform)}
                      </span>
                    )}

                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "rgba(255,255,255,0.72)",
                        letterSpacing: "0.4px",
                      }}
                    >
                      {currentCard.platform}
                    </span>
                  </div>
                )}

                <div
                  style={{
                    fontSize: "34px",
                    fontWeight: "800",
                    lineHeight: "1.1",
                    marginBottom: "16px",
                    color: "#fff",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {currentCard.title}
                </div>

                {detailBadges.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    {detailBadges.map((badge) => (
                      <span
                        key={badge}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "rgba(255,255,255,0.55)",
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {currentCard.price && (
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#4caf50",
                      marginBottom: "8px",
                    }}
                  >
                    {currentCard.price}
                  </div>
                )}

                {currentCard.meta && (
                  <div
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.4)",
                      lineHeight: "1.5",
                    }}
                  >
                    {currentCard.meta}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", marginBottom: "36px" }}>
              <button
                ref={watchRef}
                tabIndex={0}
                onClick={openPlatformApp}
                style={getActionButtonStyle(watchFocused)}
              >
                {platformLogo && (
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "7px",
                      background: "#fff",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={platformLogo}
                      alt={currentCard.platform}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </span>
                )}

                {platformLabel}
              </button>

              <button
                ref={webRef}
                tabIndex={0}
                onClick={openBrowser}
                style={getActionButtonStyle(webFocused)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>

                {webActionLabel}
              </button>
            </div>

            {currentCard.subtitle && (
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  About
                </div>

                <div
                  style={{
                    fontSize: "17px",
                    color: "rgba(255,255,255,0.72)",
                    lineHeight: "1.7",
                    maxWidth: "1000px",
                  }}
                >
                  {currentCard.subtitle}
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              flex: "0 0 30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              paddingTop: "8px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              {qrPanelTitle}
            </div>

            <div
              style={{
                width: "200px",
                height: "200px",
                background: "#fff",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  width: "210px",
                  height: "210px",
                  background: "#fff",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <img
                  src={getDetailQrUrl(currentCard)}
                  alt="Scan QR code"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                    borderRadius: "8px",
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.4)",
                textAlign: "center",
                maxWidth: "180px",
                lineHeight: "1.5",
              }}
            >
              Scan with your phone to complete the purchase
            </div>
          </div>
        </div>

        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            margin: "0 60px 36px",
          }}
        />

        {currentOtherPromos.length > 0 && (
          <div style={{ padding: "0 60px 60px" }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              More Sponsored
            </div>

            <div
              style={{
                display: "flex",
                gap: "20px",
                overflowX: "auto",
                paddingBottom: "8px",
              }}
            >
              {currentOtherPromos.map((promo, idx) => {
                const isFocused = focusZone === `promo-${idx}`;

                return (
                  <div
                    key={promo.id}
                    ref={(el) => {
                      promoRefs.current[idx] = el;
                    }}
                    tabIndex={0}
                    onClick={() => openMoreSponsoredPromo(promo)}
                    style={{
                      flexShrink: 0,
                      width: "300px",
                      cursor: "pointer",
                      borderRadius: "12px",
                      overflow: "hidden",
                      outline: "none",
                      transition: "transform 0.12s ease, box-shadow 0.12s ease",
                      transform: isFocused ? "scale(1.05)" : "scale(1)",
                      boxShadow: isFocused
                        ? "0 0 0 2px rgba(255,255,255,0.6), 0 12px 40px rgba(0,0,0,0.5)"
                        : "0 4px 20px rgba(0,0,0,0.4)",
                      border: isFocused
                        ? "1px solid rgba(255,255,255,0.3)"
                        : "1px solid rgba(255,255,255,0.06)",
                      willChange: "transform",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "16/9",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={promo.poster}
                        alt={promo.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          background: "#1a1a2e",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 60%)",
                        }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          background: "rgba(255,193,7,0.9)",
                          color: "#000",
                          fontSize: "9px",
                          fontWeight: "800",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          letterSpacing: "1px",
                        }}
                      >
                        SPONSORED
                      </div>
                    </div>

                    <div style={{ padding: "12px 14px", background: "#0d0d20" }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#fff",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {promo.title}
                      </div>

                      {promo.qrData?.platform && (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.4)",
                            marginTop: "4px",
                          }}
                        >
                          {promo.qrData.platform}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* {notInstalledModal && (
        <NotInstalledModal
          platform={notInstalledModal.platform}
          onClose={() => setNotInstalledModal(null)}
          onGoToStore={goToStore}
        />
      )} */}

      <style>{`
        @keyframes detailFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
