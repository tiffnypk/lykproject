import express from "express";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import messagesRoutes from "./routes/messagesRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/messages", messagesRoutes);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
