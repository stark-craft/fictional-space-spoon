
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import "./styles/global.css";

import Sidebar from "./components/Sidebar";
import HeroBanner from "./components/HeroBanner";
import TabBar from "./components/TabBar";
import SplitRow from "./components/SplitRow";
import ContentRow from "./components/ContentRow";
import AppStrip from "./components/AppStrip";
import ImdbTop10Row from "./components/ImdbTop10Row";
import LiveTab from "./components/LiveTab";
import MediaOutput from "./components/MediaOutput";
import AppsTab from "./components/AppsTab";
import PromoRow from "./components/PromoRow";
import useKeyNavigation from "./hooks/useKeyNavigation";

import {
  tvPlusRecommendation,
  recommendedForYou,
  searchTrends,
  primeVideoContent,
  imdbTop10,
  continuePlaying,
  comedyMovies,
  warMovies,
  dramaMovies,
  sciFiMovies,
} from "./data/content";

import { forYouPromos } from "./data/promoContent";
import {
  getPersonalizedItems,
  recordPersonalizationEvent,
  resetPersonalizationState,
} from "./utils/personalization";

const PREVIEW_DELAY_MS = 3000;
const LIVE_PREVIEW_DELAY_MS = 2000;
const MEDIA_DELAY_MS = 6500;

