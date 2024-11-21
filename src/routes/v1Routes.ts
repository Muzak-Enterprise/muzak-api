import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { JWT_SECRET } from "../constant";
import { authController } from "../controllers/authController";
import { genreController } from "../controllers/genreController";
import { groupController } from "../controllers/groupController";
import { instrumentController } from "../controllers/instrumentController";
import { userController } from "../controllers/userController";
import { loginValidator, registerValidator } from "../validators/authValidator";
import { getGroupsValidator } from "../validators/groupValidator";
import { patchUsersValidator } from "../validators/userValidator";
import { idParamValidator } from "../validators/validator";
import { addressController } from "../controllers/addressController";
import { reservationController } from "../controllers/reservationController";
import { postAddressValidator } from "../validators/addressValidator";
import { postReservationValidator } from "../validators/reservationValidator";
import { userGroupController } from "../controllers/userGroupController";
import { postUserGroupValidator } from "../validators/userGroupValidator";

const v1Routes = new Hono();

const authRoutes = new Hono();
authRoutes.post("/login", loginValidator, authController.login);
authRoutes.post("/register", registerValidator, authController.register);

const appRoutes = new Hono();
appRoutes.use("/*", jwt({ secret: JWT_SECRET }));

const usersRoutes = new Hono();
usersRoutes.get("/", userController.get);
usersRoutes.get("/me", userController.getMe);
usersRoutes.get("/:id", idParamValidator, userController.getUserById);
usersRoutes.patch(
  "/:id",
  idParamValidator,
  patchUsersValidator,
  userController.patchUser
);

const genresRoutes = new Hono();
genresRoutes.get("/", genreController.get);

const instrumentsRoutes = new Hono();
instrumentsRoutes.get("/", instrumentController.get);

const groupRoutes = new Hono();
groupRoutes.get("/", groupController.get);
groupRoutes.get("/:id", idParamValidator, groupController.getGroupById);
groupRoutes.post("/", getGroupsValidator, groupController.post);

const addressRoutes = new Hono();
addressRoutes.get("/", addressController.get);
addressRoutes.post("/", postAddressValidator, addressController.post);

const reservationRoutes = new Hono();
reservationRoutes.post(
  "/",
  postReservationValidator,
  reservationController.post
);
reservationRoutes.patch(
  "/:id/confirm",
  idParamValidator,
  reservationController.confirmReservation
);
reservationRoutes.patch(
  "/:id/cancel",
  idParamValidator,
  reservationController.cancelReservation
);

const userGroupsRoutes = new Hono();
userGroupsRoutes.post("/", postUserGroupValidator, userGroupController.post);

appRoutes.route("/users", usersRoutes);
appRoutes.route("/genres", genresRoutes);
appRoutes.route("/instruments", instrumentsRoutes);
appRoutes.route("/groups", groupRoutes);
appRoutes.route("/addresses", addressRoutes);
appRoutes.route("/reservations", reservationRoutes);
appRoutes.route("/user-groups", userGroupsRoutes);

v1Routes.route("/auth", authRoutes);
v1Routes.route("/", appRoutes);

export { v1Routes };
