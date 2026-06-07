import { useEffect, useMemo, useRef, useState } from "react";
import MediaOutput from "./MediaOutput";
import PromoRow from "./PromoRow";
import AIIntentDock from "./AIIntentDock";
import TripPlannerBoard from "./TripPlannerBoard";
import { appsPromos } from "../data/promoContent";
import { createTripPlan } from "../data/tripPlans";
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
  const tripPlannerRef = useRef(null);
  const aiIntentSectionRef = useRef(null);
  const aiGenerationTimerRef = useRef(null);
  const planSequenceRef = useRef(0);
  const [isGeneratingAiRow, setIsGeneratingAiRow] = useState(false);
  const [tripPlans, setTripPlans] = useState([]);
  const [activePlanId, setActivePlanId] = useState(null);
  const [generationQuery, setGenerationQuery] = useState("");
  const [pendingReplaceQuery, setPendingReplaceQuery] = useState("");
  let sIdx = 2;
  const personalizedAppsPromos = useMemo(
    () => {
      void personalizationVersion;

      return getPersonalizedItems(appsPromos, {
        page: "apps",
        row: "Promotional Row",
      });
    },
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

  const focusTripPlan = (planId) => {
    const focusPlanWidget = (attempt = 0) => {
      const boardEl = tripPlannerRef.current;
      const planWidget = boardEl?.querySelector(
        `[data-trip-plan-id="${planId}"]`
      );

      if (!planWidget) {
        if (attempt < 5) {
          window.setTimeout(() => focusPlanWidget(attempt + 1), 90);
        }
        return;
      }

      planWidget.focus({ preventScroll: true });
      planWidget.scrollIntoView({
        behavior: attempt === 0 ? "smooth" : "auto",
        block: "center",
        inline: "nearest",
      });

      if (attempt < 2) {
        window.setTimeout(() => focusPlanWidget(attempt + 1), 180);
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.setTimeout(() => focusPlanWidget(), 80);
      });
    });
  };

  const buildTripPlan = (query) => {
    window.clearTimeout(aiGenerationTimerRef.current);
    onSponsoredBlur?.();
    setGenerationQuery(query);
    setActivePlanId(null);
    setIsGeneratingAiRow(true);

    requestAnimationFrame(() => {
      aiIntentSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });

    aiGenerationTimerRef.current = window.setTimeout(() => {
      planSequenceRef.current += 1;
      const plan = createTripPlan(query, planSequenceRef.current);

      setTripPlans((currentPlans) => [...currentPlans, plan].slice(-3));
      setActivePlanId(null);
      setGenerationQuery("");
      setIsGeneratingAiRow(false);
      focusTripPlan(plan.id);
    }, 1500);
  };

  const handleSubmitIntent = (query) => {
    if (isGeneratingAiRow) return false;

    if (tripPlans.length >= 3) {
      setPendingReplaceQuery(query);
      tripPlannerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return "replace";
    }

    buildTripPlan(query);
    return "generating";
  };

  const handleSelectPlan = (planId) => {
    setActivePlanId(planId);
  };

  const handleDeletePlan = (planId) => {
    setTripPlans((currentPlans) =>
      currentPlans.filter((plan) => plan.id !== planId)
    );
    setActivePlanId((currentId) => (currentId === planId ? null : currentId));
  };

  const handleCompleteStep = (planId, stepId) => {
    setTripPlans((currentPlans) =>
      currentPlans.map((plan) => {
        if (plan.id !== planId) return plan;

        const completedSteps = plan.steps.map((step) =>
          step.id === stepId ? { ...step, status: "complete" } : step
        );
        const nextStepIndex = completedSteps.findIndex(
          (step) => step.status !== "complete"
        );
        const steps = completedSteps.map((step, index) => {
          if (step.status === "complete") return step;
          return {
            ...step,
            status: index === nextStepIndex ? "next" : "upcoming",
          };
        });
        const completeCount = steps.filter(
          (step) => step.status === "complete"
        ).length;
        const progress = Math.round((completeCount / steps.length) * 100);
        const nextStep = steps.find((step) => step.status === "next");

        return {
          ...plan,
          steps,
          progress,
          status: progress === 100 ? "Journey ready" : "Planning",
          nextStep:
            progress === 100
              ? "Everything is confirmed"
              : nextStep?.title || plan.nextStep,
        };
      })
    );
  };

  const handleCompletePlan = (planId) => {
    setTripPlans((currentPlans) =>
      currentPlans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              progress: 100,
              status: "Journey ready",
              nextStep: "Everything is confirmed",
              steps: plan.steps.map((step) => ({
                ...step,
                status: "complete",
              })),
            }
          : plan
      )
    );
  };

  const handleReplacePlan = (planId) => {
    const query = pendingReplaceQuery;
    setPendingReplaceQuery("");
    setTripPlans((currentPlans) =>
      currentPlans.filter((plan) => plan.id !== planId)
    );
    setActivePlanId(null);
    buildTripPlan(query);
  };

  const handleCancelReplace = () => {
    setPendingReplaceQuery("");

    requestAnimationFrame(() => {
      const focusTarget = aiIntentSectionRef.current?.querySelector(
        "[tabindex='0']"
      );
      focusTarget?.focus({ preventScroll: true });
      focusTarget?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
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

      {(() => {
        const tripPlannerSectionRef = sectionRef(sIdx++);

        return (
          <div
            ref={(el) => {
              tripPlannerRef.current = el;
              tripPlannerSectionRef(el);
            }}
            className={
              tripPlans.length > 0 || isGeneratingAiRow
                ? "trip-planner-slot is-visible"
                : "trip-planner-slot"
            }
            data-ai-query={generationQuery}
          >
            {(tripPlans.length > 0 || isGeneratingAiRow) && (
              <TripPlannerBoard
                plans={tripPlans}
                activePlanId={activePlanId}
                isGenerating={isGeneratingAiRow}
                pendingReplaceQuery={pendingReplaceQuery}
                onSelectPlan={handleSelectPlan}
                onClosePlan={() => setActivePlanId(null)}
                onDeletePlan={handleDeletePlan}
                onReplacePlan={handleReplacePlan}
                onCancelReplace={handleCancelReplace}
                onCompleteStep={handleCompleteStep}
                onCompletePlan={handleCompletePlan}
              />
            )}
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

      {(() => {
        const aiIntentDockSectionRef = sectionRef(sIdx++);

        return (
          <div
            ref={(el) => {
              aiIntentSectionRef.current = el;
              aiIntentDockSectionRef(el);
            }}
          >
            <AIIntentDock
              onSubmitIntent={handleSubmitIntent}
              isGenerating={isGeneratingAiRow}
              planCount={tripPlans.length}
            />
          </div>
        );
      })()}

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
