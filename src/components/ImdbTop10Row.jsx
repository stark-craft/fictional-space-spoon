import { platformLogos } from "../data/content";

export default function ImdbTop10Row({ items }) {
  return (
    <div className="section imdb-top10-section">
      <div className="section-header">
        <div className="section-title">
          <span className="imdb-badge" style={{ fontSize: 11, padding: "2px 5px", marginRight: 8 }}>IMDb</span>
          Top 10 Movies
        </div>
      </div>

      <div className="content-row imdb-top10-row">
        {items.map((item) => (
          <div key={item.id} className="imdb-card" tabIndex={0}>
            <div className="imdb-rank">{item.rank}</div>

            <div>
              <div className="imdb-card-poster-wrap">
                <img
                  className="imdb-card-poster"
                  src={item.poster}
                  alt={item.title}
                  loading="lazy"
                />
              </div>

              <div className="imdb-card-info">
                <div className="card-title">{item.title}</div>

                <div className="card-platform-logo">
                  {platformLogos[item.platform] ? (
                    <img src={platformLogos[item.platform]} alt={item.platform} style={{ height: 14, opacity: 0.9 }} />
                  ) : (
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{item.platform}</span>
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
          </div>
        ))}
      </div>
    </div>
  );
}
