import express from 'express'
import {createProject, listProjects, removeProjects, singleProject } from "../controllers/project.controller.js"
import upload from '../middleware/multer.middleware.js'
import { adminAuth } from '../middleware/admin.middleware.js'

const projectRouter = express.Router()

projectRouter.post('/add', adminAuth, upload.single('image'), createProject);
projectRouter.post('/all', listProjects)
projectRouter.post('/remove', adminAuth, removeProjects);

projectRouter.post('/single/', singleProject)

export default projectRouter
