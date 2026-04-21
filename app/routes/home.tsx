import type { Route } from "./+types/home";
import { Link, NavLink } from "react-router";
import { exhibitionTitle } from "../lib/artists";

export function meta({}: Route.MetaArgs) {
  return [
    { title: exhibitionTitle },
    {
      name: "description",
      content:
        "Cripping Time Across Realities exhibition statement and navigation.",
    },
  ];
}

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="site-nav" aria-label="Primary">
        <div className="site-branding" aria-label="Exhibition name">
          {exhibitionTitle}
        </div>
        <div className="site-nav-links">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <NavLink to="/browse-artwork" className="nav-link">
            Browse Artwork
          </NavLink>
          <NavLink to="/scan" className="nav-link nav-link-scan">
            Scan
          </NavLink>
        </div>
      </nav>

      <header className="hero">
        <h1>{exhibitionTitle}</h1>
        <h2>Exhibition Statement</h2>
        <p className="lede">
          Cripping Time Across Realities showcases art-based reflections on
          temporality from seven Cornell students and staff who identify as
          disabled and/or neurodiverse. Drawing on the concept of "crip time," a
          non-normative conception of time that originated in disability
          communities to describe the experiences, wants and needs of disabled
          bodyminds moving through the world, the exhibition's art and
          interactive pieces invite users to question time itself: their prior
          perceptions, their lived experience of it, and what it means to
          "crip" time.
        </p>
      </header>

      <section className="panel scan-cta">
        <h2>Scan A QR Code</h2>
        <p>
          Use your camera to scan exhibition QR codes and open AR experiences.
        </p>
        <Link to="/scan" className="action action-primary">
          Open QR Scanner
        </Link>
      </section>
    </main>
  );
}
