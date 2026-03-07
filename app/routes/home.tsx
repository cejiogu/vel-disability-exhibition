import type { Route } from "./+types/home";
import { Link, NavLink } from "react-router";

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
          <NavLink to="/contribute" className="nav-link">
            Contribute
          </NavLink>
          <NavLink to="/scan" className="nav-link nav-link-scan">
            Scan
          </NavLink>
        </div>
      </nav>

      <header className="hero">
        <p className="eyebrow">Virtual Embodiment Lab</p>
        <h1>Disability Exhibition Contribution Website</h1>
        <p className="lede">
          Share stories, media, and reflections for an exhibition designed with
          readable contrast, reduced glare, and inclusive visual choices.
        </p>
        <div className="mode-cards">
          <article className="mode-card">
            <h2>Upload</h2>
            <p>
              Take a picture of your artwork that you just drew and upload it to
              the website to view it in AR around the exhibition.
            </p>
          </article>
          <article className="mode-card">
            <h2>Contribute</h2>
            <p>
              This is for submitting contributions before the exhibition to
              display to users and attendees so they can learn about the unique
              experiences of different disabilities.
            </p>
          </article>
        </div>
        <div className="hero-actions">
          <Link to="/contribute" className="action action-primary">
            Start Contribution
          </Link>
          <Link to="/upload" className="action action-secondary">
            Go To Upload
          </Link>
        </div>
      </header>

      <section className="panel">
        <h2>Contributing To The Exhibition</h2>
        <p>
          We welcome personal stories, interviews, photos, audio, and documents
          that reflect disability experiences and accessibility insights.
        </p>
        <p>
          Write your narrative on the Contribute page, then use the Upload page
          to attach media and supporting materials.
        </p>
        <div className="hero-actions">
          <Link to="/contribute" className="action action-primary">
            Go To Contribute
          </Link>
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
