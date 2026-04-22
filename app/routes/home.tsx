import type { Route } from "./+types/home";
import { Link } from "react-router";
import { exhibitionTitle } from "../lib/artists";
import { SiteNav } from "../components/site-nav";

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
      <SiteNav title={exhibitionTitle} />

      <header className="hero hero-exhibition">
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

      <section className="panel">
        <h2>Browse Artists</h2>
        <p>
          Explore work from 7 exhibition artists. Each artist page includes
          their piece, statement, visual description, and available audio tour.
        </p>
        <div className="hero-actions mobile-quick-actions">
          <Link to="/browse-artwork" className="action action-primary">
            Browse Artists
          </Link>
        </div>
      </section>

      <section className="panel scan-cta">
        <h2>Scan A QR Code</h2>
        <p>
          Use your camera to scan exhibition QR codes and open AR experiences.
        </p>
        <div className="hero-actions mobile-quick-actions">
          <Link to="/scan" className="action action-primary">
            Open QR Scanner
          </Link>
        </div>
      </section>

      <section className="panel">
        <h2>Augmented Reality Visitor Activity</h2>
        <p>
          Click below to open the AR visitor activity experience.
        </p>
        <div className="hero-actions mobile-quick-actions">
          <Link to="/augmented-reality-visitor-activity" className="action action-primary">
            Open AR Visitor Activity
          </Link>
        </div>
      </section>
    </main>
  );
}
