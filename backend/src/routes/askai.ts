import { Router } from "express";
import * as AiController from "../controllers/askai";

const router = Router();

router.post("/", AiController.answerQuestion);
router.get("/historyChat/:slug", AiController.reloadChat);

export default router;
