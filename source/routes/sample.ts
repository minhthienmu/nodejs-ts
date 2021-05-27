import { Router } from "express";
import controller from "../controllers/sample";

const router = Router();

router.get("/getInfo", controller.getInfo);
router.get("/country", controller.getCountryInfo);

export = router;
