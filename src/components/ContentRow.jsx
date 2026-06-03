import { platformLogos } from "../data/content";
import { triggerNotification } from "../utils/notify";
import { recordPersonalizationEvent } from "../utils/personalization";

export default function ContentRow({
  title,
  items,
  landscape = false,
  showProgress = false,
  showInfoOnHover = true,
  boldTitle = true,
  showMeta = true,
  note = "",
}) {
  const openContentItem = (item) => {
    recordPersonalizationEvent({
      type: "content_open",
      item,
      context: {
        page: "foryou",
        row: title,
      },
    });

    triggerNotification(item.title);
  };

  return (
    <div className="section">
      <div className="section-header">
        <div className="section-title">{title}</div>
        {note && <div className="section-note">{note}</div>}
      </div>

      <div className="content-row">
        {items.map((item) => (
          <div
            key={item.id}
            className={`content-card ${landscape ? "landscape-card" : ""}`}
            tabIndex={0}
            onClick={() => openContentItem(item)}
          >
            <div className="card-poster-wrap">
              <img
                className="card-poster"
                src={item.poster}
                alt={item.title}
                loading="lazy"
              />

              {showProgress && item.progress && (
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${item.progress}%` }} />
                </div>
              )}
            </div>

            <div className={`card-info ${!showInfoOnHover ? "always-visible" : ""}`}>
              <div className={`card-title ${!boldTitle ? "not-bold" : ""}`}>{item.title}</div>

              <div className="card-platform-logo">
                {platformLogos[item.platform] ? (
                  <img src={platformLogos[item.platform]} alt={item.platform} style={{ height: 14, opacity: 0.9 }} />
                ) : (
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{item.platform}</span>
                )}
              </div>

              {showMeta && item.imdbRating && (
                <div className="card-meta">
                  <span className="card-meta-free">Free with subscription</span>
                  <span className="card-meta-separator">|</span>
                  <span className="card-meta-item">{item.rating}</span>
                  <span className="card-meta-separator">|</span>
                  <span className="card-meta-item">{item.year}</span>
                  <span className="card-meta-separator">|</span>
                  <span className="card-meta-item">{item.resolution}</span>
                  <span className="card-meta-separator">|</span>
                  <span className="card-meta-imdb">
                    <span className="imdb-badge">IMDb</span>
                    <span className="card-meta-item">{item.imdbRating}</span>
                  </span>
                </div>
              )}

              {showProgress && (
                <div className="card-meta">
                  <span className="card-meta-item">{item.rating}</span>
                  <span className="card-meta-separator">|</span>
                  <span className="card-meta-item">{item.year}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
