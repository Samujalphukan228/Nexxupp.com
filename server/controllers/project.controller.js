import projectModel from "../models/projects.model.js";
import cloudinary from "../configs/cloudinary.config.js";
import streamifier from "streamifier";

// Function to create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, category, link } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload to Cloudinary using a stream
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "projects" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);

    const project = await projectModel.create({
      title,
      description,
      category,
      image: result.secure_url,
      link
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//func to list all the projects 
export const listProjects = async (req, res) => {
    try {

        const projects = await projectModel.find({});
        res.json({success:true,projects})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//function for remove projects
export const removeProjects = async (req,res) => {

    try {

        await projectModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Project Remove"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}

//function for single projects info
export const singleProject = async (req, res) => {
    try {
        const {id} = req.body;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required"
            });
        }
        
        const project = await projectModel.findById(id);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }
        
        res.json({success: true, project});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
