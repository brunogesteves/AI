import { Router } from "express";

import Users from "./users";
import Projects from "./projects";
import Askai from "./askai";
import Files from "./files";

const router = Router();

router.use("/users", Users);
router.use("/project", Projects);
router.use("/askai", Askai);
router.use("/files", Files);

export default router;
