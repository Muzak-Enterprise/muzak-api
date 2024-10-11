import { serve } from "@hono/node-server";
import { Hono } from "hono";
import Redis from "ioredis";

const app = new Hono();

const redis = new Redis({
  host: "muzak-redis",
  port: 6379,
});

app.get("/up", async (c) => {
  if (await redis.get("is_redis_up")) {
    return c.text("The API with redis cache is up, and the cache is loaded");
  }

  await redis.set("is_redis_up", "up");

  return c.text("The API with redis cache is up, and the cache is set\nReload to a change");
});

const PORT = 3000;

serve({
  fetch: app.fetch,
  port: PORT,
}).addListener("listening", () => {
  console.log(`Server running on port ${PORT}`);
});
