import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("upload", "routes/upload.tsx"),
  route("contribute", "routes/contribute.tsx"),
  route("scan", "routes/scan.tsx"),
  route("template", "routes/template.tsx"),
] satisfies RouteConfig;
