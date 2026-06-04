import { useEffect, useMemo, useRef } from "react";
import { openQRModal } from "../utils/qrModal";

const MAX_PLANS = 3;

function ProgressRing({ progress }) {
  return (
    <div
      className="trip-plan-progress-ring"
      style={{ "--trip-progress": `${progress * 3.6}deg` }}
      aria-label={`${progress}% planned`}
    >
      <span>{progress}%</span>
    </div>
  );
}

function PlanWidget({ plan, active, onSelect }) {
  return (
    <div
      className={`trip-plan-widget ${active ? "is-active" : ""}`}
      style={{
        "--trip-accent": plan.accent,
        "--trip-accent-rgb": plan.accentRgb,
      }}
      data-trip-plan-id={plan.id}
      data-trip-widget-active={active ? "true" : "false"}
      tabIndex={0}
      role="button"
      aria-label={`Open ${plan.title}`}
      onClick={() => onSelect(plan.id)}
    >
      <img
        className="trip-plan-widget-image"
        src={plan.cover}
        alt=""
        loading="lazy"
      />
      <div className="trip-plan-widget-wash" />
      <div className="trip-plan-widget-glow" />

      <div className="trip-plan-widget-topline">
        <span className="trip-plan-live-dot" />
        <span>{plan.status}</span>
        <span className="trip-plan-widget-duration">{plan.duration}</span>
      </div>

      <div className="trip-plan-widget-content">
        <div className="trip-plan-widget-location">{plan.destination}</div>
        <h3>{plan.title}</h3>
        <div className="trip-plan-widget-route">{plan.route}</div>

        <div className="trip-plan-widget-bottom">
          <div className="trip-plan-next-step">
            <span>Next step</span>
            <strong>{plan.nextStep}</strong>
          </div>
          <ProgressRing progress={plan.progress} />
        </div>
      </div>

      <div className="trip-plan-open-hint">
        <span>Open journey</span>
        <span aria-hidden="true">›</span>
      </div>
    </div>
  );
}

function EmptyPlanWidget({ index, isGenerating, onNewPlan }) {
  return (
    <div
      className={`trip-plan-widget trip-plan-empty-widget ${
        isGenerating ? "is-building" : ""
      }`}
      tabIndex={isGenerating ? -1 : 0}
      role={isGenerating ? "status" : "button"}
      aria-label={isGenerating ? "Building a new trip plan" : "Start another plan"}
      onClick={isGenerating ? undefined : onNewPlan}
    >
      <div className="trip-plan-empty-orb">
        <span>{isGenerating ? "" : "+"}</span>
      </div>
      <div className="trip-plan-empty-copy">
        <span>{isGenerating ? "Universal Guide is building" : `Plan ${index + 1}`}</span>
        <strong>{isGenerating ? "Connecting your journey…" : "Start another journey"}</strong>
        <small>
          {isGenerating
            ? "Discovering the route, stays, and experiences"
            : "Ask once, then return here anytime"}
        </small>
      </div>
    </div>
  );
}

