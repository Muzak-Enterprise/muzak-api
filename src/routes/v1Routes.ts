import { Hono } from "hono";
import authRoutes from "./v1/authRoutes";

const v1Routes = new Hono();

v1Routes.route("/auth", authRoutes);

export default v1Routes;
