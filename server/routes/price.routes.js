import express from "express"
import {addPrice, getPrice, removePrice, singlePrice} from "../controllers/price.controller.js";
import { adminAuth } from "../middleware/admin.middleware.js";

const priceRoutes = express.Router()

priceRoutes.post('/add', adminAuth , addPrice)
priceRoutes.post('/remove', adminAuth ,removePrice)
priceRoutes.get('/all',getPrice)
priceRoutes.post('/single',singlePrice)

export default priceRoutes  