import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

mongoose.connect(process.env.MONGO_URL).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB Error:", err));

const itemSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  coverImage: String,
  images: [String],
});

const Item = mongoose.model("Item", itemSchema);

// POST /api/items
app.post('/api/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json({ message: "Item added", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/items
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// GET /api/items/:id
app.get('/api/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

app.post("/api/enquire", async (req, res) => {
  const { name, type, description } = req.body;

  if (!name || !type || !description) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Item Enquiry - ${name}`,
      html: `
        <h2>New Enquiry Received</h2>
        <p><strong>Item Name:</strong> ${name}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Description:</strong> ${description}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ message: "Failed to send email" });
  }
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
