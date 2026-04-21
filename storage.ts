import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;
import * as schema from "../shared/schema.js";
import { eq, like, or, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import type { InsertScheme, InsertService, InsertGrievance, InsertAnnouncement } from "../shared/schema.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

export const storage = {
  // Schemes
  async getSchemes(category?: string, search?: string) {
    const all = await db.select().from(schema.schemes).where(eq(schema.schemes.isActive, true)).orderBy(desc(schema.schemes.createdAt));
    return all.filter(s => {
      const matchCat = category ? s.category === category : true;
      const matchSearch = search ? (
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
      ) : true;
      return matchCat && matchSearch;
    });
  },
  async getSchemeById(id: number) {
    const [scheme] = await db.select().from(schema.schemes).where(eq(schema.schemes.id, id));
    return scheme;
  },
  async createScheme(data: InsertScheme) {
    const [scheme] = await db.insert(schema.schemes).values(data).returning();
    return scheme;
  },

  // Services
  async getServices(type?: string, district?: string) {
    const all = await db.select().from(schema.services).orderBy(desc(schema.services.createdAt));
    return all.filter(s => {
      const matchType = type ? s.type === type : true;
      const matchDistrict = district ? s.district.toLowerCase().includes(district.toLowerCase()) : true;
      return matchType && matchDistrict;
    });
  },
  async createService(data: InsertService) {
    const [service] = await db.insert(schema.services).values(data).returning();
    return service;
  },

  // Grievances
  async createGrievance(data: InsertGrievance) {
    const ticketId = `GS-${nanoid(8).toUpperCase()}`;
    const [grievance] = await db.insert(schema.grievances).values({ ...data, ticketId }).returning();
    return grievance;
  },
  async getGrievanceByTicket(ticketId: string) {
    const [g] = await db.select().from(schema.grievances).where(eq(schema.grievances.ticketId, ticketId));
    return g;
  },
  async getAllGrievances() {
    return db.select().from(schema.grievances).orderBy(desc(schema.grievances.createdAt));
  },
  async updateGrievanceStatus(id: number, status: string, adminNotes?: string) {
    const [g] = await db.update(schema.grievances)
      .set({ status, adminNotes, updatedAt: new Date() })
      .where(eq(schema.grievances.id, id))
      .returning();
    return g;
  },

  // Announcements
  async getAnnouncements() {
    return db.select().from(schema.announcements).orderBy(desc(schema.announcements.createdAt));
  },
  async createAnnouncement(data: InsertAnnouncement) {
    const [a] = await db.insert(schema.announcements).values(data).returning();
    return a;
  },

  // Seed demo data
  async seedIfEmpty() {
    const existing = await db.select().from(schema.schemes);
    if (existing.length > 0) return;

    await db.insert(schema.schemes).values([
      { name: "PM Kisan Samman Nidhi", nameHindi: "पीएम किसान सम्मान निधि", nameTelugu: "పీఎం కిసాన్ సమ్మాన్ నిధి", category: "agriculture", description: "Income support of ₹6,000/year to small and marginal farmers in three equal instalments.", descriptionHindi: "छोटे और सीमांत किसानों को तीन समान किस्तों में ₹6,000/वर्ष की आय सहायता।", descriptionTelugu: "చిన్న మరియు సన్నకారు రైతులకు మూడు సమాన వాయిదాలలో సంవత్సరానికి ₹6,000 ఆదాయ మద్దతు.", eligibility: "Small and marginal farmers with landholding up to 2 hectares", benefits: "₹6,000 per year direct bank transfer in 3 instalments of ₹2,000", documents: "Aadhaar card, Land records, Bank account details", applyLink: "https://pmkisan.gov.in" },
      { name: "Ayushman Bharat PM-JAY", nameHindi: "आयुष्मान भारत पीएम-जेएवाई", nameTelugu: "ఆయుష్మాన్ భారత్ పీఎం-జేఏవై", category: "health", description: "Health insurance cover of ₹5 lakh per family per year for secondary and tertiary hospitalization.", eligibility: "Economically weaker sections as per SECC database", benefits: "₹5 lakh health cover per family per year at empanelled hospitals", documents: "Aadhaar card, Ration card, SECC eligibility proof", applyLink: "https://pmjay.gov.in" },
      { name: "PM Awas Yojana (Gramin)", nameHindi: "पीएम आवास योजना (ग्रामीण)", nameTelugu: "పీఎం ఆవాస్ యోజన (గ్రామీణ్)", category: "housing", description: "Financial assistance for construction of pucca houses to homeless and kutcha house owners in rural areas.", eligibility: "Houseless or one/two room kutcha house owners without a pucca house", benefits: "₹1.20 lakh (plain areas) or ₹1.30 lakh (hilly areas) for house construction", documents: "Aadhaar card, BPL certificate, Bank account, Land documents", applyLink: "https://pmayg.nic.in" },
      { name: "Mahatma Gandhi NREGA", nameHindi: "महात्मा गांधी नरेगा", nameTelugu: "మహాత్మా గాంధీ నరేగా", category: "employment", description: "Guarantees 100 days of wage employment per year to rural households whose adult members volunteer to do unskilled manual work.", eligibility: "Adult members of rural household willing to do unskilled manual work", benefits: "100 days of guaranteed employment per year at minimum wages", documents: "Aadhaar card, Ration card, Bank account, Job card application", applyLink: "https://nrega.nic.in" },
      { name: "Mid Day Meal Scheme", nameHindi: "मिड डे मील योजना", nameTelugu: "మిడ్ డే మీల్ స్కీమ్", category: "education", description: "Provides free lunch to children studying in government and government-aided primary and upper primary schools.", eligibility: "Children enrolled in Class 1-8 in government/aided schools", benefits: "Free nutritious midday meal on every school working day", documents: "School enrollment proof", applyLink: "https://schooleducation.gov.in" },
    ]);

    await db.insert(schema.announcements).values([
      { title: "Kharif Crop Registration Open", titleHindi: "खरीफ फसल पंजीकरण खुला", titleTelugu: "ఖరీఫ్ పంట నమోదు తెరవబడింది", content: "Farmers are requested to register their Kharif crops at the nearest agriculture office before the deadline.", priority: "urgent" },
      { title: "Free Health Camp on Sunday", titleHindi: "रविवार को मुफ्त स्वास्थ्य शिविर", titleTelugu: "ఆదివారం ఉచిత ఆరోగ్య శిబిరం", content: "A free health checkup camp will be held at the village panchayat ground. All villagers are welcome.", priority: "important" },
      { title: "Gram Sabha Meeting Notice", titleHindi: "ग्राम सभा बैठक सूचना", titleTelugu: "గ్రామ సభ సమావేశ నోటీసు", content: "Monthly Gram Sabha meeting scheduled. All residents are requested to attend and raise local issues.", priority: "normal" },
    ]);

    await db.insert(schema.services).values([
      { name: "Primary Health Centre", type: "hospital", address: "Main Road, Near Bus Stand", village: "Rampur", district: "Guntur", state: "Andhra Pradesh", phone: "0863-XXXXXX", timings: "8am - 4pm (Mon-Sat)" },
      { name: "Gram Panchayat Office", type: "panchayat", address: "Village Centre", village: "Rampur", district: "Guntur", state: "Andhra Pradesh", phone: "0863-XXXXXX", timings: "9am - 5pm (Mon-Fri)" },
      { name: "Government Primary School", type: "school", address: "School Road", village: "Rampur", district: "Guntur", state: "Andhra Pradesh", phone: "0863-XXXXXX", timings: "8am - 2pm (Mon-Sat)" },
      { name: "India Post Bank", type: "bank", address: "Post Office Road", village: "Rampur", district: "Guntur", state: "Andhra Pradesh", phone: "0863-XXXXXX", timings: "9am - 3pm (Mon-Sat)" },
    ]);
  }
};
