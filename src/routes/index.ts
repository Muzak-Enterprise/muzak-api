import { Hono } from "hono";
import { v1Routes } from "./v1Routes";

const routes = new Hono();

routes.get("/up", async (c) => c.json({ message: "API is up" }, 200));

routes.route("/v1", v1Routes);

export { routes };
