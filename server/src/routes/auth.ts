import { Router } from "express";
import { login, logout, register } from "../controllers/auth";

const router = Router();

router.get("/register", register);
router.get("/login", login);
router.post("/logout", logout);

export default router;
