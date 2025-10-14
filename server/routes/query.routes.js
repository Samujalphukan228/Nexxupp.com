import express from "express";
import { addQuery, getAllQueries } from "../controllers/query.Controller.js";
import { adminAuth } from "../middleware/admin.middleware.js";

const queryrouter = express.Router();
queryrouter.post("/add", addQuery);
queryrouter.get("/all", adminAuth, getAllQueries);
export default queryrouter;