import os
import re
import smtplib
import sqlite3
from email.message import EmailMessage
from email.utils import formataddr
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

DB_PATH = os.path.join(os.path.dirname(__file__), "database.db")
ENV_PATH = os.path.join(os.path.dirname(__file__), ".env")
CONTACT_RECIPIENT = "noutaylanefzaoui@gmail.com"

def load_env_file():
    """Loads backend/.env values for local development without an extra package."""
    if not os.path.exists(ENV_PATH):
        return

    with open(ENV_PATH, "r", encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue

            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = value

load_env_file()

def get_cors_origins():
    origins = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173"
    )
    return [origin.strip().rstrip("/") for origin in origins.split(",") if origin.strip()]

# Enable CORS so the deployed React frontend can query this API.
CORS(app, resources={r"/api/*": {"origins": get_cors_origins()}})

def init_db():
    """Initializes the database and creates the messages table if it doesn't exist."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

# Initialize the database
init_db()

def is_truthy(value):
    return str(value).strip().lower() in {"1", "true", "yes", "on"}

def sanitize_header(value):
    """Prevents accidental email header injection from form fields."""
    return re.sub(r"[\r\n]+", " ", value or "").strip()

def save_message(name, email, subject, message):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
        (name, email, subject, message)
    )
    conn.commit()
    conn.close()

def send_contact_email(name, email, subject, message):
    """Sends a contact form notification email to the portfolio owner."""
    suppress_send = app.config.get("MAIL_SUPPRESS_SEND", app.config.get("TESTING", False))
    if suppress_send or is_truthy(os.getenv("MAIL_SUPPRESS_SEND", "")):
        app.logger.info("Email delivery suppressed; contact message saved only.")
        return

    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_username = os.getenv("SMTP_USERNAME", "").strip()
    smtp_password = os.getenv("SMTP_PASSWORD", "").replace(" ", "").strip()
    smtp_use_ssl = is_truthy(os.getenv("SMTP_USE_SSL", "false"))
    smtp_use_tls = is_truthy(os.getenv("SMTP_USE_TLS", "true"))

    if not smtp_username or not smtp_password:
        raise RuntimeError("Email delivery is not configured. Set SMTP_USERNAME and SMTP_PASSWORD.")

    safe_name = sanitize_header(name)
    safe_subject = sanitize_header(subject) or "New contact form message"
    from_email = os.getenv("MAIL_FROM_EMAIL", smtp_username).strip()
    from_name = os.getenv("MAIL_FROM_NAME", "Portfolio Contact").strip()
    to_email = os.getenv("MAIL_TO_EMAIL", CONTACT_RECIPIENT).strip()

    email_message = EmailMessage()
    email_message["Subject"] = f"Portfolio contact: {safe_subject}"
    email_message["From"] = formataddr((from_name, from_email))
    email_message["To"] = to_email
    email_message["Reply-To"] = formataddr((safe_name, email))
    email_message.set_content(
        "\n".join([
            "You received a new message from your portfolio contact form.",
            "",
            f"Name: {name}",
            f"Email: {email}",
            f"Subject: {subject or '(No subject)'}",
            "",
            "Message:",
            message,
        ])
    )

    smtp_class = smtplib.SMTP_SSL if smtp_use_ssl else smtplib.SMTP
    with smtp_class(smtp_host, smtp_port, timeout=15) as smtp:
        if smtp_use_tls and not smtp_use_ssl:
            smtp.starttls()
        smtp.login(smtp_username, smtp_password)
        smtp.send_message(email_message)

# CV and Profile data JSON structure
PORTFOLIO_DATA = {
    "profile": {
        "name": "Noutayla Nefzaoui",
        "email": "noutaylanefzaoui@gmail.com",
        "phone": "+216 29 015 861",
        "location": "El Mourouj, Tunis",
        "nationality": "Tunisian",
        "bio": "I'm Noutayla, a student at Tunis Business School, born and raised in Tunis. I've always been the kind of person who's drawn to both creative and analytical challenges.",
        "short_bio": "Bridging technical logic and creative vision. Passionate about combining creativity and technology to develop innovative digital solutions.",
        "interests": ["Graphic Design", "Books & Poetry", "Music", "Technology & Innovation"],
        "languages": [
            {"name": "Arabic", "level": "Native"},
            {"name": "French", "level": "Fluent"},
            {"name": "English", "level": "Fluent"},
            {"name": "Italian", "level": "Intermediate"}
        ]
    },
    "skills": {
        "it": ["Java", "SQL", "HTML/CSS/JS", "C Language", "Databases", "REST APIs"],
        "marketing": ["SEO Basics", "Video Editing", "Content Creation", "Graphic Design", "Web Strategy"]
    },
    "projects": {
        "it": [
            {
                "title": "Ransomware Simulator",
                "tag": "University Project Java / Cybersecurity",
                "desc": "Built a controlled ransomware simulation to understand file encryption mechanisms and attack patterns. Developed understanding of cybersecurity threats, encryption algorithms, and defensive strategies.",
                "tech": ["Java", "Cryptography", "Cybersecurity"],
                "github": "https://github.com/AzizFekih-exe/ransomware-simulator.git"
            },
            {
                "title": "MeetWise",
                "tag": "University Project Android / AI",
                "desc": "Developed an AI-integrated mobile application for smart meeting management. Gained hands-on experience with Android development and integrating AI/ML APIs.",
                "tech": ["Java", "Android Studio", "AI APIs"],
                "github": "https://github.com/AzizFekih-exe/MeetWise-AI-Scheduler.git"
            },
            {
                "title": "Jokes Tounsi REST API",
                "tag": "University Project REST API / Backend",
                "desc": "Designed and built a REST API serving Tunisian dialect jokes, handling HTTP requests and JSON responses. Applied backend development concepts: routing, endpoints, data modeling.",
                "tech": ["Python", "REST API", "JSON"],
                "github": "https://github.com/noutaylanefzaoui/jokes_TOUNSI.git"
            },
            {
                "title": "Shein Fashion Assortment Dashboard",
                "tag": "University Project Power BI / Data Analytics",
                "desc": "Built an interactive Power BI dashboard analysing fashion product assortment and sales trends. Applied data visualisation, filtering, and business intelligence techniques.",
                "tech": ["Power BI", "Data Analysis", "Excel"],
                "github": "https://github.com/AzizFekih-exe/shein-fashion-assortment-bi.git"
            },
            {
                "title": "Smart Home System",
                "tag": "University Project Java / IoT",
                "desc": "Developed a Java-based smart home simulation managing connected devices and automation logic. Applied OOP principles: inheritance, encapsulation, and event-driven design.",
                "tech": ["Java OOP", "IoT Logic", "Design Patterns"],
                "github": "https://github.com/noutaylanefzaoui"
            }
        ],
        "marketing": [
            {
                "title": "Market Entry Proposal: McDonald's Tunisia",
                "tag": "Brand Positioning Strategy",
                "desc": "Implementing a Local Consumer Culture Positioning Strategy through the 'McDo Régional' Happy Meal Series.",
                "tech": ["Market Research", "Consumer Culture", "Positioning"],
                "result": "Pitch Deck Ready",
                "icon": "trending-up"
            },
            {
                "title": "Power Cups Digital Strategy",
                "tag": "Social Media Campaigns",
                "desc": "Constructing and planning comprehensive social media and visual distribution strategies for organic brand growth.",
                "tech": ["Digital Strategy", "Visual Creation", "Growth Mapping"],
                "result": "Strategy Map Done",
                "icon": "users"
            },
            {
                "title": "Consumer Behavior analysis on BIWAI SHOPS",
                "tag": "Consumer Insights",
                "desc": "Analyzing real-world buyer interactions, profiling customer journeys, and proposing strategic indexing suggestions.",
                "tech": ["Consumer Research", "Market Strategy", "Analytics"],
                "result": "Actionable Analysis",
                "icon": "search"
            }
        ]
    },
    "experience": {
        "it": [],
        "marketing": [
            {
                "role": "Marketing Manager & Social Media Manager",
                "company": "SpeakDuo & @Remote",
                "date": "2025 - 2026",
                "desc": "Directed full branding and digital campaign workflows. Supervised cross-functional teams on content creation, organic social channels expansion, and audience messaging.",
                "tags": ["Brand Strategy", "Social Media Strategy"]
            },
            {
                "role": "Marketing Intern",
                "company": "Malla Marketing Agency",
                "date": "2026",
                "desc": "Contributed to active client campaigns, supported content layout writing, and performed organic research for diverse client portfolios.",
                "tags": ["Content Marketing", "Client Relations"]
            },
            {
                "role": "Marketing Assistant Intern",
                "company": "SpeakDuo & @Remote",
                "date": "2024 - 2025",
                "desc": "Assisted with content writing and scheduled organic postings. Tracked customer engagement rates across social platforms to adjust layout trends.",
                "tags": ["Content Creation", "Copywriting"]
            },
            {
                "role": "Co-founder & Videographer",
                "company": "C213",
                "date": "2023 - 2025",
                "desc": "Co-founded a dynamic creative project handling commercial videography, graphic layout, and brand storytelling for local enterprises.",
                "tags": ["Videography", "Creative Direction"]
            },
            {
                "role": "Marketing Intern",
                "company": "TED University",
                "date": "2025",
                "desc": "Designed and printed communication materials, promoting high-profile university speaker events and managing speaker outreach networks.",
                "tags": ["Event Marketing", "Speaker Promotion"]
            }
        ]
    },
    "education": [
        {
            "degree": "B.Sc. Business Administration",
            "school": "Tunis Business School",
            "date": "2023 – 2027 (in progress)",
            "focus": "IT Major"
        },
        {
            "degree": "Baccalaureate",
            "school": "High School Al Athar",
            "date": "2019 – 2023",
            "focus": "Experimental Sciences"
        }
    ],
    "extracurriculars": [
        {
            "organization": "IEEE TBS Student Branch",
            "role": "Marketing & Communication Member &bull; 2025 - 2026",
            "desc": "Collaborated on marketing content and promoted technical events and workshops within the TBS community."
        },
        {
            "organization": "TIMUN TBS (Model United Nations)",
            "role": "Project Management & External Relations &bull; 2024 - 2025",
            "desc": "Engaged in organizing large-scale simulated assemblies, managed sponsor outreach, logistics, and planning."
        },
        {
            "organization": "MERIT TBS",
            "role": "Marketing & Communication Member &bull; 2024 - 2025",
            "desc": "Assisted in shaping public branding, social materials, and structural distribution for student initiatives."
        }
    ]
}

@app.route("/api/portfolio-data", methods=["GET"])
def get_portfolio_data():
    """Serves portfolio contents in JSON format."""
    return jsonify(PORTFOLIO_DATA)

@app.route("/api/health", methods=["GET"])
def health_check():
    """Simple health endpoint for deployment checks."""
    return jsonify({"status": "ok"}), 200

@app.route("/api/contact", methods=["POST"])
def contact():
    """Handles contact form submissions."""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided."}), 400

        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        subject = data.get("subject", "").strip()
        message = data.get("message", "").strip()

        # Validation
        if not name or not email or not message:
            return jsonify({"error": "Name, email, and message are required fields."}), 400

        if len(name) > 100:
            return jsonify({"error": "Name is too long (maximum 100 characters)."}), 400

        if len(email) > 100:
            return jsonify({"error": "Email is too long (maximum 100 characters)."}), 400

        if len(subject) > 150:
            return jsonify({"error": "Subject is too long (maximum 150 characters)."}), 400

        if len(message) > 1500:
            return jsonify({"error": "Message is too long (maximum 1500 characters)."}), 400

        # Simple email regex validation
        email_regex = r"^[\w\.-]+@[\w\.-]+\.\w+$"
        if not re.match(email_regex, email):
            return jsonify({"error": "Please enter a valid email address."}), 400

        # Save to SQLite database first, then send an email notification.
        save_message(name, email, subject, message)

        try:
            send_contact_email(name, email, subject, message)
        except Exception as email_error:
            app.logger.error(f"Contact message saved, but email delivery failed: {email_error}")
            return jsonify({
                "error": "Your message was saved, but email delivery failed. Please check the backend SMTP settings."
            }), 500

        return jsonify({"message": "Thank you! Your message has been sent."}), 200

    except Exception as e:
        app.logger.error(f"Error handling contact form: {e}")
        return jsonify({"error": "An unexpected error occurred. Please try again later."}), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    debug = is_truthy(os.getenv("FLASK_DEBUG", "true"))
    app.run(debug=debug, host="0.0.0.0", port=port)
