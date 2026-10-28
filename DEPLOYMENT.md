# 🚀 Website Live Deployment Guide (MERN Stack)

Yeh guide aapko Foodies Restaurant Website ko internet par **100% Free** live deploy karne ka step-by-step tareeqa batati hai.

---

## 📌 Architecture
- **Frontend (Client):** React + Vite (Deploy on **Vercel** ya **Netlify**)
- **Backend (Server):** Node.js + Express.js (Deploy on **Render.com**)
- **Database:** MongoDB Cloud (**MongoDB Atlas**)

---

## Step 1: MongoDB Atlas Setup (Free Cloud Database)

Kyunke local `127.0.0.1:27017` sirf aapke computer par chalta hai, live website ke liye free cloud database chahiye:

1. [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) par ja kar **Free Account** banayein.
2. **Create Deployment** -> Select **M0 (Free Cluster)** -> Create.
3. **Database Access** me ja kar ek user banayein (e.g. `admin` aur ek strong password).
4. **Network Access** me ja kar `Add IP Address` -> Select **"Allow Access from Anywhere" (`0.0.0.0/0`)** (Taake hosting server connect ho sake).
5. **Database** tab me ja kar **Connect** par click karein -> **Drivers** select karein.
6. Connection String copy karein:
   ```text
   mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/foodies_restaurant?retryWrites=true&w=majority
   ```
   *(Yahan `<username>` aur `<password>` ki jagah apna password daal dein).*

---

## Step 2: Backend Deploy Karna (Render.com par)

1. Apna project **GitHub** par push karein.
2. [render.com](https://render.com) par sign in karein.
3. Click karein **"New +"** -> **"Web Service"**.
4. Apna GitHub repository connect karein.
5. Yeh settings select karein:
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. **Environment Variables** me yeh add karein:
   - Key: `MONGO_URI`
   - Value: *(Aapka MongoDB Atlas connection string jo Step 1 me mila)*
7. **Deploy** par click karein.
8. Kuch seconds me aapka backend live ho jayega aur aapko ek live URL milega (jaise: `https://foodies-backend.onrender.com`).

---

## Step 3: Cloud Database me Menu Items Seed Karna

Database me 50 dishes upload karne ke liye:
- Render Dashboard me ja kar **Shell** open karein aur run karein:
  ```bash
  npm run seed
  ```
*(Ya aap apne computer par `server/.env` me MongoDB Atlas ka URI paste karke local terminal me `npm run seed` chala sakti hain, data cloud me upload ho jayega!)*

---

## Step 4: Frontend Deploy Karna (Vercel par)

1. [vercel.com](https://vercel.com) par sign in karein.
2. **"Add New Project"** par click karein aur apna GitHub repo select karein.
3. Settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `client`
4. **Environment Variables** add karein:
   - Key: `VITE_API_URL`
   - Value: `https://foodies-backend.onrender.com` *(Step 2 wala live backend URL)*
5. **Deploy** par click karein!

🎉 **Mubarak ho! Aapki restaurant website aur backend dono live chal rahe hain!**
