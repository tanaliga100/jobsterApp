"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth-controller");
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication-middleware"));
const router = express_1.default.Router();
router.route("/register").post(auth_controller_1.REGISTER);
router.route("/login").post(auth_controller_1.LOGIN);
router.route("/updateUser").patch(authentication_middleware_1.default, auth_controller_1.UPDATE_USER);
exports.AuthRoute = router;
