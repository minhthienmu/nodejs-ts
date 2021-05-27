import { Router } from "express";
import controller from "../controllers/api";

const router = Router();

// router.get("/data", (req, res) => {
//   res.json({ name: "Thien", age: 23 });
// });

router.get("/data", controller.checkAuth, controller.getData);
router.post("/login", controller.login);

export = router;
