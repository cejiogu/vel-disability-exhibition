import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { artists, exhibitionTitle } from "../lib/artists";
import { SiteNav } from "../components/site-nav";
import type { Route } from "./+types/browse-artwork";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Browse Artwork | Cripping Time Across Realities" },
    {
      name: "description",
      content: "Browse artwork, visual descriptions, and artist pages.",
    },
  ];
}

export default function BrowseArtwork() {
  const navigate = useNavigate();
  const [selectedArtistSlug, setSelectedArtistSlug] = useState("");

  return (
    <main className="site-shell">
      <SiteNav title={exhibitionTitle} />

      <header className="hero">
        <h1>Browse Artwork</h1>
        <p className="lede">
          Explore each contributor's art piece, artist statement, creation process, and audio tour. Tap any card to open the full artist page.
        </p>
      </header>

      <section className="panel quick-jump-panel">
        <h2>Find An Artist Quickly</h2>
        <p className="field-note">
          Select a name to jump straight to that artist page.
        </p>
        <div className="quick-jump-form">
          <label htmlFor="artist-jump">Select an artist</label>
          <select
            id="artist-jump"
            value={selectedArtistSlug}
            onChange={(event) => {
              const nextSlug = event.target.value;
              setSelectedArtistSlug(nextSlug);

              if (nextSlug) {
                navigate(`/artists/${nextSlug}`);
              }
            }}
          >
            <option value="">Choose an artist...</option>
            {artists.map((artist) => (
              <option key={artist.slug} value={artist.slug}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="art-grid" aria-label="Artwork by contributor">
        {artists.map((artist) => {
          return (
            <article key={artist.slug} className="art-card">
              {artist.mainArtworkUrl ? (
                <Link to={`/artists/${artist.slug}`} className="card-image-link">
                  <img
                    src={artist.mainArtworkUrl}
                    alt={`${artist.title} cover image`}
                    className="art-card-image"
                    loading="lazy"
                  />
                </Link>
              ) : artist.slug === "daniel-enriquez" && artist.webglEmbedUrl ? (
                <div className="card-image-link card-embed-container">
                  <iframe
                    src={artist.webglEmbedUrl}
                    title={`${artist.name} WebGL artwork`}
                    className="card-embed"
                  />
                </div>
              ) : (
                <Link to={`/artists/${artist.slug}`} className="card-image-link">
                  <div className="art-card-placeholder" role="img" aria-label={`Artwork by ${artist.name}`}>
                    Image coming soon
                  </div>
                </Link>
              )}

              <div className="art-card-body">
                <p className="art-card-kicker">{artist.affiliation}</p>
                <h2>{artist.name}</h2>
                <p className="art-card-title">{artist.title}</p>
                <p className="art-card-medium">{artist.medium}</p>
                <p className="art-card-description">{artist.pieceVisualDescription}</p>

                <div className="hero-actions">
                  <Link
                    to={`/artists/${artist.slug}`}
                    className="action action-primary"
                  >
                    Open Artist Page
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
