import { useEffect, useId, useState } from "react";
import { NavLink, useLocation } from "react-router";

import { CONTRIBUTE_ENABLED } from "../lib/feature-flags";

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuId = useId();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="site-nav" aria-label="Primary">
      {isOpen ? (
        <button
          type="button"
          className="menu-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      <div className="site-nav-mobile-bar">
        <button
          type="button"
          className="menu-toggle"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="menu-toggle-label">Menu</span>
          <span className="menu-toggle-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        id={menuId}
        className={`site-nav-links${isOpen ? " site-nav-links-open" : ""}`}
      >
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>
        <NavLink to="/artwork" className="nav-link">
          Browse Artwork
        </NavLink>
        <NavLink to="/audio" className="nav-link">
          Audio Tour
        </NavLink>
        <NavLink to="/activity" className="nav-link">
          Visitor Activity
        </NavLink>
        <NavLink to="/upload" className="nav-link">
          Upload
        </NavLink>
        {CONTRIBUTE_ENABLED ? (
          <NavLink to="/contribute" className="nav-link">
            Contribute
          </NavLink>
        ) : (
          <span className="nav-link nav-link-disabled" aria-disabled="true">
            Contribute
          </span>
        )}
      </div>
    </nav>
  );
}
