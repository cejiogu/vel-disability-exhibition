import { Link, useParams } from "react-router";

import { SiteNav } from "../components/site-nav";
import { AdjustableTextSection } from "../components/adjustable-text-section";
import { audioStops } from "../content/exhibition-content";
import { SITE_TITLE } from "../lib/site-metadata";
import type { Route } from "./+types/audio-stop";

export function meta({}: Route.MetaArgs) {
  return [
    { title: SITE_TITLE },
    {
      name: "description",
      content: "Individual audio tour stop with transcript support.",
    },
  ];
}

export default function AudioStop() {
  const { slug } = useParams();
  const stop = audioStops.find((entry) => entry.slug === slug);

  if (!stop) {
    return (
      <main className="site-shell">
        <SiteNav />
        <section className="panel">
          <h1>Audio Stop Not Found</h1>
          <p>This stop is not available right now.</p>
          <Link to="/audio" className="action action-primary">
            Back To Audio Tour
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="site-shell">
      <SiteNav />

      <section className="panel panel-strong">
        <p className="eyebrow">{stop.stopLabel}</p>
        <h1>{stop.title}</h1>
        <p>{stop.description || stop.summary}</p>
      </section>

      <section className="panel">
        <h2>Audio</h2>
        {stop.audioUrl ? (
          <audio controls className="artwork-media" aria-label={`${stop.title} audio player`}>
            <source src={stop.audioUrl} />
          </audio>
        ) : (
          <p className="field-note">Audio not available for this stop</p>
        )}
      </section>

      <AdjustableTextSection title="Transcript">
        {stop.transcript?.length ? (
          <div className="transcript-body">
            {stop.transcript.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p>Transcript not available for this stop.</p>
        )}
      </AdjustableTextSection>
    </main>
  );
}
