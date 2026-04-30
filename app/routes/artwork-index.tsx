import { useEffect, useState } from "react";
import { Link } from "react-router";

import { SiteNav } from "../components/site-nav";
import { fetchJson, resolveMediaUrl } from "../lib/api";
import { SITE_TITLE } from "../lib/site-metadata";
import type { Route } from "./+types/artwork-index";

type ContributionListItem = {
  id: number;
  title: string;
  artist_name: string;
  description_text: string;
  artwork_image_url: string | null;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: SITE_TITLE },
    {
      name: "description",
      content: "Browse all exhibition contributions and link into individual artwork pages.",
    },
  ];
}

export default function ArtworkIndex() {
  const [items, setItems] = useState<ContributionListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadArtwork() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await fetchJson<ContributionListItem[]>("/contributions");
        if (!isCancelled) setItems(data);
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Artwork could not be loaded right now."
          );
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    void loadArtwork();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <main className="site-shell">
      <SiteNav />

      <section className="panel panel-strong">
        <p className="eyebrow">Exhibition Works</p>
        <h1>Browse All Artwork</h1>
        <p>
          Explore all available contributions and open each piece for additional
          context, media, and accessibility details.
        </p>
      </section>

      {isLoading ? (
        <section className="panel">
          <h2>Loading Artwork</h2>
          <p>Gathering contributions for the exhibition browse view.</p>
        </section>
      ) : null}

      {!isLoading && errorMessage ? (
        <section className="panel">
          <h2>Artwork Unavailable</h2>
          <p>{errorMessage}</p>
        </section>
      ) : null}

      {!isLoading && !errorMessage && items.length === 0 ? (
        <section className="panel">
          <h2>No Artwork Yet</h2>
          <p>Contributions will appear here as they are added to the exhibition.</p>
        </section>
      ) : null}

      {!isLoading && !errorMessage && items.length > 0 ? (
        <section className="artwork-list">
          {items.map((item) => {
            const imageUrl = resolveMediaUrl(item.artwork_image_url);
            return (
              <article key={item.id} className="panel artwork-card">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt=""
                    className="artwork-card-image"
                  />
                ) : (
                  <div className="artwork-card-placeholder">
                    <p>Preview image coming soon</p>
                  </div>
                )}
                <div className="artwork-card-body">
                  <h2>{item.title}</h2>
                  <p className="artwork-byline">By {item.artist_name}</p>
                  <p>
                    {item.description_text.length > 140
                      ? `${item.description_text.slice(0, 140)}...`
                      : item.description_text}
                  </p>
                  <Link to={`/artwork/${item.id}`} className="action action-primary">
                    View Artwork
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      ) : null}
    </main>
  );
}
