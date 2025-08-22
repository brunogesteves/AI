import { Router } from "express";
import * as ProjectController from "../controllers/projects";

const router = Router();

router.get("/:id", ProjectController.getProjects);
router.get("/files/:id", ProjectController.getFiles);
router.get("/unique/:slug", ProjectController.getuniqueProject);
router.delete("/:id", ProjectController.deleteProject);
router.post("/:projectname", ProjectController.createProject);

export default router;
