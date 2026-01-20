# <img src="./public/banner.png" alt="StudyNotion Banner" width="100%">

<div align="center">

# StudyNotion - An EdTech Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)

StudyNotion is a modern, full-stack EdTech platform built with the MERN stack. It provides a seamless experience for students to learn and instructors to teach, featuring a robust course management system, progress tracking, and interactive learning experiences.

[Explore Features](#key-features) • [Getting Started](#getting-started) • [Tech Stack](#tech-stack) • [License](#license)

</div>

---

## Key Features

### For Students
- **Course Catalog**: Browse through a wide variety of courses with category-based filtering.
- **Learning Dashboard**: Track your progress, view enrolled courses, and manage your wishlist.
- **Interactive Lessons**: High-quality video lectures with progress tracking.
- **Ratings & Reviews**: Share your feedback and see what others think about the courses.

### For Instructors
- **Course Builder**: Create and manage detailed courses with multi-level sections and subsections.
- **Media Management**: Upload thumbnails and video lectures seamlessly via Cloudinary.
- **Analytics**: Gain insights into your courses and student engagement.
- **Draft/Publish**: Control the visibility of your courses at every step.

---

## Tech Stack

### Frontend
- **Framework**: React 18
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Animations/UI**: Swiper, SweetAlert2, Framer Motion (where applicable)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT & OTP (Email verification)
- **Email Service**: Google Cloud Console/OAuth integration
- **Media Storage**: Cloudinary

---

## Project Structure

```bash
studynotion/
├── src/                # React Frontend
│   ├── components/     # Reusable UI components (Auth, Catalog, Dashboard, etc.)
│   ├── pages/          # Page-level components and routes
│   ├── Services/       # API integration layer
│   └── Slices/         # Redux state management
├── server/             # Node.js/Express Backend
│   ├── Controllers/    # Business logic for routes
│   ├── Models/         # Mongoose schemas
│   ├── Routes/         # API endpoint definitions
│   └── Utils/          # Helper functions (Image upload, Mail)
└── public/             # Static assets
```

---

## Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **MongoDB**: Local instance or Atlas URI
- **Cloudinary**: Account for media storage
- **Razorpay**: Account for payment integration (Demo mode supported)

### Environment Variables
Create a `.env` file in the `server` directory with the following:

| Variable | Description |
| :--- | :--- |
| `PORT` | Backend port (default 4000) |
| `MONGODB_URL` | Your MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `CLOUD_NAME` | Cloudinary Cloud Name |
| `API_KEY` | Cloudinary API Key |
| `API_SECRET` | Cloudinary API Secret |
| `RAZORPAY_KEY` | Razorpay Key ID |
| `RAZORPAY_SECRET` | Razorpay Key Secret |

### Installation

1. **Clone the repository**
2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```
3. **Install Backend Dependencies**
   ```bash
   cd server && npm install
   ```
4. **Run the Application**
   ```bash
   npm run dev
   ```

---

## API Endpoints

- **Auth**: `/studyNotion/auth` (Login, Signup, OTP)
- **Courses**: `/studyNotion/Courseroutes` (Create, Read, Update, Delete)
- **Structure**: `/studyNotion/sectionandsubsection` (Manage content)
- **Profile**: `/studyNotion/profile` (User settings)

---

## Deployment

The application is configured for deployment on:
- **Frontend**: [Vercel](https://vercel.com/)
- **Backend**: [Railway](https://railway.app/) / [Render](https://render.com/)

---

## License

This project is licensed under the [MIT License](LICENSE) (or provided "as is"). Feel free to explore and build upon it!

---

<div align="center">
  Made with ❤️ for the Developer Community
</div>

