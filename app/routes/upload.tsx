import { Link, NavLink } from "react-router";
import { useState, type FormEvent } from "react";

import { postJson } from "../lib/api";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusKind, setStatusKind] = useState<"success" | "error" | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage(null);
    setStatusKind(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      artwork_image_url: String(formData.get("artwork_image_url") || "").trim(),
      ar_asset_url_ios: String(formData.get("ar_asset_url_ios") || "").trim() || null,
      ar_asset_url_android:
        String(formData.get("ar_asset_url_android") || "").trim() || null,
      email: String(formData.get("email") || "").trim() || null,
    };

    setIsSubmitting(true);
    try {
      await postJson("/uploads", payload);
      form.reset();
      setStatusKind("success");
      setStatusMessage("Upload saved to database.");
    } catch (error) {
      setStatusKind("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Upload failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

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
        <form className="contribution-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" />

          <label htmlFor="artwork_image_url">Artwork Image URL</label>
          <input
            id="artwork_image_url"
            name="artwork_image_url"
            type="url"
            placeholder="https://example.com/artwork.jpg"
            required
          />

          <label htmlFor="ar_asset_url_ios">AR Asset URL iOS (USDZ, optional)</label>
          <input
            id="ar_asset_url_ios"
            name="ar_asset_url_ios"
            type="url"
            placeholder="https://example.com/model.usdz"
          />

          <label htmlFor="ar_asset_url_android">
            AR Asset URL Android (GLB, optional)
          </label>
          <input
            id="ar_asset_url_android"
            name="ar_asset_url_android"
            type="url"
            placeholder="https://example.com/model.glb"
          />

          <button type="submit" className="action action-primary">
            {isSubmitting ? "Saving..." : "Submit Upload"}
          </button>

          {statusMessage ? (
            <p
              className={`form-status ${
                statusKind === "success" ? "form-status-success" : "form-status-error"
              }`}
            >
              {statusMessage}
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}
