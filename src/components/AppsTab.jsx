import { useEffect, useMemo, useRef, useState } from "react";
import MediaOutput from "./MediaOutput";
import PromoRow from "./PromoRow";
import AIIntentDock from "./AIIntentDock";
import { appsPromos } from "../data/promoContent";
import { switzerlandTripPromos } from "../data/aiGeneratedContent";
import {
  samsungRecommended,
  editorsChoice,
  lifestyleApps,
  sportsApps,
  popularThisWeek,
  whatsNew,
  genreCategories,
} from "../data/appsContent";
import { triggerNotification } from "../utils/notify";
import { getPersonalizedItems } from "../utils/personalization";

function getLogoTileStyle(app) {
  return {
    width: app.tileWidth || undefined,
    height: app.tileHeight || undefined,
    background: app.tileBg || app.color || "#ffffff",
    borderRadius: "50%",
    padding: `${app.tilePadding ?? 8}px`,
    overflow: "hidden",
    border: app.tileBorder || "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

function getLogoImageStyle(app) {
  return {
    width: app.logoWidth || "76%",
    height: app.logoHeight || "76%",
    objectFit: app.logoFit || "contain",
    borderRadius: app.logoRadius ?? 0,
    filter: app.logoFilter || "none",
    transform: `
      translate(${app.logoTranslateX || "0px"}, ${app.logoTranslateY || "0px"})
      scale(${app.logoScale ?? 1})
    `,
    transformOrigin: "center",
    display: "block",
  };
}

function AppLogoIcon({ app }) {
  return (
    <div className="app-icon" tabIndex={0}>
      <div className="app-icon-img" style={getLogoTileStyle(app)}>
        <img
          src={app.icon}
          alt={app.name}
          style={getLogoImageStyle(app)}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.textContent = app.name[0];
          }}
        />
      </div>
      <div className="app-icon-label">{app.name}</div>
    </div>
  );
}

