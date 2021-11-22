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
 *          min: 8
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

/**
 * @swagger
 *  tags:
 *    name: Users
 *    description: Users api
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             firstName: John
 *             lastName: Doe
 *             email: john@doe.com
 *             password: ad12345678
 *     responses:
 *       201:
 *         description: The user successfully created
 *         content: 
 *           application/json:
 *             schema:
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       409:
 *         description: E-mail already in use.
 *      
 */

UserRouter.post('/', validateRequest(createUserSchema), createUserHandler);

export default UserRouter;