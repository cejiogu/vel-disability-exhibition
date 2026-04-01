import { Link } from "react-router";

import { SiteNav } from "../components/site-nav";
import { AdjustableTextSection } from "../components/adjustable-text-section";
import { audioStops } from "../content/exhibition-content";
import type { Route } from "./+types/audio-index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Audio Tour | Disability Exhibition" },
    {
      name: "description",
      content: "Browse all audio tour stops for the exhibition.",
    },
  ];
}

export default function AudioIndex() {
  return (
    <main className="site-shell">
      <SiteNav />

      <section className="panel panel-strong">
        <p className="eyebrow">Audio Guide</p>
        <h1>Audio Tour</h1>
        <p>
          Browse all available audio stops or open an individual stop directly
          from a QR code in the exhibition.
        </p>
      </section>

      <AdjustableTextSection title="Audio Tour Overview">
        <p>
          This guide offers reflective audio stops throughout the exhibition,
          with transcripts available for visitors who prefer to read or read along.
        </p>
      </AdjustableTextSection>

      <section className="audio-stop-list">
        {audioStops.map((stop) => (
          <article key={stop.slug} className="panel audio-stop-card">
            <p className="eyebrow artwork-eyebrow-light">{stop.stopLabel}</p>
            <h2>{stop.title}</h2>
            <p>{stop.summary}</p>
            <p className="field-note">{stop.duration}</p>
            {stop.transcript?.length ? (
              <p className="field-note">
                Transcript preview: {stop.transcript[0]}
              </p>
            ) : null}
            <Link to={`/audio/${stop.slug}`} className="action action-primary">
              Open Stop
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
