import { Router } from "express";
import { validateUser, login, logout, register } from "../controllers/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/validateUser", validateUser);

export default router;
