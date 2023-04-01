import express from "express";
import { LOGIN, REGISTER, UPDATE_USER } from "../controllers/auth-controller";
import authenticationMiddleware from "../middlewares/authentication-middleware";
const router = express.Router();

router.route("/register").post(REGISTER);
router.route("/login").post(LOGIN);
router.route("/updateUser").patch(authenticationMiddleware, UPDATE_USER);

export const AuthRoute = router;
