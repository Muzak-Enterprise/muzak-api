import { Hono } from "hono";
import redis from "../redis";
import v1Routes from "./v1Routes";

const routes = new Hono();

routes.get("/up", async (c) =>  c.json({ message: "API is up" }, 200));

routes.get("/up/redis", async (c) => {
  if (await redis.get("is_redis_up")) {
    return c.json(
      {
        redis: "up",
        cache: "loaded",
      },
      200
    );
  }

  await redis.set("is_redis_up", "up");

  return c.json(
    {
      redis: "up",
      cache: "set",
    },
    201
  );
});

routes.route("/v1", v1Routes);

export default routes;
