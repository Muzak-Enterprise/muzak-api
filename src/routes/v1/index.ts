import { Hono } from "hono";
import authRoutes from "./authRoutes";

const v1Routes = new Hono();

v1Routes.route("/auth", authRoutes);

v1Routes.get("/test", async (c) => {
  return c.json({}, 500);
});

export default v1Routes;