function RecommendedRow({ items }) {
  return (
    <div className="section">
      <div className="recommended-row">
        <div className="recommended-label">Recommended</div>

        <div className="recommended-apps">
          {items.slice(0, 3).map((app) => (
            <AppLogoIcon key={app.id} app={app} />
          ))}
        </div>

        <div className="recommended-divider" />

        <div className="recommended-provider">Provided by Samsung</div>

        <div className="recommended-samsung-apps">
          {items.slice(3).map((app) => (
            <AppLogoIcon key={app.id} app={app} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenshotCardRow({ title, items }) {
  return (
    <div className="section">
      <div className="section-header">
        <div className="section-title">{title}</div>
      </div>

      <div className="content-row">
        {items.map((app) => (
          <div
            key={app.id}
            className="ec-card"
            tabIndex={0}
            onClick={() => triggerNotification(app.name)}
          >
            <div className="ec-card-img-wrap">
              <img
                className="ec-card-img"
                src={app.screenshot}
                alt={app.name}
                loading="lazy"
              />
              <div className="ec-card-overlay" />
            </div>

            <div className="ec-card-bottom">
              {app.logo && (
                <img
                  className="ec-card-logo"
                  src={app.logo}
                  alt={app.name}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}

              <span className="ec-card-name">{app.name}</span>
              {app.type && <span className="ec-card-type">{app.type}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CircularIconRow({ title, items }) {
  return (
    <div className="section">
      <div className="section-header">
        <div className="section-title">{title}</div>
      </div>

      <div className="content-row">
        {items.map((app) => (
          <AppLogoIcon key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}

function GenreRow({ items }) {
  return (
    <div className="section">
      <div className="section-header">
        <div className="section-title">Genre</div>
      </div>

      <div className="content-row">
        {items.map((genre) => (
          <div
            key={genre.id}
            className="genre-card"
            tabIndex={0}
            style={{ background: genre.color }}
          >
            <div className="genre-card-name">{genre.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AppsTab({
  sectionRef,
  immersiveState,
  onSponsoredFocus,
  onSponsoredBlur,
  personalizationVersion,
}) {
  const topRef = useRef(null);
  const aiGeneratedRowRef = useRef(null);
  const aiGenerationTimerRef = useRef(null);
  const [isGeneratingAiRow, setIsGeneratingAiRow] = useState(false);
  const [showAiRow, setShowAiRow] = useState(false);
  const [lastAiQuery, setLastAiQuery] = useState("");
  let sIdx = 2;
  const personalizedAppsPromos = useMemo(
    () =>
      getPersonalizedItems(appsPromos, {
        page: "apps",
        row: "Promotional Row",
      }),
    [personalizationVersion]
  );

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const firstFocusable = topRef.current?.querySelector("[tabindex='0']");
        firstFocusable?.focus({ preventScroll: true });
      });
    });
  };

  const focusAiGeneratedRow = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const rowEl = aiGeneratedRowRef.current;
        const firstCard = rowEl?.querySelector(".promo-card[tabindex='0']");

        rowEl?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        window.setTimeout(() => {
          firstCard?.focus({ preventScroll: true });
          firstCard?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }, 180);
      });
    });
  };

  const handleSubmitIntent = (query) => {
    window.clearTimeout(aiGenerationTimerRef.current);
    setLastAiQuery(query);
    setIsGeneratingAiRow(true);
    setShowAiRow(false);

    aiGenerationTimerRef.current = window.setTimeout(() => {
      setIsGeneratingAiRow(false);
      setShowAiRow(true);
      focusAiGeneratedRow();
    }, 1500);
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(aiGenerationTimerRef.current);
    };
  }, []);

  return (
    <div className="apps-tab" ref={topRef}>
      <div ref={sectionRef(sIdx++)}>
        <RecommendedRow items={samsungRecommended} />
      </div>

      <div ref={sectionRef(sIdx++)} className="sponsored-section">
        <PromoRow
          title="Promotional Row"
          items={personalizedAppsPromos}
          sourcePage="apps"
          rowKey="apps-sponsored"
          variant="appSpotlight"
          immersiveState={immersiveState}
          onSponsoredFocus={onSponsoredFocus}
          onSponsoredBlur={onSponsoredBlur}
        />
      </div>

      {showAiRow &&
        (() => {
          const aiRowSectionRef = sectionRef(sIdx++);

          return (
            <div
              ref={(el) => {
                aiGeneratedRowRef.current = el;
                aiRowSectionRef(el);
              }}
              className="ai-generated-row-shell sponsored-section"
              data-ai-query={lastAiQuery}
            >
              <PromoRow
                title="AI Picks for Your Switzerland Trip"
                items={switzerlandTripPromos}
                sourcePage="apps"
                rowKey="apps-ai-switzerland"
                variant="appSpotlight"
                immersiveState={immersiveState}
                onSponsoredFocus={onSponsoredFocus}
                onSponsoredBlur={onSponsoredBlur}
              />
            </div>
          );
        })()}

      <div ref={sectionRef(sIdx++)}>
        <ScreenshotCardRow title="Editor's Choice" items={editorsChoice} />
      </div>

      <div ref={sectionRef(sIdx++)}>
        <ScreenshotCardRow title="Sports" items={sportsApps} />
      </div>

      <div ref={sectionRef(sIdx++)}>
        <ScreenshotCardRow title="Lifestyle" items={lifestyleApps} />
      </div>

      <div ref={sectionRef(sIdx++)}>
        <CircularIconRow title="Popular This Week" items={popularThisWeek} />
      </div>

      <div ref={sectionRef(sIdx++)}>
        <ScreenshotCardRow title="What's New" items={whatsNew} />
      </div>

      <div ref={sectionRef(sIdx++)}>
        <GenreRow items={genreCategories} />
      </div>

      <div ref={sectionRef(sIdx++)}>
        <MediaOutput />
      </div>

      <div ref={sectionRef(sIdx++)}>
        <AIIntentDock
          onSubmitIntent={handleSubmitIntent}
          isGenerating={isGeneratingAiRow}
          hasGeneratedRow={showAiRow}
        />
      </div>

      <div className="scroll-top-section" ref={sectionRef(sIdx++)}>
        <div className="scroll-top-btn" tabIndex={0} onClick={scrollToTop}>
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
  );
}
