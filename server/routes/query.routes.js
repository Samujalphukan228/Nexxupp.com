import express from "express";
import { addQuery, getAllQueries, removeQueies } from "../controllers/query.Controller.js";
import { adminAuth } from "../middleware/admin.middleware.js";

const queryrouter = express.Router();
queryrouter.post("/add", addQuery);
queryrouter.get("/all", adminAuth, getAllQueries);
queryrouter.get("/remove", adminAuth, removeQueies);

export default queryrouter;