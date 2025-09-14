# 📚Feedback Management System

A full-stack MERN (MongoDB, Express, React, Node.js) web application where:
	•	🧑‍🎓 Students can sign up, log in, view courses, enroll, submit feedback, and manage their own feedback.
	•	🛠️ Admins can manage users, courses, and feedbacks, block/unblock students, analyze trends, and export feedbacks as CSV.


# 🚀 Features

## Student
	•	Register & login with JWT authentication
	•	Update profile and change password
	•	View available courses and enroll
	•	Submit feedback for enrolled courses
	•	View and delete their feedback

## Admin
	•	Manage courses (add, delete)
	•	Manage students (block, unblock, delete)
	•	View all feedbacks with filters (by course, rating, student)
	•	Export feedback data to CSV
	•	View feedback trends & most popular courses


# ⚙️ Installation & Setup

## 1️⃣ Clone Repository
    git clone https://github.com/yourusername/feedback-app.git
    cd feedback-app
## 2️⃣ Backend Setup
    cd backend
    npm install
  ### Run Backend:
      npm run dev
  Frontend runs at: http://localhost:5173


# 🛢️ MongoDB Setup
#### 1.	Create a MongoDB Atlas Cluster: https://www.mongodb.com/atlas
#### 2.	Create a database called feedback_app.
#### 3.	Copy your connection string (example):
    mongodb+srv://<username>:<password>@cluster0.mongodb.net/feedback_app
#### 4.	Add this to your .env file (see below).
#### 5.	In Atlas, allow access from 0.0.0.0/0 (or your IP for security).

# 🔐 Example .env File
#### Create a .env file inside backend/:
    PORT=4000
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/feedback_app
    JWT_SECRET=supersecretkey123

    # Optional (if using Cloudinary for profile pictures)
    CLOUDINARY_CLOUD_NAME=yourcloudname
    CLOUDINARY_API_KEY=yourapikey
    CLOUDINARY_API_SECRET=yoursecret

    
# 🧪 Testing the App

### Student
  #### 1.	Go to frontend → http://localhost:5173/signup \n
  #### 2.	Create a new account (default role = student).
  #### 3.	Log in → access Dashboard, Profile, Feedback pages.
### Admin
  #### Option 1: Update a user’s role in MongoDB to admin.
    {
      "name": "Admin User",
      "email": "admin@example.com",
      "password": "<hashed_password>",
      "role": "admin"
    }
#### Option 2: Signup normally, then update role to "admin" via MongoDB Compass or Atlas.

# 🛠️ Scripts
## Backend
#### •	npm run dev → Run backend with nodemon
#### •	npm start → Run backend with node

# Frontend
#### •	npm run dev → Start frontend dev server
#### •	npm run build → Build frontend for production


# 📂 Project Structure
    feedback-app/
    │── backend/         # Express + MongoDB API
    │   ├── models/      # Mongoose schemas (User, Course, Feedback)
    │   ├── routes/      # Routes (auth, courses, feedback, admin)
    │   ├── controllers/ # Logic for each route
    │   ├── middlewares/ # JWT auth, admin check
    │   └── server.js    # Express app entry point
    │
    │── frontend/        # React + Vite frontend
    │   ├── src/
    │   │   ├── pages/   # Pages (Dashboard, Profile, Feedback, Admin, etc.)
    │   │   ├── components/ # Shared components (Navbar, PrivateRoute, etc.)
    │   │   └── api/     # Axios API calls
    │   └── index.html
    │
    │── README.md
    │── .gitignore


# 👨‍💻 Author
Built with ❤️ by Riham Hussain
