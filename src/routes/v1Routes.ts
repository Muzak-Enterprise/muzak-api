import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { JWT_SECRET } from "../constant";
import { authController } from "../controllers/authController";
import { userController } from "../controllers/userController";
import { loginValidator, registerValidator } from "../validators/authValidator";
import { patchUserValidator } from "../validators/userValidator";
import { genreController } from "../controllers/genreController";
import { instrumentController } from "../controllers/instrumentController";
import { groupController } from "../controllers/groupController";

const v1Routes = new Hono();

const authRoutes = new Hono();
authRoutes.post("/login", loginValidator, authController.login);
authRoutes.post("/register", registerValidator, authController.register);

const appRoutes = new Hono();
appRoutes.use("/*", jwt({ secret: JWT_SECRET }));

const usersRoutes = new Hono();
usersRoutes.get("/me", userController.getMe);
usersRoutes.get("/:id", userController.getUserById);
usersRoutes.patch("/:id", patchUserValidator, userController.patchUser);

const genresRoutes = new Hono();
genresRoutes.get("/", genreController.get);

const instrumentsRoutes = new Hono();
instrumentsRoutes.get("/", instrumentController.get);

const groupRoutes = new Hono();
groupRoutes.get("/", groupController.get);

appRoutes.route("/users", usersRoutes);
appRoutes.route("/genres", genresRoutes);
appRoutes.route("/instruments", instrumentsRoutes);
appRoutes.route("/groups", groupRoutes);

v1Routes.route("/auth", authRoutes);
v1Routes.route("/", appRoutes);

export { v1Routes };
