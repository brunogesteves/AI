import { Router } from "express";

import Users from "./users";
import Projects from "./projects";
import Askai from "./askai";

const router = Router();

router.use("/users", Users);
router.use("/projects", Projects);
router.use("/askai", Askai);

export default router;
