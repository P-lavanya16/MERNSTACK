# HiringPlatform

A comprehensive job seeking and posting platform that connects job seekers with recruiters.

🔗 **Live URLs:**
- Frontend: [https://hiringplatformcom.vercel.app/](https://hiringplatformcom.vercel.app/)
- Backend: [https://mernstack-backend-chi.vercel.app/](https://mernstack-backend-chi.vercel.app/)

> **Important Note:** We're using free-tier servers which may need a warm-up:
> 1. First open the backend URL and wait for it to load
> 2. Then access the frontend URL for the best experience
> 3. If experiencing delays, please refresh both URLs

## ✨ Features

### 👤 For Job Seekers
- Account creation and management
- Job search with advanced filtering
- Save interesting job postings
- Apply to jobs
- Profile customization
- Resume upload and management

### 💼 For Recruiters
- Company registration and profile management
- Job posting creation and management
- Access to applicant details (name, phone, resume)
- Applicant tracking and management

## 📸 Application Screenshots

### 1. Home Page
![Landing Page](./images/1.png)

### 2. Sign In Interface
![Job Search Interface](./images/4.png)

### 3. SignUp Interface
![Profile Management](./images/3.png)

### 4. Chat Bot
![Company Dashboard](./images/5.png)

### 5. Landing Page
![Job Posting Form](./images/4.png)

## 🛠️ Tech Stack

- Frontend: React.js
- Backend: Node.js
- Database: MongoDB
- Cloud Storage: Cloudinary
- AI Integration: Google Gemini

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.example.mongodb.net/
SECRET_KEY=your_secret_key
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
CLOUD_NAME=your_cloudinary_cloud_name
GIMINIAI_API=your_gemini_api_key
FRONTEND_URL=https://hiringplatformcom.vercel.app/
```

## 🔧 Frontend Configuration

Update the backend URL in `client/src/utils/constant.js`:

```javascript
const BASE_URL = "https://mernstack-backend-chi.vercel.app/api/v1";
```

## 💻 Local Development

1. Clone the repository
2. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd client
npm install
```

3. Start the development servers:
```bash
# Backend
npm run dev

# Frontend
npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

