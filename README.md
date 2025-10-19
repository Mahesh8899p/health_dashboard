#  Health Dashboard (MERN)

A modern personal health tracking dashboard built using the **MERN stack** with authentication, data analytics, and a 7-day **forecast AI feature** for health trends. Users can track daily **calories, workouts, sleep, and steps**, and visualize progress in an interactive dashboard.

---

## Features

 User authentication (JWT based)  
Track calories, workouts, sleep, and steps  
 Add daily health logs with notes  
 Date filter to view progress  

Modern UI with fully responsive layout  
Backend REST API  
Deployment-ready using Docker or Vercel  
 MongoDB Atlas database support  

---

## 🛠️ Tech Stack

| Layer        | Technology                         |
|--------------|-----------------------------------|
| Frontend     | React (Vite) + CSS                |
| Backend      | Node.js + Express.js              |
| Database     | MongoDB + Mongoose                |
| Auth         | JSON Web Token (JWT)             
| Deploy       | Docker / Vercel                   |

---


---

## How to Run Locally

### Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/health-dashboard.git
cd health-dashboard

2️⃣ Setup Backend
cd backend
npm install
Create a .env file inside backend:
PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=some_long_secret_key
CLIENT_ORIGIN=http://localhost:5173
Run backend:
npm start
3️⃣ Setup Frontend
cd ../frontend
npm install
Create .env file:
VITE_API_URL=http://localhost:5001
Run frontend:
npm run dev



