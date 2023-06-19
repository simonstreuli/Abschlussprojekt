const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require("cors");

dotenv.config();

// Erlaubt Zugriff von localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// Database connection
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
