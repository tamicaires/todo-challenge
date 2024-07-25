import { Router } from "express";
import userRouter from "./userRouter";
import taskRouter from "./taskRouter";

const router = Router();

router.use(userRouter);
router.use(taskRouter);

export default router;