function JourneyWorkspace({ plan, onClose, onDelete }) {
  const workspaceRef = useRef(null);

  useEffect(() => {
    const handleClose = () => onClose();
    window.addEventListener("trip-workspace-close", handleClose);
    return () => window.removeEventListener("trip-workspace-close", handleClose);
  }, [onClose]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      workspaceRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [plan.id]);

  const completedSteps = plan.steps.filter(
    (step) => step.status === "complete"
  ).length;

  return (
    <div
      ref={workspaceRef}
      className="trip-journey-workspace"
      style={{
        "--trip-accent": plan.accent,
        "--trip-accent-rgb": plan.accentRgb,
      }}
      data-trip-workspace="true"
    >
      <div className="trip-journey-hero">
        <img src={plan.cover} alt="" />
        <div className="trip-journey-hero-wash" />

        <div className="trip-journey-hero-copy">
          <div className="trip-journey-eyebrow">
            <span>Your complete journey</span>
            <span>{completedSteps} of {plan.steps.length} stages ready</span>
          </div>
          <h2>{plan.title}</h2>
          <p>{plan.route}</p>
          <div className="trip-journey-facts">
            <span>{plan.duration}</span>
            <span>{plan.progress}% planned</span>
            <span>Built from your query</span>
          </div>
        </div>

        <div className="trip-journey-hero-actions">
          <button
            type="button"
            className="trip-journey-action"
            tabIndex={0}
            onClick={onClose}
          >
            Close journey
          </button>
          <button
            type="button"
            className="trip-journey-action trip-journey-delete"
            tabIndex={0}
            onClick={() => onDelete(plan.id)}
          >
            Delete plan
          </button>
        </div>
      </div>

      <div className="trip-journey-timeline" aria-label="Journey stages">
        {plan.steps.map((step, index) => (
          <div
            key={step.id}
            className={`trip-journey-timeline-item is-${step.status}`}
          >
            <span className="trip-journey-timeline-dot">
              {step.status === "complete" ? "✓" : index + 1}
            </span>
            <span>{step.label}</span>
          </div>
        ))}
      </div>

      <div className="trip-journey-step-grid">
        {plan.steps.map((step, index) => (
          <div
            key={step.id}
            className={`trip-journey-step is-${step.status}`}
            tabIndex={0}
            role="button"
            onClick={() => openQRModal(step.qrData)}
          >
            <div className="trip-journey-step-image">
              <img src={step.image} alt="" loading="lazy" />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="trip-journey-step-copy">
              <div className="trip-journey-step-label">
                <span>{step.label}</span>
                <span>{step.status === "next" ? "Up next" : step.status}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="trip-journey-step-action">
                <span>{step.actionLabel}</span>
                <span aria-hidden="true">›</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlanLimitDialog({ plans, pendingQuery, onReplace, onCancel }) {
  const firstOptionRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      firstOptionRef.current?.focus({ preventScroll: true });
    }, 80);

    const handleClose = () => onCancel();
    window.addEventListener("trip-plan-limit-close", handleClose);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("trip-plan-limit-close", handleClose);
    };
  }, [onCancel]);

  return (
    <div id="trip-plan-limit-overlay" className="trip-plan-limit-overlay">
      <div className="trip-plan-limit-dialog" role="dialog" aria-modal="true">
        <div className="trip-plan-limit-kicker">3 of 3 active plans</div>
        <h2>Make room for a new journey</h2>
        <p>
          Universal Guide can keep three active plans. Choose one to replace
          with “{pendingQuery}”.
        </p>

        <div className="trip-plan-limit-options">
          {plans.map((plan, index) => (
            <button
              key={plan.id}
              ref={index === 0 ? firstOptionRef : null}
              type="button"
              className="trip-plan-limit-option"
              tabIndex={0}
              onClick={() => onReplace(plan.id)}
            >
              <img src={plan.cover} alt="" />
              <span>
                <strong>{plan.title}</strong>
                <small>{plan.route}</small>
              </span>
              <b>Replace</b>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="trip-plan-limit-cancel"
          tabIndex={0}
          onClick={onCancel}
        >
          Keep my current plans
        </button>
      </div>
    </div>
  );
}

export default function TripPlannerBoard({
  plans,
  activePlanId,
  isGenerating,
  pendingReplaceQuery,
  onSelectPlan,
  onClosePlan,
  onDeletePlan,
  onNewPlan,
  onReplacePlan,
  onCancelReplace,
}) {
  const activePlan = useMemo(
    () => plans.find((plan) => plan.id === activePlanId) || null,
    [activePlanId, plans]
  );
  const emptySlotCount = Math.max(0, MAX_PLANS - plans.length);

  return (
    <div className="section trip-planner-board">
      <div className="trip-planner-heading">
        <div>
          <div className="trip-planner-kicker">Universal Guide</div>
          <h2>Your Plans</h2>
        </div>
        <div className="trip-planner-count">
          <span>{plans.length}</span> of {MAX_PLANS} active
        </div>
      </div>

      <div className="trip-plan-widget-grid">
        {plans.map((plan) => (
          <PlanWidget
            key={plan.id}
            plan={plan}
            active={plan.id === activePlanId}
            onSelect={onSelectPlan}
          />
        ))}

        {Array.from({ length: emptySlotCount }).map((_, index) => (
          <EmptyPlanWidget
            key={`empty-plan-${index}`}
            index={plans.length + index}
            isGenerating={isGenerating && index === 0}
            onNewPlan={onNewPlan}
          />
        ))}
      </div>

      {activePlan && (
        <JourneyWorkspace
          key={activePlan.id}
          plan={activePlan}
          onClose={onClosePlan}
          onDelete={onDeletePlan}
        />
      )}

      {pendingReplaceQuery && (
        <PlanLimitDialog
          plans={plans}
          pendingQuery={pendingReplaceQuery}
          onReplace={onReplacePlan}
          onCancel={onCancelReplace}
        />
      )}
    </div>
  );
}
