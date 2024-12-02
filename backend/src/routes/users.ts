import { Router } from "express";
import * as UserController from "./controllers/users";

const router = Router();

router.post("/", UserController.createUser);
// router.delete("/:id", UserController.remove);
// router.get("/", UserController.list);

export default router;
