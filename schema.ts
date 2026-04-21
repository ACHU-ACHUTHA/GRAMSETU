import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Government Schemes
export const schemes = pgTable("schemes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameHindi: text("name_hindi"),
  nameTelugu: text("name_telugu"),
  category: text("category").notNull(), // agriculture, health, education, housing, employment
  description: text("description").notNull(),
  descriptionHindi: text("description_hindi"),
  descriptionTelugu: text("description_telugu"),
  eligibility: text("eligibility").notNull(),
  benefits: text("benefits").notNull(),
  documents: text("documents").notNull(),
  applyLink: text("apply_link"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Village Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameHindi: text("name_hindi"),
  nameTelugu: text("name_telugu"),
  type: text("type").notNull(), // hospital, school, bank, panchayat, water, electricity
  address: text("address").notNull(),
  village: text("village").notNull(),
  district: text("district").notNull(),
  state: text("state").notNull(),
  phone: text("phone"),
  timings: text("timings"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Grievances
export const grievances = pgTable("grievances", {
  id: serial("id").primaryKey(),
  ticketId: text("ticket_id").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  village: text("village").notNull(),
  district: text("district").notNull(),
  category: text("category").notNull(), // water, electricity, road, health, other
  description: text("description").notNull(),
  status: text("status").default("pending"), // pending, in_progress, resolved
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Announcements
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleHindi: text("title_hindi"),
  titleTelugu: text("title_telugu"),
  content: text("content").notNull(),
  contentHindi: text("content_hindi"),
  contentTelugu: text("content_telugu"),
  priority: text("priority").default("normal"), // normal, urgent, important
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas
export const insertSchemeSchema = createInsertSchema(schemes).omit({ id: true, createdAt: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true, createdAt: true });
export const insertGrievanceSchema = createInsertSchema(grievances).omit({ id: true, createdAt: true, updatedAt: true, status: true, adminNotes: true, ticketId: true });
export const insertAnnouncementSchema = createInsertSchema(announcements).omit({ id: true, createdAt: true });

export type Scheme = typeof schemes.$inferSelect;
export type InsertScheme = z.infer<typeof insertSchemeSchema>;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Grievance = typeof grievances.$inferSelect;
export type InsertGrievance = z.infer<typeof insertGrievanceSchema>;
export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;
