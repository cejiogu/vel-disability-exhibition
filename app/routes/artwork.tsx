import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { AdjustableTextSection } from "../components/adjustable-text-section";
import { SiteNav } from "../components/site-nav";
import { fetchJson, resolveMediaUrl } from "../lib/api";
import { SITE_TITLE } from "../lib/site-metadata";
import type { Route } from "./+types/artwork";

type ContributionRecord = {
  id: number;
  title: string;
  artist_name: string;
  medium: string | null;
  disability_experience_context: string | null;
  description_text: string;
  alt_text_description: string;
  accessibility_notes: string | null;
  artwork_image_url: string | null;
  audio_url: string | null;
  video_url: string | null;
  ar_asset_url_ios: string | null;
  ar_asset_url_android: string | null;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: SITE_TITLE },
    {
      name: "description",
      content: "Artwork detail page for exhibition contributions.",
    },
  ];
}

export default function Artwork() {
  const { id } = useParams();
  const [record, setRecord] = useState<ContributionRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioVisible, setIsAudioVisible] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadContribution() {
      if (!id) {
        setErrorMessage("This artwork link is missing an id.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);
      setRecord(null);
      setIsAudioVisible(false);

      try {
        const data = await fetchJson<ContributionRecord>(`/contributions/${id}`);
        if (!isCancelled) {
          setRecord(data);
        }
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "This artwork could not be loaded."
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadContribution();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  const artworkImageUrl = resolveMediaUrl(record?.artwork_image_url);
  const audioUrl = resolveMediaUrl(record?.audio_url);
  const videoUrl = resolveMediaUrl(record?.video_url);
  const arUrl =
    resolveMediaUrl(record?.ar_asset_url_ios) ||
    resolveMediaUrl(record?.ar_asset_url_android);
  const arAvailable = Boolean(arUrl);

  return (
    <main className="site-shell">
      <SiteNav />

      {isLoading ? (
        <section className="panel">
          <h1>Loading Artwork</h1>
          <p>Preparing the contribution details for this exhibition page.</p>
        </section>
      ) : null}

      {!isLoading && errorMessage ? (
        <section className="panel">
          <h1>Artwork Not Available</h1>
          <p>{errorMessage}</p>
          <p>
            The QR code may point to content that is still being prepared. You can
            return to the home page or try again later.
          </p>
          <Link to="/" className="action action-primary">
            Return Home
          </Link>
        </section>
      ) : null}

      {!isLoading && !errorMessage && record ? (
        <>
          <section className="artwork-hero">
            <div className="artwork-preview panel panel-strong">
              <p className="eyebrow">Artwork Preview</p>
              {/* Future AR integration hook: this surface is reserved for AR or 3D overlays. */}
              <div className="artwork-preview-surface">
                {artworkImageUrl ? (
                  <img
                    src={artworkImageUrl}
                    alt={record.alt_text_description}
                    className="artwork-preview-image"
                  />
                ) : (
                  <div className="artwork-placeholder">
                    <p>Static artwork preview will appear here when media is available.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="panel artwork-summary">
              <p className="eyebrow artwork-eyebrow-light">Exhibition Contribution</p>
              <h1>{record.title}</h1>
              <p className="artwork-byline">By {record.artist_name}</p>
              <p>
                {record.medium || "Medium details will be added by the exhibition team."}
              </p>
              {/* Future AR integration hook: replace this CTA behavior once AR is implemented. */}
              {arAvailable && arUrl ? (
                <a href={arUrl} className="action action-primary">
                  Open AR Experience
                </a>
              ) : (
                <>
                  <span className="action action-disabled" aria-disabled="true">
                    AR Not Available Yet
                  </span>
                  <p className="field-note">
                    AR content is not available for this work yet, but the full
                    narrative and accessibility context remain available below.
                  </p>
                </>
              )}
            </div>
          </section>

          <AdjustableTextSection title="Audio Description" className="panel audio-description-section">
            {audioUrl ? (
              <>
                <button
                  type="button"
                  className="action action-primary"
                  aria-label={
                    isAudioVisible
                      ? "Hide the audio description player"
                      : "Listen to the audio description"
                  }
                  onClick={() => setIsAudioVisible((value) => !value)}
                >
                  {isAudioVisible ? "Hide Audio" : "Listen to Description"}
                </button>
                {isAudioVisible ? (
                  <audio
                    controls
                    className="artwork-media artwork-audio-player"
                    aria-label="Audio description player"
                  >
                    <source src={audioUrl} />
                  </audio>
                ) : null}
              </>
            ) : (
              <p className="field-note">
                No audio description is available for this contribution.
              </p>
            )}
          </AdjustableTextSection>

          <AdjustableTextSection title="Supporting Media" className="panel">
            {videoUrl ? (
              <video controls className="artwork-media">
                <source src={videoUrl} />
              </video>
            ) : (
              <p className="field-note">
                No supporting video is available for this contribution.
              </p>
            )}
          </AdjustableTextSection>

          <AdjustableTextSection title="Description" className="panel">
            <p>{record.description_text}</p>
          </AdjustableTextSection>

          <section className="grid-two">
            <AdjustableTextSection title="Accessibility Notes" className="panel" as="article">
              <p>
                {record.accessibility_notes ||
                  "No additional accessibility notes have been added yet."}
              </p>
              <p className="field-note">Alt text: {record.alt_text_description}</p>
            </AdjustableTextSection>

            <AdjustableTextSection
              title="Disability Experience Context"
              className="panel"
              as="article"
            >
              <p>
                {record.disability_experience_context ||
                  "Context for this work will be added as part of the exhibition narrative."}
              </p>
            </AdjustableTextSection>
          </section>
        </>
      ) : null}
    </main>
  );
}
