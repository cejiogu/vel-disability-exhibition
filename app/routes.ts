import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("upload", "routes/upload.tsx"),
  route("contribute", "routes/contribute.tsx"),
  route("artwork/:id", "routes/artwork.tsx"),
  // Deprecated: scanning now happens through the device camera app, not in-app.
  route("scan", "routes/scan.tsx"),
] satisfies RouteConfig;
