import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { exhibitionTitle } from "../lib/artists";
import { SiteNav } from "../components/site-nav";

import { SiteNav } from "../components/site-nav";
import { SITE_TITLE } from "../lib/site-metadata";
import type { Route } from "./+types/scan";

// Deprecated route: visitors now scan QR codes with the device camera app.
export function meta({}: Route.MetaArgs) {
  return [
    { title: SITE_TITLE },
    {
      name: "description",
      content: "Scanning now happens through the device camera app.",
    },
  ];
}

export default function Scan() {
  return (
    <main className="site-shell">
      <SiteNav title={exhibitionTitle} showLogo />

      <section className="panel panel-strong">
        <p className="eyebrow">Native Camera Flow</p>
        <h1>Use Your Phone Camera To Scan</h1>
        <p>
          This website no longer scans QR codes in-app. Open your device camera,
          scan the exhibition code, and you will be taken directly to the
          artwork page.
        </p>
        <Link to="/" className="action action-primary">
          Return Home
        </Link>
      </section>
    </main>
  );
}
