import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { artists, exhibitionTitle, getArtistBySlug } from "../lib/artists";
import { SiteNav } from "../components/site-nav";
import type { Route } from "./+types/artists.$slug";

export function meta({ params }: Route.MetaArgs) {
  const artist = getArtistBySlug(params.slug);

  return [
    {
      title: artist
        ? `${artist.name} | ${artist.title}`
        : "Artist Not Found | Cripping Time Across Realities",
    },
  ];
}

export default function ArtistPage({ params }: Route.ComponentProps) {
  const artist = getArtistBySlug(params.slug);
  const [activeStep, setActiveStep] = useState(0);
  const [showFullVisualDescription, setShowFullVisualDescription] = useState(false);
  const [showFullStatement, setShowFullStatement] = useState(false);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  if (!artist) {
    return (
      <main className="site-shell">
        <section className="panel">
          <h1>Artist page not found</h1>
          <Link to="/browse-artwork" className="action action-primary">
            Return To Browse Artwork
          </Link>
        </section>
      </main>
    );
  }

  const isVisualDescriptionLong = artist.pieceVisualDescription.length > 240;
  const isStatementLong = artist.statement.length > 550;
  const previewVisualDescription = showFullVisualDescription
    ? artist.pieceVisualDescription
    : `${artist.pieceVisualDescription.slice(0, 240)}...`;
  const previewStatement = showFullStatement
    ? artist.statement
    : `${artist.statement.slice(0, 550)}...`;

  useEffect(() => {
    window.localStorage.setItem("lastArtistSlug", artist.slug);
  }, [artist.slug]);

  useEffect(() => {
    setActiveStep(0);
    setShowFullStatement(false);
    setShowFullVisualDescription(false);
  }, [artist.slug]);

  useEffect(() => {
    if (!artist.processItems.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = Number(
              (entry.target as HTMLElement).dataset.timelineIndex
            );

            if (!Number.isNaN(stepIndex)) {
              setActiveStep(stepIndex);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.6,
        rootMargin: "-20% 0px -35% 0px",
      }
    );

    stepRefs.current.forEach((stepElement) => {
      if (stepElement) {
        observer.observe(stepElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [artist.processItems.length]);

  const currentArtistIndex = artists.findIndex(
    (artistItem) => artistItem.slug === artist.slug
  );
  const previousArtist =
    currentArtistIndex > 0 ? artists[currentArtistIndex - 1] : null;
  const nextArtist =
    currentArtistIndex < artists.length - 1
      ? artists[currentArtistIndex + 1]
      : null;

  const hasCreationNotes = Boolean(artist.creationNotes);

  return (
    <main className="site-shell">
      <SiteNav title={exhibitionTitle} />

      <header className="hero hero-artist">
        <p className="eyebrow">{artist.affiliation}</p>
        <h1>{artist.title}</h1>
        <p className="lede">By {artist.name}</p>
        <p className="lede">Medium: {artist.medium}</p>
        <p className="hero-statement">{isStatementLong ? previewStatement : artist.statement}</p>
        {isStatementLong ? (
          <button
            type="button"
            className="text-toggle text-toggle-light"
            onClick={() => setShowFullStatement((value) => !value)}
          >
            {showFullStatement ? "Show less" : "Read full statement"}
          </button>
        ) : null}

        <div className="audio-shell">
          <h2 className="hero-audio-heading">Artwork Audio Overview</h2>
          {artist.artworkAudioUrl ? (
            <>
              <audio
                controls
                preload="none"
                src={artist.artworkAudioUrl}
                className="audio-player audio-player-hero"
              >
                Your browser does not support audio playback.
              </audio>
            </>
          ) : (
            <p className="lede">Audio tour coming soon.</p>
          )}
        </div>
      </header>

      <section id="overview" className="panel panel-main-artwork artist-panel-animate">
        <h2>Main Artwork</h2>
        {artist.slug === "chase-and-connor" && artist.poemEmbedUrl ? (
          <div>
            <div className="embed-frame-wrap">
              <iframe
                src={artist.poemEmbedUrl}
                title={`${artist.title} embedded poem`}
                className="embed-frame"
                allowFullScreen
              />
            </div>
            {artist.poemSourceUrl ? (
              <div className="hero-actions">
                <a
                  href={artist.poemSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="action action-primary"
                >
                  Open Poem In New Tab
                </a>
              </div>
            ) : null}
          </div>
        ) : artist.slug === "daniel-enriquez" && artist.webglEmbedUrl ? (
          <div>
            <p className="field-note">
              Explore Daniel's WebGL version directly below.
            </p>
            <div className="webgl-frame-wrap">
              <iframe
                src={artist.webglEmbedUrl}
                title={`${artist.title} WebGL environment`}
                className="webgl-frame"
                allowFullScreen
              />
            </div>
            {artist.webglOpenUrl ? (
              <div className="hero-actions">
                <a
                  href={artist.webglOpenUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="action action-primary"
                >
                  Open WebGL In New Tab
                </a>
              </div>
            ) : null}
          </div>
        ) : artist.mainArtworkUrl ? (
          <img
            src={artist.mainArtworkUrl}
            alt={`${artist.title} main artwork`}
            className="main-artwork-image"
            loading="lazy"
          />
        ) : (
          <div className="main-artwork-placeholder" role="img" aria-label="Main artwork coming soon">
            Main artwork image coming soon
          </div>
        )}
        {(artist.slug !== "chase-and-connor" && artist.slug !== "daniel-enriquez") && (
          <>
            <p className="artwork-caption">{isVisualDescriptionLong ? previewVisualDescription : artist.pieceVisualDescription}</p>
            {isVisualDescriptionLong ? (
              <button
                type="button"
                className="text-toggle"
                onClick={() => setShowFullVisualDescription((value) => !value)}
              >
                {showFullVisualDescription ? "Show less" : "Read full visual description"}
              </button>
            ) : null}
          </>
        )}
      </section>

      {artist.poemEmbedUrl && artist.slug !== "chase-and-connor" ? (
        <section id="poem" className="panel artist-panel-animate">
          <h2>Poem Text</h2>
          <div className="embed-frame-wrap">
            <iframe
              src={artist.poemEmbedUrl}
              title={`${artist.title} embedded poem`}
              className="embed-frame"
              allowFullScreen
            />
          </div>
          {artist.poemSourceUrl ? (
            <div className="hero-actions">
              <a
                href={artist.poemSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="action action-primary"
              >
                Open Poem In New Tab
              </a>
            </div>
          ) : null}
          <p className="field-note">
            If the embed does not load, use the link in Additional Material.
          </p>
        </section>
      ) : null}

      {artist.webglEmbedUrl && artist.slug !== "daniel-enriquez" ? (
        <section id="webgl" className="panel panel-webgl artist-panel-animate">
          <h2>Interactive WebGL Environment</h2>
          <p className="field-note">
            Explore Daniel's WebGL version directly below.
          </p>
          <div className="webgl-frame-wrap">
            <iframe
              src={artist.webglEmbedUrl}
              title={`${artist.title} WebGL environment`}
              className="webgl-frame"
              allowFullScreen
            />
          </div>
          {artist.webglOpenUrl ? (
            <div className="hero-actions">
              <a
                href={artist.webglOpenUrl}
                target="_blank"
                rel="noreferrer"
                className="action action-primary"
              >
                Open WebGL In New Tab
              </a>
            </div>
          ) : null}
        </section>
      ) : null}

      <section id="process" className="panel panel-process-journey artist-panel-animate">
        <h2>Creation Process Journey</h2>
        <p className="field-note">
          Follow the timeline below. Each step shows a process photo with its visual description directly underneath.
        </p>
        {artist.processItems.length ? (
          <>
            <p className="timeline-progress" aria-live="polite">
              Step {activeStep + 1} of {artist.processItems.length}
            </p>
            <div className="process-timeline" aria-label="Creation process timeline">
              {artist.processItems.map((item, index) => (
                <article
                  key={item.imageUrl}
                  className="timeline-step"
                  ref={(element) => {
                    stepRefs.current[index] = element;
                  }}
                  data-timeline-index={index}
                >
                  <div className="timeline-step-marker" aria-hidden="true">
                    {index + 1}
                  </div>
                  <div className="timeline-step-card">
                    <h3>Step {index + 1}</h3>
                    <img
                      src={item.imageUrl}
                      alt={`${artist.title} process photo ${index + 1}`}
                      className="timeline-image"
                      loading="lazy"
                    />
                    <p className="timeline-label">Visual Description</p>
                    <p>{item.visualDescription}</p>
                    <p className="timeline-label">Audio</p>
                    {item.audioUrl ? (
                      <audio
                        controls
                        preload="none"
                        src={item.audioUrl}
                        className="audio-player"
                      >
                        Your browser does not support audio playback.
                      </audio>
                    ) : (
                      <p className="field-note">Audio coming soon for this step.</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="field-note">Creation-process photos coming soon.</p>
        )}
      </section>

      {artist.creationNotes || artist.additionalTextAudioUrl ? (
        <section id="notes" className="panel artist-panel-animate">
          <h2>Creation Notes</h2>
          {artist.creationNotes ? <p>{artist.creationNotes}</p> : null}
          {artist.additionalTextAudioUrl ? (
            <>
              <p className="timeline-label">Creation Notes Audio</p>
              <audio
                controls
                preload="none"
                src={artist.additionalTextAudioUrl}
                className="audio-player"
              >
                Your browser does not support audio playback.
              </audio>
            </>
          ) : null}
        </section>
      ) : null}

      {artist.externalLinks?.length && artist.slug !== "chase-and-connor" && artist.slug !== "daniel-enriquez" ? (
        <section
          id={hasCreationNotes || artist.additionalTextAudioUrl ? undefined : "notes"}
          className="panel artist-panel-animate"
        >
          <h2>Additional Material</h2>
          <ul>
            {artist.externalLinks.map((linkItem) => (
              <li key={linkItem.href}>
                <a href={linkItem.href} target="_blank" rel="noreferrer">
                  {linkItem.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="artist-page-actions">
        <div className="artist-nav-buttons" aria-label="Artist navigation">
          {previousArtist ? (
            <Link
              to={`/artists/${previousArtist.slug}`}
              className="action action-secondary action-secondary-light"
            >
              ← {previousArtist.name}
            </Link>
          ) : (
            <span className="action action-disabled" aria-hidden="true">
              ← Start
            </span>
          )}

          {nextArtist ? (
            <Link
              to={`/artists/${nextArtist.slug}`}
              className="action action-primary"
            >
              {nextArtist.name} →
            </Link>
          ) : (
            <span className="action action-disabled" aria-hidden="true">
              End →
            </span>
          )}
        </div>

        <div className="hero-actions mobile-quick-actions">
          <Link to="/browse-artwork" className="action action-primary">
            Back To Browse Artwork
          </Link>
        </div>
      </div>
    </main>
  );
}
