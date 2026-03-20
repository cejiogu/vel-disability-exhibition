import { Link, NavLink } from "react-router";
import { useState, type FormEvent } from "react";

import { postFormData } from "../lib/api";
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
    const selectedImage = formData.get("artwork_image");

    if (!(selectedImage instanceof File) || !selectedImage.size) {
      setStatusKind("error");
      setStatusMessage("Please choose an image file before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      await postFormData("/uploads", formData);
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
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
          />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" />

          <label htmlFor="artwork_image">Upload Image (JPEG or PNG)</label>
          <input
            id="artwork_image"
            name="artwork_image"
            type="file"
            accept="image/jpeg,image/png"
            required
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
