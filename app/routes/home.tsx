import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Disability Exhibition Contribution Website" },
    {
      name: "description",
      content:
        "An accessible, low-glare homepage for contributing to the Disability Exhibition.",
    },
  ];
}

export default function Home() {
  return (
    <main className="site-shell">
      <header className="hero">
        <p className="eyebrow">Virtual Embodiment Lab</p>
        <h1>Disability Exhibition Contribution Website</h1>
        <p className="lede">
          Share stories, media, and reflections for an exhibition designed with
          readable contrast, reduced glare, and inclusive visual choices.
        </p>
        <div className="hero-actions">
          <a href="#contribute" className="action action-primary">
            Start A Contribution
          </a>
          <a href="#guidelines" className="action action-secondary">
            Read Accessibility Guidelines
          </a>
        </div>
      </header>

      <section id="guidelines" className="panel">
        <h2>Design Principles Used On This Page</h2>
        <ul>
          <li>
            Foreground and background use strong luminance contrast for easier
            reading.
          </li>
          <li>
            The background uses a soft cream tone to reduce harsh bright-glare
            effects.
          </li>
          <li>
            Color cues are paired with labels and shapes, not red-green alone.
          </li>
          <li>
            Warm highlight colors are reserved for interactive and physical
            object cues.
          </li>
        </ul>
      </section>

      <section className="grid-two">
        <article className="panel">
          <h3>Comfortable Reading Palette</h3>
          <p>
            Body text is dark slate on soft cream. Cards use very dark
            backgrounds with light text for users who prefer reduced brightness.
          </p>
          <div className="palette">
            <span className="chip chip-cream">Cream + Near Black</span>
            <span className="chip chip-gray">Gray + Off-White</span>
            <span className="chip chip-dark">Dark + Light Gray</span>
          </div>
        </article>
        <article className="panel">
          <h3>Object Visibility Colors</h3>
          <p>
            For edge markers, steps, and labeled controls, warm solid colors
            stand out on dark surfaces.
          </p>
          <div className="object-demos" aria-label="Object contrast examples">
            <span className="marker marker-yellow">Step Edge</span>
            <span className="marker marker-orange">Action Button</span>
            <span className="marker marker-red">Safety Label</span>
          </div>
        </article>
      </section>

      <section id="contribute" className="panel panel-strong">
        <h2>Contribute To The Exhibition</h2>
        <p>
          Submit lived-experience narratives, sensory notes, or media that
          supports disability-centered storytelling.
        </p>
        <form className="contribution-form" action="#" method="post">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" />

          <label htmlFor="contribution">Contribution Summary</label>
          <textarea id="contribution" name="contribution" rows={5} />

          <button type="submit" className="action action-primary">
            Submit Contribution
          </button>
        </form>
      </section>
    </main>
  );
}
