import { Router } from "express";
import phRouter from "../modules/ph/ph.routes.js";
import temperatureRouter from "../modules/temperature/temperature.routes.js";
import turbidityRouter from "../modules/turbidity/turbidity.routes.js";

const mainRouter = Router();

mainRouter.use("/ph", phRouter);
mainRouter.use("/temperature", temperatureRouter);
mainRouter.use("/turbidity", turbidityRouter);

export default mainRouter;