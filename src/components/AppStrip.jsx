import { atfApps, btfApps } from "../data/content";

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

function AppStripIcon({ app, atf = false }) {
  return (
    <div className={`app-icon ${atf ? "atf" : ""}`} tabIndex={0}>
      <div className="app-icon-img" style={getLogoTileStyle(app)}>
        <img
          src={app.img}
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

export default function AppStrip() {
  return (
    <div className="section">
      <div className="app-strip-container">
        <div className="app-strip-atf">
          {atfApps.map((app) => (
            <AppStripIcon key={app.id} app={app} atf />
          ))}
        </div>

        <div className="app-strip-divider" />

        <div className="app-strip-btf-scroll">
          {btfApps.map((app) => (
            <AppStripIcon key={app.id} app={app} />
          ))}
        </div>
      </div>
    </div>
  );
}