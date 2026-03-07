import { Link, NavLink } from "react-router";
import { useEffect, useMemo, useState } from "react";

import type { Route } from "./+types/contribute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contribute | Disability Exhibition" },
    {
      name: "description",
      content:
        "Contribute your story and creation process for the Disability Exhibition.",
    },
  ];
}

export default function Contribute() {
  const [creationVideo, setCreationVideo] = useState<File | null>(null);
  const previewUrl = useMemo(
    () => (creationVideo ? URL.createObjectURL(creationVideo) : null),
    [creationVideo]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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
        <p className="eyebrow">Contribution Form</p>
        <h1>Contribute To The Exhibition</h1>
        <p>
          Share your perspective and context. Use the Upload tab for supporting
          files.
        </p>
        <div className="hero-actions">
          <Link to="/upload" className="action action-primary">
            Go To Upload
          </Link>
          <Link to="/" className="action action-secondary">
            Back To Home
          </Link>
        </div>
      </header>

      <section className="panel">
        <h2>Your Contribution</h2>
        <form className="contribution-form" action="#" method="post">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" />

          <label htmlFor="contribution">Contribution Summary</label>
          <textarea id="contribution" name="contribution" rows={6} />

          <label htmlFor="creationVideo">Creation Process Video (Optional)</label>
          <input
            id="creationVideo"
            name="creationVideo"
            type="file"
            accept="video/*"
            onChange={(event) =>
              setCreationVideo(event.currentTarget.files?.[0] ?? null)
            }
          />
          <p className="field-note">
            Upload a short video explaining how you created this contribution.
          </p>

          {previewUrl ? (
            <div className="video-preview">
              <h3>Creation Video Preview</h3>
              <video controls preload="metadata" src={previewUrl} />
            </div>
          ) : null}

          <button type="submit" className="action action-primary">
            Submit Contribution
          </button>
        </form>
      </section>
    </main>
  );
}
