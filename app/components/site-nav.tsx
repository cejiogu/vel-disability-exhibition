import { useState } from "react";
import { Link, NavLink } from "react-router";
import { SITE_TITLE } from "../lib/site-metadata";

type SiteNavProps = {
  title?: string;
  showLogo?: boolean;
};

export function SiteNav({ title = SITE_TITLE, showLogo = false }: SiteNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <nav className="site-nav" aria-label="Primary">
      {showLogo ? (
        <Link to="/" className="logo-home" aria-label="Go to home page">
          <img src="/vel-logo.jpeg" alt="Virtual Embodiment Lab logo" />
        </Link>
      ) : null}

      <div className="site-branding" aria-label="Exhibition name">
        {title}
      </div>

      <div className="site-nav-menu">
        <button
          type="button"
          className="nav-menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="site-nav-links"
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          Menu
        </button>
        <div id="site-nav-links" className={`site-nav-links ${isMenuOpen ? "is-open" : ""}`}>
          <NavLink to="/" end className="nav-link" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/browse-artwork" className="nav-link" onClick={closeMenu}>
            Browse Artwork
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
