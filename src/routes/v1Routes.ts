import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { JWT_SECRET } from "../constant";
import { authController } from "../controllers/authController";
import { userController } from "../controllers/userController";
import { loginValidator, registerValidator } from "../validators/authValidator";

const v1Routes = new Hono();

const authRoutes = new Hono();

authRoutes.post("/login", loginValidator, authController.login);
authRoutes.post("/register", registerValidator, authController.register);

const appRoutes = new Hono();
appRoutes.use("/*", jwt({ secret: JWT_SECRET }));

const usersRoutes = new Hono();

usersRoutes.get("/:id", userController.getUserById);

appRoutes.route("/users", usersRoutes);

v1Routes.route("/auth", authRoutes);
v1Routes.route("", appRoutes);

export { v1Routes };
