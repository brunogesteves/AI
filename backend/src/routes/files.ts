import { Router } from "express";
import * as FilesController from "../controllers/files";
import { upload } from "../utils/storage";

const router = Router();

router.post("/", upload.single("file"), FilesController.saveFiles);
router.delete("/:id", FilesController.deleteFile);

export default router;
