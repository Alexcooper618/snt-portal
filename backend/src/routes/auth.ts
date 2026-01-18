import { Router } from "express";
import { registerSnt, login } from "../controllers/auth.controller";
import {
  validateLoginPayload,
  validateRegisterSntPayload,
} from "../middlewares/validate";

const router = Router();

// Создание СНТ + автоматическое создание председателя
router.post("/register-snt", validateRegisterSntPayload, registerSnt);

// Логин пользователя по номеру телефона
router.post("/login", validateLoginPayload, login);

export default router;
