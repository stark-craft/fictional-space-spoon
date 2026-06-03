import { useEffect, useRef, useState } from "react";

const DEFAULT_QUERY = "I want to go on a trip to Switzerland";

function getMappedKey(e) {
  const keyMap = {
    13: "Enter",
    27: "Escape",
    8: "Backspace",
    10009: "Back",
  };

  return keyMap[e.keyCode] || e.key;
}

export default function AIIntentDock({
  onSubmitIntent,
  isGenerating,
  hasGeneratedRow,
}) {
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    if (!expanded) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 80);

    return () => clearTimeout(timer);
  }, [expanded]);

  const submitIntent = () => {
    if (isGenerating) return;

    const query = inputValue.trim() || DEFAULT_QUERY;
    onSubmitIntent?.(query);
  };

  const expandDock = () => {
    if (!isGenerating) setExpanded(true);
  };

  const handleCompactKeyDown = (e) => {
    const key = getMappedKey(e);

    if (key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      expandDock();
    }
  };

  const handleInputKeyDown = (e) => {
    const key = getMappedKey(e);

    if (key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      submitIntent();
      return;
    }

    if (key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      submitRef.current?.focus({ preventScroll: true });
      return;
    }

    if (
      (key === "Escape" || key === "Back" || key === "Backspace") &&
      inputValue.trim().length === 0
    ) {
      e.preventDefault();
      e.stopPropagation();
      setExpanded(false);
    }
  };

  const handleSubmitKeyDown = (e) => {
    const key = getMappedKey(e);

    if (key === "ArrowLeft") {
      e.preventDefault();
      e.stopPropagation();
      inputRef.current?.focus({ preventScroll: true });
      return;
    }

    if (key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      submitIntent();
      return;
    }

    if (key === "Escape" || key === "Back" || key === "Backspace") {
      e.preventDefault();
      e.stopPropagation();

      if (inputValue.trim().length === 0) {
        setExpanded(false);
      } else {
        inputRef.current?.focus({ preventScroll: true });
      }
    }
  };

  return (
    <div className="ai-intent-section">
      <div
        className={`ai-intent-dock ${expanded ? "expanded" : "compact"} ${
          isGenerating ? "is-generating" : ""
        }`}
        tabIndex={expanded ? -1 : 0}
        role="button"
        aria-label="Ask Universal Guide"
        onClick={expandDock}
        onKeyDown={handleCompactKeyDown}
      >
        <div className="ai-intent-orb" aria-hidden="true">
          <span />
        </div>

        {!expanded && (
          <div className="ai-intent-copy">
            <div className="ai-intent-title">Ask Universal Guide</div>
            <div className="ai-intent-subtitle">
              Plan a trip, find an app, or build a watchlist
            </div>
          </div>
        )}

        {expanded && (
          <div className="ai-intent-input-shell">
            <input
              ref={inputRef}
              className="ai-intent-input"
              tabIndex={0}
              value={inputValue}
              disabled={isGenerating}
              placeholder="I want to go on a trip to Switzerland…"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />

            <button
              ref={submitRef}
              type="button"
              className="ai-intent-submit"
              tabIndex={0}
              disabled={isGenerating}
              onKeyDown={handleSubmitKeyDown}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                submitIntent();
              }}
            >
              Build
            </button>
          </div>
        )}
      </div>

      {isGenerating && (
        <div className="ai-intent-generating" aria-live="polite">
          <span>Building your AI picks</span>
          <span className="ai-intent-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
      )}

      {!isGenerating && hasGeneratedRow && (
        <div className="ai-intent-status">AI row created above</div>
      )}
    </div>
  );
}
