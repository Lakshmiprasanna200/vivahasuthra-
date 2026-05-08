const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// File paths
const foodDataFile = path.join(__dirname, "foodData.json");
const mandapBookingsFile = path.join(__dirname, "mandapBookings.json");
const decorDataFile = path.join(__dirname, "decorData.json");
const photographyDataFile = path.join(__dirname, "photographyData.json");
const musicDataFile = path.join(__dirname, "musicData.json");

// Utility to read JSON
function readData(filePath) {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
  return [];
}

// Utility to save JSON
function saveData(filePath, newEntry) {
  const existingData = readData(filePath);
  existingData.push(newEntry);
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
}

// ------------------- POST Routes -------------------
app.post("/save-mandap", (req, res) => {
  const { mandapName, hallName, hallType, hallPrice, location, date } = req.body;
  if (!mandapName || !hallName || !date) {
    return res.status(400).json({ message: "Mandap, Hall, and Date are required." });
  }

  saveData(mandapBookingsFile, { mandapName, hallName, hallType, hallPrice, location, date, timestamp: new Date() });
  res.json({ message: "Mandap booking saved successfully!" });
});

app.post("/api/food", (req, res) => {
  saveData(foodDataFile, { ...req.body, timestamp: new Date() });
  res.json({ message: "Food selection saved successfully!" });
});

app.post("/api/decor", (req, res) => {
  saveData(decorDataFile, { ...req.body, timestamp: new Date() });
  res.json({ message: "Decor selections saved successfully!" });
});

app.post("/api/photography", (req, res) => {
  saveData(photographyDataFile, { ...req.body, timestamp: new Date() });
  res.json({ message: "Photography selections saved successfully!" });
});

app.post("/api/music", (req, res) => {
  saveData(musicDataFile, { ...req.body, timestamp: new Date() });
  res.json({ message: "Music selections saved successfully!" });
});

// ------------------- GET Routes -------------------
app.get("/api/mandap", (req, res) => {
  res.json(readData(mandapBookingsFile));
});

app.get("/api/food", (req, res) => {
  res.json(readData(foodDataFile));
});

app.get("/api/decor", (req, res) => {
  res.json(readData(decorDataFile));
});

app.get("/api/photography", (req, res) => {
  res.json(readData(photographyDataFile));
});

app.get("/api/music", (req, res) => {
  res.json(readData(musicDataFile));
});

// ------------------- Start Server -------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
