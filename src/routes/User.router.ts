import { Router } from "express";
import { createUserHandler } from "../controllers/User.controller";
import { validateRequest } from "../middlewares";
import { createUserSchema } from "../schemas/User.schema";

const UserRouter = Router();

UserRouter.post('/', validateRequest(createUserSchema), createUserHandler);

export default UserRouter;