import { NavLink } from "react-router";

import { CONTRIBUTE_ENABLED } from "../lib/feature-flags";

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="site-nav-links">
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
