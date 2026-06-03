
import { platformLogos } from "../data/content";

export default function SplitRow({ tvPlusCard, recommendedItems }) {
  return (
    <div className="section split-row-section">
      <div className="split-row-container">
        {/* Left: Recent / TV Plus Recommendation */}
        <div className="split-column split-column-left">
          <div className="section-title split-section-title">Recent</div>

          <div className="content-row">
            <div className="content-card landscape-card" tabIndex={0}>
              <div className="card-poster-wrap">
                <img
                  className="card-poster"
                  src={tvPlusCard.poster}
                  alt={tvPlusCard.title}
                />
              </div>

              <div className="card-info">
                <div className="card-title">{tvPlusCard.title}</div>

                <div className="card-platform-logo">
                  {platformLogos[tvPlusCard.platform] ? (
                    <img
                      src={platformLogos[tvPlusCard.platform]}
                      alt={tvPlusCard.platform}
                      style={{ height: 14, opacity: 0.9 }}
                    />
                  ) : (
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
                      {tvPlusCard.platform}
                    </span>
                  )}
                </div>

                <div className="card-meta">
                  <span className="card-meta-free">Free with subscription</span>
                  <span className="card-meta-separator">|</span>
                  <span className="card-meta-item">{tvPlusCard.rating}</span>
                  <span className="card-meta-separator">|</span>
                  <span className="card-meta-item">{tvPlusCard.year}</span>
                  <span className="card-meta-separator">|</span>
                  <span className="card-meta-item">{tvPlusCard.resolution}</span>
                  <span className="card-meta-separator">|</span>
                  <span className="card-meta-imdb">
                    <span className="imdb-badge">IMDb</span>
                    <span className="card-meta-item">{tvPlusCard.imdbRating}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="split-divider" />

        {/* Right: Recommended for You */}
        <div className="split-column split-column-right">
          <div className="section-title split-section-title">Recommended for You</div>

          <div className="content-row">
            {recommendedItems.map((item) => (
              <div key={item.id} className="content-card landscape-card" tabIndex={0}>
                <div className="card-poster-wrap">
                  <img
                    className="card-poster"
                    src={item.poster}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>

                <div className="card-info">
                  <div className="card-title">{item.title}</div>

                  <div className="card-platform-logo">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}