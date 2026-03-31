import type { Route } from "./+types/home";
import { Link } from "react-router";

import { SiteNav } from "../components/site-nav";
import { CONTRIBUTE_ENABLED } from "../lib/feature-flags";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Disability Exhibition Contribution Website" },
    {
      name: "description",
      content:
        "An accessible, low-glare homepage for contributing to the Disability Exhibition.",
    },
  ];
}

export default function Home() {
  return (
    <main className="site-shell">
      <SiteNav />

      <header className="hero">
        <p className="eyebrow">Virtual Embodiment Lab</p>
        <h1>Disability Exhibition Contribution Website</h1>
        <p className="lede">
          Visitors scan exhibition QR codes with their phone camera. Contributors
          use this site before and during the exhibition to share work, context,
          and supporting materials.
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

      <section id="guidelines" className="panel">
        <h2>Design Principles Used On This Page</h2>
        <ul>
          <li>
            Foreground and background use strong luminance contrast for easier
            reading.
          </li>
          <li>
            The background uses a soft cream tone to reduce harsh bright-glare
            effects.
          </li>
          <li>
            Color cues are paired with labels and shapes, not red-green alone.
          </li>
          <li>
            Warm highlight colors are reserved for interactive and physical
            object cues.
          </li>
        </ul>
      </section>

      <section className="grid-two">
        <article className="panel">
          <h3>Comfortable Reading Palette</h3>
          <p>
            Body text is dark slate on soft cream. Cards use very dark
            backgrounds with light text for users who prefer reduced brightness.
          </p>
          <div className="palette">
            <span className="chip chip-cream">Cream + Near Black</span>
            <span className="chip chip-gray">Gray + Off-White</span>
            <span className="chip chip-dark">Dark + Light Gray</span>
          </div>
        </article>
        <article className="panel">
          <h3>Object Visibility Colors</h3>
          <p>
            For edge markers, steps, and labeled controls, warm solid colors
            stand out on dark surfaces.
          </p>
          <div className="object-demos" aria-label="Object contrast examples">
            <span className="marker marker-yellow">Step Edge</span>
            <span className="marker marker-orange">Action Button</span>
            <span className="marker marker-red">Safety Label</span>
          </div>
        </article>
      </section>
    </main>
  );
}
