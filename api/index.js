import express from "express";
import itemRoutes from "./routes/items.js"
import salesRoutes from "./routes/sales.js"
import catagoriesRoutes from "./routes/categories.js"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors());
app.use(cookieParser());
app.use(express.json())

app.use("/items", itemRoutes)
app.use("/sales", salesRoutes)
app.use("/catagories", catagoriesRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});