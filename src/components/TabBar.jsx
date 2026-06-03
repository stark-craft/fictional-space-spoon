const tabs = ["For You", "Live", "Apps"];

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div className="tab-bar-wrapper">
      <div className="tab-bar">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab-item ${tab === activeTab ? "active" : ""}`}
            onClick={() => onTabChange(tab)}
            onFocus={() => onTabChange(tab)}
            tabIndex={0}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
}
