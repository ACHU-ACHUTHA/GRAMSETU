import { Router } from "express";
import { storage } from "./storage.js";
import { insertGrievanceSchema } from "../shared/schema.js";
import { ZodError } from "zod";

const router = Router();

// Schemes
router.get("/schemes", async (req, res) => {
  try {
    const { category, search } = req.query as { category?: string; search?: string };
    const data = await storage.getSchemes(category, search);
    res.json(data);
  } catch (e) { res.status(500).json({ error: "Failed to fetch schemes" }); }
});

router.get("/schemes/:id", async (req, res) => {
  try {
    const scheme = await storage.getSchemeById(Number(req.params.id));
    if (!scheme) return res.status(404).json({ error: "Scheme not found" });
    res.json(scheme);
  } catch (e) { res.status(500).json({ error: "Failed to fetch scheme" }); }
});

// Services
router.get("/services", async (req, res) => {
  try {
    const { type, district } = req.query as { type?: string; district?: string };
    const data = await storage.getServices(type, district);
    res.json(data);
  } catch (e) { res.status(500).json({ error: "Failed to fetch services" }); }
});

// Grievances
router.post("/grievances", async (req, res) => {
  try {
    const data = insertGrievanceSchema.parse(req.body);
    const grievance = await storage.createGrievance(data);
    res.status(201).json(grievance);
  } catch (e) {
    if (e instanceof ZodError) return res.status(400).json({ error: "Invalid data", details: e.errors });
    res.status(500).json({ error: "Failed to submit grievance" });
  }
});

router.get("/grievances/track/:ticketId", async (req, res) => {
  try {
    const g = await storage.getGrievanceByTicket(req.params.ticketId);
    if (!g) return res.status(404).json({ error: "Ticket not found" });
    res.json(g);
  } catch (e) { res.status(500).json({ error: "Failed to find grievance" }); }
});

// Admin grievance status update
router.patch("/grievances/:id/status", async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const g = await storage.updateGrievanceStatus(Number(req.params.id), status, adminNotes);
    res.json(g);
  } catch (e) { res.status(500).json({ error: "Failed to update grievance" }); }
});

// Admin all grievances
router.get("/admin/grievances", async (_req, res) => {
  try {
    const data = await storage.getAllGrievances();
    res.json(data);
  } catch (e) { res.status(500).json({ error: "Failed to fetch grievances" }); }
});

// Announcements
router.get("/announcements", async (_req, res) => {
  try {
    const data = await storage.getAnnouncements();
    res.json(data);
  } catch (e) { res.status(500).json({ error: "Failed to fetch announcements" }); }
});

export default router;
