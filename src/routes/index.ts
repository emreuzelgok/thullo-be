import { Application } from "express";
import UserRouter from "./User.router";

const API_BASE = '/api/v1';

export default function setupRoutes(app: Application) {
  // Users
  app.use(`${API_BASE}/users`, UserRouter)
}