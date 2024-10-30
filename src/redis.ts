import Redis from "ioredis";

export const redis = new Redis({
  host: "muzak-redis",
  port: 6379,
});
