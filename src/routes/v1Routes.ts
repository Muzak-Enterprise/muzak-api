import { Hono } from "hono";
import { login, register } from "../controllers/authController";
import { loginValidator, registerValidator } from "../validators/authValidator";

const v1Routes = new Hono();

v1Routes.post("/auth/login", loginValidator, login);
v1Routes.post("/auth/register", registerValidator, register);

export default v1Routes;
