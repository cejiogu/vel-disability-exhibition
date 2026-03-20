import { Link, NavLink } from "react-router";
import { useState, type FormEvent } from "react";

import { postFormData } from "../lib/api";
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
    const selectedImage = formData.get("artwork_image");

    if (!(selectedImage instanceof File) || !selectedImage.size) {
      setStatusKind("error");
      setStatusMessage("Please upload an image before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      await postFormData("/contributions", formData);
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

          <label htmlFor="artwork_image">Artwork Image Upload</label>
          <input
            id="artwork_image"
            name="artwork_image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
          />

          <label htmlFor="audio_file">Audio Upload (Optional)</label>
          <input
            id="audio_file"
            name="audio_file"
            type="file"
            accept="audio/*"
          />

          <label htmlFor="video_file">Video Upload (Optional)</label>
          <input
            id="video_file"
            name="video_file"
            type="file"
            accept="video/*"
          />

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
