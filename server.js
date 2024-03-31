const express = require("express");
const cors = require("cors");
const { app, io, server } = require("./socket/socket");
const env = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 5000;

const connectDB = require("./config/connectDB");
connectDB(process.env.MONGO_URI);

const resetMongos_id = require("./config/resetMongos_id");
resetMongos_id();

const logger = require("./middleware/logger");

// const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("storage"));

app.use(logger);

// Testing route
app.get("/", (req, res) => {
  res.send("Hello From Merecato");
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/conversations", require("./routes/conversationRoues"));

const { errorHandler } = require("./middleware/errorMiddleware");

app.use(errorHandler);

server.listen(port, () =>
  console.log(`listening on port ${port}`.cyan.underline)
);
