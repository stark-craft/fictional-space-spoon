/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { platformLogos } from "../data/content";
import { triggerNotification } from "../utils/notify";
import { recordPersonalizationEvent } from "../utils/personalization";
import {
  liveGenres,
  liveSports,
  onNowChannels,
  trendingChannels,
  newsChannels,
  entertainmentChannels,
  movieChannels,
} from "../data/liveContent";

const MATCH_CENTRE_VIEWS = [
  { id: "commentary", label: "Commentary" },
  { id: "insights", label: "Insights" },
  { id: "auto", label: "Auto" },
  { id: "form", label: "Form" },
  { id: "scorecard", label: "Scorecard" },
  { id: "points", label: "Points" },
];

const LIVE_APP_IDS = {
  JioHotstar: "fiZNCxMH9Y.Hotstar",
  FIFA: "qRvAtaUsUt.FifaTizen",
};

function getRemoteKey(e) {
  const keyMap = {
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    13: "Enter",
    10009: "Back",
    27: "Escape",
    8: "Backspace",
  };

  return keyMap[e.keyCode] || e.key;
}

function isBackKey(key) {
  return (
    key === "Back" ||
    key === "Backspace" ||
    key === "Escape" ||
    key === "BrowserBack" ||
    key === "XF86Back"
  );
}

function launchLiveSportsApp(item) {
  const platform = item?.platform || "JioHotstar";
  const appId = item?.appId || LIVE_APP_IDS[platform] || LIVE_APP_IDS.JioHotstar;

  console.log("[LIVE DEEPLINK] Opening app for:", item?.matchTitle, appId);

  if (!window.tizen) {
    alert(`[Dev] Would open ${platform}: ${appId}`);
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
        console.log(`[LIVE DEEPLINK] ✅ ${platform} launched`);
      },
      (err) => {
        console.log(
          `[LIVE DEEPLINK] ❌ Failed to launch ${platform}:`,
          err?.message || err
        );
      }
    );
  } catch (err) {
    console.log(
      `[LIVE DEEPLINK] ❌ ${platform} not installed / unavailable:`,
      err?.message || err
    );
  }
}

function getLiveScorePhases(item) {
  return item?.scorePhases?.length
    ? item.scorePhases
    : [
        {
          innings: item?.innings,
          overs: item?.overs,
          runRate: item?.runRate,
          target: item?.target,
          matchState: item?.matchState,
        },
        {
          innings: item?.innings,
          overs: item?.overs,
          runRate: item?.runRate,
          target: item?.target,
          matchState: "Run-rate pressure",
        },
        {
          innings: item?.innings,
          overs: item?.overs,
          runRate: item?.runRate,
          target: item?.target,
          matchState: item?.matchState,
        },
      ].filter((phase) => phase.innings || phase.target || phase.matchState);
}

function LiveDynamicScorePanel({ item }) {
  if (!item?.isLive) {
    return (
      <>
        <div className="live-sports-broadcast-topline upcoming">
          <span className="live-sports-onair-dot upcoming" />
          <span>Upcoming</span>
          <span>{item.broadcastNote || "Coverage begins before kickoff"}</span>
        </div>

        <div className="live-sports-score-strip upcoming-score-strip">
          <div className="live-sports-score-primary">
            {item.teamA} vs {item.teamB}
          </div>

          <div className="live-sports-score-secondary">
            <span>{item.kickoff || item.time}</span>
            <span>{item.venue}</span>
          </div>
        </div>

        <div className="live-sports-chase-line live-sports-rotating-line">
          {item.preMatchHeadline || "Upcoming FIFA World Cup fixture"}
        </div>
      </>
    );
  }

  const phases = getLiveScorePhases(item);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);

    if (phases.length <= 1) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % phases.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [item?.id, phases.length]);

  const phase = phases[activeIndex] || phases[0];

  if (!phase) return null;

  return (
    <>
      <div className="live-sports-broadcast-topline">
        <span className="live-sports-onair-dot" />
        <span>Live score</span>
        <span>{phase.matchState}</span>
      </div>

      <div className="live-sports-score-strip">
        <div className="live-sports-score-primary">{phase.innings}</div>

        <div className="live-sports-score-secondary">
          <span>{phase.overs}</span>
          <span>{phase.runRate}</span>
        </div>
      </div>

      <div className="live-sports-chase-line live-sports-rotating-line">
        {phase.target}
      </div>
    </>
  );
}

