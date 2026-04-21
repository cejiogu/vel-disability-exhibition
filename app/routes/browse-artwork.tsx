import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";

import { artists, exhibitionTitle } from "../lib/artists";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [affiliationFilter, setAffiliationFilter] = useState<
    "All" | "Student" | "Staff"
  >("All");
  const [mediumFilter, setMediumFilter] = useState("All");
  const [resumeArtistSlug, setResumeArtistSlug] = useState<string | null>(null);

  useEffect(() => {
    const savedArtistSlug = window.localStorage.getItem("lastArtistSlug");

    if (savedArtistSlug && artists.some((artist) => artist.slug === savedArtistSlug)) {
      setResumeArtistSlug(savedArtistSlug);
    }
  }, []);

  const mediumOptions = useMemo(
    () => ["All", ...new Set(artists.map((artist) => artist.medium))],
    []
  );

  const filteredArtists = useMemo(
    () =>
      artists.filter((artist) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !query ||
          artist.name.toLowerCase().includes(query) ||
          artist.title.toLowerCase().includes(query) ||
          artist.medium.toLowerCase().includes(query);
        const matchesAffiliation =
          affiliationFilter === "All" || artist.affiliation === affiliationFilter;
        const matchesMedium = mediumFilter === "All" || artist.medium === mediumFilter;

        return matchesQuery && matchesAffiliation && matchesMedium;
      }),
    [affiliationFilter, mediumFilter, searchQuery]
  );

  return (
    <main className="site-shell">
      <nav className="site-nav" aria-label="Primary">
        <div className="site-branding" aria-label="Exhibition name">
          {exhibitionTitle}
        </div>
        <div className="site-nav-links">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <NavLink to="/browse-artwork" className="nav-link">
            Browse Artwork
          </NavLink>
          <NavLink to="/scan" className="nav-link nav-link-scan">
            Scan
          </NavLink>
        </div>
      </nav>

      <header className="hero">
        <h1>Browse Artwork</h1>
        <p className="lede">
          Explore each contributor's art piece, artist statement, visual
          description, and available audio tour. Tap any card to open the full
          artist page.
        </p>
      </header>

      <section className="panel quick-jump-panel">
        <h2>Find An Artist Quickly</h2>
        <p className="field-note">
          Select a name to jump straight to that artist page.
        </p>
        {resumeArtistSlug ? (
          <div className="hero-actions">
            <button
              type="button"
              className="action action-secondary action-secondary-light"
              onClick={() => navigate(`/artists/${resumeArtistSlug}`)}
            >
              Resume Last Artist
            </button>
          </div>
        ) : null}
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
        <div className="discover-controls">
          <label htmlFor="artist-search">Search by name, title, or medium</label>
          <input
            id="artist-search"
            type="search"
            placeholder="Search artists..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <div className="filter-chip-row" role="tablist" aria-label="Filter by affiliation">
            {(["All", "Student", "Staff"] as const).map((filterValue) => (
              <button
                key={filterValue}
                type="button"
                className={`filter-chip ${affiliationFilter === filterValue ? "is-active" : ""}`}
                onClick={() => setAffiliationFilter(filterValue)}
              >
                {filterValue}
              </button>
            ))}
          </div>

          <label htmlFor="medium-filter">Filter by medium</label>
          <select
            id="medium-filter"
            value={mediumFilter}
            onChange={(event) => setMediumFilter(event.target.value)}
          >
            {mediumOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <p className="field-note">
          Showing {filteredArtists.length} of {artists.length} artists.
        </p>
      </section>

      <section className="art-grid" aria-label="Artwork by contributor">
        {filteredArtists.map((artist) => {
          return (
            <article key={artist.slug} className="art-card">
              <Link to={`/artists/${artist.slug}`} className="card-image-link">
                <div className="art-card-placeholder" role="img" aria-label={`Artwork by ${artist.name}`}>
                  Image coming soon
                </div>
              </Link>

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
