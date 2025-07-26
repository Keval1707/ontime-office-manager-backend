const express = require("express");
const dotenv = require("dotenv");
const Routes = require("./routes/Router");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
