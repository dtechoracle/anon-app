const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/anonymous_messages", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Message = mongoose.model("Message", {
  text: String,
});

app.post("/api/messages", async (req, res) => {
  const { text } = req.body;
  const message = new Message({ text });

  try {
    await message.save();
    res.json({ success: true, message });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
