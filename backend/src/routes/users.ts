import { Router } from "express";
import * as UserController from "../controllers/users";

const router = Router();

router.post("/", UserController.createUser);
router.put("/", UserController.updateUser);
router.post("/:email/:password", UserController.loginUser);

export default router;
