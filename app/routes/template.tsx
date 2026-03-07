import { Link, NavLink } from "react-router";

import type { Route } from "./+types/template";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contribution Template | Disability Exhibition" },
    {
      name: "description",
      content: "Default contribution template for exhibition QR scans.",
    },
  ];
}

export default function Template() {
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

      <header className="panel panel-strong">
        <p className="eyebrow">Default Contribution</p>
        <h1>Contribution Template</h1>
        <p>
          This page is a generic template that opens after a QR scan, showing
          standard contribution details for exhibition attendees.
        </p>
      </header>

      <section className="panel">
        <h2>Contribution Overview</h2>
        <p>
          <strong>Title:</strong> [Contribution Title]
        </p>
        <p>
          <strong>Contributor:</strong> [Contributor Name]
        </p>
        <p>
          <strong>Medium:</strong> [Artwork, Audio, Writing, Mixed Media]
        </p>
        <p>
          <strong>Disability Experience Context:</strong> [Brief context about
          lived experience]
        </p>
      </section>

      <section className="panel">
        <h2>Description</h2>
        <p>
          This contribution highlights the unique experiences, challenges, and
          strengths that shape disability-centered perspectives. It invites
          attendees to reflect on access, embodiment, and inclusion.
        </p>
      </section>

      <section className="panel">
        <h2>Accessibility Notes</h2>
        <ul>
          <li>Captioning and text alternatives are available where needed.</li>
          <li>Visual content uses strong contrast and clear labeling.</li>
          <li>Navigation and interaction elements are keyboard accessible.</li>
        </ul>
      </section>
    </main>
  );
}
