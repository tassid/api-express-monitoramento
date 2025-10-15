import { Router } from "express";
import phRouter from "../modules/ph/ph.routes.js";

const mainRouter = Router();

mainRouter.use("/ph", phRouter);

export default mainRouter;