import type { Route } from "./+types/augmented-reality-visitor-activity";
import { exhibitionTitle } from "../lib/artists";
import { SiteNav } from "../components/site-nav";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Augmented Reality Visitor Activity | ${exhibitionTitle}` },
    {
      name: "description",
      content: "Augmented Reality Visitor Activity page.",
    },
  ];
}

export default function AugmentedRealityVisitorActivity() {
  return (
    <main className="site-shell">
      <SiteNav title={exhibitionTitle} />

      <header className="hero">
        <h1>Augmented Reality Visitor Activity</h1>
      </header>
    </main>
  );
}
