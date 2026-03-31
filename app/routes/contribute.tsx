import { Link } from "react-router";
import { useState, type FormEvent } from "react";

import { SiteNav } from "../components/site-nav";
import { CONTRIBUTE_ENABLED } from "../lib/feature-flags";
import { postForm } from "../lib/api";
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
    const textFields = [
      "title",
      "artist_name",
      "medium",
      "disability_experience_context",
      "description_text",
      "alt_text_description",
      "accessibility_notes",
    ] as const;

    textFields.forEach((field) => {
      const value = String(formData.get(field) || "").trim();
      if (value) {
        formData.set(field, value);
      } else {
        formData.delete(field);
      }
    });

    setIsSubmitting(true);
    try {
      await postForm("/contributions", formData);
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
      <SiteNav />

      <header className="panel panel-strong">
        <p className="eyebrow">Contribution Form</p>
        <h1>Contribute To The Exhibition</h1>
        <p>
          Contribute is the pre-exhibition form for people who want their work
          represented in the exhibition. Use Upload later for work created on site.
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
        {!CONTRIBUTE_ENABLED ? (
          <div className="paused-state" role="status">
            <h3>Contributions Are Currently Closed</h3>
            <p>
              The exhibition is underway, so narrative submissions are paused for
              now. Upload remains available for work created on site.
            </p>
          </div>
        ) : (
          <form className="contribution-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" required />

            <label htmlFor="artist_name">Artist / Contributor Name</label>
            <input id="artist_name" name="artist_name" type="text" required />

            <label htmlFor="medium">Medium (Optional)</label>
            <input id="medium" name="medium" type="text" />

            <label htmlFor="disability_experience_context">
              Disability Experience Context (Optional)
            </label>
            <textarea
              id="disability_experience_context"
              name="disability_experience_context"
              rows={3}
            />

            <label htmlFor="description_text">Description Text</label>
            <textarea
              id="description_text"
              name="description_text"
              rows={5}
              required
            />

            <label htmlFor="alt_text_description">Alt Text Description</label>
            <textarea
              id="alt_text_description"
              name="alt_text_description"
              rows={4}
              required
            />

            <label htmlFor="accessibility_notes">Accessibility Notes (Optional)</label>
            <textarea
              id="accessibility_notes"
              name="accessibility_notes"
              rows={3}
            />

            <label htmlFor="audio_file">Audio File (Optional)</label>
            <input id="audio_file" name="audio_file" type="file" accept="audio/*" />

            <label htmlFor="video_file">Video File (Optional)</label>
            <input id="video_file" name="video_file" type="file" accept="video/*" />

            <p className="field-note">
              This form is for the story and context surrounding a contribution.
              Media uploads are optional and AR assets are handled separately.
            </p>

            <button type="submit" className="action action-primary">
              {isSubmitting ? "Saving..." : "Submit Contribution"}
            </button>

            {statusMessage ? (
              <p
                className={`form-status ${
                  statusKind === "success"
                    ? "form-status-success"
                    : "form-status-error"
                }`}
              >
                {statusMessage}
              </p>
            ) : null}
          </form>
        )}
      </section>
    </main>
  );
}
