import Redis from "ioredis";

const redis = new Redis({
  host: "muzak-redis",
  port: 6379,
});

export default redis;
