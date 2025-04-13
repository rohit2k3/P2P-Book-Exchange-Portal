# 📦 P2P Book Exchange - Backend

This is the backend API for the **Peer-to-Peer Book Exchange Portal**, built using **Node.js**, **Express.js**, and **MongoDB**. It handles user authentication, book listings, filtering, and more for both book owners and seekers.

---

## 🚀 Features

- User registration with roles: Owner & Seeker
- Basic login using email and password
- Add/edit/delete book listings (Owner only)
- Browse all listings
- Filter books by genre and location
- Mark listings as "Rented" or "Exchanged"
- Upload book cover images (Cloudinary integration)
- MongoDB-based persistent data storage

---

## 🛠️ Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose**
- **Cloudinary** (optional - image uploads)
- **Dotenv** (for environment variables)
- **CORS**, **body-parser**, **uuid**

---

## Getting Started with setup at local

### 1. Clone the repository

```bash
git clone https://github.com/rohit2k3/P2P-Book-Exchange-Portal.git
cd P2P-Book-Exchange-Portal
```
### 2. Clone the repositoryFirst, run the development server:

```bash

npm install

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


