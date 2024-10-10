import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Muzak!");
});

const PORT = 3000;

serve({
  fetch: app.fetch,
  port: PORT,
}).addListener("listening", () => {
  console.log(`Server running on port ${PORT}`);
});
