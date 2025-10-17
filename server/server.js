import dotenv from "dotenv";
dotenv.config();


import express from "express";
import chalk from "chalk";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./configs/db.config.js";
import priceRoutes from "./routes/price.routes.js";
import adminRouter from "./routes/admin.routes.js";
import queryrouter from "./routes/query.routes.js";
import projectRouter from "./routes/project.routes.js";


const app = express();
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/price', priceRoutes);
app.use('/api/query', queryrouter);
app.use('/api/project', projectRouter);

app.get('/', (req, res) => {
  res.json({ message: "Server is working!" });
});


// Start server
app.listen(port, () => {
  console.log(
    chalk.white.bold.bgGreen(' 🚀 SERVER RUNNING ') +
    ' ' +
    chalk.black.bold.bgCyan(` http://localhost:${port} `)
  );
});      