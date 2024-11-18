import { Hono } from "hono";
import { routes } from "./routes";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api");

app.use("*", cors());

app.route("", routes);

export { app };
