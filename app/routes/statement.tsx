import { SiteNav } from "../components/site-nav";
import { AdjustableTextSection } from "../components/adjustable-text-section";
import { exhibitionStatement } from "../content/exhibition-content";
import type { Route } from "./+types/statement";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Exhibition Statement | Disability Exhibition" },
    {
      name: "description",
      content: "Read the exhibition statement and curatorial framing.",
    },
  ];
}

export default function Statement() {
  return (
    <main className="site-shell">
      <SiteNav />

      <section className="panel panel-strong">
        <p className="eyebrow">Curatorial Text</p>
        <h1>{exhibitionStatement.title}</h1>
        <p>{exhibitionStatement.intro}</p>
      </section>

      <AdjustableTextSection title="Exhibition Statement">
        <div className="transcript-body">
          {exhibitionStatement.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </AdjustableTextSection>
    </main>
  );
}
