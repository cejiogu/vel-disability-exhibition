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
          &quot;Crip time&quot; is a conception of time that describes the variety of temporal experiences of disabled and diverse bodyminds. &quot;Rather than bend disabled bodies and minds to meet the clock, crip time bends the clock to meet disabled bodies and minds&quot; (Kafer, 2013). 
        </p>
        <p className="lede" style={{marginBottom: '1em'}}>
          The pieces in this exhibition ask: What does time feel like to different bodies and minds? What are its boundaries, its constraints, its implicit and explicit values? What happens when temporal bounds and norms become slippery, undefined, malleable? 
        </p>
        <p className="lede" style={{marginBottom: '1em'}}>
          Through interactive art and extended reality (XR) technologies, this exhibition invites visitors to question their perceptions of time itself and explore what it means to &quot;crip&quot; time.
        </p>
        <p className="lede" style={{marginBottom: '1em'}}>
          This exhibition was curated by Ria J. Gualano (PhD Candidate, Cornell University Department of Communication) and is supported by the Mellon/ACLS Dissertation Innovation Fellowship. 
        </p>
        <div className="audio-shell">
          <audio
            controls
            preload="none"
            src="/project_details/Updated Exhibition Statement.m4a"
            className="audio-player audio-player-hero"
          >
            Your browser does not support audio playback.
          </audio>
        </div>
      </header>
      
      <section className="panel">
        <h2>Browse Artwork</h2>
        <p>
          Learn more about art from the seven exhibition artists. Each artist page includes their art piece, artist statement, creation process, and audio tour.
        </p>
        <div className="hero-actions mobile-quick-actions">
          <Link to="/browse-artwork" className="action action-primary">
            Browse Artwork
          </Link>
        </div>
      </section>
    </main>
  );
}
