import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes.js";
import { storage } from "./storage.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === "production";

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", router);

// Serve frontend in production
if (isProd) {
  const distPath = path.resolve(__dirname, "../dist/public");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, async () => {
  console.log(`🌾 GRAMSETU server running on port ${PORT}`);
  try {
    await storage.seedIfEmpty();
    console.log("✅ Database ready");
  } catch (e) {
    console.error("⚠️  DB seed failed:", e);
  }
});