export default function App() {
  const [heroExpanded, setHeroExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("For You");
  const [personalizationVersion, setPersonalizationVersion] = useState(0);

  const [immersiveState, setImmersiveState] = useState({
    active: false,
    rowKey: null,
    sourcePage: null,
    item: null,
    itemIndex: -1,
    previewMode: false,
    mediaMode: false,
  });

  const forYouTopRef = useRef(null);
  const mainContentRef = useRef(null);
  const previewTimerRef = useRef(null);
  const mediaTimerRef = useRef(null);
  const activeSponsoredFocusRef = useRef(null);
  const focusDwellEventKeyRef = useRef(null);
  const motionPreviewEventKeyRef = useRef(null);

  const personalizedForYouPromos = useMemo(
    () =>
      getPersonalizedItems(forYouPromos, {
        page: "foryou",
        row: "Sponsored Row",
      }),
    [personalizationVersion]
  );

  const handleHeroExpand = useCallback(() => {
    setHeroExpanded(true);
  }, []);

  const handleHeroCollapse = useCallback(() => {
    setHeroExpanded(false);
  }, []);

  const { registerSection } = useKeyNavigation(
    handleHeroExpand,
    handleHeroCollapse
  );

  const sectionRef = useCallback(
    (index) => (el) => registerSection(index, el),
    [registerSection]
  );

  const clearImmersiveTimers = useCallback(() => {
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }

    if (mediaTimerRef.current) {
      clearTimeout(mediaTimerRef.current);
      mediaTimerRef.current = null;
    }
  }, []);

  const resetSponsoredImmersive = useCallback(() => {
    clearImmersiveTimers();
    activeSponsoredFocusRef.current = null;

    setImmersiveState({
      active: false,
      rowKey: null,
      sourcePage: null,
      item: null,
      itemIndex: -1,
      previewMode: false,
      mediaMode: false,
    });
  }, [clearImmersiveTimers]);

  const handleSponsoredFocus = useCallback(
    ({ rowKey, sourcePage, item, itemIndex }) => {
      clearImmersiveTimers();
      setHeroExpanded(false);
      activeSponsoredFocusRef.current = {
        rowKey,
        sourcePage,
        item,
        itemIndex,
      };

      setImmersiveState({
        active: true,
        rowKey,
        sourcePage,
        item,
        itemIndex,
        previewMode: false,
        mediaMode: false,
      });

      const previewDelay =
        sourcePage === "live" ? LIVE_PREVIEW_DELAY_MS : PREVIEW_DELAY_MS;

      previewTimerRef.current = setTimeout(() => {
        const activeFocus = activeSponsoredFocusRef.current;

        if (
          activeFocus?.rowKey === rowKey &&
          activeFocus?.item?.id === item.id
        ) {
          const eventKey = `${rowKey}:${item.id}:focus_dwell`;

          if (focusDwellEventKeyRef.current !== eventKey) {
            focusDwellEventKeyRef.current = eventKey;
            recordPersonalizationEvent({
              type: "focus_dwell",
              item,
              context: {
                page: sourcePage,
                row:
                  rowKey === "for-you-sponsored"
                    ? "Sponsored Row"
                    : rowKey === "apps-sponsored"
                      ? "Promotional Row"
                      : "Live Sports",
                rowKey,
              },
            });
          }
        }

        setImmersiveState((prev) => {
          if (
            !prev.active ||
            prev.rowKey !== rowKey ||
            prev.item?.id !== item.id
          ) {
            return prev;
          }

          return {
            ...prev,
            previewMode: true,
          };
        });
      }, previewDelay);

      mediaTimerRef.current = setTimeout(() => {
        const activeFocus = activeSponsoredFocusRef.current;

        if (
          sourcePage === "apps" &&
          activeFocus?.rowKey === rowKey &&
          activeFocus?.item?.id === item.id
        ) {
          const eventKey = `${rowKey}:${item.id}:motion_preview`;

          if (motionPreviewEventKeyRef.current !== eventKey) {
            motionPreviewEventKeyRef.current = eventKey;
            recordPersonalizationEvent({
              type: "motion_preview",
              item,
              context: {
                page: sourcePage,
                row:
                  rowKey === "apps-sponsored"
                    ? "Promotional Row"
                    : "AI Picks for Your Switzerland Trip",
                rowKey,
              },
            });
          }
        }

        setImmersiveState((prev) => {
          if (
            !prev.active ||
            prev.rowKey !== rowKey ||
            prev.item?.id !== item.id
          ) {
            return prev;
          }

          return {
            ...prev,
            previewMode: true,
            mediaMode: true,
          };
        });
      }, MEDIA_DELAY_MS);
    },
    [clearImmersiveTimers]
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handlePersonalizationUpdated = () => {
      setPersonalizationVersion((version) => version + 1);
    };

    window.__resetUgPersonalization = () => {
      focusDwellEventKeyRef.current = null;
      motionPreviewEventKeyRef.current = null;
      resetPersonalizationState();
      setPersonalizationVersion((version) => version + 1);
    };

    window.addEventListener(
      "ug-personalization-updated",
      handlePersonalizationUpdated
    );

    return () => {
      window.removeEventListener(
        "ug-personalization-updated",
        handlePersonalizationUpdated
      );
      delete window.__resetUgPersonalization;
    };
  }, []);

  useEffect(() => {
    resetSponsoredImmersive();
  }, [activeTab, resetSponsoredImmersive]);

  useEffect(() => {
    return () => {
      clearImmersiveTimers();
    };
  }, [clearImmersiveTimers]);

  const scrollForYouToTop = () => {
    forYouTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div ref={mainContentRef} className="main-content">
        <div ref={sectionRef(0)} className="hero-shell">
          <HeroBanner expanded={heroExpanded} />
        </div>

        <div ref={sectionRef(1)}>
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* ─── For You Tab Content ─── */}
        {activeTab === "For You" && (
          <div className="for-you-tab">
            <div
              ref={(el) => {
                forYouTopRef.current = el;
                registerSection(2, el);
              }}
            >
              <SplitRow
                tvPlusCard={tvPlusRecommendation}
                recommendedItems={recommendedForYou}
              />
            </div>

            <div ref={sectionRef(3)}>
              <AppStrip />
            </div>

            <div ref={sectionRef(4)} className="sponsored-section">
              <PromoRow
                title="Sponsored Row"
                items={personalizedForYouPromos}
                rowKey="for-you-sponsored"
                sourcePage="foryou"
                variant="simple"
                immersiveState={immersiveState}
                onSponsoredFocus={handleSponsoredFocus}
                onSponsoredBlur={resetSponsoredImmersive}
              />
            </div>

            <div ref={sectionRef(5)}>
              <ContentRow
                title="Search Trends"
                items={searchTrends}
                showInfoOnHover={true}
                showMeta={true}
              />
            </div>

            <div ref={sectionRef(6)}>
              <ContentRow
                title="Prime Video"
                items={primeVideoContent}
                showInfoOnHover={true}
                boldTitle={false}
                showMeta={false}
              />
            </div>

            <div ref={sectionRef(7)}>
              <ImdbTop10Row items={imdbTop10} />
            </div>

            <div ref={sectionRef(8)}>
              <ContentRow
                title="Continue Playing"
                items={continuePlaying}
                showProgress={true}
                showInfoOnHover={true}
                showMeta={false}
              />
            </div>

            <div ref={sectionRef(9)}>
              <ContentRow
                title="Comedy Movies"
                items={comedyMovies}
                showMeta={true}
              />
            </div>

            <div ref={sectionRef(10)}>
              <ContentRow
                title="War Movies"
                items={warMovies}
                showMeta={true}
              />
            </div>

            <div ref={sectionRef(11)}>
              <ContentRow
                title="Drama Movies"
                items={dramaMovies}
                showMeta={true}
              />
            </div>

            <div ref={sectionRef(12)}>
              <ContentRow
                title="Sci-Fi Movies"
                items={sciFiMovies}
                showMeta={true}
              />
            </div>

            <div ref={sectionRef(13)}>
              <MediaOutput />
            </div>

            <div className="scroll-top-section" ref={sectionRef(14)}>
              <div
                className="scroll-top-btn"
                tabIndex={0}
                onClick={scrollForYouToTop}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                <span>Back to top</span>
              </div>
            </div>
          </div>
        )}

        {/* ─── Live Tab Content ─── */}
        {activeTab === "Live" && (
          <LiveTab
            sectionRef={sectionRef}
            immersiveState={immersiveState}
            onSponsoredFocus={handleSponsoredFocus}
            onSponsoredBlur={resetSponsoredImmersive}
          />
        )}

        {/* ─── Apps Tab Content ─── */}
        {activeTab === "Apps" && (
          <AppsTab
            sectionRef={sectionRef}
            immersiveState={immersiveState}
            onSponsoredFocus={handleSponsoredFocus}
            onSponsoredBlur={resetSponsoredImmersive}
            personalizationVersion={personalizationVersion}
          />
        )}
      </div>
    </div>
  );
}
