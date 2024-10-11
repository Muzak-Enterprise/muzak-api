import { Hono } from "hono";
import Redis from "ioredis";
import v1Routes from "./routes/v1";

const redis = new Redis({
  host: "muzak-redis",
  port: 6379,
});

const app = new Hono().basePath("/api");

app.route("/v1", v1Routes);

export { redis, app };