function getDefaultCommentary(item) {
  return item?.commentary?.length
    ? item.commentary
    : [
        {
          over: item?.overs || "16.2 ov",
          text: item?.target || "Pressure building in the chase.",
        },
        {
          over: "16.3 ov",
          text: `${
            item?.striker || "Batter"
          } keeps strike. Required rate remains high.`,
        },
        {
          over: "16.4 ov",
          text: `${
            item?.bowler || "Bowler"
          } goes full. Only a single taken.`,
        },
        {
          over: "16.5 ov",
          text: item?.partnership || "Partnership is becoming important now.",
        },
      ];
}

function getDefaultLiveInfoPanels(item) {
  if (!item?.isLive) {
    return [
      {
        type: "commentary",
        title: "Pre-match Build-up",
        rows: [
          {
            over: "Build-up",
            text:
              item?.preMatchInfo ||
              `${item?.teamA} and ${item?.teamB} meet in an upcoming fixture.`,
          },
          {
            over: "Key battle",
            text: item?.partnership || "Tactical matchup to watch before kickoff.",
          },
          {
            over: "Coverage",
            text: item?.broadcastNote || "Pre-match coverage begins before kickoff.",
          },
        ],
      },
      {
        type: "stat",
        title: "Match Preview",
        primary: item?.preMatchHeadline || `${item?.teamA} vs ${item?.teamB}`,
        secondary:
          item?.preMatchInfo ||
          `${item?.teamA} and ${item?.teamB} meet in an upcoming fixture.`,
      },
      {
        type: "nextMatch",
        title: "Kickoff",
        primary: item?.kickoff || item?.time || "Kickoff time to be confirmed",
        secondary: item?.venue || "",
      },
      {
        type: "form",
        title: "Form Guide",
        rows: item?.formGuide || [
          { team: item?.teamA || "Team A", form: "W  D  W  L  W" },
          { team: item?.teamB || "Team B", form: "W  W  D  W  L" },
        ],
      },
      {
        type: "scorecard",
        title: "Broadcast Info",
        rows: [
          {
            label: "Platform",
            value: item?.platform || "FIFA",
          },
          {
            label: "Coverage",
            value: item?.broadcastNote || "Pre-match coverage before kickoff",
          },
          {
            label: "Match",
            value: item?.matchTitle || `${item?.teamA} vs ${item?.teamB}`,
          },
        ],
      },
      {
        type: "points",
        title: "Group Table",
        rows: item?.pointsTable || [
          {
            pos: "1",
            team: item?.teamA || "Team A",
            played: "0",
            won: "0",
            lost: "0",
            nr: "0",
            nrr: "0",
            pts: "0",
          },
          {
            pos: "2",
            team: item?.teamB || "Team B",
            played: "0",
            won: "0",
            lost: "0",
            nr: "0",
            nrr: "0",
            pts: "0",
          },
        ],
      },
    ];
  }

  return [
    {
      type: "points",
      title: "Points Table",
      rows: item?.pointsTable || [
        {
          pos: "-",
          team: item?.teamA || "Team A",
          played: "-",
          won: "-",
          lost: "-",
          nr: "-",
          nrr: "-",
          pts: "-",
        },
        {
          pos: "-",
          team: item?.teamB || "Team B",
          played: "-",
          won: "-",
          lost: "-",
          nr: "-",
          nrr: "-",
          pts: "-",
        },
      ],
    },
    {
      type: "commentary",
      title: "Commentary",
      rows: getDefaultCommentary(item),
    },
    {
      type: "nextMatch",
      title: "Next Match",
      primary: item?.nextMatch?.primary || "Next fixture to be confirmed",
      secondary: item?.nextMatch?.secondary || item?.venue || "",
    },
    {
      type: "form",
      title: "Form Guide",
      rows: item?.formGuide || [
        { team: item?.teamA || "Team A", form: "W  L  W  W  L" },
        { team: item?.teamB || "Team B", form: "W  W  L  W  W" },
      ],
    },
    {
      type: "stat",
      title: "Match Insight",
      primary:
        item?.keyInsight ||
        `${item?.partnership || "Partnership building"} · ${
          item?.runRate || "Run rate updating"
        }`,
      secondary: item?.matchState || item?.target || "",
    },
    {
      type: "scorecard",
      title: "Mini Scorecard",
      rows: [
        {
          label: "Batting",
          value: `${item?.striker || "Striker"} · ${
            item?.nonStriker || "non-striker"
          }`,
        },
        {
          label: "Bowling",
          value: item?.bowler || "Bowler updating",
        },
        {
          label: "Match",
          value: item?.target || item?.matchState || "Live match state updating",
        },
      ],
    },
  ];
}

