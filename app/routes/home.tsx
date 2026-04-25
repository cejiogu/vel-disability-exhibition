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
        <p className="lede" style={{marginBottom: '1em'}}>
          <em>Cripping Time Across Realities</em> showcases art-based reflections on temporality created by Cornell students and staff who identify as disabled and/or neurodiverse. 
        </p>
        <p className="lede" style={{marginBottom: '1em'}}>
          &quot;Crip time&quot; is a widely adopted, flexible conception of time that encompasses the experiences, wants and needs of disabled and diverse bodyminds moving through the world. 
        </p>
        <p className="lede" style={{marginBottom: '1em'}}>
         The pieces in this exhibition ask: What is time? What are its boundaries, its constraints, its implicit and explicit values? What happens when temporal bounds and norms become slippery, undefined, malleable? 
        </p>
        <p className="lede" style={{marginBottom: '1em'}}>
          Through interactive art and extended reality (XR) technologies, this exhibition invites visitors to question their perceptions of time itself. What does it mean to &quot;crip&quot; time? 
        </p>
        <p className="lede" style={{marginBottom: '1em'}}>
          This exhibition was curated by Ria J. Gualano (PhD Candidate, Cornell University Department of Communication) and is supported by the Mellon/ACLS Dissertation Innovation Fellowship. 
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
