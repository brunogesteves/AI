import { Router } from "express";
import * as FilesController from "../controllers/files";
import { upload } from "../utils/storage";

const router = Router();

router.post("/", upload.array("allFiles"), FilesController.saveFiles);

router.delete("/:id", FilesController.deleteFile);

export default router;
