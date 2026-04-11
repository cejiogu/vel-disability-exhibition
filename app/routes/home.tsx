import type { Route } from "./+types/home";
import { Link } from "react-router";

import { AdjustableTextSection } from "../components/adjustable-text-section";
import { SiteNav } from "../components/site-nav";
import { exhibitionStatement } from "../content/exhibition-content";
import { CONTRIBUTE_ENABLED } from "../lib/feature-flags";
import { SITE_TITLE } from "../lib/site-metadata";

export function meta({}: Route.MetaArgs) {
  return [
    { title: SITE_TITLE },
    {
      name: "description",
      content:
        "Home page for the Cripping Time Across Realities arts exhibition.",
    },
  ];
}

export default function Home() {
  return (
    <main className="site-shell">
      <SiteNav />

      <header className="hero hero-centered">
        <h1 className="hero-title">Cripping Time Across Realities Arts Exhibition</h1>
        <p className="lede">
          Scan exhibition QR codes to open artwork pages, supporting media, and
          AR-enhanced experiences directly in your phone browser. This site also
          supports contributor submissions and on-site uploads throughout the exhibition.
        </p>
        <div className="mode-cards">
          <article className="mode-card">
            <h2>Upload</h2>
            <p>
              Upload is for work created during the exhibition. Add the artwork
              file and a name so it can be prepared for display.
            </p>
          </article>
          <article className="mode-card">
            <h2>Contribute</h2>
            <p>
              Contribute is for pre-exhibition submissions. Share the story,
              context, and accessibility details that help represent the work in
              the exhibition.
            </p>
          </article>
        </div>
        <div className="hero-actions">
          {CONTRIBUTE_ENABLED ? (
            <Link to="/contribute" className="action action-primary">
              Contribute Before The Exhibition
            </Link>
          ) : (
            <span className="action action-disabled" aria-disabled="true">
              Contributions Are Currently Closed
            </span>
          )}
          <Link to="/upload" className="action action-secondary">
            Upload Work Made On Site
          </Link>
        </div>
      </header>

      <AdjustableTextSection title="Exhibition Statement">
        <div className="transcript-body">
          <p>{exhibitionStatement.intro}</p>
          {exhibitionStatement.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </AdjustableTextSection>

      <section className="panel">
        <h2>Contributing To The Exhibition</h2>
        <p>
          Before the exhibition begins, contributors can submit the written and
          reflective context that helps visitors understand a work more deeply.
        </p>
        <p>
          During the exhibition itself, Upload remains available for newly
          created work and supporting materials gathered on site.
        </p>
        <div className="hero-actions">
          {CONTRIBUTE_ENABLED ? (
            <Link to="/contribute" className="action action-primary">
              Go To Contribute
            </Link>
          ) : (
            <span className="action action-disabled" aria-disabled="true">
              Contribute Unavailable During Exhibition
            </span>
          )}
          <Link to="/upload" className="action action-secondary action-secondary-light">
            Go To Upload
          </Link>
        </div>
      </section>
    </main>
  );
}
