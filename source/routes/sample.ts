import { Router } from "express";
import controller from "../controllers/sample";

const router = Router();

router.get("/ping", controller.sampleHealthCheck);
router.get("/country", controller.getCountryInfo);

export = router;
