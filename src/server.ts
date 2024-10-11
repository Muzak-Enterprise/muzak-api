import { serve } from "@hono/node-server";
import { app, redis } from "./app";

app.get("/up", async (c) => {
  if (await redis.get("is_redis_up")) {
    return c.json(
      {
        api: "up",
        redis: "up",
        cache: "loaded",
      },
      200
    );
  }

  await redis.set("is_redis_up", "up");

  return c.json(
    {
      api: "up",
      redis: "up",
      cache: "set",
    },
    201
  );
});

const APP_PORT = 3000;

serve({
  fetch: app.fetch,
  port: APP_PORT,
}).addListener("listening", () => {
  console.log(`Server running on port ${APP_PORT}`);
});
