

# 📚 Peer-to-Peer Book Exchange Portal

A full-stack web application that connects **Book Owners** and **Book Seekers** to facilitate book sharing, rentals, or exchanges.

---
The backend code resides in the [`backend` branch](https://github.com/rohit2k3/P2P-Book-Exchange-Portal/tree/backend) of this repository.
---
## 🎯 Objective

Create a mini full-stack web app that allows:
- 📖 **Book Owners** to list books they want to rent or give away
- 🔍 **Book Seekers** to browse and find books to rent or exchange

---

> 🧠 Built with the assistance of AI tools: **GitHub Copilot** and **DeepSeek**.

## 🚀 Features Implemented

### 👤 User Profiles (Owners & Seekers)
- Two user roles: `Owner` and `Seeker`
- Fields included:
  - Name
  - Mobile Number
  - Email
  - Password (basic validation)
  - Role selection
- Data stored in-memory or JSON file

### 📘 Book Listing Interface
- Only Owners can add book listings
- Listing fields:
  - Title
  - Author
  - Genre (optional)
  - City/Location
  - Contact Email/Phone
- Anyone (Owner or Seeker) can:
  - Browse all listings
  - View book info: title, author, owner, location

### 🔐 Authentication (Mock)
- Simple login using Email + Password
- Validates credentials against stored users
- Redirects to role-specific dashboards

---

## ✨ Bonus Features

- ✅ Edit and delete your own book listings
- ✅ Filter listings by:
  - Genre
  - Location
- ✅ Book cover image upload (stored via Cloudinary)
- ✅ Deployed frontend on **Vercel**
- ✅ Deployed backend on **Render**
- ✅ Used AI development tools

---

## 🛠️ Tech Stack

| Layer      | Stack                     |
|------------|---------------------------|
| Frontend   | Next.js                   |
| Backend    | Node.js + Express         |
| Storage    | MongoDB                   |
| Deployment | Vercel (Frontend)         |
|            | Render (Backend)          |
| Auth       | Basic Email + Password    |

---

## 🔗 Deployment Links

The frontend is deployed on **[Vercel](https://vercel.com)**.  
The backend is deployed on **[Render](https://render.com)**.

- 🌐 **Live Frontend**: [https://p2-p-book-exchange-portal.vercel.app](https://p2-p-book-exchange-portal.vercel.app)
- 🔗 **Backend Health Check**: [https://p2p-book-exchange-portal.onrender.com/health](https://p2p-book-exchange-portal.onrender.com/health)

---


## Getting Started with setup at local

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


