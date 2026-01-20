**StudyNotion**

It is an edtech platform where students can buy courses without actually paying. It is just a showcase. Payment gateway can be integrated like Stripe and Razorpay. Students can watch video lectures and track their progress. Instructors can create courses.

---

**The Stack**

**Frontend**
 React 18 with React Router for navigation
 Redux Toolkit for state management
 Tailwind CSS for styling
 Swiper for carousels, SweetAlert2 for notifications

**Backend**
 Express.js (v5) on Node.js
 MongoDB with Mongoose ODM
 JWT for authentication
 Cloudinary for media storage
 REST API with Google Cloud Console/OAuth for transactional emails

---

**Project Structure**

studynotion/
  src/                        React frontend
    components/
      Common/                 NavBar, Footer, Rating stars
      Core/
        Auth/                 Login, Signup, Password reset
        Catalog/              Course browsing
        Course/               Course details, content viewer
        Dashboard/            User/Instructor dashboards
        HomePage/             Landing page components
    pages/                    Route-level components
    Services/                 API calls and operations
    Slices/                   Redux slices
    Reducer/                  Root reducer

  server/                     Express backend
    Config/                   DB, Cloudinary, Razorpay setup
    Controllers/              Business logic
    Models/                   Mongoose schemas
    Routes/                   API endpoints
    Middlewares/              Auth middleware
    Mail/Templates/           Email templates
    Utils/                    Helpers (image upload, mail)

  build/                      Production build output

---

**Data Models**

User - Students, instructors, admins with profiles
Course - Title, description, price, thumbnail, sections
Section - Groups of subsections within a course
SubSection - Individual video lectures
Category - Course categorization
Payment - Transaction records
CourseProgress - Tracks completed videos per user
RatingAndReview - User reviews on courses
OTP - Email verification codes
Profile - Extended user info (about, DOB, etc.)

---

**API Routes**

/studyNotion/auth → Signup, login, OTP verification, password reset
/studyNotion/Courseroutes → CRUD for courses, categories, ratings
/studyNotion/sectionandsubsection → Manage course structure
/studyNotion/profile → User profile operations
/studyNotion/contact → Contact form submissions

---

**Getting Started**

**Prerequisites**
Node.js 18+
MongoDB (local or Atlas)
Cloudinary account
Razorpay account (for payments)

**Environment Variables**

Create .env in /server:

PORT=4000
MONGODB_URL=your_mongo_connection_string
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud
API_KEY=your_cloudinary_key
API_SECRET=your_cloudinary_secret
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
MAIL_HOST=smtp.example.com
MAIL_USER=your_email
MAIL_PASS=your_password

**Installation**

npm install - Install frontend dependencies
cd server && npm install - Install backend dependencies
npm run dev - Run both frontend and backend together

Frontend runs on http://localhost:3000
Backend runs on http://localhost:4000

---

**Key Features**

**Authentication**
Email/password signup with OTP verification
JWT-based sessions
Password reset via email

**Course Management**
Create courses with sections and video subsections
Upload thumbnails and videos to Cloudinary
Publish/unpublish courses

**Learning Experience**
Course catalog with category filtering
Video player with progress tracking
Ratings and reviews system

**Dashboard**
Student: Enrolled courses, progress, wishlist, purchase history
Instructor: My courses, add/edit courses, analytics



---

**Scripts**

npm start - Runs React dev server
npm run server - Runs Express server with nodemon
npm run dev - Runs both concurrently
npm run build - Creates production build

---

**Deployment**

Frontend is deployed on Vercel . Backend is  deployed to Railway, Render, or any Node.js host.

Make sure to:
1. Set all environment variables in your hosting platform
2. Update FRONTEND_URL to your production frontend URL
3. Configure CORS origins appropriately

---

**License**

Do whatever you want with it. Just don't blame me if something breaks.
