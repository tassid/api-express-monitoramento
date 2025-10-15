import express from "express";
import connectDB from "./config/database.js";
import mainRouter from "./routes/index.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRouter);

const startServer = async () => {
    try {
        await connectDB();
        
        app.listen(PORT, () => {
            console.log(`Server is Successfully Running on port ${PORT}`);
            console.log(`API available at http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error("Error occurred, server can't start:", error);
        process.exit(1);
    }
};

startServer();