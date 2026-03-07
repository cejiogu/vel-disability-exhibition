import { Link, NavLink } from "react-router";

import type { Route } from "./+types/upload";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Upload | Disability Exhibition" },
    {
      name: "description",
      content:
        "Upload your contribution files for the Disability Exhibition through an accessible form.",
    },
  ];
}

export default function Upload() {
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
        <p className="eyebrow">Upload Form</p>
        <h1>Upload To The Exhibition</h1>
        <p>
          Share media and supporting materials that help tell disability-centered
          stories.
        </p>
        <Link to="/" className="action action-secondary">
          Back To Home
        </Link>
      </header>

      <section className="panel">
        <h2>Your Upload</h2>
        <form className="contribution-form" action="#" method="post">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" />

          <label htmlFor="supportingFiles">Files (Images, Docs, Audio)</label>
          <input
            id="supportingFiles"
            name="supportingFiles"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp3,.wav"
          />
          <p className="field-note">
            Add any supporting material for your contribution.
          </p>

          <button type="submit" className="action action-primary">
            Submit Upload
          </button>
        </form>
      </section>
    </main>
  );
}
