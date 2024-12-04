import { Router } from "express";
import * as UserController from "./controllers/users";

const router = Router();

router.post("/", UserController.createUser);
router.post("/:email/:password", UserController.loginUser);
// router.get("/", UserController.list);

export default router;
