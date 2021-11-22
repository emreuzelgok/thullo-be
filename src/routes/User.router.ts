import { Router } from "express";
import { createUserHandler } from "../controllers/User.controller";
import { validateRequest } from "../middlewares";
import { createUserSchema } from "../schemas/User.schema";

const UserRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: Auto generated user id
 *        firstName:
 *          type: string
 *          description: The User firstname
 *          min: 3
 *          max: 50
 *        lastName:
 *          type: string
 *          description: The User lastname
 *          min: 3
 *          max: 50
 *        email:
 *          type: string
 *          description: The User email
 *        password:
 *          type: string
 *          description: The User password
 *        avatar:
 *          type: string
 *          description: The User avatar path
 *        bio:
 *          type: string
 *          description: The User biography
 *      required: 
 *        - firstName
 *        - lastName
 *        - email
 *        - password
 *       
 */
UserRouter.post('/', validateRequest(createUserSchema), createUserHandler);

export default UserRouter;