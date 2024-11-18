import { serve } from "@hono/node-server";
import { app } from "./app";

serve({
  fetch: app.fetch,
  port: 3000,
}).addListener("listening", () => {
  console.log(`Server running on port ${3000}`);
});
