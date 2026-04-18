# 🌐 GRAMSETU

A full-stack web application for community health management, patient tracking, and risk assessment.

---

## 🚀 Overview

Community Innoverse is designed to help manage and monitor patient data efficiently. It provides a modern interface for healthcare-related data handling along with scalable backend architecture.

---

## 🏗️ Architecture

This project follows a **full-stack architecture**:

* 🎨 **Frontend** → React (UI)
* ⚙️ **Backend** → Express (API server)
* 🔗 **Shared Layer** → Common schemas and validation
* 💾 **Database** → In-memory (currently), PostgreSQL-ready

---

## ✨ Features

* 📋 Patient Management (CRUD operations)
* 🔍 Health monitoring & tracking
* ⚡ Fast API with Express
* 🎯 Type-safe development using TypeScript
* 🔁 Real-time-like updates with modern state management
* 📦 Modular and scalable architecture

---

## 🛠️ Tech Stack

### Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Zustand
* TanStack Query
* Wouter (routing)

### Backend

* Express
* TypeScript
* Drizzle ORM
* Zod (validation)

### Database

* In-memory storage (current)
* PostgreSQL (ready for integration)

---

## 📂 Project Structure

```id="structure001"
Community-Innoverse/
│── client/        # React frontend
│── server/        # Express backend
│── shared/        # Shared schemas (Zod + Drizzle)
│── script/        # Build scripts
│── package.json   # Dependencies
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
### 2️⃣ Install dependencies

```bash id="install001"
npm install
```

---

### 3️⃣ Run development server

```bash id="dev001"
npm run dev
```

App will run at:
👉 http://localhost:5000

---

## 🏗️ Build for Production

```bash id="build001"
npm run build
npm start
```

---

## 🌍 Deployment

This project can be deployed on:

* Render (recommended)
* Railway
* Any Node.js hosting platform

---

## ⚠️ Limitations

* 💾 Uses in-memory storage (data resets on restart)
* 🔐 No authentication system yet

---

## 🔮 Future Improvements

* ☁️ PostgreSQL database integration
* 🔐 User authentication & authorization
* 📊 Advanced analytics dashboard
* 📱 Mobile responsiveness improvements

---

## 👨‍💻 Author

**Achu**
Full Stack & AI/ML Developer

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
