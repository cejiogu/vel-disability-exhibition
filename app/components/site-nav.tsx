import { Link, NavLink } from "react-router";

import { CONTRIBUTE_ENABLED } from "../lib/feature-flags";

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Primary">
      <Link to="/" className="logo-home" aria-label="Go to home page">
        <img src="/vel-logo.jpeg" alt="Virtual Embodiment Lab logo" />
      </Link>
      <div className="site-nav-links">
        <NavLink to="/" end className="nav-link">
          Home
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
