# BlogSphere - Making Blogging Website

A full-stack blogging website where users can create an account, log in, create blogs, read blogs, edit their own blogs, and delete blogs.

## 🚀 Features

* User Registration
* User Login
* JWT Authentication
* Create Blog
* View All Blogs
* View Single Blog
* Edit Own Blog
* Delete Own Blog
* Blog Search
* Like Blog
* Bookmark Blog
* Share Blog
* Copy Blog Link
* Comment Section
* Reading Progress Bar
* Back to Top Button
* Responsive User Interface

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

## 📁 Project Structure

```text
Making-Blogging-Website/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── package.json
│   └── server.js
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Create Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Start Backend Server

```bash
npm run dev
```

### 5. Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 6. Start Frontend

```bash
npm run dev
```

## 🔐 Authentication

The application uses JWT authentication for secure user login and protected operations.

Users can:

* Register a new account
* Log in securely
* Access protected features
* Create and manage their own blogs
* Edit their own blogs
* Delete their own blogs

## 📝 Blog Features

Users can:

* Create a new blog
* View all available blogs
* Search blogs by title
* Read complete blog details
* See author information
* See blog creation date
* See estimated reading time
* Edit their own blogs
* Delete their own blogs

## 💡 Additional Features

* Like and unlike blogs
* Save blogs using bookmarks
* Share blogs
* Copy blog links
* Add comments
* Track reading progress
* Scroll back to the top easily

## 👨‍💻 Author

**Aniket Khalate**

B.Tech - Information Technology

## 📌 Project

This project was created as a Full Stack Development project for learning and academic purposes.
