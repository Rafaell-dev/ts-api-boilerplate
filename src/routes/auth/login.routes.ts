import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { LoginController } from "../../controllers/auth/login.controller";

const login = Router();

login.post("/", asyncHandler(LoginController.manipular));

export { login };
