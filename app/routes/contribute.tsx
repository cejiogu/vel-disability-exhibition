import { Link, NavLink } from "react-router";
import { useState, type FormEvent } from "react";

import { postJson } from "../lib/api";
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
      title: String(formData.get("title") || "").trim(),
      artist_name: String(formData.get("artist_name") || "").trim(),
      description_text: String(formData.get("description_text") || "").trim(),
      alt_text_description: String(formData.get("alt_text_description") || "").trim(),
      artwork_image_url: String(formData.get("artwork_image_url") || "").trim(),
      audio_url: String(formData.get("audio_url") || "").trim() || null,
      video_url: String(formData.get("video_url") || "").trim() || null,
      ar_asset_url_ios: String(formData.get("ar_asset_url_ios") || "").trim(),
      ar_asset_url_android: String(formData.get("ar_asset_url_android") || "").trim(),
    };

    setIsSubmitting(true);
    try {
      await postJson("/contributions", payload);
      form.reset();
      setStatusKind("success");
      setStatusMessage("Contribution saved to database.");
    } catch (error) {
      setStatusKind("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Contribution failed. Please try again."
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
        <form className="contribution-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" required />

          <label htmlFor="artist_name">Artist Name</label>
          <input id="artist_name" name="artist_name" type="text" required />

          <label htmlFor="description_text">Description Text</label>
          <textarea id="description_text" name="description_text" rows={5} required />

          <label htmlFor="alt_text_description">Alt Text Description</label>
          <textarea
            id="alt_text_description"
            name="alt_text_description"
            rows={4}
            required
          />

          <label htmlFor="artwork_image_url">Artwork Image URL</label>
          <input
            id="artwork_image_url"
            name="artwork_image_url"
            type="url"
            placeholder="https://example.com/artwork.jpg"
            required
          />

          <label htmlFor="audio_url">Audio URL (Optional)</label>
          <input
            id="audio_url"
            name="audio_url"
            type="url"
            placeholder="https://example.com/audio.mp3"
          />

          <label htmlFor="video_url">Video URL (Optional)</label>
          <input
            id="video_url"
            name="video_url"
            type="url"
            placeholder="https://example.com/video.mp4"
          />

          <label htmlFor="ar_asset_url_ios">AR Asset URL iOS (USDZ)</label>
          <input
            id="ar_asset_url_ios"
            name="ar_asset_url_ios"
            type="url"
            placeholder="https://example.com/model.usdz"
            required
          />

          <label htmlFor="ar_asset_url_android">AR Asset URL Android (GLB)</label>
          <input
            id="ar_asset_url_android"
            name="ar_asset_url_android"
            type="url"
            placeholder="https://example.com/model.glb"
            required
          />

          <p className="field-note">
            Required fields mirror the backend contribution schema.
          </p>

          <button type="submit" className="action action-primary">
            {isSubmitting ? "Saving..." : "Submit Contribution"}
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
