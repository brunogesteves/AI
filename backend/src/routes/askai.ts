import { Router } from "express";
import * as AiController from "./controllers/askai";

const router = Router();

router.post("/", AiController.answerQuestion);

export default router;
