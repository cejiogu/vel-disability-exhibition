import { SiteNav } from "../components/site-nav";
import { AdjustableTextSection } from "../components/adjustable-text-section";
import { visitorActivity } from "../content/exhibition-content";
import { SITE_TITLE } from "../lib/site-metadata";
import type { Route } from "./+types/activity";

export function meta({}: Route.MetaArgs) {
  return [
    { title: SITE_TITLE },
    {
      name: "description",
      content: "Home for Anita's augmented reality drawing experience.",
    },
  ];
}

export default function Activity() {
  return (
    <main className="site-shell">
      <SiteNav />

      <section className="panel panel-strong">
        <p className="eyebrow">Visitor Activity</p>
        <h1>{visitorActivity.subtitle}</h1>
        <p>{visitorActivity.description}</p>
      </section>

      <section className="panel activity-placeholder">
        <div className="activity-stage">
          <p>The interactive drawing experience will be placed here.</p>
        </div>
      </section>

      <AdjustableTextSection title={visitorActivity.title}>
        <div className="transcript-body">
          {visitorActivity.instructions.map((instruction) => (
            <p key={instruction}>{instruction}</p>
          ))}
        </div>
      </AdjustableTextSection>
    </main>
  );
}
