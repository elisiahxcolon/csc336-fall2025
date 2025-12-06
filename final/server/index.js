import express from "express";
import cors from "cors";
import * as fs from "node:fs";
import * as path from "node:path";
const app = express();
const PORT = 3001;

const GIFTS_FILE = "gift.json";
const RSVPS_FILE = "rsvp.json";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const CLIENT_DIR = path.join(__dirname, 'client/dist');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

function readData(fileName) {
  try {
    const data = fs.readFileSync(fileName, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return []; 
    }
    throw err;
  }
}

function writeData(fileName, newData) {
  fs.writeFileSync(fileName, JSON.stringify(newData, null, 2));
}


app.get("/api/gifts", (req, res) => {
  try {
    const gifts = readData(GIFTS_FILE);
    res.json(gifts);
  } catch (err) {
    console.error("Error reading gifts:", err.message);
    res.status(500).json({ error: "Failed to read gifts" });
  }
});

app.post("/api/gifts", (req, res) => {
  try {
    const gifts = readData(GIFTS_FILE);
    const newGift = req.body;
    gifts.push(newGift);
    writeData(GIFTS_FILE, gifts);
    res.json(newGift);
  } catch (err) {
    console.error("Error saving gift:", err.message);
    res.status(500).json({ error: "Failed to save gift" });
  }
});

app.get("/api/rsvps", (req, res) => {
  try {
    const rsvps = readData(RSVPS_FILE);
    res.json(rsvps);
  } catch (err) {
    console.error("Error reading RSVPs:", err.message);
    res.status(500).json({ error: "Failed to read RSVPs" });
  }
});

app.post("/api/rsvps", (req, res) => {
  try {
    const rsvps = readData(RSVPS_FILE);
    const newRsvp = req.body;
    rsvps.push(newRsvp);
    writeData(RSVPS_FILE, rsvps);
    res.json(newRsvp);
  } catch (err) {
    console.error("Error saving RSVP:", err.message);
    res.status(500).json({ error: "Failed to save RSVP" });
  }
});


app.use((req, res) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(CLIENT_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});