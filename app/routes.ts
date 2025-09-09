import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("/trade", "./routes/trade.tsx"),
] satisfies RouteConfig;
