import { Hono } from "hono";

const authRoutes = new Hono();

authRoutes.post("/login", async (c) => {
  return c.json({}, 500);
});

authRoutes.post("/register", async (c) => {
  return c.json({}, 500);
});

export default authRoutes;
