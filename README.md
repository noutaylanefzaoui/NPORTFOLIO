# Noutayla Nefzaoui - Decoupled React & Flask Personal Portfolio

A modern, premium, minimalist portfolio website representing the professional profiles of **Noutayla Nefzaoui**, showing both an **IT (Major)** software engineer and **Marketing (Minor)** digital strategist.

The application has been built using a **decoupled architecture**:
1. **Frontend**: React + Vite + Vanilla CSS & JS with **GSAP** for high-performance interactive triggers.
2. **Backend**: Python + Flask REST API with **SQLite** database storage and email validation.

---

## 🌟 Key Features

1. **Dual Focus Mode Toggles**: Visitors can switch between the **IT / Technical Focus** and **Marketing Focus** views in both the Projects and Experience sections, altering timelines and lists with smooth fade transitions.
2. **Premium Design System**: Curated typography, translucent glassmorphism panels, persistent dark/light theme, custom scrollbar, and soft blush-pink accents.
3. **Cursor Glow Tracking**: A custom softpink light radial-gradient follows the cursor position on desktop screens for high visual appeal.
4. **AJAX API Submissions**: The contact form communicates asynchronously using JSON payloads to `/api/contact` and triggers interactive `canvas-confetti` bursts on successes.
5. **Secure SQLite Logging**: Form records are sanitized and stored inside local table registers (`backend/database.db`).
6. **Robust Fallback Data**: The React frontend is programmed with fallback mock structures of your CV. Even if the Flask backend REST API is offline, your portfolio renders instantly.

---

## 📂 Project Structure

```text
NPORTFOLIO/
├── backend/                  # Python Flask REST API
│   ├── app.py                # Backend REST endpoints & database initialization
│   ├── database.db           # SQLite database (created on first run)
│   ├── requirements.txt      # Python dependencies (Flask, flask-cors)
│   └── verify_backend.py      # Automated backend API and database test suite
├── frontend/                 # React Frontend (Vite)
│   ├── package.json          # Frontend npm configuration & packages
│   ├── index.html            # Entry layout and Google fonts links
│   ├── src/
│   │   ├── main.jsx          # React renderer entry
│   │   ├── App.jsx           # Main coordinator (theme, coordinate tracker, API pull)
│   │   ├── App.css           # Styling overrides
│   │   ├── index.css         # Styling system custom HSL variables
│   │   └── components/       # Modular reusable components
│   │       ├── Navbar.jsx    # Sticky bar with theme switch and drawer
│   │       ├── Hero.jsx      # Subtitle GSAP rotator
│   │       ├── About.jsx     # Bio cards and skills matrix
│   │       ├── Projects.jsx  # Toggle active view with custom inline SVGs
│   │       ├── Experience.jsx# Timelines switcher
│   │       ├── Education.jsx # B.Sc. TBS coursework, certificates
│   │       ├── Contact.jsx   # Contact endpoints caller, confetti trigger
│   │       └── Footer.jsx    # Copyright footer
│   └── public/
│       └── docs/
│           ├── CV_Noutayla_IT.pdf       # IT CV Downloadable
│           └── CV_Noutayla_Marketing.pdf# Marketing CV Downloadable
└── README.md                 # Setup & running instructions
```

---

## 🚀 Setup & Launch Instructions

### 1. Prerequisites
Ensure you have **Python 3.10+** and **Node.js 18+** installed.

---

### 2. Backend API Setup

1. **Activate Python Virtual Environment**:
   Navigate to the root `NPORTFOLIO` directory:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # macOS / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install Python Packages**:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. **Configure Gmail SMTP for Contact Emails**:
   Copy the example file and add your real Gmail App Password:
   ```bash
   # Windows PowerShell
   Copy-Item backend/.env.example backend/.env

   # macOS / Linux
   cp backend/.env.example backend/.env
   ```

   In `backend/.env`, set:
   ```env
   SMTP_USERNAME=noutaylanefzaoui@gmail.com
   SMTP_PASSWORD=your-16-character-gmail-app-password
   MAIL_TO_EMAIL=noutaylanefzaoui@gmail.com
   ```

   Gmail will not accept your normal account password for SMTP. Enable 2-Step Verification in your Google account, create an App Password, and paste that App Password into `SMTP_PASSWORD`.

4. **Verify API Endpoints**:
   Run the automated test suite to confirm database inserts and routing:
   ```bash
   python backend/verify_backend.py
   ```
   *Expected output: `Ran 6 tests in ... OK`.*

5. **Launch the Flask REST Server**:
   ```bash
   python backend/app.py
   ```
   *The API will listen on **`http://127.0.0.1:5000`**.*

---

### 3. Frontend React Setup

1. **Install Node modules**:
   Open a separate terminal window, navigate to the `frontend/` directory, and run:
   ```bash
   cd frontend
   npm install
   ```

2. **Launch the Vite Development Server**:
   Start the React development instance:
   ```bash
   npm run dev
   ```
   *Open your browser and navigate to the address shown, usually **`http://localhost:5173`**.*

3. **Build for Production**:
   Compile the optimized static bundle into the `frontend/dist` folder:
   ```bash
   npm run build
   ```

---

## Deployment

Recommended setup:

- **Backend API**: Render Web Service
- **Frontend site**: Netlify

This keeps Gmail SMTP secrets on the backend only. Never add your real `backend/.env` file to GitHub.

### 1. Push the Project to GitHub

Create a GitHub repository and push this project. The deployment config files are already included:

- `render.yaml` for the Flask API
- `netlify.toml` for the React/Vite frontend

### 2. Deploy the Backend on Render

In Render, create a new Blueprint/Web Service from the GitHub repo. The service uses:

```text
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: gunicorn app:app
Health Check Path: /api/health
```

Set these environment variables on Render:

```env
FLASK_DEBUG=false
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USE_TLS=true
SMTP_USE_SSL=false
SMTP_USERNAME=noutaylanefzaoui@gmail.com
SMTP_PASSWORD=your-real-gmail-app-password
MAIL_TO_EMAIL=noutaylanefzaoui@gmail.com
MAIL_FROM_EMAIL=noutaylanefzaoui@gmail.com
MAIL_FROM_NAME=Noutayla Portfolio
CORS_ORIGINS=https://your-netlify-site.netlify.app
```

After deploy, Render gives you an API URL like:

```text
https://noutayla-portfolio-api.onrender.com
```

### 3. Deploy the Frontend on Netlify

In Netlify, create a new site from the same GitHub repo. The root `netlify.toml` sets:

```text
Base Directory: frontend
Build Command: npm run build
Publish Directory: dist
```

Set this Netlify environment variable before deploying:

```env
VITE_API_BASE_URL=https://your-render-api-url.onrender.com
```

Then deploy the site. After Netlify gives you the final site URL, copy it back into Render's `CORS_ORIGINS` value and redeploy/restart the backend.