function LiveSportsInfoPanel({
  item,
  matchCentreButtonRef,
  onReturnToCard,
  onFocusNextCard,
}) {
  const chipRefs = useRef([]);

  const allPanels = item?.infoPanels?.length
    ? item.infoPanels
    : getDefaultLiveInfoPanels(item);

  const autoPanels = allPanels.filter((panel) => panel.type !== "scorecard");

  const autoViewIndex = MATCH_CENTRE_VIEWS.findIndex(
    (view) => view.id === "auto"
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedView, setSelectedView] = useState("auto");
  const [showViewPicker, setShowViewPicker] = useState(false);
  const [commentaryIndex, setCommentaryIndex] = useState(0);
  const [focusedChipIndex, setFocusedChipIndex] = useState(
    autoViewIndex >= 0 ? autoViewIndex : 0
  );

  const normalizeChipIndex = (index) => {
    const total = MATCH_CENTRE_VIEWS.length;
    return ((index % total) + total) % total;
  };

  const getSelectedViewIndex = () => {
    const selectedIndex = MATCH_CENTRE_VIEWS.findIndex(
      (view) => view.id === selectedView
    );

    return selectedIndex >= 0 ? selectedIndex : 0;
  };

  const getVisibleChipIndexes = () => {
    const current = normalizeChipIndex(focusedChipIndex);

    return [
      normalizeChipIndex(current - 1),
      current,
      normalizeChipIndex(current + 1),
    ];
  };

  const focusChip = (index) => {
    const nextIndex = normalizeChipIndex(index);
    const nextView = MATCH_CENTRE_VIEWS[nextIndex];

    setFocusedChipIndex(nextIndex);
    setSelectedView(nextView.id);
    setActiveIndex(0);
    setCommentaryIndex(0);
  };

  const getPanelsForView = () => {
    if (selectedView === "auto") return autoPanels;

    if (selectedView === "insights") {
      return allPanels.filter((panel) => panel.type === "stat");
    }

    return allPanels.filter((panel) => panel.type === selectedView);
  };

  const visiblePanels = getPanelsForView();
  const panel = visiblePanels[activeIndex] || visiblePanels[0];

  useEffect(() => {
    setActiveIndex(0);
    setCommentaryIndex(0);
    setShowViewPicker(false);

    const defaultIndex = autoViewIndex >= 0 ? autoViewIndex : 0;

    setFocusedChipIndex(defaultIndex);
    setSelectedView("auto");
  }, [item?.id]);

  useEffect(() => {
    setActiveIndex(0);
    setCommentaryIndex(0);
  }, [selectedView]);

  useEffect(() => {
    if (selectedView !== "auto") return undefined;
    if (visiblePanels.length <= 1) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % visiblePanels.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [item?.id, selectedView, visiblePanels.length]);

  useEffect(() => {
    if (panel?.type !== "commentary") return undefined;
    if (!panel?.rows?.length || panel.rows.length <= 1) return undefined;

    const timer = setInterval(() => {
      setCommentaryIndex((prev) => (prev + 1) % panel.rows.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [item?.id, panel?.type, panel?.rows?.length]);

  useEffect(() => {
    if (!showViewPicker) return;

    const safeIndex = getSelectedViewIndex();
    setFocusedChipIndex(safeIndex);
  }, [showViewPicker]);

  useEffect(() => {
    if (!showViewPicker) return;

    requestAnimationFrame(() => {
      chipRefs.current[focusedChipIndex]?.focus({ preventScroll: true });
    });
  }, [showViewPicker, focusedChipIndex]);

  if (!panel) return null;

  const activeCommentary =
    panel.type === "commentary"
      ? panel.rows?.[commentaryIndex % panel.rows.length]
      : null;

  const focusMatchCentreButton = ({ closePicker = true } = {}) => {
    if (closePicker) {
      setShowViewPicker(false);
    }

    requestAnimationFrame(() => {
      matchCentreButtonRef.current?.focus({ preventScroll: true });
    });
  };

  const closeAndReturnToCard = () => {
    setShowViewPicker(false);
    onReturnToCard?.();
  };

  const openPickerAndFocusSelected = () => {
    const selectedIndex = getSelectedViewIndex();

    setFocusedChipIndex(selectedIndex);
    setShowViewPicker(true);
  };

  return (
    <div className="live-sports-floating-info">
      <div className="live-sports-floating-head">
        <span>{panel.title}</span>

        <button
          type="button"
          ref={matchCentreButtonRef}
          tabIndex={-1}
          data-live-match-centre="true"
          className="live-match-centre-switch"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openPickerAndFocusSelected();
          }}
          onKeyDown={(e) => {
            const key = getRemoteKey(e);

            if (key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              openPickerAndFocusSelected();
              return;
            }

            if (key === "ArrowRight") {
              e.preventDefault();
              e.stopPropagation();
              setShowViewPicker(false);
              onFocusNextCard?.();
              return;
            }

            if (key === "ArrowLeft" || key === "ArrowUp" || isBackKey(key)) {
              e.preventDefault();
              e.stopPropagation();
              closeAndReturnToCard();
              return;
            }

            if (key === "ArrowDown") {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          Match Centre
        </button>
      </div>

      {showViewPicker && (
        <div className="mc-picker-box">
          <div className="mc-picker-track">
            {getVisibleChipIndexes().map((realIndex) => {
              const view = MATCH_CENTRE_VIEWS[realIndex];
              const isCurrentFocus = realIndex === focusedChipIndex;

              return (
                <button
                  key={view.id}
                  ref={(el) => {
                    chipRefs.current[realIndex] = el;
                  }}
                  type="button"
                  tabIndex={isCurrentFocus ? 0 : -1}
                  className={`mc-picker-chip ${
                    selectedView === view.id ? "active" : ""
                  } ${isCurrentFocus ? "current-focus" : ""}`}
                  onFocus={() => {
                    if (focusedChipIndex !== realIndex) {
                      setFocusedChipIndex(realIndex);
                    }

                    setSelectedView(view.id);
                    setActiveIndex(0);
                    setCommentaryIndex(0);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setSelectedView(view.id);
                    setShowViewPicker(false);
                    focusMatchCentreButton();
                  }}
                  onKeyDown={(e) => {
                    const key = getRemoteKey(e);

                    if (key === "ArrowRight") {
                      e.preventDefault();
                      e.stopPropagation();
                      focusChip(focusedChipIndex + 1);
                      return;
                    }

                    if (key === "ArrowLeft") {
                      e.preventDefault();
                      e.stopPropagation();
                      focusChip(focusedChipIndex - 1);
                      return;
                    }

                    if (key === "ArrowUp" || isBackKey(key)) {
                      e.preventDefault();
                      e.stopPropagation();
                      focusMatchCentreButton();
                      return;
                    }

                    if (key === "ArrowDown") {
                      e.preventDefault();
                      e.stopPropagation();
                      return;
                    }

                    if (key === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();

                      setSelectedView(view.id);
                      setShowViewPicker(false);
                      focusMatchCentreButton();
                    }
                  }}
                >
                  {view.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {panel.type === "points" && (
        <div className="live-sports-points-table">
          <div className="live-sports-points-row live-sports-points-header">
            <span>Pos</span>
            <span>Team</span>
            <span>P</span>
            <span>W</span>
            <span>L</span>
            <span>NR</span>
            <span>NRR</span>
            <span>Pts</span>
          </div>

          {panel.rows.map((row) => (
            <div className="live-sports-points-row" key={row.team}>
              <span>{row.pos}</span>
              <strong>{row.team}</strong>
              <span>{row.played}</span>
              <span>{row.won}</span>
              <span>{row.lost}</span>
              <span>{row.nr}</span>
              <span>{row.nrr}</span>
              <strong>{row.pts}</strong>
            </div>
          ))}
        </div>
      )}

      {panel.type === "commentary" && activeCommentary && (
        <div className="live-sports-commentary-card">
          <div className="live-sports-commentary-over">
            {activeCommentary.over}
          </div>

          <div className="live-sports-commentary-text">
            {activeCommentary.text}
          </div>
        </div>
      )}

      {panel.type === "nextMatch" && (
        <div className="live-sports-floating-copy">
          <strong>{panel.primary}</strong>
          <span>{panel.secondary}</span>
        </div>
      )}

      {panel.type === "form" && (
        <div className="live-sports-form-guide">
          {panel.rows.map((row) => (
            <div className="live-sports-form-row" key={row.team}>
              <span>{row.team}</span>
              <strong>{row.form}</strong>
            </div>
          ))}
        </div>
      )}

      {panel.type === "stat" && (
        <div className="live-sports-floating-copy">
          <strong>{panel.primary}</strong>
          <span>{panel.secondary}</span>
        </div>
      )}

      {panel.type === "scorecard" && (
        <div className="live-sports-mini-scorecard">
          {panel.rows.map((row) => (
            <div className="live-sports-mini-score-row" key={row.label}>
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SportsCard({
  item,
  isActiveRow,
  isFocusedCard,
  stackIndex,
  onFocus,
  cardRef,
  previewMode,
  onFocusMatchCentre,
}) {
  const openSportsItem = () => {
    recordPersonalizationEvent({
      type: "app_launch",
      item,
      context: {
        page: "live",
        row: "Live Sports",
        rowKey: "live-ipl-sponsored",
        actionType: "live_open",
      },
    });

    launchLiveSportsApp(item);
  };

  return (
    <div
      className={`live-card live-sports-card ${
        isActiveRow ? "immersive-card" : ""
      } ${isFocusedCard ? "immersive-card-active" : ""}`}
      tabIndex={0}
      ref={cardRef}
      style={{
        "--stack-order": stackIndex,
      }}
      onFocus={onFocus}
      onClick={() => {
        openSportsItem();
      }}
      onKeyDown={(e) => {
        const key = getRemoteKey(e);

        if (
          key === "ArrowRight" &&
          isActiveRow &&
          isFocusedCard &&
          previewMode
        ) {
          e.preventDefault();
          e.stopPropagation();
          onFocusMatchCentre?.();
          return;
        }

        if (key === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          openSportsItem();
        }
      }}
    >
      <div className="live-card-img-wrap">
        <img
          className="live-card-img"
          src={item.backdrop}
          alt={item.matchTitle}
          loading="lazy"
        />

        <div className="live-card-overlay" />

        {item.isLive && <div className="live-badge">● LIVE</div>}

        {!item.isLive && (
          <div className="live-badge upcoming-badge">
            {item.statusLabel || "UPCOMING"}
          </div>
        )}
      </div>

      <div className="live-card-info">
        <div className="live-card-program">
          {item.teamA} vs {item.teamB}
        </div>

        <div className="live-card-time">
          {item.date} • {item.time} • {item.venue}
        </div>

        <div className="card-meta" style={{ marginTop: 6 }}>
          <span className="card-meta-free">Free with subscription</span>
          <span className="card-meta-separator">|</span>
          <span className="card-meta-item">{item.rating}</span>
          <span className="card-meta-separator">|</span>
          <span className="card-meta-item">{item.year}</span>
          <span className="card-meta-separator">|</span>
          <span className="card-meta-item">{item.resolution}</span>
        </div>

        <div className="card-platform-logo" style={{ marginTop: 4 }}>
          {platformLogos[item.platform] ? (
            <img
              src={platformLogos[item.platform]}
              alt={item.platform}
              style={{ height: 14, opacity: 0.9 }}
            />
          ) : (
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
              {item.platform}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function LiveCard({ item }) {
  return (
    <div
      className="live-card"
      tabIndex={0}
      onClick={() => triggerNotification(item.channel)}
    >
      <div className="live-card-img-wrap">
        <img
          className="live-card-img"
          src={item.backdrop}
          alt={item.program}
          loading="lazy"
        />

        <div className="live-card-overlay" />

        {item.logo && (
          <img
            className="live-card-channel-logo"
            src={item.logo}
            alt={item.channel}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}

        <div className="live-badge">● LIVE</div>
        <div className="live-card-time-left">{item.timeLeft}</div>

        {item.progress !== undefined && (
          <div className="live-progress-track">
            <div
              className="live-progress-fill"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="live-card-info">
        <div className="live-card-channel-name">
          {item.channel} • {item.channelNo}
        </div>

        <div className="live-card-program">{item.program}</div>
        <div className="live-card-time">{item.time}</div>
      </div>
    </div>
  );
}

function LiveRow({ title, items, CardComponent = LiveCard }) {
  return (
    <div className="section">
      <div className="section-header">
        <div className="section-title">{title}</div>
      </div>

      <div className="content-row">
        {items.map((item) => (
          <CardComponent key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

const fifaWorldCupLiveSports = [
  {
    id: "fifa-live-1",
    matchTitle: "FIFA World Cup 2026: Brazil vs France",
    teamA: "Brazil",
    teamB: "France",
    backdrop:
      "https://www.gillettestadium.com/wp-content/uploads/2026/01/RT26_BRA-v-FRA_Static_Venue_1200x800_LOGOS_v01_26-1-4-2.jpg",
    date: "FIFA World Cup 2026",
    time: "29 Jun • 8:30 PM",
    kickoff: "29 Jun 2026 • 8:30 PM",
    venue: "MetLife Stadium",
    rating: "U",
    year: 2026,
    resolution: "UHD",
    platform: "FIFA",
    appId: LIVE_APP_IDS.FIFA,
    isLive: false,
    statusLabel: "UPCOMING",
    sportType: "football",
    broadcastNote: "Pre-match coverage starts 30 minutes before kickoff",
    preMatchHeadline: "Group-stage heavyweight fixture",
    preMatchInfo:
      "Brazil and France meet in a premium FIFA World Cup group-stage matchup. Brazil bring pace, flair and direct attacking transitions, while France arrive with structure, pressing discipline and midfield control. The pre-match focus is on whether Brazil can break quickly behind France’s defensive line or whether France can slow the tempo and dominate possession.",
    striker: "Vinícius Jr.",
    nonStriker: "Rodrygo",
    bowler: "Joshua Kimmich",
    partnership: "Key battle: Brazil transition speed vs France midfield press",
    target: "Coverage starts before kickoff",
    matchState: "Upcoming fixture",
    formGuide: [
      { team: "Brazil", form: "W  W  D  W  W" },
      { team: "France", form: "W  L  W  D  W" },
    ],
    pointsTable: [
      {
        pos: "1",
        team: "Brazil",
        played: "0",
        won: "0",
        lost: "0",
        nr: "0",
        nrr: "0",
        pts: "0",
      },
      {
        pos: "2",
        team: "France",
        played: "0",
        won: "0",
        lost: "0",
        nr: "0",
        nrr: "0",
        pts: "0",
      },
    ],
    nextMatch: {
      primary: "Brazil vs France",
      secondary: "Group stage • 29 Jun 2026 • 8:30 PM • MetLife Stadium",
    },
    keyInsight:
      "Brazil’s wide attackers can hurt France on counters, but France’s central midfield could control long phases of the match.",
  },
  {
    id: "fifa-live-2",
    matchTitle: "FIFA World Cup 2026: Argentina vs Portugal",
    teamA: "Argentina",
    teamB: "Portugal",
    backdrop:
      "https://i.ytimg.com/vi/dCFv3ynnTqY/maxresdefault.jpg",
    date: "FIFA World Cup 2026",
    time: "30 Jun • 12:30 AM",
    kickoff: "30 Jun 2026 • 12:30 AM",
    venue: "AT&T Stadium",
    rating: "U",
    year: 2026,
    resolution: "UHD",
    platform: "FIFA",
    appId: LIVE_APP_IDS.FIFA,
    isLive: false,
    statusLabel: "UPCOMING",
    sportType: "football",
    broadcastNote: "Pre-match build-up starts before kickoff",
    preMatchHeadline: "Possession vs transition battle",
    preMatchInfo:
      "Argentina and Portugal meet in a tactical FIFA World Cup group-stage clash. Portugal are expected to control possession and move the ball patiently through midfield, while Argentina will look to attack quickly when space opens. The key question is whether Portugal can keep Argentina pinned back or whether Argentina’s forwards can punish Portugal in transition.",
    striker: "Lautaro Martínez",
    nonStriker: "Julián Álvarez",
    bowler: "Pedri",
    partnership: "Key battle: Portugal possession control vs Argentina counter-attacks",
    target: "Coverage starts before kickoff",
    matchState: "Upcoming fixture",
    formGuide: [
      { team: "Argentina", form: "W  D  W  W  L" },
      { team: "Portugal", form: "D  W  W  W  D" },
    ],
    pointsTable: [
      {
        pos: "1",
        team: "Portugal",
        played: "0",
        won: "0",
        lost: "0",
        nr: "0",
        nrr: "0",
        pts: "0",
      },
      {
        pos: "2",
        team: "Argentina",
        played: "0",
        won: "0",
        lost: "0",
        nr: "0",
        nrr: "0",
        pts: "0",
      },
    ],
    nextMatch: {
      primary: "Argentina vs Portugal",
      secondary: "Group stage • 30 Jun 2026 • 12:30 AM • AT&T Stadium",
    },
    keyInsight:
      "Portugal may dominate the ball, but Argentina’s quick vertical attacks could create the more dangerous moments.",
  },
];

function LiveSportsRow({
  items,
  immersiveState,
  onSponsoredFocus,
  onSponsoredBlur,
}) {
  const rowRef = useRef(null);
  const activeCardRef = useRef(null);
  const cardRefs = useRef([]);
  const matchCentreButtonRef = useRef(null);
  const matchCentreAutoFocusKeyRef = useRef(null);
  const livePreviewEventKeysRef = useRef(new Set());

  const rowKey = "live-ipl-sponsored";
  const sourcePage = "live";

  const isActiveRow = immersiveState?.active && immersiveState.rowKey === rowKey;
  const activeItem = isActiveRow ? immersiveState?.item : null;
  const showScorePanel = isActiveRow && immersiveState?.previewMode && activeItem;

  useEffect(() => {
    if (!isActiveRow || !immersiveState?.previewMode || !activeItem) {
      matchCentreAutoFocusKeyRef.current = null;
      return undefined;
    }

    const focusKey = `${rowKey}-${activeItem.id}-match-centre`;

    if (!livePreviewEventKeysRef.current.has(focusKey)) {
      livePreviewEventKeysRef.current.add(focusKey);
      recordPersonalizationEvent({
        type: "live_preview",
        item: activeItem,
        context: {
          page: sourcePage,
          row: "Live Sports",
          rowKey,
        },
      });
    }

    if (matchCentreAutoFocusKeyRef.current === focusKey) {
      return undefined;
    }

    matchCentreAutoFocusKeyRef.current = focusKey;

    const timer = setTimeout(() => {
      matchCentreButtonRef.current?.focus({ preventScroll: true });
    }, 140);

    return () => clearTimeout(timer);
  }, [isActiveRow, immersiveState?.previewMode, activeItem?.id]);

  const handleRowBlur = () => {
    requestAnimationFrame(() => {
      if (!rowRef.current?.contains(document.activeElement)) {
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

  const focusMatchCentre = () => {
    requestAnimationFrame(() => {
      matchCentreButtonRef.current?.focus({ preventScroll: true });
    });
  };

  const focusActiveSportsCard = () => {
    const activeIndex = items.findIndex(
      (candidate) => candidate.id === activeItem?.id
    );

    const safeIndex = activeIndex >= 0 ? activeIndex : immersiveState?.itemIndex;

    requestAnimationFrame(() => {
      const cardEl = cardRefs.current[safeIndex] || activeCardRef.current;
      cardEl?.focus({ preventScroll: true });
    });
  };

  const focusNextSportsCard = () => {
    const activeIndex = items.findIndex(
      (candidate) => candidate.id === activeItem?.id
    );

    const safeIndex = activeIndex >= 0 ? activeIndex : immersiveState?.itemIndex;
    const nextIndex = Math.min(items.length - 1, safeIndex + 1);

    requestAnimationFrame(() => {
      const nextCard = cardRefs.current[nextIndex];

      if (nextCard) {
        nextCard.focus({ preventScroll: true });
        centerCardInRow(nextCard);
      }
    });
  };

  return (
    <div
      className={`section live-sports-row-shell ${
        isActiveRow ? "immersive-active" : ""
      } ${immersiveState?.previewMode && isActiveRow ? "preview-mode" : ""} ${
        immersiveState?.mediaMode && isActiveRow ? "media-mode" : ""
      }`}
      ref={rowRef}
      onBlurCapture={handleRowBlur}
    >
      <div className="promo-row-content">
        <div className="section-header">
          <div className="section-title">Live Sports • TATA IPL & FIFA WC</div>
        </div>

        <div
          className={`content-row live-sports-content-row ${
            isActiveRow ? "immersive-active" : ""
          } ${
            immersiveState?.previewMode && isActiveRow ? "preview-mode" : ""
          }`}
        >
          {items.map((item, index) => {
            const isFocusedCard =
              isActiveRow && immersiveState?.item?.id === item.id;

            const stackIndex = isFocusedCard
              ? 0
              : items
                  .filter(
                    (candidate) => candidate.id !== immersiveState?.item?.id
                  )
                  .findIndex((candidate) => candidate.id === item.id) + 1;

            return (
              <SportsCard
                key={item.id}
                item={item}
                isActiveRow={isActiveRow}
                isFocusedCard={isFocusedCard}
                stackIndex={stackIndex}
                previewMode={immersiveState?.previewMode && isActiveRow}
                cardRef={(el) => {
                  cardRefs.current[index] = el;

                  if (isFocusedCard) {
                    activeCardRef.current = el;
                  }
                }}
                onFocusMatchCentre={focusMatchCentre}
                onFocus={(e) => {
                  onSponsoredFocus?.({
                    rowKey,
                    sourcePage,
                    item,
                    itemIndex: index,
                  });

                  centerCardInRow(e.currentTarget);
                }}
              />
            );
          })}

          {showScorePanel && (
            <div className="live-sports-inline-score">
              <LiveDynamicScorePanel item={activeItem} />

              <div className="live-sports-player-rail">
                <div className="live-sports-player-stat">
                  <span>Key focus</span>
                  <strong>{activeItem.striker}</strong>
                </div>

                <div className="live-sports-player-stat">
                  <span>Support</span>
                  <strong>{activeItem.nonStriker}</strong>
                </div>

                <div className="live-sports-player-stat">
                  <span>Watch</span>
                  <strong>{activeItem.bowler}</strong>
                </div>
              </div>

              <div className="live-sports-partnership-line">
                <span>Match note</span>
                <strong>{activeItem.partnership}</strong>
              </div>

              <LiveSportsInfoPanel
                item={activeItem}
                matchCentreButtonRef={matchCentreButtonRef}
                onReturnToCard={focusActiveSportsCard}
                onFocusNextCard={focusNextSportsCard}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LiveTab({
  sectionRef,
  immersiveState,
  onSponsoredFocus,
  onSponsoredBlur,
}) {
  const [activeGenre, setActiveGenre] = useState("All");
  const topRef = useRef(null);

  const filterByGenre = (items) => {
    if (activeGenre === "All") return items;
    return items.filter((item) => item.genre === activeGenre);
  };

  const showSports = activeGenre === "All" || activeGenre === "Sports";
  const filteredOnNow = filterByGenre(onNowChannels);
  const filteredTrending = filterByGenre(trendingChannels);

  const filteredNews =
    activeGenre === "All" || activeGenre === "News" ? newsChannels : [];

  const filteredEntertainment =
    activeGenre === "All" || activeGenre === "Entertainment"
      ? entertainmentChannels
      : [];

  const filteredMovies =
    activeGenre === "All" || activeGenre === "Movies" ? movieChannels : [];

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  let sIdx = 2;

  const liveSportsWithFifa = [...liveSports, ...fifaWorldCupLiveSports].map(
    (item, index) => ({
      ...item,
      backdrop:
        item.backdrop ||
        liveSports[index % Math.max(liveSports.length, 1)]?.backdrop ||
        "",
    })
  );

  return (
    <div className="live-tab" ref={topRef}>
      {filteredOnNow.length > 0 && (
        <div ref={sectionRef(sIdx++)}>
          <LiveRow title="On Now" items={filteredOnNow} />
        </div>
      )}

      {showSports && (
        <div ref={sectionRef(sIdx++)}>
          <LiveSportsRow
            items={liveSportsWithFifa}
            immersiveState={immersiveState}
            onSponsoredFocus={onSponsoredFocus}
            onSponsoredBlur={onSponsoredBlur}
          />
        </div>
      )}

      {filteredTrending.length > 0 && (
        <div ref={sectionRef(sIdx++)}>
          <LiveRow title="Trending Channels" items={filteredTrending} />
        </div>
      )}

      {filteredNews.length > 0 && (
        <div ref={sectionRef(sIdx++)}>
          <LiveRow title="News & Opinion" items={filteredNews} />
        </div>
      )}

      {filteredEntertainment.length > 0 && (
        <div ref={sectionRef(sIdx++)}>
          <LiveRow title="Entertainment" items={filteredEntertainment} />
        </div>
      )}

      {filteredMovies.length > 0 && (
        <div ref={sectionRef(sIdx++)}>
          <LiveRow title="TV Plus Movie Channels" items={filteredMovies} />
        </div>
      )}

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
