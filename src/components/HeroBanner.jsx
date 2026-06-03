import { useState, useEffect } from "react";
import { heroBanners } from "../data/content";

export default function HeroBanner({ expanded }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroBanners.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`hero-banner ${expanded ? "expanded" : "collapsed"}`} tabIndex={0}>
      {heroBanners.map((banner, index) => (
        <div key={banner.id} className={`hero-slide ${index === activeIndex ? "active" : ""}`}>
          <img className="hero-backdrop" src={banner.backdrop} alt={banner.title} />
          <div className="hero-gradient" style={{ background: banner.gradient }} />
          <div className="hero-bottom-fade" />
          <div className="hero-content">
            <img className="hero-platform-logo" src={banner.platformLogo} alt={banner.platform} />
            <div className="hero-subtitle">{banner.subtitle}</div>
            <div className="hero-tagline">{banner.tagline}</div>
          </div>
        </div>
      ))}

      <div className="hero-dots">
        {heroBanners.map((_, index) => (
          <div
            key={index}
            className={`hero-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
