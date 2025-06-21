import { Router } from "express";
import { login } from "./login.routes";

const authRoutes = Router();

authRoutes.use("/login", login);

export { authRoutes };