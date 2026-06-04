import { useEffect, useRef, useState } from "react";

function ProviderLogo({ step, large = false }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const initial = step.provider?.trim().slice(0, 1).toUpperCase() || "U";

  return (
    <span
      className={`trip-explorer-provider-logo ${large ? "is-large" : ""}`}
      style={{ "--provider-color": step.providerColor }}
    >
      {step.providerLogo && !logoFailed ? (
        <img
          src={step.providerLogo}
          alt=""
          onError={() => setLogoFailed(true)}
        />
      ) : (
        <span>{initial}</span>
      )}
    </span>
  );
}

export default function TripStepExplorer({
  plan,
  step,
  isComplete,
  onClose,
  onComplete,
  onOpenQR,
}) {
  const [completed, setCompleted] = useState(isComplete);
  const qrActionRef = useRef(null);

  useEffect(() => {
    window.__detailPageOpen = true;
    const timer = window.setTimeout(() => {
      qrActionRef.current?.focus({ preventScroll: true });
    }, 120);

    const handleKeyDown = (event) => {
      const keyMap = {
        8: "Backspace",
        27: "Escape",
        10009: "Back",
      };
      const key = keyMap[event.keyCode] || event.key;

      if (
        key === "Back" ||
        key === "Backspace" ||
        key === "Escape" ||
        key === "XF86Back"
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.__detailPageOpen = false;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [onClose]);

  const completeStage = () => {
    setCompleted(true);
    onComplete();
  };

  return (
    <div
      className="trip-step-explorer"
      style={{
        "--trip-accent": plan.accent,
        "--trip-accent-rgb": plan.accentRgb,
        "--provider-color": step.providerColor,
      }}
    >
      <div className="trip-step-explorer-hero">
        <img src={step.image} alt="" />
        <div className="trip-step-explorer-hero-wash" />

        <button
          type="button"
          className="trip-step-explorer-close"
          tabIndex={0}
          onClick={onClose}
        >
          Back to journey
        </button>

        <div className="trip-step-explorer-hero-copy">
          <div className="trip-step-explorer-kicker">
            <span>Journey Explorer</span>
            <span>{plan.destination}</span>
            <span>{step.label}</span>
          </div>

          <h1>{step.title}</h1>
          <p>{step.overview}</p>

          <div className="trip-step-explorer-provider">
            <ProviderLogo step={step} large />
            <span>
              <small>Continue with</small>
              <strong>{step.provider}</strong>
            </span>
            <b>{step.price}</b>
          </div>
        </div>

        <div className={`trip-step-explorer-state ${completed ? "is-complete" : ""}`}>
          <span>{completed ? "✓" : plan.progress + "%"}</span>
          <strong>{completed ? "Stage complete" : "Part of your journey"}</strong>
        </div>
      </div>

      <div className="trip-step-explorer-body">
        <div className="trip-step-explorer-main">
          <section className="trip-step-explorer-section">
            <div className="trip-step-explorer-section-heading">
              <span>Why it belongs</span>
              <strong>A connected part of {plan.title}</strong>
            </div>
            <p className="trip-step-explorer-description">{step.description}</p>

            <div className="trip-step-explorer-highlight-grid">
              {step.highlights.map((highlight, index) => (
                <div key={highlight} className="trip-step-explorer-highlight">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{highlight}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="trip-step-explorer-section">
            <div className="trip-step-explorer-section-heading">
              <span>Suggested flow</span>
              <strong>From decision to confirmed</strong>
            </div>

            <div className="trip-step-explorer-flow">
              {step.schedule.map((item, index) => (
                <div key={item} className="trip-step-explorer-flow-item">
                  <span>{index + 1}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="trip-step-explorer-aside">
          <div className="trip-step-explorer-provider-card">
            <div className="trip-step-explorer-provider-card-top">
              <ProviderLogo step={step} />
              <span>
                <small>Recommended provider</small>
                <strong>{step.provider}</strong>
              </span>
            </div>
            <p>{step.meta}</p>

            <button
              ref={qrActionRef}
              type="button"
              className="trip-step-explorer-primary"
              tabIndex={0}
              onClick={onOpenQR}
            >
              Open QR and provider
            </button>

            <button
              type="button"
              className={`trip-step-explorer-complete ${
                completed ? "is-complete" : ""
              }`}
              tabIndex={0}
              onClick={completeStage}
            >
              {completed ? "Completed" : "Preview payment complete"}
            </button>
          </div>

          <div className="trip-step-explorer-tip">
            <span>Universal Guide note</span>
            <p>{step.tip}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
