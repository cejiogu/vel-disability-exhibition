import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("browse-artwork", "routes/browse-artwork.tsx"),
  route("augmented-reality-visitor-activity", "routes/augmented-reality-visitor-activity.tsx"),
  route("artists/:slug", "routes/artists.$slug.tsx"),
  route("upload", "routes/upload.tsx"),
  route("contribute", "routes/contribute.tsx"),
  route("artwork", "routes/artwork-index.tsx"),
  route("artwork/:id", "routes/artwork.tsx"),
  route("audio", "routes/audio-index.tsx"),
  route("audio/:slug", "routes/audio-stop.tsx"),
  route("activity", "routes/activity.tsx"),
  // Deprecated: scanning now happens through the device camera app, not in-app.
  route("scan", "routes/scan.tsx"),
] satisfies RouteConfig;
