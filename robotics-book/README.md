# AI-Native Book: Physical AI & Humanoid Robotics

This project implements a comprehensive educational platform for learning about Physical AI and Humanoid Robotics, featuring a RAG chatbot and user authentication system.

## Features

- **RAG Chatbot**: Retrieve-Augmented Generation chatbot for interactive learning
- **User Authentication**: Complete signup/login system with profile collection
- **Personalized Learning**: Profile-based content personalization based on user background
- **Course Content**: Comprehensive documentation on robotics and AI

## Authentication System

This project implements Signup & Signin with user background collection for personalization (Hackathon Bonus Feature).

### Auth Features

- **Signup Flow**: Users provide:
  - Full Name
  - Email
  - Password
  - Software Background (Beginner / Intermediate / Advanced)
  - Hardware / Robotics Background (None / Basic / Advanced)
  - Purpose of Learning (Student / Teacher / Professional / Researcher)

- **Protected Routes**: User profile and personalized content
- **Session Management**: JWT-based authentication
- **Profile Storage**: User background information stored for personalization

### Backend (FastAPI)
- Authentication routes:
  - `POST /auth/signup` - Create new user account
  - `POST /auth/signin` - Login to existing account
  - `POST /auth/logout` - Logout (client-side token clearing)
  - `GET /auth/me` - Get current user info

### Frontend (Docusaurus)
- `/signup` - User registration page
- `/login` - User login page
- `/profile` - User profile display page
- Navbar integration showing login/logout based on auth status

### Environment Variables

Add this to your backend `.env` file:

```
SECRET_KEY="your-super-secret-key-change-this-in-production"
```

## Running the Application

### Backend Setup

1. Navigate to the backend directory:
```bash
cd chatbot-backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the backend server:
```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

1. Navigate to the project root:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start
```

## Technology Stack

- **Backend**: FastAPI with PostgreSQL database
- **Frontend**: Docusaurus with React
- **Authentication**: JWT-based authentication system
- **AI/ML**: Gemini API for chatbot functionality
- **Vector Database**: Qdrant for document storage and retrieval

## Hackathon Alignment

This project implements Signup & Signin with user background collection for personalization (Hackathon Bonus Feature). The authentication system enhances user experience by allowing personalized learning paths based on user's technical background.

## Project Structure

```
robotics-book/
├── chatbot-backend/    # FastAPI backend with auth
│   ├── app/
│   │   ├── auth/       # Authentication modules
│   │   ├── models/     # Data models
│   │   ├── routers/    # API routes
│   │   └── services/   # Business logic
│   └── requirements.txt
├── src/               # Docusaurus frontend
│   ├── components/    # React components
│   ├── contexts/      # React contexts (AuthContext)
│   ├── pages/         # Docusaurus pages
│   └── theme/         # Custom themes
└── docusaurus.config.ts
```

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
