import { Router } from "express";
import * as UserController from "../controllers/users";

const router = Router();

router.post("/", UserController.createUser);
router.post("/:email/:password", UserController.loginUser);
router.put("/", UserController.updateUser);

export default router;
