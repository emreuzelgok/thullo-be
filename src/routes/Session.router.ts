import { Router } from "express";
import { createSessionHandler, deleteSessionHandler, getSessionsHandler } from "../controllers/Session.controller";
import { validateRequest } from "../middlewares";
import isAuthorized from "../middlewares/isAuthorized";
import { createSessionSchema } from "../schemas/Session.schema";

const SessionRouter = Router();

/**
 * @swagger
 * components:
 *  securitySchemas:
 *    bearerAuth:
 *      type: http
 *      schema: bearer
 *      bearerFormat: JWT
 *  security:
 *    - bearerAuth: []
 *  schemas:
 *    SessionUser:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: The User email
 *        password:
 *          type: string
 *          description: The User password
 *          min: 8
 *      required:
 *        - email
 *        - password
 *    Session:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: The id of session
 *        user:
 *          type: string
 *          description: User id
 *        valid:
 *          type: boolean
 *        userAgent:
 *          type: string
 *        ip:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *   
 */

/**
 * @swagger
 *  tags:
 *    name: Sessions
 *    description: Sessions api
 */

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Create a Session
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SessionUser'
 *           example:
 *             email: john@doe.com
 *             password: ad12345678
 *     responses:
 *       201:
 *         description: The user successfully created
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 accesToken: 
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 user:
 *                  $ref: '#/components/schemas/User'
*/

SessionRouter.post('/', validateRequest(createSessionSchema), createSessionHandler);

/**
 * @swagger
 * /sessions:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a Session
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: The user successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Session'
 */

SessionRouter.get('/', isAuthorized, getSessionsHandler);

/**
 * @swagger
 * /sessions/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a Session
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The user successfully created
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 success:
 *                   type: boolean
 */

SessionRouter.delete('/:id', isAuthorized, deleteSessionHandler);

export default SessionRouter;
